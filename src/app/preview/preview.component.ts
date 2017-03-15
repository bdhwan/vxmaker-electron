import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';



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


  constructor() {

  }

  ngOnInit() {
    // console.log(" this.viewHeight = " + this.elementView.nativeElement.offsetHeight);
    this.invalidatePreviewSize();
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

}
