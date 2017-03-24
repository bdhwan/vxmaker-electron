import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

import { PreviewSizeComponent } from '../preview-size/preview-size.component'
import { ResourceComponent } from '../../activity/resource/resource.component'



@Component({
  selector: 'app-object-property',
  templateUrl: './object-property.component.html',
  styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnInit {

  @Output() onSelectImage = new EventEmitter<string>();
  @Output() onClickNewFile = new EventEmitter<string>();


  @ViewChild('imageResource')
  private imageComponent: ResourceComponent;


  @ViewChild('fileResource')
  private fileComponent: ResourceComponent;


  constructor(
    private appDataService: ApplicationDataServiceService
  ) {

  }

  showSelectImage = false;
  showSelectFile = false;

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
    this.showSelectImage = !this.showSelectImage;
  }

  clickSelectFile(): void {
    this.showSelectFile = !this.showSelectFile;
  }


  clickNewFile(target) {
    console.log("target=" + target);
    this.onClickNewFile.emit(target);


  }


  public onChangeData(): void {

    this.selectedObject = this.appDataService.getSelectedObject();
    this.selectedState = this.appDataService.getSelectedState();

  }




}


