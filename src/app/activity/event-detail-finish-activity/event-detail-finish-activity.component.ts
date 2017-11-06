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
  selectedTriggerEvent;
  selectedImplementEvent;



  constructor(private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }





  ngOnInit() {
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



}
