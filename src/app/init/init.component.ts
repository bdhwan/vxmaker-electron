import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ApplicationDataServiceService } from '../service/application-data-service.service';
import { BroadcastService } from '../service/broadcast.service';
import { MessageEventService } from '../service/message-event.service';
import { environment } from '../../environments/environment';




@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css'],
  providers: [BroadcastService, MessageEventService]
})
export class InitComponent implements OnInit {
  imgPrefix = environment.imgPrefix;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appDataService: ApplicationDataServiceService,
    private broadcaster: BroadcastService,
    private messageEvent: MessageEventService
  ) { }

  ngOnInit() {
    // this.appDataService.changeWindowSize(800, 502, true);
    this.registerStringBroadcast();
  }

  registerStringBroadcast() {
    this.broadcaster.on<any>('init')
      .subscribe(message => {
        const kind = message.kind;
        console.log("message received!! = " + kind);
        // if (kind === 'go-application') {
        //     const path = '/application/' + encodeURIComponent(message.folderPath);
        //     this.appDataService.openMainWindowUrl(path);
        // }


      });
  }



  clickDownloadApp(url) {
    this.appDataService.openUrl(url);
  }

}
