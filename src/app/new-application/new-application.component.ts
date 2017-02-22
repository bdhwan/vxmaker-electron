import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.applicationName = "UntitledApplication";
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
      alert("enter application name");
      return;
    }

    var applicationFolder = this.workspaceFolderPath + "/" + this.applicationName;
    electron.ipcRenderer.sendSync('make-folder', applicationFolder);
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + "/activity");
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + "/image");
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + "/export");
    electron.ipcRenderer.sendSync('make-folder', applicationFolder + "/preview");

    electron.ipcRenderer.sendSync('copy-from-root-file',"template/source_template/ic_launcher.png" ,applicationFolder + "/image/ic_launcher.png");



    var now = new Date().getTime();
    var data = {
      createdAt: now,
      updatedAt: now,
      applicationName: this.applicationName,
      applicationId:"com.altamirasoft."+this.applicationName,
      iconPath:"image/ic_launcher.png",
      activityList: []
    }

    var filePath = applicationFolder + "/app.json";
    electron.ipcRenderer.sendSync('save-file-data', filePath, data);
    this.router.navigate(['/application', applicationFolder]);

  }


}
