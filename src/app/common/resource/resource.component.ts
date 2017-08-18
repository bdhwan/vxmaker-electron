import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'

import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {

  applicationFolderPath;
  imageList;
  fileList;
  prefix = environment.imgPrefix;

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
    this.appDataService.loadImageResourceList().then((result: any) => {
      this.imageList = result.reverse();
      return this.appDataService.loadFileResourceList();
    }).then((result: any) => {
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
    event.stopPropagation();
  }

  clickNewFile(event, target) {
    let files = [];
    if (target === 'image') {
      files = this.appDataService.selectImageFiles();
    } else {
      files = this.appDataService.selectFiles();
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const newImagePath = files[i];
        const fileName = this.appDataService.getUniqueImageName(newImagePath);
        const targetPath = this.applicationFolderPath + '/' + target + '/' + fileName;
        const result = this.appDataService.copyFile(newImagePath, targetPath);
        if (result) {

        }
      }
      this.refreshImageList();
      this.refreshFileList();
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
