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

    for (let i = 0; i < this.triggerEventList.length; i++) {
      const aEvent = this.triggerEventList[i];
      const implEvent = this.appDataService.findImplentEventByTriggerEventId(aEvent.id);
      if (implEvent.type === 'stageChange') {
        implEvent.fromStageName = this.appDataService.findStageByStageId(implEvent.fromStageId).name;
        implEvent.toStageName = this.appDataService.findStageByStageId(implEvent.toStageId).name;
      } else if (implEvent.type === 'startActivity') {
        implEvent.toActivityName = this.appDataService.getActivityName(implEvent.toActivityId);
      }
      aEvent.implEvent = implEvent;
    }
  }


  public showList() {


  }


  clickNewEvent() {

    const message = {
      kind: 'new-event'
    };
    this.broadcaster.broadcast('activity', message);


    // this.onNewEvent.emit();
  }

  clickNewAfterAnimationEvent() {

    const message = {
      kind: 'new-after-animation'
    };
    this.broadcaster.broadcast('activity', message);


    // this.onNewEvent.emit('afterAnimation');
  }

  clickDetailEvent(event) {
    console.log("clickDetailEvent = " + JSON.stringify(event));
    // this.onClickDetailEvent.emit(event);
    const message = {
      kind: 'detail-event',
      event: event
    };
    this.broadcaster.broadcast('activity', message);
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
