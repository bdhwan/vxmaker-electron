import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ResourceComponent } from '../common/resource/resource.component';
import { ApplicationDataServiceService } from '../service/application-data-service.service';
import { UUID } from 'angular2-uuid';
import { BroadcastService } from '../service/broadcast.service';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-code-export',
  templateUrl: './code-export.component.html',
  styleUrls: ['./code-export.component.css']
})
export class CodeExportComponent implements OnInit {

  prefix = environment.imgPrefix;

  applicationFolderPath: string;
  applicationData: any;

  activityDataList;
  manifestXml;
  stringXml;
  buildGradle;

  sourceCodeData;
  workspaceFolderPath: string;
  currentActivityId;

  readyToRender = false;
  showExportPanel = false;

  currentTab = 'AndroidManifest';
  currentActivityTab = 'xml';

  isLoading = false;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private appDataService: ApplicationDataServiceService,
    private broadcaster: BroadcastService) { }

  ngOnInit() {

    const self = this;

    this.workspaceFolderPath = this.appDataService.getExportFolderPath();
    this.applicationFolderPath = this.route.snapshot.params['applicationFolderPath'];

    this.appDataService.initApplicationPath(this.applicationFolderPath);
    this.appDataService.loadInitDataFromFile().then(result => {
      self.applicationData = self.appDataService.loadApplicationDataSync();

      const temp = this.appDataService.makeApplicationSourceCode();
      self.activityDataList = temp['activityDataList'];
      self.manifestXml = temp['manifestXml'];
      self.stringXml = temp['stringXml'];
      self.buildGradle = temp['buildGradle'];
      self.sourceCodeData = temp;
      self.readyToRender = true;
      self.registerStringBroadcast();
    });
  }

  callback($event) {
    console.log("done clip");
    alert("copied!");
  }


  clickImageFolder() {
    this.appDataService.openFinder(this.applicationFolderPath + '/image');

  }

  registerStringBroadcast() {
    this.broadcaster.on<any>('export')
      .subscribe(message => {

        const kind = message.kind;
        console.log("message received!! = " + kind);
        const activityId = message.activityId;
        if (kind === 'go-detail-activity') {
          console.log("message activityId!! = " + activityId);
          this.currentActivityId = activityId;

        } else if (kind === 'application') {
          this.currentActivityId = null;
        }
      });
  }


  clickShowExport() {
    this.showExportPanel = true;
    console.log("clickShowExport  -" + this.showExportPanel);
  }

  clickHideExport() {
    this.showExportPanel = false;
  }

  nothing(event) {
    event.stopPropagation();
  }

  //change project folder
  clickChangeFolder(): void {
    const folder = this.appDataService.selectWorkspaceFolderPathFrom(this.workspaceFolderPath);
    if (folder) {
      this.workspaceFolderPath = folder;
    }
  }





  clickExport() {


    const checkFolderPath = this.workspaceFolderPath + '/' + this.applicationData.applicationName + '_export';
    const haveFolder = this.appDataService.haveFile(checkFolderPath);
    let result = true;
    if (haveFolder) {
      result = confirm('will you override folder?');
    }

    if (result) {
      const self = this;
      this.isLoading = true;
      self.exportProcess().then(result => {
        self.isLoading = false;
        const open = confirm('will you open export folder?');
        if (open) {
          self.appDataService.openFinder(checkFolderPath);
        }
      });
    }
  }


  getActivityName(activityId) {
    return this.appDataService.getActivityName(activityId);
  }


  clickTab(target) {
    this.currentTab = target;
  }

  clickActivityTab(target) {
    this.currentActivityTab = target;
  }



  exportProcess() {
    return new Promise((resolve, reject) => {
      this.appDataService.writeSourceCode(this.workspaceFolderPath, this.sourceCodeData);
      this.appDataService.writeGuidDoc(this.workspaceFolderPath, this.sourceCodeData);
      resolve(true);
    });
  }




  clickOpenFolder() {
    this.appDataService.openFinder(this.workspaceFolderPath + '/' + this.applicationData.applicationName + '_export');
  }

  clickBack() {
    this.location.back();
  }


  clickRoot() {
    this.router.navigate(['/application', this.applicationFolderPath]);
  }


}
