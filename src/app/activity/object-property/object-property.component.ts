import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';

import { PreviewSizeComponent } from '../preview-size/preview-size.component';



import * as glob from '../../globals';

@Component({
  selector: 'app-object-property',
  templateUrl: './object-property.component.html',
  styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnInit, AfterViewInit {


  @Output() onShowResourceDialog = new EventEmitter<string>();
  prefix = glob.imgPrefix;
  applicationFolderPath;
  selectedTriggerEvent;
  selectedObject;
  selectedState;
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
  needShowState = false;

  constructor(
    private appDataService: ApplicationDataServiceService
  ) {


  }

  ngOnInit() {

    this.applicationFolderPath = this.appDataService.getApplicationPath();

  }

  ngAfterViewInit() {
    // this.imageComponent.setFileResourceVisible(false);
    // this.fileComponent.setImageResourceVisible(false);
  }

  getAllKeys(target) {
    const keys = Object.keys(target);
    return MediaKeyStatusMap;
  }

  toggleDetail() {
    this.needShowState = !this.needShowState;
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
    // console.log("target=" + target);
    this.onShowResourceDialog.emit(target);
  }




  public onChangeData(): void {
    
    this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
    this.selectedObject = this.appDataService.getSelectedObject();
    this.selectedState = this.appDataService.getSelectedState();

  }




}


