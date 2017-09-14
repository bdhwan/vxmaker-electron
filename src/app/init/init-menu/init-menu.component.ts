import { Component, OnInit } from '@angular/core';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';
import { BroadcastService } from '../../service/broadcast.service';
import { MessageEventService } from '../../service/message-event.service';


@Component({
  selector: 'app-init-menu',
  templateUrl: './init-menu.component.html',
  styleUrls: ['./init-menu.component.css'],
  providers: [MessageEventService]
})
export class InitMenuComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService,
    private messageEvent: MessageEventService) {

  }

  ngOnInit() {
    // this.registerStringBroadcast();
  }


  clickNewApplication(): void {
    console.log("clickNewApplication");


    const message = {
      kind: 'new-application',
    };
    this.broadcaster.broadcast('init', message);
  }



  clickOpenApplication(): void {
    console.log("clickOpenApplication");
    const message = {
      kind: 'open-application',
    };
    this.broadcaster.broadcast('init', message);
  }

  clickHelp(): void {
    const message = {
      kind: 'how-to-use',
    };
    this.broadcaster.broadcast('init', message);
  }


  clickSettingApplication(): void {
    console.log("clickSettingApplication");
  }


  clickGuide() {
    this.router.navigate(['/guide/init']);
  }

}
