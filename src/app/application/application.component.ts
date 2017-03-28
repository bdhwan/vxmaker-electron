import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ApplicationInfoComponent } from './application-info/application-info.component'
import { ResourceComponent } from '../common/resource/resource.component'
import { ApplicationDataServiceService } from '../service/application-data-service.service'


import 'rxjs/add/operator/switchMap';
// declare var electron: any;



@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {

  applicationFolderPath: string;
  applicationData: any;

  @ViewChild('resourceAppDialog')
  private resourceDialog: ResourceComponent;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private appDataService: ApplicationDataServiceService
  ) {


  }

  onClickChangeIcon(): void {
    var newIconImagePath = this.appDataService.selectImageFile();

    if (newIconImagePath) {
      var iconFileName = "image/ic_launcher_" + new Date().getTime() + ".png";
      var targetPath = this.applicationFolderPath + "/" + iconFileName;
      this.appDataService.deleteFile(this.applicationFolderPath + "/" + this.applicationData.iconPath);
      var result = this.appDataService.copyFile(newIconImagePath, targetPath);

      if (result) {
        this.applicationData.iconPath = iconFileName;
        this.appDataService.saveApplicationData(this.applicationData);
      }
    }
  }


  onChangeData(value: string): void {
    this.applicationData.updatedAt = new Date().getTime();
    this.appDataService.saveApplicationData(this.applicationData);
  }



  ngAfterViewInit() {

  }


  ngOnInit() {

    console.log("application compononent ng on init");

    this.applicationFolderPath = this.route.snapshot.params['applicationFolderPath'];

    console.log("this.applicationFolderPath =" + this.applicationFolderPath);
    this.appDataService.initApplicationPath(this.applicationFolderPath);
    this.appDataService.loadApplicationData().then((result) => {
      this.applicationData = this.appDataService.getApplicationData();
      console.log("applicationData-" + JSON.stringify(this.applicationData));
      this.checkInitProcess();
    }).catch((err) => {
      console.log("err-" + JSON.stringify(err));
    });

  }

  checkInitProcess() {
    if (!this.applicationData) {
      alert("No app data");
      this.appDataService.removeRecentProjectList();
      this.router.navigate(['/init']);
    }
    else {
      this.appDataService.addRecentProjectList(this.applicationData.applicationName);
    }
  }


  clickNewActivity(): void {
    var now = new Date().getTime();
    var activityId = "activity_" + now;
    var newActivityMetaData = {
      activityId: activityId,
      activityName: "UntitledActivityName",
      createdAt: now,
      updatedAt: now
    }
    var newActivityData = {
      activityId: activityId,
      objects: [],
      anims: [],
      stages: [],
      states: [],
      events: [],
      triggers: []
    }

    this.applicationData.activityList.push(newActivityMetaData);


    this.appDataService.saveApplicationData(this.applicationData);
    this.appDataService.saveActivityData(activityId, newActivityData);

    this.router.navigate(['/activity', this.applicationFolderPath, activityId]);

  }


  clickActivity(activityId): void {
    this.router.navigate(['/activity', this.applicationFolderPath, activityId]);
  }

  clickDeleteActivity(activityId): void {

    var result = confirm("will you delete? =" + activityId);
    if (result) {
      var index = this.findActivityPosition(activityId);
      console.log("index = " + index);
      this.applicationData.activityList.splice(index, 1);

      this.appDataService.deleteActivity(activityId);
      this.clickSave();
    }
  }

  findActivityPosition(activityId): any {
    for (var i = 0; i < this.applicationData.activityList.length; i++) {
      if (this.applicationData.activityList[i].activityId == activityId) {
        return i;
      }
    }
  }


  clickDuplicateActivity(activityId): void {


    var index = this.findActivityPosition(activityId);

    var now = new Date().getTime();
    var newActivityId = "activity_" + now;

    var newObject = JSON.parse(JSON.stringify(this.applicationData.activityList[index]));
    newObject.activityId = newActivityId;
    newObject.activityName = "Copy_" + newObject.activityName;
    newObject.createdAt = now;
    newObject.updatedAt = now;

    this.applicationData.activityList.splice(index + 1, 0, newObject);

    this.appDataService.saveApplicationData(this.applicationData);
    this.appDataService.saveActivityData(newActivityId, newObject);

    this.clickActivity(newActivityId);

  }

  clickSave(): void {
    this.appDataService.saveApplicationData(this.applicationData);
  }


  clickBack(): void {
    this.router.navigate(['/init']);
  }


  clickResource() {
    console.log("clickResource");
    this.resourceDialog.showDialog("image");
  }

  onSelectFile(target){

  }


}
