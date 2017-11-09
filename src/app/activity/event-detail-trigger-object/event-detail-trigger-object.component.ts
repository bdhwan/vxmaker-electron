import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';
import { BroadcastService } from '../../service/broadcast.service';




@Component({
  selector: 'app-event-detail-trigger-object',
  templateUrl: './event-detail-trigger-object.component.html',
  styleUrls: ['./event-detail-trigger-object.component.css']
})


export class EventDetailTriggerObjectComponent implements OnInit {
  @Input() prefix: string;
  @Input() viewMode: string;
  @Input() selectedTriggerEvent: any;


  constructor(private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }

  ngOnInit() {
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
}
