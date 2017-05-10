import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'
<<<<<<< HEAD
=======
import { UUID } from 'angular2-uuid';

>>>>>>> activity-event-making-step-1

@Component({
  selector: 'app-event-generator',
  templateUrl: './event-generator.component.html',
  styleUrls: ['./event-generator.component.css']
})
export class EventGeneratorComponent implements OnInit {


  @Output() onCompleteEvent = new EventEmitter<string>();

<<<<<<< HEAD

  triggerEvent;
  implementEvent;


=======
  triggerEvent;
  implementEvent;

>>>>>>> activity-event-making-step-1
  stageList;
  activityList;
  currentSelectedStageId;
  objectList;
  selectedStageId;
  selectedActivityId;
<<<<<<< HEAD
  afterTriggerEventId;

  readyEvent = false;



  visibility = false;
  constructor(private appDataService: ApplicationDataServiceService) { }


=======
  selectedLottieViewId;

  selectedVideoViewId;
  selectedTakePictureObjectViewId;
  afterTriggerEventId;
  readyEvent = false;
  visibility = false;
  constructor(private appDataService: ApplicationDataServiceService) { }

>>>>>>> activity-event-making-step-1
  ngOnInit() {

  }


  public resetData() {
    this.afterTriggerEventId = null;
    this.triggerEvent = null;
    this.implementEvent = null;
    this.currentSelectedStageId = this.appDataService.getSelectedStage().id;
<<<<<<< HEAD
    this.objectList = this.appDataService.getActivityData().objectList;
=======
    this.objectList = this.appDataService.getObjectList();

>>>>>>> activity-event-making-step-1
  }




<<<<<<< HEAD
  onChangeStage(event) {
    console.log("onChangeStage");
=======



  onChangeStage(event) {

>>>>>>> activity-event-making-step-1
    this.readyEvent = true;
  }

  onChangeActivity(event) {
<<<<<<< HEAD
    console.log("onChangeActivity");
    this.readyEvent = true;
  }



  //make after animation
  public makeAfterTrigger(targetTriggerEventId){
    this.clickTrigger("afterAnimation");
=======

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
    return this.filterObjectView('LottieView');
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
>>>>>>> activity-event-making-step-1
    this.afterTriggerEventId = targetTriggerEventId;
    this.triggerEvent.afterTriggerEventId = this.afterTriggerEventId;
  }



  clickTrigger(target) {
<<<<<<< HEAD
    var id = "trigger_" + new Date().getTime();
=======
    const id = 'trigger_' + UUID.UUID();
>>>>>>> activity-event-making-step-1
    this.triggerEvent = {
      id: id,
      stageId: this.currentSelectedStageId,
      type: target,
      name: target,
      objectId: this.appDataService.getSelectedObject().id
    }
  }


  clickImplement(target) {
<<<<<<< HEAD
    var id = "implement_" + new Date().getTime();
=======
    const id = 'implement_' + UUID.UUID();
>>>>>>> activity-event-making-step-1
    this.implementEvent = {
      id: id,
      triggerEventId: this.triggerEvent.id,
      type: target,
      name: target
<<<<<<< HEAD
    }

    if (target == 'finishActivity') {
      this.readyEvent = true;
    }
    else {
      this.selectedStageId = null;
      this.selectedActivityId = null;
      this.readyEvent = false;
=======
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
>>>>>>> activity-event-making-step-1
    }
  }

  completeEvent() {



<<<<<<< HEAD
    //add trigger 
    this.appDataService.getActivityData().triggerEventList.push(this.triggerEvent);



    if (this.implementEvent.type == 'stageChange') {
      this.implementEvent.toStageId = this.selectedStageId;


      for (var i = 0; i < this.objectList.length; i++) {
        var aObject = this.objectList[i];
        var toState = this.appDataService.findStateByObjectIdWithStageId(aObject.id, this.selectedStageId);

        var duration = 300;
        var startDelay = 0;
        var cubicValue = [];
        var now = new Date().getTime();

        var stateEvent = {
          id: 'state_event_' + now,
          implementEventId: this.implementEvent.id,
          name: 'state_event_' + now,
          toStateId: toState.id,

        }
        this.appDataService.getActivityData().stateEventList.push(stateEvent);
      }


    }
    else if (this.implementEvent.type == 'startActivity') {

      this.implementEvent.toActivityId = this.selectedActivityId;
    }
    else if (this.implementEvent.type == 'finishActivity') {
      

    }

    //add implements
    this.appDataService.getActivityData().implementEventList.push(this.implementEvent);
    this.onCompleteEvent.emit();

=======
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
    this.onCompleteEvent.emit();
>>>>>>> activity-event-making-step-1
    this.hideDialog();

  }




  public hideDialog() {
<<<<<<< HEAD
    console.log("hideDialog = ");
=======

>>>>>>> activity-event-making-step-1
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
