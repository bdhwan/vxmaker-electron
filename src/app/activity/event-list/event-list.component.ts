import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';
import { BroadcastService } from '../../service/broadcast.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {


  @Input() viewMode: string;

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
      if (implEvent) {
        if (implEvent.type === 'stageChange') {
          implEvent.fromStageName = this.appDataService.findStageByStageId(implEvent.fromStageId).name;
          implEvent.toStageName = this.appDataService.findStageByStageId(implEvent.toStageId).name;
        } else if (implEvent.type === 'startActivity') {
          implEvent.toActivityName = this.appDataService.getActivityName(implEvent.toActivityId);
        }
        aEvent.implEvent = implEvent;
      }
    }

  }


  public showList() {


  }


  clickNewEvent() {
    const message = {
      kind: 'new-event'
    };
    this.broadcaster.broadcast(this.viewMode, message);
  }

  clickDetailEvent(triggerEvent) {
    console.log("clickDetailEvent = " + triggerEvent);
    const temp = JSON.parse(triggerEvent);
    const message = {
      kind: 'detail-event',
      event: temp
    };
    this.broadcaster.broadcast(this.viewMode, message);
  }

  clickDeleteEvent(triggerEvent) {
    console.log("clickDeleteEvent =" + triggerEvent);
    const temp = JSON.parse(triggerEvent);
    const result = confirm('Do you really want to remove this event triggered by ' + temp.name + '?');
    if (result) {
      const message = {
        kind: 'delete-event',
        triggerEventId: temp.id
      };
      this.broadcaster.broadcast(this.viewMode, message);
    }
  }



  getIcon(type) {
    return this.appDataService.getIconSmall(type);
  }

  getObjectData(objectId) {
    return this.appDataService.findObjectById(objectId);
  }








}
