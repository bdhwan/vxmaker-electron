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



  isMouseDown = false;
  isResizeDown = false;
  resizeIndex;

  startX;
  startY;
  beforeX;
  beforeY;



  zoom;

  mouseDown(event: MouseEvent) {
    console.log("down");




    this.startX = event.clientX;
    this.startY = event.clientY;
    this.beforeX = event.clientX;
    this.beforeY = event.clientY;



    if (this.selectedObject.id != 'root') {
      this.isMouseDown = true;
    }


  }


  mouseOver(event: MouseEvent) {

    var currentX = event.clientX;
    var currentY = event.clientY;

    var differX = (this.beforeX - currentX) / this.zoom;
    var differY = (this.beforeY - currentY) / this.zoom;

    var fixDiffer = differX;
    if (Math.abs(differX) < Math.abs(differY)) {
      fixDiffer = differY;
    }


    if (this.isResizeDown) {

      console.log("isResizeDownMove");
      if (this.resizeIndex == 0) {
        this.appDataService.getSelectedState().marginTop -= differY;
        this.appDataService.getSelectedState().marginLeft -= differX;
        this.appDataService.getSelectedState().width += differX;
        this.appDataService.getSelectedState().height += differY;

      }
      else if (this.resizeIndex == 1) {

        // this.appDataService.getSelectedState().marginLeft -= differX;
        this.appDataService.getSelectedState().marginTop -= differY;

        this.appDataService.getSelectedState().width -= differX;
        this.appDataService.getSelectedState().height += differY;

      }
      else if (this.resizeIndex == 2) {

        this.appDataService.getSelectedState().marginLeft -= differX;
        this.appDataService.getSelectedState().width += differX;
        this.appDataService.getSelectedState().height -= differY;

      }
      else if (this.resizeIndex == 3) {
        this.appDataService.getSelectedState().width -= differX;
        this.appDataService.getSelectedState().height -= differY;
      }

    }
    else if (this.isMouseDown) {

      this.appDataService.getSelectedState().marginLeft -= differX;
      this.appDataService.getSelectedState().marginTop -= differY;

    }

    this.beforeX = currentX;
    this.beforeY = currentY;

  }


  mouseUp(event: MouseEvent) {
    console.log("up");
    this.isMouseDown = false;
    this.isResizeDown = false;

  }




  resizeDown(event: MouseEvent, index) {
    console.log("resizeDown =" + index);
    this.isResizeDown = true;
    this.resizeIndex = index;
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
      'cursor': 'move',
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
