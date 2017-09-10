import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ResourceComponent } from '../common/resource/resource.component';
import { ApplicationDataServiceService } from '../service/application-data-service.service';
import { UUID } from 'angular2-uuid';
import { BroadcastService } from '../service/broadcast.service';


@Component({
  selector: 'app-code-export',
  templateUrl: './code-export.component.html',
  styleUrls: ['./code-export.component.css']
})
export class CodeExportComponent implements OnInit {

  applicationFolderPath: string;
  applicationData: any;

  activityDataList;
  manifestXml;
  stringXml;
  buildGradle;

  sourceCodeData;
  workspaceFolderPath: string;


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
    console.log('this.applicationFolderPath =' + this.applicationFolderPath);
    this.appDataService.initApplicationPath(this.applicationFolderPath);
    this.appDataService.loadInitDataFromFile().then(result => {
      self.applicationData = self.appDataService.loadApplicationDataSync();
    });
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





  exportProcess() {
    return new Promise((resolve, reject) => {
      const temp = this.appDataService.makeApplicationSourceCode();
      this.activityDataList = temp['activityDataList'];
      this.manifestXml = temp['manifestXml'];
      this.stringXml = temp['stringXml'];
      this.buildGradle = temp['buildGradle'];
      this.sourceCodeData = temp;
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
