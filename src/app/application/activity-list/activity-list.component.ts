import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  prefix = environment.imgPrefix;

  @Input() applicationData: any;
  @Input() applicationFolderPath: string;


  @Output() onChangeActivityData = new EventEmitter<string>();
  @Output() onClickActivity = new EventEmitter<string>();
  @Output() onClickNewActivity = new EventEmitter<string>();
  @Output() onClickDeleteActivity = new EventEmitter<string>();
  @Output() onClickDuplicatewActivity = new EventEmitter<string>();
  @Output() onClickLauncherActivity = new EventEmitter<string>();

  constructor() {

  }

  ngOnInit() {

  }



  onChangeActivityListData(): void {
    this.onChangeActivityData.emit();
  }

  clickActivity(activityId: string): void {
    this.onClickActivity.emit(activityId);
  }

  clickDeleteActivity(activityId: string): void {
    this.onClickDeleteActivity.emit(activityId);
  }

  clickDuplicateActivity(activityId: string): void {
    this.onClickDuplicatewActivity.emit(activityId);
  }

  clickNewActivity(): void {
    this.onClickNewActivity.emit();
  }

 clickLauncherActivity(activityId): void {
    this.onClickLauncherActivity.emit(activityId);
  }






}
