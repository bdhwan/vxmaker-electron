import { Component, OnInit, OnDestroy, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ObjectTreeComponent } from '../activity/object-tree/object-tree.component'
import { ObjectNewComponent } from '../activity/object-new/object-new.component'
import { ObjectPropertyComponent } from '../activity/object-property/object-property.component'
import { PreviewComponent } from '../activity/preview/preview.component'

import { StageListComponent } from '../activity/stage-list/stage-list.component'

import { ResourceComponent } from '../common/resource/resource.component'
import { ApplicationDataServiceService } from '../service/application-data-service.service'

import 'rxjs/add/operator/switchMap';


declare var rasterizeHTML: any;



@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, OnDestroy {


  @ViewChild('objectTree')
  private objectTreeComponent: ObjectTreeComponent;

  @ViewChild('objectNew')
  private objectNewComponent: ObjectNewComponent;

  @ViewChild('objectProperty')
  private objectPropertyComponent: ObjectPropertyComponent;

  @ViewChild('previewCanvas')
  private previewComponent: PreviewComponent;

  @ViewChild('resourceDialog')
  private resourceDialog: ResourceComponent;

  @ViewChild('stageList')
  private stageList: StageListComponent;




  isReadyToRender: Boolean = false;

  activityId: String;
  applicationFolderPath: string;
  applicationData;
  activityMetaData;
  activityData;


  imageList = [];
  fileList = [];


  objectTypeData: any;
  defaultStateData;


  previewCss = {};





  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public zone: NgZone,
    private appDataService: ApplicationDataServiceService
  ) {
    this.isReadyToRender = false;
    // console.log("construct application =" + window.screen.height + ", test");
    // console.log("construct event.target.innerWidth ="+this.window.innerWidth+", event.target.innerHeight="+this.window.innerHeight);
  }




  ngOnInit() {


    this.applicationFolderPath = this.route.snapshot.params['applicationFolderPath'];
    this.activityId = this.route.snapshot.params['activityId'];

    this.appDataService.initApplicationPath(this.applicationFolderPath);
    this.appDataService.initActivityId(this.activityId);


  }

  getPreviewWidth() {
    return (window.innerWidth - 400) + "px";
  }
  getPreviewHeight() {
    return (window.innerHeight - 80) + "px";
  }


  ngAfterViewInit() {



    this.appDataService.loadInitDataFromFile().then((data) => {

      this.defaultStateData = this.appDataService.getDefaultStateData();
      this.objectTypeData = this.appDataService.getObjectTypeData();

      return this.appDataService.loadApplicationData();
    })

      .then((result) => {
        return this.appDataService.loadImageResourceList();
      })

      .then((result) => {


        return this.appDataService.loadFileResourceList();
      })

      .then((result) => {

        this.fileList = this.appDataService.getFileResourceList();
        this.imageList = this.appDataService.getImageResourceList();
        this.applicationData = this.appDataService.getApplicationData();
        this.activityMetaData = this.appDataService.getActivityMetaData();
        this.activityData = this.appDataService.getActivityData();
        return this.checkEmptyActivityData();

      }).then((result) => {
        return this.initDataToView();
      }).then((result) => {
        this.notifySelectedObjectChanged();
      });
  }


  public refreshList() {
    this.applicationFolderPath = this.appDataService.getApplicationPath();
    this.imageList = this.appDataService.getImageResourceList();
  }



  ngOnDestroy() {

  }

  checkEmptyActivityData() {
    return new Promise((resolve, reject) => {
      //데이터가 하나도 없으므로 초기화 시켜야함
      if (!this.activityData.objectList) {

        //1. stage 
        //2. object
        //3. state

        //1. stage
        var stage = {
          id: "rootStage",
          name: "rootStage"
        }
        this.activityData.stageList = [stage];

        //2. object
        var newObject = this.appDataService.createNewObject("FrameLayout");
        newObject.id = "root";
        newObject['name'] = "root";
        this.activityData.objectList = [newObject];

        //3. state
        var newState = this.appDataService.createNewState(newObject.id, stage.id, "FrameLayout");

        this.activityData.stateList = [newState];

      }

      resolve(true);
    });
  }





  initDataToView() {
    return new Promise((resolve, reject) => {
      this.isReadyToRender = true;

      this.appDataService.setSelectedStage(this.activityData.stageList[0]);
      this.appDataService.setSelectedObject(this.activityData.objectList[0]);
      this.objectNewComponent.setObjectTypeData(this.objectTypeData);
      this.objectTreeComponent.initObjectData();
      this.stageList.initData();

      resolve(true);
    });
  }








  clickBack(): void {
    //capture and go back
    this.captureScreen();
  }


  clickSave(): void {
    this.saveActivityData();
  }

  changeActivityName(): void {
    this.saveApplicationData();
  }

  saveApplicationData(): void {
    this.appDataService.saveApplicationData(this.applicationData);
  }

  saveActivityData(): void {
    this.appDataService.saveActivityData(this.activityId, this.activityData);
  }

  captureScreen(): void {
    var self = this;
    this.previewComponent.captureScreen().then((data) => {

      var fileName = "preview/" + self.activityId + ".jpg";
      var filePath = self.applicationFolderPath + "/" + fileName;

      self.appDataService.saveRawFile(filePath, data);
      self.activityMetaData.previewPath = fileName;
      self.saveApplicationData();
      self.saveActivityData();

      self.zone.run(() => {
        console.log("will go back");
        self.location.back();
      });
    });
  }



  clickNewObject(type: string) {

    var parentObject = this.appDataService.getSelectedObject();
    if (!parentObject.children) {
      parentObject = this.appDataService.findObjectById(this.appDataService.getSelectedObject().parentId);
    }

    var newObject = this.appDataService.createNewObject(type);
    newObject['parentId'] = parentObject.id;

    for (var i = 0; i < this.activityData.stageList.length; i++) {
      var aStage = this.activityData.stageList[i];
      var aState = this.appDataService.createNewState(newObject.id, this.appDataService.getSelectedStage().id, type);
      this.activityData.stateList.push(aState);
    }

    parentObject.children.push(newObject);
    this.objectTreeComponent.updateTreeModel();
    this.objectTreeComponent.selectObjectNode(newObject);
    this.objectTreeComponent.expandAll();

  }

  onNewStage() {
    console.log("onNewStage");
    //make new stage
    //1. stage
    var now = new Date().getTime();
    var stage = {
      id: "stage_" + now,
      name: "stage-" + this.activityData.stageList.length
    }
    this.activityData.stageList.push(stage);

    var allStateList = this.appDataService.getAllSelectedState();
    for (var i = 0; i < allStateList.length; i++) {
      var aState = Object.assign({}, allStateList[i]);
      aState.stageId = stage.id;
      aState.id = "state_" + new Date().getTime();
      this.activityData.stateList.push(aState);
    }

    this.onSelectStage(stage);

  }


  onSelectStage(target) {
    console.log("onSelectStage = " + target);
    this.appDataService.setSelectedStage(target);
    this.notifySelectedObjectChanged();
  }

  onSelectFile(target) {

    console.log("onSelectFile = " + target);
    var selectedObject = this.appDataService.getSelectedObject();
    if (selectedObject) {
      selectedObject.dataUrl = target;
    }


  }


  onShowResourceDialog(target) {
    this.resourceDialog.showDialog(target);
  }




  changeTreeData(data) {
    console.log("changeTreeData = " + data);
  }

  onSelectNodeFromTree(objectId: string) {

    var selectedObject = this.appDataService.findObjectById(objectId);
    // console.log("onSelectNodeFromTree = " + selectedObject.id);
    this.appDataService.setSelectedObject(selectedObject);
    this.notifySelectedObjectChanged();
  }

  onChangeNodeFromTree() {
    console.log("onChangeNodeFromTree");
    this.saveActivityData();
  }









  notifySelectedObjectChanged() {

    this.previewComponent.onChangeData();
    this.objectPropertyComponent.onChangeData();
    this.stageList.onChangeData();



  }








  onResize(event) {

  }





}
