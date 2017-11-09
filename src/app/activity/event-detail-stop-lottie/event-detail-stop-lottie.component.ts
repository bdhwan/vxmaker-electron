import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';
import { BroadcastService } from '../../service/broadcast.service';


@Component({
  selector: 'app-event-detail-stop-lottie',
  templateUrl: './event-detail-stop-lottie.component.html',
  styleUrls: ['./event-detail-stop-lottie.component.css']
})
export class EventDetailStopLottieComponent implements OnInit {
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
