import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ApplicationDataServiceService } from '../service/application-data-service.service';
import { BroadcastService } from '../service/broadcast.service';
import { MessageEventService } from '../service/message-event.service';


@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css'],
  providers: [BroadcastService, MessageEventService]
})
export class InitComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appDataService: ApplicationDataServiceService,
    private broadcaster: BroadcastService,
    private messageEvent: MessageEventService
  ) { }

  ngOnInit() {
    this.appDataService.changeWindowSize(800, 502, true);
    this.registerStringBroadcast();
  }

  registerStringBroadcast() {
    this.broadcaster.on<string>('message')
      .subscribe(message => {
        console.log("1111message received!! = " + message);
      });
  }



  clickDownloadApp(url) {
    this.appDataService.openUrl(url);
  }

}
