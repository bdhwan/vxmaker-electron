import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

@Component({
  selector: 'app-event-generator',
  templateUrl: './event-generator.component.html',
  styleUrls: ['./event-generator.component.css']
})
export class EventGeneratorComponent implements OnInit {


  @Output() onCompleteEvent = new EventEmitter<string>();

  triggerEvent;
  implementEvent;

  stageList;
  activityList;
  currentSelectedStageId;
  objectList;
  selectedStageId;
  selectedActivityId;
  afterTriggerEventId;
  readyEvent = false;
  visibility = false;
  constructor(private appDataService: ApplicationDataServiceService) { }

  ngOnInit() {

  }


  public resetData() {
    this.afterTriggerEventId = null;
    this.triggerEvent = null;
    this.implementEvent = null;
    this.currentSelectedStageId = this.appDataService.getSelectedStage().id;
    this.objectList = this.appDataService.getObjectList();

  }







  onChangeStage(event) {

    this.readyEvent = true;
  }

  onChangeActivity(event) {

    this.readyEvent = true;
  }



  // make after animation
  public makeAfterTrigger(targetTriggerEventId) {
    this.clickTrigger('afterAnimation');
    this.afterTriggerEventId = targetTriggerEventId;
    this.triggerEvent.afterTriggerEventId = this.afterTriggerEventId;
  }



  clickTrigger(target) {
    const id = 'trigger_' + new Date().getTime();
    this.triggerEvent = {
      id: id,
      stageId: this.currentSelectedStageId,
      type: target,
      name: target,
      objectId: this.appDataService.getSelectedObject().id
    }
  }


  clickImplement(target) {
    const id = 'implement_' + new Date().getTime();
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
    }
  }

  completeEvent() {



    this.appDataService.getActivityData().triggerEventList.push(this.triggerEvent);


    console.log("trigger = " + JSON.stringify(this.appDataService.getActivityData().triggerEventList));

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
        const now = new Date().getTime();
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
      
    }

    // add implements
    this.appDataService.getActivityData().implementEventList.push(this.implementEvent);
    this.onCompleteEvent.emit();
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
