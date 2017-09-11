import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApplicationComponent } from '../../application/application.component'
import { BroadcastService } from '../../service/broadcast.service';


import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.css']
})
export class ApplicationInfoComponent implements OnInit {


  prefix = environment.imgPrefix;


  @Input() viewMode: any;
  @Input() currentActivityId: any;
  @Input() applicationData: any;
  @Input() applicationFolderPath: string;



  // @Output() onChangeData = new EventEmitter<string>();
  // @Output() onClickChangeIcon = new EventEmitter<void>();


  showImageDialog = false;


  constructor(private broadcaster: BroadcastService) {

  }

  ngOnInit() {

  }

  onChange(): void {
    this.sendMessage('on-change-data', '');
    // this.onChangeData.emit();
  }

  clickIcon(): void {
    this.sendMessage('change-icon', '');
    // this.onClickChangeIcon.emit();
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
    // let target = 'activity';
    // if (this.viewMode === 'full') {
    //   target = 'application';
    // } else if (this.viewMode === 'export') {
    //   target = 'export';
    // }
    this.broadcaster.broadcast(this.viewMode, message);
  }


  clickApplicationInfo() {
    this.sendMessage('application', '');

  }

}
