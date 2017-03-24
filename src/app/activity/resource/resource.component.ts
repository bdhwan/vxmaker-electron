import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

import * as glob from "../../globals";


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  applicationFolderPath;
  imageList;
  fileList;
  prefix = glob.imgPrefix;

  @Output() onClickNewFile = new EventEmitter<string>();


  constructor(private appDataService: ApplicationDataServiceService) {


  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.applicationFolderPath = this.appDataService.getApplicationPath();
    this.appDataService.loadImageResourceList().then((result) => {
      this.imageList = result;
      return this.appDataService.loadFileResourceList();
    }).then((result) => {
      this.fileList = result;
    });
  }


  clickImage(dataUrl) {

    var object = this.appDataService.getSelectedObject();
    var stateList = this.appDataService.findAllStateByObjectId(object.id);
    var size = this.appDataService.getImageSize(this.applicationFolderPath + "/" + dataUrl);
    object.dataUrl = dataUrl;

    for (var i = 0; i < stateList.length; i++) {
      var state = stateList[i];
      state.width = size.width;
      state.height = size.height;
    }

  }


  clickFile(dataUrl) {
    var object = this.appDataService.getSelectedObject();
    var stateList = this.appDataService.findAllStateByObjectId(object.id);
    object.dataUrl = dataUrl;
  }


  showImageList = true;
  showFileList = true;


  public setImageResourceVisible(value) {
    this.showImageList = value;
  }

  public setFileResourceVisible(value) {
    this.showFileList = value;
  }


  clickAddImage() {
    this.onClickNewFile.emit("image");
  }

  clickAddFile() {
    this.onClickNewFile.emit("file");
  }




}
