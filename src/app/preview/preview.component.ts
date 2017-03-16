import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { ApplicationDataServiceService } from '../service/application-data-service.service'



@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  // @ViewChild('mainScreen') elementView: ElementRef;

  previewWidth = 0;
  previewHeight = 0;
  topMargin = 80;
  leftMargin = 200;
  rightMargin = 200;


  selectedObject;
  selectedStage;
  selectedState;

  activityData;


  constructor(private appDataService: ApplicationDataServiceService) {

  }

  ngOnInit() {
    // console.log(" this.viewHeight = " + this.elementView.nativeElement.offsetHeight);
    this.invalidatePreviewSize();
  }


  clickTest() {
    console.log("click");
    var result = this.appDataService.getApplicationData();
    console.log("result = " + JSON.stringify(result));
  }

  onResize(event) {
    this.invalidatePreviewSize();
  }

  invalidatePreviewSize(): void {
    this.previewWidth = window.innerWidth - (this.leftMargin + this.rightMargin);
    this.previewHeight = window.innerHeight - this.topMargin;
  }

  public setSelectedObject(object): void {
    this.selectedObject = object;
  }

  public setSelectedStage(stage): void {
    this.selectedStage = stage;
  }

  public setSelectedState(state): void {
    this.selectedState = state;
  }

  public setActivityData(data): void {
    this.activityData = data;
    console.log("activityData = " + JSON.stringify(data));
  }






  findStateByObjectId(objectId: string) {
    if (!this.selectedStage) {
      return null;
    }
    return this.findStateByObjectIdWithStageId(objectId, this.selectedStage.id);
  }

  findStateByObjectIdWithStageId(objectId: string, stageId: string) {

    if (!this.activityData) {
      return null;
    }
    return this.findStateByObjectIdWithList(this.activityData.stateList, objectId, stageId);
  }

  findStateByObjectIdWithList(targetList: any, objectId: string, stageId: string) {
    for (var i = 0; i < targetList.length; i++) {
      var aState = targetList[i];
      if (aState.objectId == objectId && aState.stageId == stageId) {
        return aState;
      }
    }
    return null;
  }




}
