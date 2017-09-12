import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'
import { UUID } from 'angular2-uuid';
import { BroadcastService } from '../../service/broadcast.service';



@Component({
  selector: 'app-event-generator',
  templateUrl: './event-generator.component.html',
  styleUrls: ['./event-generator.component.css']
})
export class EventGeneratorComponent implements OnInit {


  // @Output() onCompleteEvent = new EventEmitter<string>();

  triggerEvent;
  implementEvent;

  stageList;
  activityList;
  currentSelectedStageId;
  objectList;
  selectedStageId;
  selectedActivityId;
  selectedLottieViewId;

  selectedVideoViewId;
  selectedTakePictureObjectViewId;
  afterTriggerEventId;
  readyEvent = false;
  visibility = false;
  constructor(private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }

  ngOnInit() {

  }


  public resetData() {
    this.afterTriggerEventId = null;
    this.triggerEvent = null;
    this.implementEvent = null;
    this.currentSelectedStageId = this.appDataService.getSelectedStage().id;
    this.objectList = this.appDataService.getObjectList();

  }







  onChangeStage(stageId) {

    this.selectedStageId = stageId;
    this.readyEvent = true;
  }

  onChangeActivity(event) {

    this.readyEvent = true;
  }

  onChangeLottiView(event) {

    this.readyEvent = true;
  }

  onChangeVideoView(event) {
    this.readyEvent = true;
  }

  onChangeCameraPictureView(event) {
    this.readyEvent = true;
  }


  getLottieViewList() {
    return this.filterObjectView('LottieAnimationView');
  }

  getImageViewList() {
    return this.filterObjectView('ImageView');
  }
  getVideoViewList() {
    return this.filterObjectView('VideoView');
  }

  filterObjectView(targetType) {
    const result = [];
    for (let i = 0; i < this.objectList.length; i++) {
      const aObject = this.objectList[i];
      if (aObject.type === targetType) {
        result.push(aObject);
      }
    }
    return result;

  }





  // make after animation
  public makeAfterTrigger(targetTriggerEventId) {
    this.clickTrigger('afterAnimation');
    this.afterTriggerEventId = targetTriggerEventId;
    this.triggerEvent.afterTriggerEventId = this.afterTriggerEventId;
  }



  clickTrigger(target) {
    const id = 'trigger_' + UUID.UUID();
    this.triggerEvent = {
      id: id,
      stageId: this.currentSelectedStageId,
      type: target,
      name: target,
      objectId: this.appDataService.getSelectedObject().id
    }
  }


  clickImplement(target) {
    const id = 'implement_' + UUID.UUID();
    this.implementEvent = {
      id: id,
      triggerEventId: this.triggerEvent.id,
      type: target,
      name: target
    };

    if (target === 'finishActivity') {
      this.readyEvent = true;
    } else {
      this.selectedStageId = null;
      this.selectedActivityId = null;
      this.readyEvent = false;
      this.selectedLottieViewId = null;
      this.selectedVideoViewId = null;
      this.selectedTakePictureObjectViewId = null;
    }
  }

  completeEvent() {



    this.appDataService.getActivityData().triggerEventList.push(this.triggerEvent);

    if (this.implementEvent.type === 'stageChange') {
      this.implementEvent.toStageId = this.selectedStageId;
      this.implementEvent.fromStageId = this.currentSelectedStageId;

      for (let i = 0; i < this.objectList.length; i++) {
        const aObject = this.objectList[i];
        const fromState = this.appDataService.findStateByObjectIdWithStageId(aObject.id, this.currentSelectedStageId);
        const toState = this.appDataService.findStateByObjectIdWithStageId(aObject.id, this.selectedStageId);
        const duration = 300;
        const startDelay = 0;
        const cubicValue = [];
        const now = UUID.UUID();
        const stateEvent = {
          id: 'state_event_' + now,
          implementEventId: this.implementEvent.id,
          objectId: aObject.id,
          name: 'state_event_' + now,
          toStateId: toState.id,
          fromStateId: fromState.id,
          duration: 300,
          startDelay: 0,
          interpolatorType: 'cubic',
          cubicValue: [0, 0.5, 0.5, 1],
          isEnabled: true
        };
        this.appDataService.getActivityData().stateEventList.push(stateEvent);
      }
    } else if (this.implementEvent.type === 'startActivity') {
      this.implementEvent.toActivityId = this.selectedActivityId;
    } else if (this.implementEvent.type === 'finishActivity') {

    } else if (this.implementEvent.type === 'startLottie') {
      this.implementEvent.lottieViewId = this.selectedLottieViewId;
    } else if (this.implementEvent.type === 'stopLottie') {
      this.implementEvent.lottieViewId = this.selectedLottieViewId;
    } else if (this.implementEvent.type === 'startVideo') {
      this.implementEvent.videoViewId = this.selectedVideoViewId;
    } else if (this.implementEvent.type === 'stopVideo') {
      this.implementEvent.videoViewId = this.selectedVideoViewId;
    } else if (this.implementEvent.type === 'takePicture') {
      this.implementEvent.takePictureImageView = this.selectedTakePictureObjectViewId;
    }

    // add implements
    this.appDataService.getActivityData().implementEventList.push(this.implementEvent);
    // this.onCompleteEvent.emit();
    const message = {
      kind: 'complete-event'
    };
    this.broadcaster.broadcast('activity', message);
    this.hideDialog();
  }




  public hideDialog() {

    this.visibility = false;
  }

  public showDialog() {
    this.visibility = true;
  }

  public onChangeData() {

    this.stageList = this.appDataService.getActivityData().stageList;
    this.activityList = this.appDataService.getApplicationData().activityList;

  }

  nothing(event) {
    event.stopPropagation();
  }







}
