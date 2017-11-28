import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApplicationDataServiceService } from '../service/application-data-service.service';


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
    this.workspaceFolderPath = this.appDataService.getWorkspaceFolderPath();

    this.appDataService.insertHistory('new', null);
  }


  //change project folder
  clickChangeFolder(): void {
    const folder = this.appDataService.selectWorkspaceFolderPathFrom(this.workspaceFolderPath);
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
    const checkFolderPath = this.workspaceFolderPath + '/' + this.applicationName;
    const haveFolder = this.appDataService.haveFile(checkFolderPath);
    let result = true;
    if (haveFolder) {
      result = confirm('The folder is not empty. will you override it?');
    }

    if (result) {

      this.appDataService.deleteFile(applicationFolder);
      this.appDataService.createNewApplication(applicationFolder, this.applicationName);
      this.router.navigate(['/application', applicationFolder]);

      this.appDataService.insertHistory('application', applicationFolder + '/' + this.applicationName);

    }


  }


}
