import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../../service/application-data-service.service'



import * as glob from "../../../globals";


@Component({
  selector: 'app-preview-object',
  templateUrl: './preview-object.component.html',
  styleUrls: ['./preview-object.component.css']
})
export class PreviewObjectComponent implements OnInit {

  prefix = glob.imgPrefix;
  applicationFolderPath;


  @Input() objectData: any;
  @Output() onShowResourceDialog = new EventEmitter<string>();

  state: any;
  zoom;

  constructor(private appDataService: ApplicationDataServiceService) { }

  ngOnInit() {
    this.state = this.appDataService.findStateByObjectId(this.objectData.id);
    this.applicationFolderPath = this.appDataService.getApplicationPath();
  }




  getObjectStyle() {
    this.state = this.appDataService.findStateByObjectId(this.objectData.id);
    if (this.state) {
      return this.appDataService.getObjectStyle(this.state);
    }
    else {

      return null;
    }
  }








}
