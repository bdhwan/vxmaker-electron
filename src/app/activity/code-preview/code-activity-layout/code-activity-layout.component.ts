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
  constructor(private appDataService: ApplicationDataServiceService, private codeGenerator: CodeGeneratorService) {
    this.isMakingCode = false;
  }

  ngOnInit() {
  }


  hideDialog() {
    this.visibility = false;
  }
  nothing($event) {

  }


  public setActivityData(activityData) {

    if (this.isMakingCode) {
      return;
    }

    this.isMakingCode = true;
    this.activityData = activityData;

    const result = this.appDataService.makeActivitySourceCode();

    this.layoutData = result['layout'];
    this.javaData = result['java'];
    console.log("will make activity source code");
    this.isMakingCode = false;
  }

  private makeLayoutData() {






    // this.appDataService.loadTemplateString('/source_template/activity_main.xml').then(result => {
    //   console.log("result activity_main = " + result);
    //   let temp = result + '';
    //   const xmlString = this.appDataService.makeLayoutData();
    //   temp = temp.replace('!!!layoutList!!!', xmlString);
    //   temp = temp.replace('!!!packageName!!!', this.appDataService.getApplicationData().applicationId);
    //   temp = temp.replace('!!!activityName!!!', this.appDataService.getActivityName(this.activityData.activityId));
    //   this.layoutData = this.appDataService.makeBeautify(temp);
    //   return this.appDataService.loadTemplateString('/source_template/MainActivity.java');
    // }).then(result => {

    //   // let temp = result + '';
    //   // const xmlString = this.appDataService.makeJavaData();
    //   // temp = temp.replace('!!!layoutList!!!', xmlString);
    //   // temp = temp.replace('!!!packageName!!!', this.appDataService.getApplicationData().applicationId);
    //   // temp = temp.replace('!!!activityName!!!', this.appDataService.getActivityName(this.activityData.activityId));
    //   // this.javaData = this.appDataService.makeBeautify(temp);

    // });

  }




  public onChangeData() {
    console.log("onChange Data");
    // debugger;

  }

}
