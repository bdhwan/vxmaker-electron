import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'
import { BroadcastService } from '../../service/broadcast.service';

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css']
})
export class StageListComponent implements OnInit {

  @Input() viewMode: any;


  stageList;
  currentSelectedStage;



  constructor(private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }

  ngOnInit() {

  }

  public initData() {
    console.log("initData");
  }


  clickNewStage() {
    this.sendMessage('new-stage', null);
  }


  clickSelectStage(event, stage) {
    event.stopPropagation();
    this.sendMessage('select-stage', stage);
  }


  clickDeleteStage(event, stage) {
    event.stopPropagation();
    const result = confirm('Do you really want to delete this stage?\nAll events and properties of the corresponding stage will be deleted.');
    if (result) {
      this.sendMessage('delete-stage', stage);
    }
  }


  public onChangeData() {

    this.stageList = this.appDataService.getActivityData().stageList;
    this.currentSelectedStage = this.appDataService.getSelectedStage();
  }

  sendMessage(kind, stage) {
    const message = {
      kind: kind,
      stage: stage
    };

    this.broadcaster.broadcast(this.viewMode, message);
  }




}
