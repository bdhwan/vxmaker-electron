import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ApplicationInfoComponent } from '../application-info/application-info.component'

import 'rxjs/add/operator/switchMap';
declare var electron: any;



@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {


  // @ViewChild('test1')
  // private applicationInfoComponent1: ApplicationInfoComponent;

  // @ViewChild('test2')
  // private applicationInfoComponent2: ApplicationInfoComponent;


  applicationFolderPath: string;
  applicationData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {


  }

  onClickChangeIcon(): void {
    var newIconImagePath = electron.ipcRenderer.sendSync('select-image-file');
    if (newIconImagePath) {
      var iconFileName = "image/ic_launcher_" + new Date().getTime() + ".png";
      var targetPath = this.applicationFolderPath + "/" + iconFileName;

      electron.ipcRenderer.sendSync('delete-file', this.applicationFolderPath + "/" + this.applicationData.iconPath);

      var result = electron.ipcRenderer.sendSync('copy-file', newIconImagePath, targetPath);
      if (result) {
        this.applicationData.iconPath = iconFileName;
        electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/app.json", this.applicationData);
      }
    }
  }



  onChangeData(value: string): void {
 
    this.applicationData.updatedAt = new Date().getTime();
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/app.json", this.applicationData);
  }



  ngAfterViewInit() {

  }


  ngOnInit() {

    console.log("application compononent ng on init");
    this.applicationFolderPath = this.route.snapshot.params['applicationFolderPath'];
    this.applicationData = JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + "/app.json")));

    if (!this.applicationData) {
      alert("No app data");

      var temp = {
        'applicationFolderPath': this.applicationFolderPath
      }
      electron.ipcRenderer.sendSync('remove-recent-project-list', temp);
      this.router.navigate(['/init']);
    }
    else {
      var historyData = {
        applicationFolderPath: this.applicationFolderPath,
        applicationName: this.applicationData.applicationName,
      }

      electron.ipcRenderer.send('add-recent-project', historyData);
      electron.ipcRenderer.sendSync('change-window', 1080, 800, true);
      this.applicationData.applicationFolderPath = this.applicationFolderPath;


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

    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/app.json", this.applicationData);
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/activity/" + activityId + ".json", newActivityData);

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

      //delete activity file
      electron.ipcRenderer.sendSync('delete-file', this.applicationFolderPath + "/activity/" + activityId + ".json");
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

    this.applicationData.activityList.splice(index+1, 0, newObject);
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/app.json", this.applicationData);
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/activity/" + newActivityId + ".json", newObject);
    
  }

  clickSave(): void {
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/app.json", this.applicationData);
  }


  clickBack(): void {
    this.router.navigate(['/init']);
  }


}
