import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ApplicationDataServiceService } from '../service/application-data-service.service';
import { BroadcastService } from '../service/broadcast.service';
import { MessageEventService } from '../service/message-event.service';
import { environment } from '../../environments/environment';

import { RecentProjectComponent } from '../init/recent-project/recent-project.component';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css'],
  providers: [BroadcastService, MessageEventService]
})
export class InitComponent implements OnInit, OnDestroy, AfterViewInit {


  imgPrefix = environment.imgPrefix;
  isGuideMode = environment.guideMode;
  isProdMode = environment.production;
  messageListener;

  @ViewChild('recentProjectList')
  private recentProjectList: RecentProjectComponent;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appDataService: ApplicationDataServiceService,
    private broadcaster: BroadcastService,
    private messageEvent: MessageEventService
  ) {


  }

  ngOnInit() {
    this.registerStringBroadcast();

    this.appDataService.insertHistory('init', null);


  }

  ngAfterViewInit() {
    if (this.isGuideMode) {
      this.router.navigate(['/guide/init']);
    }
  }

  ngOnDestroy() {
    if (this.messageListener) {
      this.messageListener.unsubscribe();
    }
  }

  registerStringBroadcast() {
    this.messageListener = this.broadcaster.on<any>('init')
      .subscribe(message => {
        const kind = message.kind;
        console.log("message received!! = " + kind);
        if (kind === 'open-application') {
          this.openApplication();
        } else if (kind === 'new-application') {
          this.newApplication();
        } else if (kind === 'open-application-folder') {
          this.openApplicationFolder(message.folderPath);
        } else if (kind === 'how-to-use') {
          this.appDataService.openUrl('http://beta.vxmaker.com/tutorial');
        }
      });
  }

  openApplication() {
    const folder = this.appDataService.selectWorkspaceFolderPath();
    if (folder) {
      this.openApplicationFolder(folder);
    }
  }

  newApplication() {
    this.router.navigate(['/new-application']);
  }


  clickDownloadApp(url) {
    this.appDataService.openUrl(url);
  }


  openApplicationFolder(folder) {
    const applicationData = this.appDataService.readFileData(folder + '/app.json');
    if (applicationData) {
      this.router.navigate(['/application', folder]);
    } else {
      alert('Cannot open this folder for vxm project');
      this.appDataService.removeRecentProjectListWithPath(folder);
      this.recentProjectList.refreshList();
    }
  }






}
