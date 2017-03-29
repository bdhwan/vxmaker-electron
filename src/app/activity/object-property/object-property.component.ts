import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

import { PreviewSizeComponent } from '../preview-size/preview-size.component'



@Component({
  selector: 'app-object-property',
  templateUrl: './object-property.component.html',
  styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnInit {


  @Output() onShowResourceDialog = new EventEmitter<string>();



  constructor(
    private appDataService: ApplicationDataServiceService
  ) {

  }
  selectedTriggerEvent;
  selectedObject;
  selectedState;


  ngOnInit() {


  }

  ngAfterViewInit() {


    // this.imageComponent.setFileResourceVisible(false);
    // this.fileComponent.setImageResourceVisible(false);
  }
  getAllKeys(target) {
    return Object.keys(target);
  }

  toJson(target) {
    return JSON.stringify(target);
  }



  clickSelectImage(): void {
    this.clickNewFile("image");
  }

  clickSelectFile(): void {
    this.clickNewFile("file");
  }


  clickNewFile(target) {
    console.log("target=" + target);
    this.onShowResourceDialog.emit(target);
  }




  public onChangeData(): void {

    this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
    this.selectedObject = this.appDataService.getSelectedObject();
    this.selectedState = this.appDataService.getSelectedState();

  }




}


