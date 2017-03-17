import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

import { PreviewSizeComponent } from '../preview-size/preview-size.component'


@Component({
  selector: 'app-object-property',
  templateUrl: './object-property.component.html',
  styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnInit {

  @Output() onSelectImage = new EventEmitter<string>();



  constructor(
    private appDataService: ApplicationDataServiceService
  ) {

  }


  selectedObject;
  selectedState;


  ngOnInit() {

  }

  getAllKeys(target) {
    return Object.keys(target);
  }

  toJson(target) {
    return JSON.stringify(target);
  }



  clickSelectImage(): void {
   
    this.onSelectImage.emit();

  }

  public onChangeData(): void {

    this.selectedObject = this.appDataService.getSelectedObject();
    this.selectedState = this.appDataService.getSelectedState();

  }




}


