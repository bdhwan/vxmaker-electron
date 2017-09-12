import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'
import { BroadcastService } from '../../service/broadcast.service';

@Component({
  selector: 'app-event-detail-start-activity',
  templateUrl: './event-detail-start-activity.component.html',
  styleUrls: ['./event-detail-start-activity.component.css']
})
export class EventDetailStartActivityComponent implements OnInit {

  constructor(private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }


  selectedTriggerEvent;
  selectedImplementEvent;


  ngOnInit() {
  }


  public onChangeData() {
    this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
    this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();
  }


  clickCancel() {
    const message = {
      kind: 'complete-event'
    };
    this.broadcaster.broadcast('activity', message);

  }

}
