import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'
import { BroadcastService } from '../../service/broadcast.service';


declare var rasterizeHTML: any;




@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {


  @Input() prefix: string;
  @Input() viewMode: string;
  @Output() onSelectNodeFromOther = new EventEmitter<string>();

  @ViewChild('previewScreen') elementView: ElementRef;
  @ViewChild('myPreview') myPreview: ElementRef;



  previewWidth = 0;
  previewHeight = 0;
  topMargin = 80;
  leftMargin = 288;
  rightMargin = 320;


  selectedObject;
  selectedStage;
  selectedState;
  selectedOverState;
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
  isKeyALT = false;
  isShift = false;

  constructor(private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) {

  }

  ngOnInit() {

    this.invalidatePreviewSize();
  }



  keyDown($event) {
    console.log("keyDown-" + $event.keyCode);
    if ($event.keyCode === 17 || $event.keyCode === 91) {
      this.isKeyCTRL = true;
    }
    if ($event.keyCode === 16) {
      this.isShift = true;
    }
    if ($event.keyCode === 18) {
      this.isKeyALT = true;
    }

    // if ($event.keyCode === 90) {
    //   if (this.isKeyCTRL) {

    //     if (this.isShift) {
    //       const message = {
    //         kind: 'redo',
    //       };
    //       this.broadcaster.broadcast('activity', message);
    //     } else {
    //       const message = {
    //         kind: 'undo',
    //       };
    //       this.broadcaster.broadcast('activity', message);
    //     }
    //   }
    // }
  }

  keyUp($event) {
    console.log("keyUp-" + $event.keyCode);
    if ($event.keyCode === 17 || $event.keyCode === 91) {
      this.isKeyCTRL = false;
    }
    if ($event.keyCode === 16) {
      this.isShift = false;
    }
    if ($event.keyCode === 18) {
      this.isKeyALT = false;
    }

    // else if ($event.keyCode === 46 || ($event.keyCode === 8 && this.isKeyALT)) {
    //   const message = {
    //     kind: 'delete-current-object-by-key',
    //   };
    //   this.broadcaster.broadcast('activity', message);
    // }

  }


  mouseDown(event: MouseEvent) {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.beforeX = event.clientX;
    this.beforeY = event.clientY;
    if ('guide' === this.viewMode) {
      this.isKeyCTRL = true;
    }
    if (this.isKeyCTRL) {
      const x = (event.clientX - this.elementView.nativeElement.offsetLeft) / this.zoom;
      const y = (event.clientY - this.elementView.nativeElement.offsetTop) / this.zoom;
      this.checkSelectedObject(x, y, true);
    }
    if (this.selectedObject.id !== 'root') {
      this.isMouseDown = true;
    }
  }

  mouseLeave(event: MouseEvent) {
    this.selectedOverState = null;
    this.mouseUp(null);
  }

  mouseUp(event: MouseEvent) {
    console.log('up');
    if (this.isMouseDown || this.isResizeDown) {

      const message = {
        kind: 'add-stack'
      };
      this.broadcaster.broadcast(this.viewMode, message);

    }


    this.isMouseDown = false;
    this.isResizeDown = false;

  }



  checkSelectedObject(x, y, needSelectObject) {


    const targetList = this.appDataService.getAllSelectedState();
    for (let i = targetList.length - 1; i >= 0; i--) {
      const state = targetList[i];
      const left = state.translationX + state.marginLeft;
      const top = state.translationY + state.marginTop;
      const right = left + state.width;
      const bottom = top + state.height;
      if (x > left && x < right && y > top && y < bottom) {
        this.selectedOverState = state;


        if (needSelectObject) {
          const message = {
            kind: 'select-object',
            objectId: state.objectId
          };
          this.broadcaster.broadcast(this.viewMode, message);
        }
        break;
      }
    }

  }









  mouseOver(event: MouseEvent) {

    const currentX = event.clientX;
    const currentY = event.clientY;

    const differX = (this.beforeX - currentX) / this.zoom;
    const differY = (this.beforeY - currentY) / this.zoom;

    const x = (event.clientX - this.elementView.nativeElement.offsetLeft) / this.zoom;
    const y = (event.clientY - this.elementView.nativeElement.offsetTop) / this.zoom;
    this.checkSelectedObject(x, y, false);

    let fixDiffer = differX;
    if (Math.abs(differX) < Math.abs(differY)) {
      fixDiffer = differY;
    }
    if ('guide' === this.viewMode) {
      return;
    }
    this.moveObject(differX, differY);
    this.beforeX = currentX;
    this.beforeY = currentY;
  }


  moveObject(differX, differY) {


    if (this.appDataService.getSelectedStage().id === 'rootStage') {
      if (this.isResizeDown) {
        if (this.resizeIndex === 0) {
          this.appDataService.getSelectedState().marginTop -= differY;
          this.appDataService.getSelectedState().marginLeft -= differX;
          this.appDataService.getSelectedState().width += differX;
          this.appDataService.getSelectedState().height += differY;
        } else if (this.resizeIndex === 1) {
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
        } else if (this.resizeIndex === 4) {
          this.appDataService.getSelectedState().marginTop -= differY;
          this.appDataService.getSelectedState().height += differY;
        } else if (this.resizeIndex === 5) {
          this.appDataService.getSelectedState().width -= differX;
        } else if (this.resizeIndex === 6) {
          this.appDataService.getSelectedState().height -= differY;
        } else if (this.resizeIndex === 7) {
          this.appDataService.getSelectedState().width += differX;
          this.appDataService.getSelectedState().marginLeft -= differX;
        }

      } else if (this.isMouseDown) {
        this.appDataService.getSelectedState().marginLeft -= differX;
        this.appDataService.getSelectedState().marginTop -= differY;
      }
    } else {
      if (this.isResizeDown) {
        if (this.resizeIndex === 0) {
          this.appDataService.getSelectedState().translationY -= differY;
          this.appDataService.getSelectedState().translationX -= differX;
          this.appDataService.getSelectedState().width += differX;
          this.appDataService.getSelectedState().height += differY;
        } else if (this.resizeIndex === 1) {

          this.appDataService.getSelectedState().translationY -= differY;
          this.appDataService.getSelectedState().width -= differX;
          this.appDataService.getSelectedState().height += differY;

        } else if (this.resizeIndex === 2) {
          this.appDataService.getSelectedState().translationX -= differX;
          this.appDataService.getSelectedState().width += differX;
          this.appDataService.getSelectedState().height -= differY;

        } else if (this.resizeIndex === 3) {
          this.appDataService.getSelectedState().width -= differX;
          this.appDataService.getSelectedState().height -= differY;

        } else if (this.resizeIndex === 4) {
          this.appDataService.getSelectedState().translationY -= differY;
          this.appDataService.getSelectedState().height += differY;
        } else if (this.resizeIndex === 5) {

          this.appDataService.getSelectedState().width -= differX;

        } else if (this.resizeIndex === 6) {
          this.appDataService.getSelectedState().height -= differY;

        } else if (this.resizeIndex === 7) {
          this.appDataService.getSelectedState().width += differX;
          this.appDataService.getSelectedState().translationX -= differX;
        }

      } else if (this.isMouseDown) {
        this.appDataService.getSelectedState().translationX -= differX;
        this.appDataService.getSelectedState().translationY -= differY;
      }
    }

    this.appDataService.getSelectedState().width = Math.round(this.appDataService.getSelectedState().width);
    this.appDataService.getSelectedState().height = Math.round(this.appDataService.getSelectedState().height);
    this.appDataService.getSelectedState().translationX = Math.round(this.appDataService.getSelectedState().translationX);
    this.appDataService.getSelectedState().translationY = Math.round(this.appDataService.getSelectedState().translationY);
    this.appDataService.getSelectedState().marginLeft = Math.round(this.appDataService.getSelectedState().marginLeft);
    this.appDataService.getSelectedState().marginTop = Math.round(this.appDataService.getSelectedState().marginTop);


  }



  isRoot() {
    return this.appDataService.getSelectedState().objectId === 'root'
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
    if ('guide' === this.viewMode) {
      this.previewWidth = window.innerWidth * 0.3;
    }
  }

  public getPreviewPosition() {
    // return 
  }

  public onChangeData(): void {
    this.activityData = this.appDataService.getActivityData();
    this.selectedStage = this.appDataService.getSelectedStage();
    this.selectedObject = this.appDataService.getSelectedObject();
    this.selectedState = this.appDataService.getSelectedState();
    this.zoom = this.appDataService.getZoom();
  }


  public recreateObjectList() {

    this.activityData = null;
    const self = this;
    setTimeout(function () {
      self.activityData = self.appDataService.getActivityData();
    }, 100);
  }

  public emptyObject() {

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
      'margin-left': marginLeft.toFixed(0) + 'px',
      'margin-top': marginTop.toFixed(0) + 'px',
      'position': 'relative',
      'cursor': cursor
    };
  }

  public getSelectedObjectStyle() {
    return this.appDataService.getSelectedObjectStyle(this.appDataService.getSelectedState());
  }

  public getSelectedOverObjectStyle() {
    return this.appDataService.getSelectedObjectStyle(this.selectedOverState);
  }

  public getSelectedSnapStyle() {


  }


  getCenterPoint(target) {

    const center = this.appDataService.getCenterPoint(this.appDataService.getSelectedState());

    if (target === 4) {
      // console.log('will return ' + center.cx + 'px');
      return center.cx - 3 + 'px';
    } else if (target === 5) {
      // console.log('will return ' + center.cx + 'px');
      return center.cy - 3 + 'px';
    } else if (target === 6) {
      // console.log('will return ' + center.cx + 'px');
      return center.cx - 3 + 'px';
    } else if (target === 7) {
      // console.log('will return ' + center.cx + 'px');
      return center.cy - 3 + 'px';
    };
  }



  getRootWidth() {
    const zoom = this.appDataService.getZoom();
    const rootState = this.appDataService.findStateByObjectId('root');
    return rootState.width * zoom;
  }


  getRootHeight() {
    const zoom = this.appDataService.getZoom();
    const rootState = this.appDataService.findStateByObjectId('root');
    return rootState.height * zoom;
  }


  onSelectNodeFromPreview(objectId) {

    this.onSelectNodeFromOther.emit(objectId);
  }


  public captureScreen() {

    return new Promise((resolve, reject) => {
      const node = this.elementView.nativeElement.innerHTML;
      const canvas = document.createElement('canvas');
      canvas.width = this.getRootWidth();
      canvas.height = this.getRootHeight();
      rasterizeHTML.drawHTML(node, canvas)
        .then(function (renderResult) {
          if (navigator.msSaveBlob) {
            window.navigator.msSaveBlob(canvas.msToBlob(), name);
          } else {
            const data = canvas.toDataURL();
            resolve(data);
          }
        });
    });


  }


}
