import { Component, OnInit } from '@angular/core';
import { ApplicationDataServiceService } from '../../../service/application-data-service.service';

// declare var beautify: any;




@Component({
  selector: 'app-code-activity-layout',
  templateUrl: './code-activity-layout.component.html',
  styleUrls: ['./code-activity-layout.component.css']
})
export class CodeActivityLayoutComponent implements OnInit {


  activityData;
  layoutData;
  javaData;

  constructor(private appDataService: ApplicationDataServiceService) { }

  ngOnInit() {
  }


  public setActivityData(activityData) {
    this.activityData = activityData;
    this.layoutData = null;
    this.javaData = null;

    this.makeLayoutData();
  }

  private makeLayoutData() {






    this.appDataService.loadTemplateString('ImageView.js').then(result => {
      console.log("result = " + result);
      const temp = result + '';
      this.layoutData = this.appDataService.makeLayoutData();

    }).then(result => {


    });

  }




  public onChangeData() {
    console.log("onChange Data");

  }

}
