import { Component, OnInit } from '@angular/core';


import { Router, ActivatedRoute, Params } from '@angular/router';

declare var electron: any;

@Component({
  selector: 'app-init-menu',
  templateUrl: './init-menu.component.html',
  styleUrls: ['./init-menu.component.css']
})
export class InitMenuComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

  }

  clickNewApplication(): void {
    console.log("clickNewApplication");
    this.router.navigate(['/new-application']);
  }



  clickOpenApplication(): void {
    console.log("clickOpenApplication");
    var folder = electron.ipcRenderer.sendSync('select-workspace-folder-path');
    if (folder) {
      var applicationData = JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', folder + "/app.json")));
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
