import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';
import { BroadcastService } from '../../service/broadcast.service';


@Component({
  selector: 'app-event-detail-start-video',
  templateUrl: './event-detail-start-video.component.html',
  styleUrls: ['./event-detail-start-video.component.css']
})
export class EventDetailStartVideoComponent implements OnInit {
  @Input() prefix: string;
  @Input() viewMode: string;

  selectedTriggerEvent;
  selectedImplementEvent;
  timestamp;
  constructor(private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }

  ngOnInit() {

    this.timestamp = new Date().getTime();
  }


  public onChangeData() {
    this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
    this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();
  }



  clickCancel() {
    const message = {
      kind: 'close-event'
    };
    this.broadcaster.broadcast(this.viewMode, message);
  }


  getObjectData(objectId) {
    return this.appDataService.findObjectById(objectId);
  }
  getIcon(type) {
    return this.appDataService.getIconSmall(type);
  }
  getTriggerEventTypeIcon(type) {
    return this.appDataService.getTriggerEventIcon(type);
  }
}
