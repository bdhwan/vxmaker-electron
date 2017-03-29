import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'


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
    return this.appDataService.findImplentEventByTriggerEventId(triggerEventId);
  }

  clickNewEvent() {
    this.onNewEvent.emit();
  }

  clickNewAfterAnimationEvent() {
    this.onNewEvent.emit("afterAnimation");
  }

  clickDetailEvent(event) {
    console.log("clickDetailEvent")
    this.onClickDetailEvent.emit(event);
  }









}
