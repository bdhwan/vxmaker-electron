import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as glob from "../globals";

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {

  prefix = glob.imgPrefix;

  @Input() applicationData: any;
  @Output() onChangeActivityData = new EventEmitter<string>();
  @Output() onClickActivity = new EventEmitter<string>();
  @Output() onClickNewActivity = new EventEmitter<string>();

  constructor() {
    
  }

  ngOnInit() {

  }



  onChangeActivityListData(): void {
    this.onChangeActivityData.emit();
  }

  clickDeleteActivity(activityId: string): void {
    this.onChangeActivityData.emit();
  }

  clickActivity(activityId: string): void {
    this.onClickActivity.emit(activityId);
  }

  clickNewActivity(): void {
    this.onClickNewActivity.emit();
  }


}
