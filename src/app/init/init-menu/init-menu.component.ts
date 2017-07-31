import { Component, OnInit } from '@angular/core';


import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';
import { BroadcastService } from '../../service/broadcast.service';
import { MessageEventService } from '../../service/message-event.service';


@Component({
  selector: 'app-init-menu',
  templateUrl: './init-menu.component.html',
  styleUrls: ['./init-menu.component.css'],
  providers: [MessageEventService]
})
export class InitMenuComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService,
    private messageEvent: MessageEventService) {

  }

  ngOnInit() {
    // this.registerStringBroadcast();
  }

  // registerStringBroadcast() {
  //   this.broadcaster.on<string>('message')
  //     .subscribe(message => {
  //       console.log("message received!! = " + message);
  //     });
  // }


  clickNewApplication(): void {
    console.log("clickNewApplication");
    this.router.navigate(['/new-application']);
    // const test = {
    //   kind:'test',
    //   detail:'detail'
    // }
    // this.broadcaster.broadcast('message', test);
  }



  clickOpenApplication(): void {
    console.log("clickOpenApplication");
    const folder = this.appDataService.selectWorkspaceFolderPath();
    if (folder) {
      const applicationData = this.appDataService.readFileData(folder + "/app.json");// JSON.parse(JSON.stringify(electron.ipcRenderer.sendSync('read-file-data', folder + "/app.json")));
      if (applicationData) {
        this.router.navigate(['/application', folder]);
        // const path = '/application/' + encodeURIComponent(folder);
        // this.appDataService.openMainWindowUrl(path);
      } else {
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
