import { Component, OnInit } from '@angular/core';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'




@Component({
  selector: 'app-init-menu',
  templateUrl: './init-menu.component.html',
  styleUrls: ['./init-menu.component.css']
})
export class InitMenuComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,private appDataService: ApplicationDataServiceService) {

  }

  ngOnInit() {

  }

  clickNewApplication(): void {
    console.log("clickNewApplication");
    this.router.navigate(['/new-application']);
  }



  clickOpenApplication(): void {
    console.log("clickOpenApplication");
    var folder = this.appDataService.selectWorkspaceFolderPath();
    if (folder) {
      var applicationData = this.appDataService.readFileData(folder + "/app.json");// JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', folder + "/app.json")));
      if (applicationData) {
        this.router.navigate(['/application', folder]);
      }
      else {
        alert("no data");
      }
    }
  }



  clickHelp(): void {

  }


  clickSettingApplication(): void {
    console.log("clickSettingApplication");
  }

}
