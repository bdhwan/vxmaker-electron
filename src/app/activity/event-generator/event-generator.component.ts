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
    this.objectList = this.appDataService.getActivityData().objectList;
  }




  onChangeStage(event) {
    console.log("onChangeStage");
    this.readyEvent = true;
  }

  onChangeActivity(event) {
    console.log("onChangeActivity");
    this.readyEvent = true;
  }



  //make after animation
  public makeAfterTrigger(targetTriggerEventId){
    this.clickTrigger("afterAnimation");
    this.afterTriggerEventId = targetTriggerEventId;
    this.triggerEvent.afterTriggerEventId = this.afterTriggerEventId;
  }



  clickTrigger(target) {
    var id = "trigger_" + new Date().getTime();
    this.triggerEvent = {
      id: id,
      stageId: this.currentSelectedStageId,
      type: target,
      name: target,
      objectId: this.appDataService.getSelectedObject().id
    }
  }


  clickImplement(target) {
    var id = "implement_" + new Date().getTime();
    this.implementEvent = {
      id: id,
      triggerEventId: this.triggerEvent.id,
      type: target,
      name: target
    }

    if (target == 'finishActivity') {
      this.readyEvent = true;
    }
    else {
      this.selectedStageId = null;
      this.selectedActivityId = null;
      this.readyEvent = false;
    }
  }

  completeEvent() {



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

    this.hideDialog();

  }




  public hideDialog() {
    console.log("hideDialog = ");
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
