import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';
import { BroadcastService } from '../../service/broadcast.service';


@Component({
  selector: 'app-event-detail-start-lottie',
  templateUrl: './event-detail-start-lottie.component.html',
  styleUrls: ['./event-detail-start-lottie.component.css']
})
export class EventDetailStartLottieComponent implements OnInit {
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

}
