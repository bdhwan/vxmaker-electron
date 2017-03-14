import { Component, OnInit, OnDestroy, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ObjectTreeComponent } from '../object-tree/object-tree.component'
import { ObjectNewComponent } from '../object-new/object-new.component'
import { ObjectPropertyComponent } from '../object-property/object-property.component'
import { PreviewComponent } from '../preview/preview.component'


import 'rxjs/add/operator/switchMap';

declare var electron: any;
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




  activityId: String;
  applicationFolderPath: string;
  applicationData;
  activityMetaData;
  activityData;


  selectedObject;
  selectedStage;
  selectedState;





  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public zone: NgZone
  ) {
    console.log("construct application =" + window.screen.height + ", test");
    // console.log("construct event.target.innerWidth ="+this.window.innerWidth+", event.target.innerHeight="+this.window.innerHeight);
  }

  ngOnInit() {


    this.applicationFolderPath = this.route.snapshot.params['applicationFolderPath'];
    this.activityId = this.route.snapshot.params['activityId'];

    this.applicationData = JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + "/app.json")));
    for (var i = 0; i < this.applicationData.activityList.length; i++) {
      var activity = this.applicationData.activityList[i];
      if (activity.activityId === this.activityId) {
        this.activityMetaData = activity;
        break;
      }
    }
    this.activityData = JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + "/activity/" + this.activityId + ".json")));

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
      var newObject = {
        id: "rootObject",
        name: "root",
        type: "FrameLayout",
        children: []
      }
      this.activityData.objectList = [newObject];

      var now = new Date().getTime();
      //3. state
      var newState = this.createNewState(newObject.id, stage.id);

      this.activityData.stateList = [newState];


    }
    console.log("ngOnInit");


  }


  createNewState(objectId: string, stageId: string) {
    var now = new Date().getTime();
    var newState = {
      id: "state_" + now,
      objectId: objectId,
      stageId: stageId,
      width: 1440,
      height: 2560,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      alpha: 1
    }
    return newState;
  }


  ngOnDestroy() {

  }


  clickBack(): void {
    //capture and go back
    this.captureScreen();
  }


  clickSave(): void {
    console.log("save activity data");
    this.saveActivityData();
  }

  changeActivityName(): void {
    this.saveApplicationData();
  }

  saveApplicationData(): void {
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/app.json", this.applicationData);
  }
  saveActivityData(): void {
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/activity/" + this.activityId + ".json", this.activityData);
  }


  captureScreen(): void {
    var node = document.getElementById("previewScreen");
    var canvas = document.createElement("canvas");
    canvas.height = node.offsetHeight;
    canvas.width = node.offsetWidth;

    var self = this;
    rasterizeHTML.drawHTML(node.outerHTML, canvas)
      .then(function (renderResult) {
        if (navigator.msSaveBlob) {
          window.navigator.msSaveBlob(canvas.msToBlob(), name);
        } else {
          var data = canvas.toDataURL();
          var fileName = "preview/" + self.activityId + ".jpg";
          var filePath = self.applicationFolderPath + "/" + fileName;
          electron.ipcRenderer.sendSync('save-raw-data', filePath, data);

          self.activityMetaData.previewPath = fileName;
          self.saveApplicationData();
          self.saveActivityData();


          self.zone.run(() => {
            console.log("will go back");
            self.location.back();
          });

        }
      });
  }


  clickNewObject(type: string) {
    console.log("new type = " + type);

    var now = new Date().getTime();
    var newObject = {
      id: "object_" + now,
      name: type,
      type: type,
      children: []
    };

    for (var i = 0; i < this.activityData.stageList.length; i++) {
      var aStage = this.activityData.stageList[i];
      var aState = this.createNewState(newObject.id, this.selectedStage.id);
      this.activityData.stateList.push(aState);
    }

    this.selectedObject.children.push(newObject);
    this.objectTreeComponent.updateTreeModel();
    this.objectTreeComponent.selectObjectNode(newObject);

  }

  changeTreeData(data) {
    console.log("changeTreeData = " + data);
  }

  onSelectNodeFromTree(objectId: string) {


    this.selectedObject = this.findObjectById(objectId);
    console.log("onSelectNodeFromTree = " + this.selectedObject.id);

    this.notifySelectedObjectChanged();

  }

  onChangeNodeFromTree() {
    console.log("onChangeNodeFromTree");
    this.saveActivityData();

  }



  findObjectById(objectId: string) {
    return this.findObjectByIdWithList(this.activityData.objectList, objectId);
  }

  findObjectByIdWithList(targetList: any, objectId: string) {
    for (var i = 0; i < targetList.length; i++) {
      var aObject = targetList[i];
      if (aObject.id == objectId) {
        return aObject;
      }
      if (aObject.children.length > 0) {
        var childResult = this.findObjectByIdWithList(aObject.children, objectId);
        if (childResult) {
          return childResult;
        }
      }
    }
    return null;
  }


  findStateByObjectId(objectId: string) {
    return this.findStateByObjectIdWithStageId(objectId, this.selectedStage.id);
  }


  findStateByObjectIdWithStageId(objectId: string, stageId: string) {

    console.log("will find "+objectId+", stage:"+stageId);
    return this.findStateByObjectIdWithList(this.activityData.stateList, objectId, stageId);
  }


  findStateByObjectIdWithList(targetList: any, objectId: string, stageId: string) {
    for (var i = 0; i < targetList.length; i++) {
      var aState = targetList[i];
      if (aState.objectId == objectId && aState.stageId == stageId) {
        return aState;
      }
    }
    return null;
  }



  ngAfterViewInit() {

    this.selectedObject = this.activityData.objectList[0];
    this.selectedStage = this.activityData.stageList[0];
    this.selectedState = this.activityData.stateList[0];

    this.objectTreeComponent.setObjectData(this.activityData.objectList);
    this.previewComponent.setActivityData(this.activityData);

    this.notifySelectedObjectChanged();
  }

  notifySelectedObjectChanged() {

    this.selectedState = this.findStateByObjectId(this.selectedObject.id);

    console.log("selected state = " + JSON.stringify(this.selectedState));

    this.previewComponent.setSelectedObject(this.selectedObject);
    this.previewComponent.setSelectedStage(this.selectedStage);
    this.previewComponent.setSelectedState(this.selectedState);

    this.objectPropertyComponent.setSelectedObject(this.selectedObject);
    this.objectPropertyComponent.setSelectedState(this.selectedState);

  }








  onResize(event) {

    console.log("event.target.innerWidth =" + event.target.innerWidth + ", event.target.innerHeight=" + event.target.innerHeight);


  }





}
