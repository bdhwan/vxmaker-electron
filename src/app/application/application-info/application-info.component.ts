import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApplicationComponent } from '../../application/application.component';
import { BroadcastService } from '../../service/broadcast.service';


@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.css']
})
export class ApplicationInfoComponent implements OnInit {


  @Input() prefix: any;
  @Input() viewMode: any;
  @Input() currentActivityId: any;
  @Input() applicationData: any;
  @Input() applicationFolderPath: string;

  showImageDialog = false;

  constructor(private broadcaster: BroadcastService) {

  }

  ngOnInit() {

  }

  onChange(): void {
    this.sendMessage('on-change-data', '');
  }

  clickIcon(): void {
    this.sendMessage('change-icon', '');
  }

  clickToggleDialog() {
    console.log("clickToggleDialog");
    this.showImageDialog = !this.showImageDialog;
  }



  sendMessage(kind, activityId) {
    const message = {
      kind: kind,
      activityId: activityId
    };
    this.broadcaster.broadcast(this.viewMode, message);
  }


  clickApplicationInfo() {
    this.sendMessage('application', '');
  }

}
