import { Component, OnInit } from '@angular/core';
import { ApplicationDataServiceService } from '../../../service/application-data-service.service';
import { CodeGeneratorService } from '../../../service/code-generator.service';



@Component({
  selector: 'app-code-activity-layout',
  templateUrl: './code-activity-layout.component.html',
  styleUrls: ['./code-activity-layout.component.css']
})
export class CodeActivityLayoutComponent implements OnInit {

  visibility = false;
  activityData;
  layoutData;
  javaData;
  isMakingCode;
  applicationData;
  activityId;

  activityDataList = [];

  constructor(private appDataService: ApplicationDataServiceService) {
    this.isMakingCode = false;
  }

  ngOnInit() {

  }


  hideDialog() {
    this.visibility = false;
  }
  showDialog() {
    this.visibility = true;
  }


  nothing($event) {

  }

  clickExport() {

    // export source code
    // this.applicationData = this.appDataService.getApplicationData();
    // this.activityId = this.appDataService.getCurrentActivityId();



    // this.appDataService.initActivityId(this.activityId);

    // this.appDataService

    // const temp = this.appDataService.makeApplicationSourceCode();
    // console.log("activityDataList = " + temp.length);

    // this.activityDataList = temp;


    // this.layoutData = result['layout'];
    // this.javaData = result['java'];



    // export guide doc

  }


  public setActivityData(activityData) {

    // if (this.isMakingCode) {
    //   return;
    // }

    // this.isMakingCode = true;
    // this.activityData = activityData;

    // const result = this.appDataService.makeActivitySourceCode();

    // this.layoutData = result['layout'];
    // this.javaData = result['java'];
    // console.log("will make activity source code");
    // this.isMakingCode = false;



  }

  private makeLayoutData() {

  }




  public onChangeData() {
    console.log("onChange Data");
    // debugger;

  }

}
