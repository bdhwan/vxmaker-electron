import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

@Component({
  selector: 'app-event-detail-start-activity',
  templateUrl: './event-detail-start-activity.component.html',
  styleUrls: ['./event-detail-start-activity.component.css']
})
export class EventDetailStartActivityComponent implements OnInit {

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
