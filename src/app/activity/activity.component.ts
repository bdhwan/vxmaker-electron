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




  activityId: String;
  applicationFolderPath: string;
  applicationData;
  activityMetaData;
  activityData;


  selectedObject;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public zone: NgZone
  ) {
    console.log("construct application ="+window.screen.height+", test");
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
      var newState = {
        id: "state_" + now,
        objectId: newObject.id,
        stageId: stage.id
      }

      this.activityData.stateList = [newState];

    }





    console.log("ngOnInit");


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
    this.selectedObject.children.push(newObject);
    this.objectTreeComponent.updateTreeModel();
    this.objectTreeComponent.selectObjectNode(newObject);



  }

  changeTreeData(data) {
    console.log("changeTreeData = " + data);
  }

  onSelectNodeFromTree(objectId: string) {
    console.log("onSelectNodeFromTree = " + objectId);
    this.selectedObject = this.findObjectById(this.activityData.objectList, objectId);


    this.objectPropertyComponent.setObjectData(this.selectedObject);
    // console.log("finded  = " + this.selectedObject.id);
  }

  onChangeNodeFromTree() {
    console.log("onChangeNodeFromTree");
    this.saveActivityData();

  }




  findObjectById(targetList: any, objectId: string) {

    for (var i = 0; i < targetList.length; i++) {

      var aObject = targetList[i];
      if (aObject.id == objectId) {
        return aObject;
      }
      if (aObject.children.length > 0) {
        var childResult = this.findObjectById(aObject.children, objectId);
        if (childResult) {
          return childResult;
        }
      }
    }
    return null;
  }



  ngAfterViewInit() {

    console.log("ngAfterViewInit");
    this.objectTreeComponent.setObjectData(this.activityData.objectList);

  }


  onResize(event) {

    console.log("event.target.innerWidth ="+event.target.innerWidth+", event.target.innerHeight="+event.target.innerHeight);

    
  }





}
