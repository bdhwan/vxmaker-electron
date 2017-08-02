import { Component, OnInit } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'
import { BroadcastService } from '../../service/broadcast.service';

@Component({
  selector: 'app-preview-size',
  templateUrl: './preview-size.component.html',
  styleUrls: ['./preview-size.component.css']
})
export class PreviewSizeComponent implements OnInit {

  zoom;

  showZoom = false;
  showRootSize = false;

  zoomLevel;

  rootWidth;
  rootHeight;


  constructor(private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }

  ngOnInit() {
    this.zoomLevel = this.appDataService.getZoom() * 100;
  }

  onChangeData() {
    this.zoomLevel = this.appDataService.getZoom() * 100;

    const rootState = this.appDataService.findStateByObjectId('root');
    this.rootWidth = rootState.width;
    this.rootHeight = rootState.height;

  }

  changeZoom(value) {
    this.zoomLevel = value;
    this.appDataService.setZoom(this.zoomLevel / 100);
    this.showZoom = false;
  }

  clickZoomToggle() {
    this.showZoom = !this.showZoom;
    if (this.showRootSize) {
      this.showRootSize = false;
    }
  }

  changeW(event) {
    console.log("changeW = " + this.rootWidth);
    this.changeRootSizeData();
  }

  changeH(event) {
    console.log("changeH = " + this.rootHeight);
    this.changeRootSizeData();
  }

  changeRootSize(width, height) {
    this.rootWidth = width;
    this.rootHeight = height;
    this.showRootSize = false;
    this.changeRootSizeData();
  }

  changeRootSizeData() {

    const rootStateList = this.appDataService.findAllStateByObjectId('root');
    for (let i = 0; i < rootStateList.length; i++) {
      const aState = rootStateList[i];
      aState['width'] = this.rootWidth;
      aState['height'] = this.rootHeight;
    }

    const test = {
      kind: 'save-refresh-activity'
    };
    this.broadcaster.broadcast('activity', test);

  }

  clickRootSizeToggle() {
    this.showRootSize = !this.showRootSize;
    if (this.showZoom) {
      this.showZoom = false;
    }
  }



}
