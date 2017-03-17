import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

declare var rasterizeHTML: any;




@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  // @ViewChild('mainScreen') elementView: ElementRef;
  @ViewChild('previewScreen') elementView: ElementRef;


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



  private isMouseDown = false;
  startX;
  startY;
  beforeX;
  beforeY;



  zoom;

  mouseDown(event: MouseEvent) {
    console.log("down");




    if (this.selectedObject.id != 'root') {
      this.isMouseDown = true;
    }

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.beforeX = event.clientX;
    this.beforeY = event.clientY;

  }


  mouseOver(event: MouseEvent) {

    if (this.isMouseDown) {

      var currentX = event.clientX;
      var currentY = event.clientY;

      var differX = (this.beforeX - currentX) / this.zoom;
      var differY = (this.beforeY - currentY) / this.zoom;

      this.appDataService.getSelectedState().marginLeft -= differX;
      this.appDataService.getSelectedState().marginTop -= differY;

      this.beforeX = currentX;
      this.beforeY = currentY;

    }

  }


  mouseUp(event: MouseEvent) {
    console.log("up");
    this.isMouseDown = false;
  }





  onResize(event) {
    this.invalidatePreviewSize();
  }

  invalidatePreviewSize(): void {
    this.previewWidth = window.innerWidth - (this.leftMargin + this.rightMargin);
    this.previewHeight = window.innerHeight - this.topMargin;
  }

  public onChangeData(): void {
    this.activityData = this.appDataService.getActivityData();
    this.selectedStage = this.appDataService.getSelectedStage();
    this.selectedObject = this.appDataService.getSelectedObject();
    this.selectedState = this.appDataService.getSelectedState();

    this.zoom = this.appDataService.getZoom();

  }

  getCenterStyle() {
    var rootState = this.appDataService.findStateByObjectId('root');
    var zoom = this.appDataService.getZoom();
    var marginLeft = (this.previewWidth - rootState.width * zoom) / 2;
    var marginTop = (this.previewHeight - rootState.height * zoom) / 2;
    return {
      "margin-left": marginLeft + "px",
      "margin-top": marginTop + "px",
      "position": "relative",
    };
  }

  public getSelectedObjectStyle() {
    return this.appDataService.getSelectedObjectStyle(this.appDataService.getSelectedState());
  }






  getRootWidth() {
    var zoom = this.appDataService.getZoom();
    var rootState = this.appDataService.findStateByObjectId('root');
    return rootState.width * zoom;
  }


  getRootHeight() {
    var zoom = this.appDataService.getZoom();
    var rootState = this.appDataService.findStateByObjectId('root');
    return rootState.height * zoom;
  }




  public captureScreen() {

    return new Promise((resolve, reject) => {
      var node = this.elementView.nativeElement.innerHTML;
      var canvas = document.createElement("canvas");
      canvas.width = this.getRootWidth();
      canvas.height = this.getRootHeight();
      rasterizeHTML.drawHTML(node, canvas)
        .then(function (renderResult) {
          if (navigator.msSaveBlob) {
            window.navigator.msSaveBlob(canvas.msToBlob(), name);
          } else {
            var data = canvas.toDataURL();

            resolve(data);
          }
        });
    });



  }




}
