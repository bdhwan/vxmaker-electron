import { Component, OnInit, OnDestroy, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { ObjectTreeComponent } from '../activity/object-tree/object-tree.component';
import { ObjectNewComponent } from '../activity/object-new/object-new.component';
import { ObjectPropertyComponent } from '../activity/object-property/object-property.component';
import { PreviewComponent } from '../activity/preview/preview.component';
import { PreviewSizeComponent } from '../activity/preview-size/preview-size.component';

import { StageListComponent } from '../activity/stage-list/stage-list.component';
import { ResourceComponent } from '../common/resource/resource.component';
import { EventListComponent } from '../activity/event-list/event-list.component';
import { EventDetailStageChangeComponent } from '../activity/event-detail-stage-change/event-detail-stage-change.component';
import { EventDetailStartActivityComponent } from '../activity/event-detail-start-activity/event-detail-start-activity.component';
import { EventDetailFinishActivityComponent } from '../activity/event-detail-finish-activity/event-detail-finish-activity.component';


import { ActivityListComponent } from '../application/activity-list/activity-list.component';



import { EventGeneratorComponent } from '../activity/event-generator/event-generator.component';
import { ApplicationDataServiceService } from '../service/application-data-service.service';
import { UUID } from 'angular2-uuid';
import { BroadcastService } from '../service/broadcast.service';
import { MessageEventService } from '../service/message-event.service';
import { environment } from '../../environments/environment';


import 'rxjs/add/operator/switchMap';

declare var rasterizeHTML: any;

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css'],
  providers: [BroadcastService, MessageEventService]
})
export class ActivityComponent implements OnInit, AfterViewInit, OnDestroy {

  prefix;


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

  @ViewChild('eventGenerator')
  private eventGenerator: EventGeneratorComponent;

  @ViewChild('eventList')
  private eventList: EventListComponent;

  @ViewChild('eventDetailStageChange')
  private eventDetailStageChange: EventDetailStageChangeComponent;

  @ViewChild('eventDetailStartActivity')
  private eventDetailStartActivity: EventDetailStartActivityComponent;

  @ViewChild('eventDetailFinishActivity')
  private eventDetailFinishActivity: EventDetailFinishActivityComponent;

  @ViewChild('previewSize')
  private previewSize: PreviewSizeComponent;

  @ViewChild('activityList')
  private activityList: ActivityListComponent;



  saveStatus: Boolean = false;

  sendStatus: Boolean = false;

  isOpenActivityList: Boolean = false;

  isReadyToRender: Boolean = false;

  activityId: String;
  applicationFolderPath: string;
  applicationData;
  activityMetaData;
  activityData;

  selectedTriggerEvent;

  imageList = [];
  fileList = [];


  objectTypeData: any;
  defaultStateData;


  previewCss = {};



