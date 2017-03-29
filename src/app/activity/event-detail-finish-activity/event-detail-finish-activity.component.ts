import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

@Component({
  selector: 'app-event-detail-finish-activity',
  templateUrl: './event-detail-finish-activity.component.html',
  styleUrls: ['./event-detail-finish-activity.component.css']
})
export class EventDetailFinishActivityComponent implements OnInit {

  constructor(private appDataService: ApplicationDataServiceService) { }


  selectedTriggerEvent;
  selectedImplementEvent;


  ngOnInit() {
  }


  public onChangeData() {
    this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
    this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();
  }


}
