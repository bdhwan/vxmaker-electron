import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

@Component({
  selector: 'app-event-detail-stage-change',
  templateUrl: './event-detail-stage-change.component.html',
  styleUrls: ['./event-detail-stage-change.component.css']
})
export class EventDetailStageChangeComponent implements OnInit {

  @Output() onNewAfterAnimationEvent = new EventEmitter<string>();
<<<<<<< HEAD
=======
  @Output() onCloseEvent = new EventEmitter<string>();

>>>>>>> activity-event-making-step-1
  // selectedTriggerEvent;
  selectedImplementEvent;

  stateEventList = [];



  constructor(private appDataService: ApplicationDataServiceService) { }


  ngOnInit() {
  }


  clickAddAfterAnimation() {
    this.onNewAfterAnimationEvent.emit(this.selectedImplementEvent.id);
<<<<<<< HEAD
=======
  }

  clickCancel(){

    this.onCloseEvent.emit();
>>>>>>> activity-event-making-step-1

  }


  getAfterAnimation(){


  }


<<<<<<< HEAD
=======
  getObjectName(objectId){
    return this.appDataService.findObjectById(objectId);
  }

>>>>>>> activity-event-making-step-1

  public onChangeData() {
    // this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
    this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();

    if (this.selectedImplementEvent) {
      this.stateEventList = this.appDataService.findStateChangeEventByImplementEventId(this.selectedImplementEvent.id);
    }
  }


<<<<<<< HEAD
=======



>>>>>>> activity-event-making-step-1
}
