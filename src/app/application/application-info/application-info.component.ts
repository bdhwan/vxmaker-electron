import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApplicationComponent } from '../../application/application.component'

import * as glob from "../../globals";


@Component({
  selector: 'app-application-info',
  templateUrl: './application-info.component.html',
  styleUrls: ['./application-info.component.css']
})
export class ApplicationInfoComponent implements OnInit {


  prefix = glob.imgPrefix;



  @Input() applicationData: any;
  @Input() applicationFolderPath: string;

  @Output() onChangeData = new EventEmitter<string>();
  @Output() onClickChangeIcon = new EventEmitter<void>();


  showImageDialog = false;


  constructor() {

  }

  ngOnInit() {

  }

  onChange(): void {
    this.onChangeData.emit();
  }

  clickIcon(): void {
    this.onClickChangeIcon.emit();
  }

  clickToggleDialog() {
    console.log("clickToggleDialog");
    this.showImageDialog = !this.showImageDialog;
  }
 
 

}
