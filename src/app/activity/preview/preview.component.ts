import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
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
  @Output() onSelectNodeFromOther = new EventEmitter<string>();
  @ViewChild('myPreview') myPreview: ElementRef;



  previewWidth = 0;
  previewHeight = 0;
  topMargin = 80;
  leftMargin = 288;
  rightMargin = 320;


  selectedObject;
  selectedStage;
  selectedState;
  activityData;

  isMouseDown = false;
  isResizeDown = false;
  resizeIndex;

  startX;
  startY;
  beforeX;
  beforeY;
  zoom;


  isKeyCTRL = false;


  constructor(private appDataService: ApplicationDataServiceService) {

  }

  ngOnInit() {
    // console.log(' this.viewHeight = ' + this.elementView.nativeElement.offsetHeight);
    this.invalidatePreviewSize();
  }



  keyDown($event) {
    console.log("keyDown-" + $event.keyCode);
    if ($event.keyCode === 17) {
      this.isKeyCTRL = true;
    }
  }

  keyUp($event) {
    console.log("keyUp-" + $event.keyCode);
    if ($event.keyCode === 17) {
      this.isKeyCTRL = false;
    }
  }


  mouseDown(event: MouseEvent) {

    this.startX = event.clientX;
    this.startY = event.clientY;
    this.beforeX = event.clientX;
    this.beforeY = event.clientY;


    if (this.isKeyCTRL) {


      const x = (event.clientX - this.elementView.nativeElement.offsetLeft) / this.zoom;
      const y = (event.clientY - this.elementView.nativeElement.offsetTop) / this.zoom;
      const targetList = this.appDataService.getAllSelectedState();
      for (let i = targetList.length - 1; i >= 0; i--) {
        const state = targetList[i];
        const left = state.translationX + state.marginLeft;
        const top = state.translationY + state.marginTop;
        const right = left + state.width;
        const bottom = top + state.height;
        if (x > left && x < right && y > top && y < bottom) {
          this.onSelectNodeFromOther.emit(state.objectId);
          break;
        }
      }
    }



    if (this.selectedObject.id !== 'root') {
      this.isMouseDown = true;
    }

  }


  mouseOver(event: MouseEvent) {

    let currentX = event.clientX;
    let currentY = event.clientY;

    let differX = (this.beforeX - currentX) / this.zoom;
    let differY = (this.beforeY - currentY) / this.zoom;

    let fixDiffer = differX;
    if (Math.abs(differX) < Math.abs(differY)) {
      fixDiffer = differY;
    }


    if (this.isResizeDown) {

      if (this.resizeIndex === 0) {
        this.appDataService.getSelectedState().marginTop -= differY;
        this.appDataService.getSelectedState().marginLeft -= differX;
        this.appDataService.getSelectedState().width += differX;
        this.appDataService.getSelectedState().height += differY;

      } else if (this.resizeIndex === 1) {

        // this.appDataService.getSelectedState().marginLeft -= differX;
        this.appDataService.getSelectedState().marginTop -= differY;

        this.appDataService.getSelectedState().width -= differX;
        this.appDataService.getSelectedState().height += differY;

      } else if (this.resizeIndex === 2) {

        this.appDataService.getSelectedState().marginLeft -= differX;
        this.appDataService.getSelectedState().width += differX;
        this.appDataService.getSelectedState().height -= differY;

      } else if (this.resizeIndex === 3) {
        this.appDataService.getSelectedState().width -= differX;
        this.appDataService.getSelectedState().height -= differY;
      }
    } else if (this.isMouseDown) {

      this.appDataService.getSelectedState().marginLeft -= differX;
      this.appDataService.getSelectedState().marginTop -= differY;

    }

    this.beforeX = currentX;
    this.beforeY = currentY;

  }


  isRoot() {
    return this.appDataService.getSelectedState().objectId === 'root';
  }

  mouseUp(event: MouseEvent) {
    console.log('up');
    this.isMouseDown = false;
    this.isResizeDown = false;

  }




  resizeDown(event: MouseEvent, index) {
    console.log('resizeDown =' + index);
    if (this.selectedObject.id !== 'root') {
      this.isResizeDown = true;
      this.resizeIndex = index;
    }

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


  public emptyObject(){
    this.activityData = null;
  }


  getCenterStyle() {
    const rootState = this.appDataService.findStateByObjectId('root');
    const zoom = this.appDataService.getZoom();
    const marginLeft = (this.previewWidth - rootState.width * zoom) / 2;
    const marginTop = (this.previewHeight - rootState.height * zoom) / 2;

    let cursor = 'move';
    if (this.isKeyCTRL) {
      cursor = 'context-menu';
    }


    return {
      'margin-left': marginLeft + 'px',
      'margin-top': marginTop + 'px',
      'position': 'relative',
      'cursor': cursor
    };
  }

  public getSelectedObjectStyle() {

    return this.appDataService.getSelectedObjectStyle(this.appDataService.getSelectedState());
  }






  getRootWidth() {
    let zoom = this.appDataService.getZoom();
    let rootState = this.appDataService.findStateByObjectId('root');
    return rootState.width * zoom;
  }


  getRootHeight() {
    let zoom = this.appDataService.getZoom();
    let rootState = this.appDataService.findStateByObjectId('root');
    return rootState.height * zoom;
  }


  onSelectNodeFromPreview(objectId) {
    console.log("onSelectNodeFromPreview event-" + objectId);
    this.onSelectNodeFromOther.emit(objectId);
  }


  public captureScreen() {

    return new Promise((resolve, reject) => {
      let node = this.elementView.nativeElement.innerHTML;
      let canvas = document.createElement('canvas');
      canvas.width = this.getRootWidth();
      canvas.height = this.getRootHeight();
      rasterizeHTML.drawHTML(node, canvas)
        .then(function (renderResult) {
          if (navigator.msSaveBlob) {
            window.navigator.msSaveBlob(canvas.msToBlob(), name);
          } else {
            let data = canvas.toDataURL();

            resolve(data);
          }
        });
    });



  }




}
