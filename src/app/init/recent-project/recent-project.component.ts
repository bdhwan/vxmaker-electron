import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'
import { BroadcastService } from '../../service/broadcast.service';
import { MessageEventService } from '../../service/message-event.service';



@Component({
  selector: 'app-recent-project',
  templateUrl: './recent-project.component.html',
  styleUrls: ['./recent-project.component.css']
})
export class RecentProjectComponent implements OnInit {

  recentProjects;

  constructor(
    private router: Router,
    private appDataService: ApplicationDataServiceService,
    private broadcaster: BroadcastService,
    private messageEvent: MessageEventService
  ) { }

  ngOnInit() {
    this.recentProjects = this.appDataService.getRecentProjectList();
  }


  clickApplication(folderPath) {


    const message = {
      kind: 'open-application-folder',
      folderPath: folderPath
    }
    this.broadcaster.broadcast('init', message);






    // const path = '/application/' + encodeURIComponent(folderPath);
    // this.appDataService.openMainWindowUrl(path);
  }


}
