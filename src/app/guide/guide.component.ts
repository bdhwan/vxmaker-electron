import { Component, OnDestroy, OnInit, NgZone, ViewChild, AfterViewInit } from '@angular/core';
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


import { EventGeneratorComponent } from '../activity/event-generator/event-generator.component';
import { ApplicationDataServiceService } from '../service/application-data-service.service';
import { UUID } from 'angular2-uuid';
import { BroadcastService } from '../service/broadcast.service';
import { MessageEventService } from '../service/message-event.service';
import { environment } from '../../environments/environment';


import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css'],
  providers: [BroadcastService, MessageEventService]
})
export class GuideComponent implements OnInit, OnDestroy {
  prefix = '.';


  @ViewChild('objectTree')
  private objectTreeComponent: ObjectTreeComponent;

  // //  @ViewChild('objectNew')
  // //   private objectNewComponent: ObjectNewComponent;

  @ViewChild('objectProperty')
  private objectPropertyComponent: ObjectPropertyComponent;

  @ViewChild('previewCanvas')
  private previewComponent: PreviewComponent;

  @ViewChild('stageList')
  private stageList: StageListComponent;

  @ViewChild('eventList')
  private eventList: EventListComponent;

  @ViewChild('eventDetailStageChange')
  private eventDetailStageChange: EventDetailStageChangeComponent;

  @ViewChild('eventDetailStartActivity')
  private eventDetailStartActivity: EventDetailStartActivityComponent;

  @ViewChild('eventDetailFinishActivity')
  private eventDetailFinishActivity: EventDetailFinishActivityComponent;

  // @ViewChild('previewSize')
  // private previewSize: PreviewSizeComponent;



  saveStatus: Boolean = false;

  sendStatus: Boolean = false;

  isOpenActivityList: Boolean = false;

  isReadyToRender: Boolean = false;

  activityId: String;
  applicationFolderPath = '/assets/data';
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

  windowW;
  windowH;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    public zone: NgZone,
    private appDataService: ApplicationDataServiceService,
    private broadcaster: BroadcastService,
    private messageEvent: MessageEventService) { }

  ngOnInit() {

    this.activityId = this.route.snapshot.params['activityId'];
    const self = this;

    this.registerStringBroadcast();

    this.appDataService.getHttpToJson('/assets/data/app.json').then(function (result) {
      self.applicationData = result;
      return null;
    }).then(result => {
      console.log("this.applicationData = " + self.applicationData);
      if (self.activityId === 'init') {
        self.activityId = self.applicationData.activityList[0].activityId;
      }
      return self.reloadActivityData();
    }).then(result => {
      self.invalidatePreviewSize();
    });
  }



  ngOnDestroy() {
    if (this.messageListener) {
      this.messageListener.unsubscribe();
    }
  }
  registerStringBroadcast() {
    this.broadcaster.on<any>('guide')
      .subscribe(message => {

        const kind = message.kind;
        console.log("message received!! = " + kind);
        const activityId = message.activityId;
        if (kind === 'open-url') {
          const targetUrl = message.url;
          this.appDataService.openUrl(targetUrl);
        } else if (kind === 'select-object') {
          const selectedObject = this.appDataService.findObjectById(message.objectId);
          this.appDataService.setSelectedObject(selectedObject);
          this.notifySelectedObjectChanged();
        } else if (kind === 'go-detail-activity') {
          this.clickActivity(activityId);
        } else if (kind === 'detail-event') {
          const detailEvent = message.event;
          this.onClickDetailEvent(detailEvent);


        } else if (kind === 'new-after-animation') {
          // this.onClickDetailEvent(null);
        } else if (kind === 'close-event') {
          this.onCloseEvent();
        } else if (kind === 'select-object') {
          const selectedObject = this.appDataService.findObjectById(message.objectId);
          this.appDataService.setSelectedObject(selectedObject);
          this.notifySelectedObjectChanged();
        } else if (kind === 'select-stage') {
          const stage = message.stage;
          this.onSelectStage(stage);
        } else if (kind === 'delete-stage') {
          const stage = message.stage;
          this.onSelectStage(stage);
        }


      });
  }



  clickActivity(activityId) {
    this.activityId = activityId;
    this.reloadActivityData();
  }

  onClickDetailEvent(triggerEvent) {
    console.log("clickDetailEvent = " + event);

    this.appDataService.setSelectedTriggerEvent(triggerEvent);
    const impEvent = this.appDataService.findImplentEventByTriggerEventId(triggerEvent.id);
    this.appDataService.setSelectedImplementEvent(impEvent);
    // notify data set changed
    this.notifySelectedObjectChanged();

  }


  onResize(event) {
    this.invalidatePreviewSize();
  }

  invalidatePreviewSize(): void {
    this.windowW = window.innerWidth;
    this.windowH = window.innerHeight;
  }
  getFixHeightStyle() {
    const objectStyle = {
      'height': this.windowH + 'px',
    };
    return objectStyle;
  }

  getPreviewWindowStyle() {
    const objectStyle = {
      'width': this.windowW * 0.3 + 'px',
      'height': this.windowH + 'px'
    };
    return objectStyle;
  }


  reloadActivityData() {

    const self = this;

    return new Promise((resolve, reject) => {
      self.appDataService.loadInitDataFromFile().then((data) => {
        self.defaultStateData = self.appDataService.getDefaultStateData();
        self.objectTypeData = self.appDataService.getObjectTypeData();
        self.appDataService.initApplicationPath(self.applicationFolderPath);
        self.appDataService.initActivityId(self.activityId);
        self.appDataService.setApplicationData(self.applicationData);

        return self.appDataService.getHttpToJson('/assets/data/activity/' + self.activityId + '.json');
      }).then((result) => {

        self.appDataService.setActivityData(result);

        self.applicationData = self.appDataService.getApplicationData();
        self.activityMetaData = self.appDataService.getActivityMetaData();
        self.activityData = self.appDataService.getActivityData();
        self.selectedTriggerEvent = self.appDataService.getSelectedTriggerEvent();
        return self.initDataToView();

      }).then((result) => {
        self.notifySelectedObjectChanged();
      }).then(result => {
        resolve(true);
      });
    });
  }


  initDataToView() {
    const self = this;
    return new Promise((resolve, reject) => {
      self.isReadyToRender = true;

      self.appDataService.setSelectedStage(self.activityData.stageList[0]);
      self.appDataService.setSelectedObject(self.activityData.objectList[0]);
      // this.objectNewComponent.setObjectTypeData(this.objectTypeData);
      this.objectTreeComponent.initObjectData();
      this.stageList.initData();

      resolve(true);
    });
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




  notifySelectedObjectChanged() {

    this.previewComponent.onChangeData();
    // this.previewSize.onChangeData();
    this.objectPropertyComponent.onChangeData();
    this.stageList.onChangeData();


    this.eventList.onChangeData();
    this.eventDetailStageChange.onChangeData();
    this.eventDetailStartActivity.onChangeData();
    this.eventDetailFinishActivity.onChangeData();
  }

  onCloseEvent() {
    this.appDataService.setSelectedTriggerEvent(null);
    this.appDataService.setSelectedImplementEvent(null);
    // notify data set changed
    this.notifySelectedObjectChanged();
  }


  onSelectStage(target) {
    console.log("onSelectStage = " + target);
    this.appDataService.setSelectedStage(target);
    this.notifySelectedObjectChanged();
  }




  clickRoot() {
    this.router.navigate(['/application', this.applicationFolderPath]);
  }


}
