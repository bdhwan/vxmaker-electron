import { Component, OnInit, NgZone, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';

import { PreviewSizeComponent } from '../preview-size/preview-size.component';
import { BroadcastService } from '../../service/broadcast.service';


@Component({
  selector: 'app-object-property',

  templateUrl: './object-property.component.html',
  styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnInit, AfterViewInit {


  @Output() onShowResourceDialog = new EventEmitter<string>();
  @Input() viewMode: string;
  @Input() prefix: string;
  @Input() applicationFolderPath: string;

  selectedTriggerEvent;
  selectedObject;
  selectedState;
  objectLayoutData;
  objectBasicData;
  openSource;


  showPropertyKeys = [
    'name',
    'type',
    'backgroundColor'
  ];

  detailKeys = [
    'alpha',
    'width',
    'height',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'rotate',
    'scaleX',
    'scaleY',
    'translationX',
    'translationY'
  ];

  needShowText = false;
  needShowSize = false;
  needShowMargin = false;
  needShowPadding = false;
  needShowTranslation = false;
  needShowCode = false;

  constructor(
    private appDataService: ApplicationDataServiceService,
    public zone: NgZone,
    private broadcaster: BroadcastService
  ) {


  }


  toggleShowText() {
    this.needShowText = !this.needShowText;

  }

  toggleShowSize() {
    this.needShowSize = !this.needShowSize;

  }

  toggleShowMargin() {
    this.needShowMargin = !this.needShowMargin;

  }

  toggleShowPadding() {
    this.needShowPadding = !this.needShowPadding;
  }

  toggleShowTranslation() {
    this.needShowTranslation = !this.needShowTranslation;

  }

  toggleShowCode() {
    this.needShowCode = !this.needShowCode;
  }

  ngOnInit() {

    if (this.viewMode === 'guide') {

      this.needShowText = true;
      this.needShowSize = true;
      this.needShowMargin = true;
      this.needShowPadding = true;
      this.needShowTranslation = true;
      this.needShowCode = true;

    }

  }

  onFocus() {
    console.log("focus");
    const message = {
      kind: 'focus'
    };
    this.broadcaster.broadcast('activity', message);

  }

  onBlur() {
    console.log("blur");
    const message = {
      kind: 'blur'
    };
    this.broadcaster.broadcast('activity', message);
  }



  cancel($event) {
    console.log("cancel");
    $event.stopPropagation();
  }
  ngAfterViewInit() {
    // this.imageComponent.setFileResourceVisible(false);
    // this.fileComponent.setImageResourceVisible(false);
  }

  getAllKeys(target) {
    const keys = Object.keys(target);
    return MediaKeyStatusMap;
  }


  toJson(target) {
    return JSON.stringify(target);
  }

  clickSelectImage(): void {
    this.clickNewFile('image');
  }

  clickSelectFile(): void {
    this.clickNewFile('file');
  }

  clickNewFile(target) {

    const message = {
      kind: 'select-file',
      target: target,
      dataUrl: this.selectedObject.dataUrl
    };
    this.broadcaster.broadcast('activity', message);
    // this.onShowResourceDialog.emit(target);
  }

  clickDownload(url) {
    this.appDataService.openUrl(url);
  }

  public onChangeData(): void {
    this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
    this.selectedObject = this.appDataService.getSelectedObject();
    this.selectedState = this.appDataService.getSelectedState();
    this.objectBasicData = this.appDataService.findObjectBasicDataByType(this.selectedObject.type);
    if (this.objectBasicData) {
      this.openSource = this.objectBasicData.openSource;
    } else {
      this.openSource = null;
    }




    this.objectLayoutData = null;
    const self = this;
    setTimeout(function () {
      self.objectLayoutData = self.appDataService.makeBeautify(self.appDataService.insertChild(self.selectedObject.id));
    }, 10);

  }


  callback($event) {
    console.log("done clip");
  }

  clickLink(targetUrl) {
    const message = {
      kind: 'open-url',
      url: targetUrl
    };
    this.broadcaster.broadcast('activity', message);

  }

}


