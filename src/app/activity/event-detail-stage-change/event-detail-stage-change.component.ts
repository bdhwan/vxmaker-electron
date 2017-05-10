import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

@Component({
  selector: 'app-event-detail-stage-change',
  templateUrl: './event-detail-stage-change.component.html',
  styleUrls: ['./event-detail-stage-change.component.css']
})
export class EventDetailStageChangeComponent implements OnInit {

  @Output() onNewAfterAnimationEvent = new EventEmitter<string>();
  @Output() onCloseEvent = new EventEmitter<string>();

  // selectedTriggerEvent;
  selectedImplementEvent;

  stateEventList = [];



  constructor(private appDataService: ApplicationDataServiceService) { }


  ngOnInit() {
  }


  clickAddAfterAnimation() {
    this.onNewAfterAnimationEvent.emit(this.selectedImplementEvent.id);
  }

  clickCancel(){

    this.onCloseEvent.emit();

  }


  getAfterAnimation(){


  }


  getObjectName(objectId){
    return this.appDataService.findObjectById(objectId);
  }


  public onChangeData() {
    // this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
    this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();

    if (this.selectedImplementEvent) {
      this.stateEventList = this.appDataService.findStateChangeEventByImplementEventId(this.selectedImplementEvent.id);
    }
  }





}
