import { Component, OnInit } from '@angular/core';
import { ApplicationDataServiceService } from '../../../service/application-data-service.service';

declare var beautify_html: any;


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
      const tempLayoutData = this.appDataService.insertChild('root');
      this.layoutData = beautify_html(tempLayoutData, { indent_size: 4, wrap_line_length: 70 });


    }).then(result => {


    });

  }




  public onChangeData() {
    console.log("onChange Data");

  }

}
