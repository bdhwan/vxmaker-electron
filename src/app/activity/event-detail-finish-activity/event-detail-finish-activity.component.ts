import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'
import { BroadcastService } from '../../service/broadcast.service';

@Component({
  selector: 'app-event-detail-finish-activity',
  templateUrl: './event-detail-finish-activity.component.html',
  styleUrls: ['./event-detail-finish-activity.component.css']
})
export class EventDetailFinishActivityComponent implements OnInit {
  @Input() viewMode: string;
  @Input() prefix: string;

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
  getCurrentActivityName() {
    return this.appDataService.getActivityMetaData().activityName;
  }
  getCurrentActivityPreviewImage() {
    return this.getActivityPreviewImage(this.appDataService.getActivityMetaData().activityId);
  }
  getActivityPreviewImage(activityId) {
    return this.prefix + this.appDataService.applicationFolderPath + '/' + this.appDataService.getActivityPreviewImage(activityId) + '?' + this.timestamp;
  }

  getTriggerEventTypeIcon(type) {
    return this.appDataService.getTriggerEventIcon(type);
  }

}
