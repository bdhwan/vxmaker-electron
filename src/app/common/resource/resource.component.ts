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
  imageList = [];
  jsonFileList = [];
  videoFileList = [];

  fileConfigList = [];
  prefix = environment.imgPrefix;

  isDeleteMode;

  visibility = false;
  tab = 'image';


  selectedFileUrl;

  @Input() viewMode: any;

  @Input() applicationData: any;

  @Output() onSelectFile = new EventEmitter<string>();



  constructor(private appDataService: ApplicationDataServiceService) {

  }

  ngOnInit() {

  }


  public setSelectedFileUrl(url) {
    this.selectedFileUrl = url;
  }

  ngAfterViewInit() {
    this.refreshList();
  }

  refreshList() {
    this.applicationFolderPath = this.appDataService.getApplicationPath();
    this.appDataService.loadImageResourceList().then((result: any) => {
      this.imageList = result.reverse();

      return this.appDataService.loadFileResourceList();
    }).then((result: any) => {
      this.refreshFileList();
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
    this.selectedFileUrl = target;
  }

  clickDownload(url) {
    this.appDataService.openUrl(url);
  }

  clickApply() {
    this.onSelectFile.emit(this.selectedFileUrl);
    this.hideDialog();
  }


  clickDeleteMode() {
    this.isDeleteMode = !this.isDeleteMode;
  }


  clickDeleteFile(dataUrl) {

    const result = confirm('Do you really want to delete?');
    if (result) {
      this.appDataService.deleteFile(this.applicationFolderPath + '/' + dataUrl);
      this.refreshList();
    }
  }

  nothing(event) {
    event.stopPropagation();
  }

  clickNewFile(event, target) {
    let files = [];
    let folderPath = 'image';
    if (target === 'image') {
      files = this.appDataService.selectImageFiles();
    } else {
      folderPath = 'file';
      files = this.appDataService.selectFilesWithType(target);
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const newImagePath = files[i];
        const fileName = this.appDataService.getUniqueImageName(newImagePath);
        const targetPath = this.applicationFolderPath + '/' + folderPath + '/' + fileName;
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
      const fileList = this.appDataService.getFileResourceList().reverse();
      this.jsonFileList = [];
      this.videoFileList = [];

      for (let i = 0; i < fileList.length; i++) {
        const aFile = fileList[i];
        const fileType = this.extension(aFile);
        console.log('aFile = ' + aFile);
        if (aFile.startsWith('.')) {

          continue;

        }
        if (fileType === 'mp4') {
          this.videoFileList.push(aFile);
        } else if (this.extension(aFile) === 'json') {
          this.jsonFileList.push(aFile);
        }
      }
    });
  }

  extension(filename) {
    let r = /.+\.(.+)$/.exec(filename);
    return r ? r[1] : null;
  }

  clickImageFolder() {
    this.appDataService.openFinder(this.applicationFolderPath + '/image');
  }

  clickFileFolder() {
    this.appDataService.openFinder(this.applicationFolderPath + '/file');

  }





}
