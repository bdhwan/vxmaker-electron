import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit {

  @Input() viewMode: any;
  @Output() onNewStage = new EventEmitter<string>();
  @Output() onSelectStage = new EventEmitter<string>();


  stageList;
  currentSelectedStage;



  constructor(private appDataService: ApplicationDataServiceService) { }

  ngOnInit() {

  }

  public initData() {
    console.log("initData");
    this.stageList = this.appDataService.getActivityData().stageList;
    console.log("this.stageList =" + JSON.stringify(this.stageList));
    this.currentSelectedStage = this.appDataService.getSelectedStage();
  }


  clickNewStage() {
    console.log("clickNewStage");
    this.onNewStage.emit();
  }


  clickSelectStage(stage) {
    console.log("clickSelectStage");
    this.onSelectStage.emit(stage);
  }

  public onChangeData() {

    this.currentSelectedStage = this.appDataService.getSelectedStage();

  }

}
