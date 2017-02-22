import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';


import 'rxjs/add/operator/switchMap';

declare var electron: any;
declare var rasterizeHTML: any;



@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activityId: String;
  applicationFolderPath: string;
  applicationData;
  activityMetaData;
  activityData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location

  ) {
    console.log("construct application");
  }

  ngOnInit() {


    this.applicationFolderPath = this.route.snapshot.params['applicationFolderPath'];
    this.activityId = this.route.snapshot.params['activityId'];

    this.applicationData = JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + "/app.json")));
    for (var i = 0; i < this.applicationData.activityList.length; i++) {
      var activity = this.applicationData.activityList[i];
      if (activity.activityId === this.activityId) {
        this.activityMetaData = activity;
        break;
      }
    }
    this.activityData = JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', this.applicationFolderPath + "/activity/" + this.activityId + ".json")));
  }

  clickBack(): void {
    this.location.back();
  }


  clickSave(): void {
    console.log("save activity data");
    this.saveActivityData();
  }

  changeActivityName(): void {
    this.saveApplicationData();
  }

  saveApplicationData(): void {
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/app.json", this.applicationData);
  }
  saveActivityData(): void {
    electron.ipcRenderer.sendSync('save-file-data', this.applicationFolderPath + "/activity/" + this.activityId + ".json", this.activityData);
  }


  captureScreen(): void {
    var node = document.getElementById("previewScreen");
    var canvas = document.createElement("canvas");
    canvas.height = node.offsetHeight;
    canvas.width = node.offsetWidth;

    var self = this;
    rasterizeHTML.drawHTML(node.outerHTML, canvas)
      .then(function (renderResult) {
        if (navigator.msSaveBlob) {
          window.navigator.msSaveBlob(canvas.msToBlob(), name);
        } else {
          var data = canvas.toDataURL();
          var fileName = "preview/" + self.activityId + ".jpg";
          var filePath = self.applicationFolderPath + "/" + fileName;
          electron.ipcRenderer.sendSync('save-raw-data', filePath, data);


          self.activityMetaData.previewPath = fileName;
          self.saveApplicationData();

        }
      });
  }



}
