import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  visibility = false;
  tab = "image";

  @Input() applicationData: any;

  @Output() onSelectFile = new EventEmitter<string>();



  constructor(private appDataService: ApplicationDataServiceService) {

  }


  ngOnInit() {

  }


  ngAfterViewInit() {
    this.applicationFolderPath = this.appDataService.getApplicationPath();
    this.appDataService.loadImageResourceList().then((result:any) => {
      this.imageList = result.reverse();
      return this.appDataService.loadFileResourceList();
    }).then((result:any) => {
      this.fileList = result.reverse();
    });
  }



  public showDialog(defaultTarget) {

    console.log("showDialog");

    if (defaultTarget) {
      this.tab = defaultTarget;
    }
    this.visibility = true;
  }

  public hideDialog() {
    this.visibility = false;
  }


  clickTab(event, target) {

    this.tab = target;
  }


  clickFile(target) {

    this.onSelectFile.emit(target);
    this.hideDialog();
    
  }
  nothing(event) {
    console.log("nothing");
        event.stopPropagation();
  }

  clickNewFile(event, target) {
    console.log("target = " + target);


    if (target == 'image') {
      var newImagePath = this.appDataService.selectImageFile();
      if (newImagePath) {

        var fileName = this.appDataService.getUniqueImageName(newImagePath);
        var targetPath = this.applicationFolderPath + "/" + target + "/" + fileName;
        var result = this.appDataService.copyFile(newImagePath, targetPath);
        if (result) {
          this.refreshImageList();
        }
      }
    } else {
      var newFilePath = this.appDataService.selectFile();
      if (newFilePath) {

        var fileName = this.appDataService.getUniqueFileName(newFilePath);
        var targetPath = this.applicationFolderPath + "/" + target + "/" + fileName;
        var result = this.appDataService.copyFile(newFilePath, targetPath);
        if (result) {
          this.refreshFileList();
        }
      }
    }
  }



  refreshImageList() {
    this.appDataService.loadImageResourceList().then((result) => {
      this.imageList = this.appDataService.getImageResourceList().reverse();
    });
  }

  refreshFileList() {
    this.appDataService.loadFileResourceList().then((result) => {
      this.fileList = this.appDataService.getFileResourceList().reverse();
    });
  }







}
