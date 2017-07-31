import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApplicationDataServiceService } from '../service/application-data-service.service';


declare var electron: any;



@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.css']
})
export class NewApplicationComponent implements OnInit {


  workspaceFolderPath: string;
  applicationName: string;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
        private appDataService: ApplicationDataServiceService
  ) { }

  ngOnInit() {
    this.applicationName = 'UntitledApplication';
    this.workspaceFolderPath = electron.ipcRenderer.sendSync('get-workspace-folder-path');
  }


  //change project folder
  clickChangeFolder(): void {
    var folder = electron.ipcRenderer.sendSync('select-workspace-folder-path', this.workspaceFolderPath);
    if (folder) {
      this.workspaceFolderPath = folder;
    }
  }



  clickBack(): void {
    this.router.navigate(['/init']);
  }

  //make project folder and go application page
  clickNext(): void {

    if (!this.applicationName) {
      alert('enter application name');
      return;
    }

    const applicationFolder = this.workspaceFolderPath + '/' + this.applicationName;
    electron.ipcRenderer.sendSync('make-folder', applicationFolder);
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/activity');
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/image');
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/file');
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/export');
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + '/preview');

    electron.ipcRenderer.sendSync('copy-from-root-file', 'template/source_template/ic_launcher.png' ,applicationFolder + '/image/ic_launcher.png');



    const now = new Date().getTime();
    const data = {
      createdAt: now,
      updatedAt: now,
      applicationName: this.applicationName,
      applicationId: 'com.altamirasoft.' + this.applicationName,
      iconPath: 'image/ic_launcher.png',
      activityList: [],
      imageList: [],
      fileList: []
    };

    const filePath = applicationFolder + '/app.json';
    electron.ipcRenderer.sendSync('save-file-data', filePath, data);


    this.router.navigate(['/application', applicationFolder]);

    // //new window
    // const path = '/application/' + encodeURIComponent(applicationFolder);
    // this.appDataService.openMainWindowUrl(path);


  }


}
