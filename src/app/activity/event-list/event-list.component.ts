import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
<<<<<<< HEAD
import { ApplicationDataServiceService } from '../../service/application-data-service.service'
=======
import { ApplicationDataServiceService } from '../../service/application-data-service.service';
>>>>>>> activity-event-making-step-1


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {


  @Output() onNewEvent = new EventEmitter<string>();
  @Output() onClickDetailEvent = new EventEmitter<string>();


  selectedTriggerEvent;

  triggerEventList;


  constructor(private appDataService: ApplicationDataServiceService) { }

  ngOnInit() {

  }

  public onChangeData() {
    this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
    this.triggerEventList = this.appDataService.getActivityData().triggerEventList;
  }

  getImplement(triggerEventId) {
<<<<<<< HEAD
    return this.appDataService.findImplentEventByTriggerEventId(triggerEventId);
=======
    const result = this.appDataService.findImplentEventByTriggerEventId(triggerEventId);
    return result;
>>>>>>> activity-event-making-step-1
  }

  clickNewEvent() {
    this.onNewEvent.emit();
  }

  clickNewAfterAnimationEvent() {
<<<<<<< HEAD
    this.onNewEvent.emit("afterAnimation");
  }

  clickDetailEvent(event) {
    console.log("clickDetailEvent")
    this.onClickDetailEvent.emit(event);
  }

=======
    this.onNewEvent.emit('afterAnimation');
  }

  clickDetailEvent(event) {
    console.log("clickDetailEvent = " + JSON.stringify(event));
    this.onClickDetailEvent.emit(event);
  }

  clickDeleteEvent(event, triggerEvent) {

    event.stopPropagation();

    const result = confirm('will you delete ' + triggerEvent.name + '?');
    if (result) {
      console.log('clickDelete = ' + triggerEvent.id);
      // const implEvent = this.appDataService.findImplentEventByTriggerEventId(triggerEvent.id);
      this.appDataService.deleteTriggerEvent(triggerEvent);
    }




  }

>>>>>>> activity-event-making-step-1








}
