import { Component, OnInit, OnDestroy, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ObjectTreeComponent } from '../object-tree/object-tree.component'
import { ObjectNewComponent } from '../object-new/object-new.component'
import { ObjectPropertyComponent } from '../object-property/object-property.component'
import { PreviewComponent } from '../preview/preview.component'
import { Http } from '@angular/http';
import { ApplicationDataServiceService } from '../service/application-data-service.service'

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



  isReadyToRender: Boolean = false;

  activityId: String;
  applicationFolderPath: string;
  applicationData;
  activityMetaData;
  activityData;


  selectedObject;
  selectedStage;
  selectedState;


  objectTypeData = [];
  defaultStateData;


  previewCss = {};





  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public zone: NgZone,
    private http: Http,
    private appDataService: ApplicationDataServiceService
  ) {
    this.isReadyToRender = false;
    // console.log("construct application =" + window.screen.height + ", test");
    // console.log("construct event.target.innerWidth ="+this.window.innerWidth+", event.target.innerHeight="+this.window.innerHeight);
  }




  ngOnInit() {


  }

  getPreviewWidth() {
    return (window.innerWidth - 400) + "px";
  }
  getPreviewHeight() {
    return (window.innerHeight - 80) + "px";
  }


  ngAfterViewInit() {
    this.loadInitDataFromFile().then((result) => {
      return this.loadApplicationData();
    }).then((result) => {
      return this.checkEmptyActivityData();
    }).then((result) => {
      return this.initDataToView();
    }).then((result) => {
      this.notifySelectedObjectChanged();
      this.appDataService.setApplicationData(this.applicationData);
      
    });
  }


  ngOnDestroy() {

  }



  getHttpToJson(targetUrl) {
    return new Promise((resolve, reject) => {
      this.http.get(targetUrl).subscribe(res => {
        var data = res.json();
        resolve(data);
      });
    });
  }

  loadInitDataFromFile() {
    return new Promise((resolve, reject) => {
      //오브젝트 타입 정보 불러오기
      this.getHttpToJson('assets/object/object.json').then((data: any) => {
        var reqeustList = [];
        for (var i = 0; i < data.objectType.length; i++) {
          reqeustList.push(this.getHttpToJson('assets/object/' + data.objectType[i]));
        }
        this.defaultStateData = data.defaultState;
        return Promise.all(reqeustList);
      }).then((results: any) => {
        // console.log("results =" + JSON.stringify(results));
        this.objectTypeData = results;
        resolve(true);
      }).catch(function (err) {
        console.log("catch = " + JSON.stringify(err));
        reject(err);
      });;
    });
  }


  loadApplicationData() {
    return new Promise((resolve, reject) => {
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
      resolve(true);
    });
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
        var newObject = this.createNewObject("FrameLayout");
        newObject.id = "root";
        newObject['name'] = "root";
        this.activityData.objectList = [newObject];

        //3. state
        var newState = this.createNewState(newObject.id, stage.id,"FrameLayout");

        this.activityData.stateList = [newState];

      }
      console.log("ngOnInit");
      resolve(true);
    });
  }


  initDataToView() {
    return new Promise((resolve, reject) => {
      this.isReadyToRender = true;
      this.selectedObject = this.activityData.objectList[0];
      this.selectedStage = this.activityData.stageList[0];
      this.selectedState = this.activityData.stateList[0];
      this.objectTreeComponent.setObjectData(this.activityData.objectList);
      this.previewComponent.setActivityData(this.activityData);
      this.objectNewComponent.setObjectTypeData(this.objectTypeData);
      resolve(true);
    });
  }

  createNewObject(type: string) {

    var defaultObject = this.findObjectBasicDataByType(type);
    var now = new Date().getTime();
    var newObject = {
      id: "object_" + now,
      canHaveChildren: false
    };

    for (var i = 0; i < defaultObject.objectProperties.length; i++) {
      var aProperty = defaultObject.objectProperties[i];
      newObject[aProperty.name] = aProperty.default;
    }

    if (newObject.canHaveChildren) {
      newObject['children'] = [];
    }
    return newObject;

  }



  createNewState(objectId: string, stageId: string, type:string) {
    var now = new Date().getTime();
    var newState = {
      id: "state_" + now,
      objectId: objectId,
      stageId: stageId,
      width: 1440,
      height: 2560,
      marginTop: 0,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
      translationX: 0,
      translationY: 0,
      scaleX: 1,
      scaleY: 1,
      rotate: 0,
      alpha: 1,
    }


    //fetch default state value
    var defaultObject = this.findObjectBasicDataByType(type);
    for (var i = 0; i < defaultObject.stateProperties.length; i++) {
      var aProperty = defaultObject.stateProperties[i];
      newState[aProperty.name] = aProperty.default;
    }

    return newState;
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

  findObjectBasicDataByType(type: string) {
    for (var i = 0; i < this.objectTypeData.length; i++) {
      var aData = this.objectTypeData[i];
      if (type == aData.type) {
        return aData;
      }
    }
    return null;
  }

  clickNewObject(type: string) {


    var parentObject = this.selectedObject;
    if (!parentObject.children) {
      parentObject = this.findObjectById(this.selectedObject.parentId);
    }
    console.log("new type = " + type+", parent = "+parentObject.id);

    var newObject = this.createNewObject(type);
    newObject['parentId'] = parentObject.id;

    for (var i = 0; i < this.activityData.stageList.length; i++) {
      var aStage = this.activityData.stageList[i];
      var aState = this.createNewState(newObject.id, this.selectedStage.id, type);
      this.activityData.stateList.push(aState);
    }

    parentObject.children.push(newObject);
    this.objectTreeComponent.updateTreeModel();
    this.objectTreeComponent.selectObjectNode(newObject);
    this.objectTreeComponent.expandAll();

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
      if (aObject.children && aObject.children.length > 0) {
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





  notifySelectedObjectChanged() {

    this.selectedState = this.findStateByObjectId(this.selectedObject.id);

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
