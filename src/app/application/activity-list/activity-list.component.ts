import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { BroadcastService } from '../../service/broadcast.service';

import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  @Input() prefix: any;
  @Input() viewMode: any;
  @Input() currentActivityId: any;

  @Input() applicationData: any;
  @Input() applicationFolderPath: string;


  constructor(private broadcaster: BroadcastService) {

  }

  ngOnInit() {

  }

  getPreviewPath(origin) {
    return origin + '?' + new Date().getTime();
  }



  onChangeActivityListData(): void {
    // this.onChangeActivityData.emit();
    this.sendMessage('on-change-data', '');
  }

  clickActivity(activityId: string): void {
    // this.onClickActivity.emit(activityId);
    this.sendMessage('go-detail-activity', activityId);

  }

  clickDeleteActivity(activityId: string): void {
    this.sendMessage('delete-activity', activityId);
  }

  clickDuplicateActivity(activityId: string): void {
    // this.onClickDuplicatewActivity.emit(activityId);
    this.sendMessage('duplicate-activity', activityId);
  }

  clickNewActivity(): void {
    // this.onClickNewActivity.emit();
    this.sendMessage('new-activity', '');
  }

  clickLauncherActivity(activityId): void {
    // this.onClickLauncherActivity.emit(activityId);
    this.sendMessage('set-launcher-activity', activityId);
  }

  sendMessage(kind, activityId) {
    const message = {
      kind: kind,
      activityId: activityId
    };

    this.broadcaster.broadcast(this.viewMode, message);
  }






}
