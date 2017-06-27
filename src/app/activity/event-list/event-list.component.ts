import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';
import { BroadcastService } from '../../service/broadcast.service';

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


  constructor(private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }

  ngOnInit() {

  }

  public onChangeData() {
    this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
    this.triggerEventList = this.appDataService.getActivityData().triggerEventList;
  }

  getImplement(triggerEventId) {
    const result = this.appDataService.findImplentEventByTriggerEventId(triggerEventId);
    return result;
  }

  clickNewEvent() {
    this.onNewEvent.emit();
  }

  clickNewAfterAnimationEvent() {
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
      const message = {
        kind: 'delete-event',
        triggerEventId: triggerEvent.id
      };
      this.broadcaster.broadcast('activity', message);
    }
  }










}