  messageListener;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public zone: NgZone,
    private appDataService: ApplicationDataServiceService,
    private broadcaster: BroadcastService,
    private messageEvent: MessageEventService
  ) {
    this.isReadyToRender = false;
    this.prefix = environment.imgPrefix;
    // console.log("construct application =" + window.screen.height + ", test");
    // console.log("construct event.target.innerWidth ="+this.window.innerWidth+", event.target.innerHeight="+this.window.innerHeight);
  }




  ngOnInit() {
    this.applicationFolderPath = this.route.snapshot.params['applicationFolderPath'];
    this.activityId = this.route.snapshot.params['activityId'];
    this.appDataService.initApplicationPath(this.applicationFolderPath);
    this.appDataService.initActivityId(this.activityId);

    this.registerStringBroadcast();
  }

  ngOnDestroy() {
    this.messageListener.unsubscribe();
  }


  registerStringBroadcast() {
    this.messageListener = this.broadcaster.on<any>('activity')
      .subscribe(message => {

        const kind = message.kind;
        console.log("message received!! = " + kind);
        const activityId = message.activityId;

        if (kind === 'save') {
          this.onClickSave();
        } else if (kind === 'save-refresh-activity') {
          this.notifySelectedObjectChanged();
          this.onClickSave();
        } else if (kind === 'send-device') {
          this.onClickSendDevice(null);
        } else if (kind === 'delete-object') {
          const objectId = message.objectId;
          if (objectId !== 'root') {
            this.appDataService.deleteObject(objectId);
            this.onClickSave();
          }
        } else if (kind === 'delete-current-object') {
          const selectedObject = this.appDataService.getSelectedObject();
          if (selectedObject) {
            const objectId = selectedObject.id;
            if (objectId !== 'root') {
              this.appDataService.deleteObject(objectId);
              this.notifySelectedObjectChanged();
              this.objectTreeComponent.initObjectData();
              this.onClickSave();
            }
          }
        } else if (kind === 'delete-event') {
          this.appDataService.deleteTriggerEventByTriggerEventId(message.triggerEventId);
          this.notifySelectedObjectChanged();
          this.onClickSave();
        } else if (kind === 'select-psd') {

          const selectedPSD = this.appDataService.selectPsdFile();
          if (selectedPSD) {
            this.parsePsd(selectedPSD);
          }
        } else if (kind === 'open-url') {
          const targetUrl = message.url;
          this.appDataService.openUrl(targetUrl);
        } else if (kind === 'select-object') {
          const selectedObject = this.appDataService.findObjectById(message.objectId);
          this.appDataService.setSelectedObject(selectedObject);
          this.notifySelectedObjectChanged();
        } else if (kind === 'code-export') {

          this.saveProcessAsync().then(result => {
            this.router.navigate(['/code-export', this.applicationFolderPath]);
          });

        } else if (kind === 'go-detail-activity') {
          this.clickActivity(activityId);
        } else if (kind === 'delete-activity') {
          this.clickDeleteActivity(activityId);
        } else if (kind === 'duplicate-activity') {
          this.clickDuplicateActivity(activityId);
        } else if (kind === 'new-activity') {
          this.clickNewActivity();
        } else if (kind === 'set-launcher-activity') {
          this.onClickLauncherActivity(activityId);
        } else if (kind === 'on-change-data') {

        } else if (kind === 'change-icon') {
          this.onClickChangeIcon();
        } else if (kind === 'complete-event') {
          this.onCompleteEvent(null);

        } else if (kind === 'new-event') {
          this.onNewEvent();

        } else if (kind === 'detail-event') {
          const detailEvent = message.event;
          this.onClickDetailEvent(detailEvent);
        } else if (kind === 'new-after-animation') {
          // this.onClickDetailEvent(null);
        } else if (kind === 'select-file') {
          const dataUrl = message.dataUrl;
          const target = message.target;
          this.resourceDialog.setSelectedFileUrl(dataUrl);
          this.resourceDialog.showDialog(target);

        }
      });
  }


  parsePsd(selectedPSD) {
    const self = this;
    this.appDataService.parsePsdFile(selectedPSD, this.applicationFolderPath).then(function (result) {
      console.log("parse result = " + result);
      self.insertParsedPsdData(result);
    });
  }

  insertParsedPsdData(psdDataString) {
    const psdData = JSON.parse(psdDataString);
    this.insertPsdObject(psdData);
  }


  insertPsdObject(aObject) {
    let parentObject = this.appDataService.getSelectedObject();
    if (!parentObject.children) {
      parentObject = this.appDataService.findObjectById(this.appDataService.getSelectedObject().parentId);
    }

    const newObject = this.appDataService.createNewObject(aObject.type);
    newObject['parentId'] = parentObject.id;
    newObject['name'] = aObject.text;
    if (aObject.dataUrl) {
      newObject['dataUrl'] = aObject.dataUrl;
    }

    for (let i = 0; i < this.activityData.stageList.length; i++) {
      const aStage = this.activityData.stageList[i];
      const aState = this.appDataService.createNewState(newObject.id, aStage.id, aObject.type);

      aState['width'] = aObject.width;
      aState['height'] = aObject.height;
      aState['marginLeft'] = aObject.marginLeft;
      aState['marginTop'] = aObject.marginTop;
      this.activityData.stateList.push(aState);
    }

    parentObject.children.push(newObject);
    this.objectTreeComponent.updateTreeModel();
    this.objectTreeComponent.selectObjectNode(newObject);
    this.objectTreeComponent.expandAll();

    for (let i = 0; i < aObject.children.length; i++) {
      const aChild = aObject.children[i];
      this.objectTreeComponent.selectObjectNode(newObject);
      this.insertPsdObject(aChild);
    }

  }

  // public onParseResult





  getPreviewWidth() {
    return (window.innerWidth - 608) + 'px';
  }

  getPreviewHeight() {
    return (window.innerHeight - 50) + 'px';
  }


  ngAfterViewInit() {
    this.reloadActivityData();
  }


  reloadActivityData() {

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
        this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();


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





  checkEmptyActivityData() {
    return new Promise((resolve, reject) => {
      console.log("check empty");

      // 데이터가 하나도 없으므로 초기화 시켜야함
      if (!this.activityData.objectList) {

        //1. stage 
        //2. object
        //3. state

        //1. stage
        const stage = {
          id: 'rootStage',
          name: 'rootStage'
        };
        this.activityData.stageList = [stage];

        //2. object
        let newObject = this.appDataService.createNewObject('FrameLayout');
        newObject.id = 'root';
        newObject['name'] = 'root';
        newObject['backgroundColor'] = '#ffffff';
        this.activityData.objectList = [newObject];

        //3. state
        let newState = this.appDataService.createNewState(newObject.id, stage.id, 'FrameLayout');

        this.activityData.stateList = [newState];

        //4. triggerEventList;
        this.activityData.triggerEventList = [];

        //5. implementEventList;
        this.activityData.implementEventList = [];

        //6. stateEventList;
        this.activityData.stateEventList = [];



      }
      console.log("check stage list = " + JSON.stringify(this.activityData.stageList));
      resolve(true);
    });
  }


  clickText() {
    console.log("clickText");
    this.objectTreeComponent.expandAll();
  }

  toggleActivityList() {
    console.log("toggleActivityList");
    this.isOpenActivityList = !this.isOpenActivityList;
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



  onCompleteEvent(event) {

    console.log("onCompleteEvent");
    this.eventList.onChangeData();
    this.onCloseEvent();
  }

  clickRoot() {

    this.saveProcessAsync().then(result => {
      this.router.navigate(['/application', this.applicationFolderPath]);
    });


  }


  clickBack(): void {
    //capture and go back
    this.saveProcessAsync().then(result => {
      this.zone.run(() => {
        this.location.back();
      });
    });
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

  captureScreen() {
    return new Promise((resolve, reject) => {
      const self = this;
      const fileName = 'preview/' + self.activityId + '.jpg';
      const filePath = self.applicationFolderPath + '/' + fileName;
      this.appDataService.captureScreen(288, 120, window.innerWidth - 288 - 320, window.innerHeight - 80 * 2, filePath).then(result => {
        // this.savePreviewImagePath(fileName);
        resolve(fileName);
      });
    });
  }

  savePreviewImagePath(filePath) {
    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      const activity = this.applicationData.activityList[i];
      if (activity.activityId === this.activityId) {
        activity.previewPath = filePath;
      }

    }
  }


  onClickSave(): void {

    this.saveProcessAsync();
  }




  saveProcessAsync() {
    const self = this;
    this.saveStatus = true;

    return new Promise((resolve, reject) => {
      self.captureScreen().then(result => {
        self.activityMetaData.previewPath = result;
        self.saveApplicationData();
        self.saveActivityData();
        self.saveStatus = false;
        resolve(true);
      });
    });
  }



  onClickSendDevice(value: string): void {
    this.sendStatus = true;
    const self = this;
    this.saveProcessAsync().then(result => {
      self.appDataService.sendFileToDevice();
      self.sendStatus = false;
    });
  }

  clickNewObject(type: string) {

    let parentObject = this.appDataService.getSelectedObject();
    if (!parentObject.children) {
      parentObject = this.appDataService.findObjectById(this.appDataService.getSelectedObject().parentId);
    }

    const newObject = this.appDataService.createNewObject(type);
    newObject['parentId'] = parentObject.id;

    for (let i = 0; i < this.activityData.stageList.length; i++) {
      const aStage = this.activityData.stageList[i];
      const aState = this.appDataService.createNewState(newObject.id, aStage.id, type);
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
    const stage = this.onMakeNewStage();
    this.onSelectStage(stage);
  }

  onMakeNewStage() {
    const stage = {
      id: 'stage_' + UUID.UUID(),
      name: 'stage-' + this.activityData.stageList.length
    };

    this.activityData.stageList.push(stage);
    const allStateList = this.appDataService.getAllSelectedState();
    for (let i = 0; i < allStateList.length; i++) {
      const aState = Object.assign({}, allStateList[i]);
      aState.stageId = stage.id;
      aState.id = 'state_' + UUID.UUID();
      this.activityData.stateList.push(aState);
    }
    return stage;
  }

  onSelectStage(target) {
    console.log("onSelectStage = " + target);
    this.appDataService.setSelectedStage(target);
    this.notifySelectedObjectChanged();
  }

  onSelectFile(target) {

    console.log("onSelectFile = " + target);
    const selectedObject = this.appDataService.getSelectedObject();

    console.log("selectedObject.objectType  = " + JSON.stringify(selectedObject));

    if (selectedObject) {

      const tempUrl = selectedObject.dataUrl;
      selectedObject.dataUrl = target;
      this.saveActivityData();
      this.saveApplicationData();

      if (selectedObject.type === 'LottieAnimationView') {
        if (tempUrl && tempUrl !== target) {
          this.previewComponent.recreateObjectList();
        }
      }
    }
  }


  onShowResourceDialog(target) {
    this.resourceDialog.showDialog(target);
  }




  changeTreeData(data) {


  }

  onSelectNodeFromOther(objectId) {
    console.log("onSelectNodeFromOther-" + objectId);

    this.objectTreeComponent.selectObjectNode(this.appDataService.findObjectById(objectId));
  }

  onSelectNodeFromTree(objectId: string) {

    const selectedObject = this.appDataService.findObjectById(objectId);
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
    this.previewSize.onChangeData();
    this.objectPropertyComponent.onChangeData();
    this.stageList.onChangeData();
    this.eventList.onChangeData();
    this.eventGenerator.onChangeData();

    this.eventList.onChangeData();
    this.eventDetailStageChange.onChangeData();
    this.eventDetailStartActivity.onChangeData();
    this.eventDetailFinishActivity.onChangeData();
  }


  onNewAfterAnimationEvent(target) {
    console.log("onNewEvent target =" + target);

    //check stage count
    if (this.activityData.stageList.length == 1) {
      this.onMakeNewStage();
    }

    this.eventGenerator.resetData();
    this.eventGenerator.makeAfterTrigger(target);
    this.eventGenerator.showDialog();

  }

  onNewEvent() {
    // check stage count
    if (this.activityData.stageList.length === 1) {
      this.onMakeNewStage();
    }
    this.eventGenerator.resetData();
    this.eventGenerator.showDialog();

  }

  onClickDetailEvent(triggerEvent) {

    console.log("onClickDetailEvent = " + JSON.stringify(triggerEvent));

    this.appDataService.setSelectedTriggerEvent(triggerEvent);
    const impEvent = this.appDataService.findImplentEventByTriggerEventId(triggerEvent.id);
    this.appDataService.setSelectedImplementEvent(impEvent);
    // notify data set changed
    this.notifySelectedObjectChanged();

  }


  onCloseEvent() {
    this.appDataService.setSelectedTriggerEvent(null);
    this.appDataService.setSelectedImplementEvent(null);
    // notify data set changed
    this.notifySelectedObjectChanged();
  }


  onResize(event) {

  }


  clickNewActivity(): void {
    console.log("click new Activity");
    const now = new Date().getTime();
    const activityId = 'activity_' + UUID.UUID();
    const newActivityMetaData = {
      activityId: activityId,
      activityName: 'UntitledActivityName',
      createdAt: now,
      updatedAt: now
    };
    const newActivityData = {
      activityId: activityId
    };

    if (this.applicationData.activityList.length === 0) {
      this.applicationData.launcherActivityId = activityId;
    }

    this.applicationData.activityList.push(newActivityMetaData);


    this.appDataService.saveApplicationData(this.applicationData);
    this.appDataService.saveActivityData(activityId, newActivityData);

    this.router.navigate(['/activity', this.applicationFolderPath, activityId]);

  }



  clickActivity(activityId): void {
    console.log("will go = " + activityId);

    this.saveProcessAsync().then(result => {

      this.activityList.refreshTimeStamp();
      this.router.navigate(['/activity', this.applicationFolderPath, activityId]);

      this.activityId = activityId;
      this.appDataService.initActivityId(this.activityId);
      this.reloadActivityData();
    });



  }

  clickDeleteActivity(activityId): void {

    const result = confirm('will you delete? =' + activityId);
    if (result) {
      const index = this.findActivityPosition(activityId);
      this.applicationData.activityList.splice(index, 1);
      this.appDataService.deleteActivity(activityId);
      this.clickSave();
      if (this.activityId === activityId) {
        this.clickRoot();
      }

    }
  }

  findActivityPosition(activityId): any {
    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      if (this.applicationData.activityList[i].activityId === activityId) {
        return i;
      }
    }
  }


  clickDuplicateActivity(activityId): void {


    const index = this.findActivityPosition(activityId);

    const now = new Date().getTime();
    const newActivityId = 'activity_' + UUID.UUID();

    const newObject = JSON.parse(JSON.stringify(this.applicationData.activityList[index]));
    newObject.activityId = newActivityId;
    newObject.activityName = 'Copy_' + newObject.activityName;
    newObject.createdAt = now;
    newObject.updatedAt = now;

    this.applicationData.activityList.splice(index + 1, 0, newObject);

    this.appDataService.saveApplicationData(this.applicationData);
    this.appDataService.saveActivityData(newActivityId, newObject);

    this.clickActivity(newActivityId);

  }

  onClickLauncherActivity(activityId): void {
    this.applicationData.launcherActivityId = activityId;
    this.appDataService.saveApplicationData(this.applicationData);
  }


  onClickChangeIcon(): void {
    const newIconImagePath = this.appDataService.selectImageFile();

    if (newIconImagePath) {
      const iconFileName = 'image/ic_launcher_' + new Date().getTime() + '.png';
      const targetPath = this.applicationFolderPath + '/' + iconFileName;
      this.appDataService.deleteFile(this.applicationFolderPath + '/' + this.applicationData.iconPath);
      const result = this.appDataService.copyFile(newIconImagePath, targetPath);

      if (result) {
        this.applicationData.iconPath = iconFileName;
        this.appDataService.saveApplicationData(this.applicationData);
      }
    }
  }






}
