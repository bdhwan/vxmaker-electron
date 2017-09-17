import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ApplicationInfoComponent } from './application-info/application-info.component';
import { ResourceComponent } from '../common/resource/resource.component';
import { ApplicationDataServiceService } from '../service/application-data-service.service';
import { UUID } from 'angular2-uuid';
import { BroadcastService } from '../service/broadcast.service';

import 'rxjs/add/operator/switchMap';
// declare var electron: any;
import { environment } from '../../environments/environment';




@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit, AfterViewInit, OnDestroy {

  prefix = environment.imgPrefix;

  applicationFolderPath: string;
  applicationData: any;

  sendStatus: Boolean = false;

  messageListener;

  @ViewChild('resourceAppDialog')
  private resourceDialog: ResourceComponent;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private appDataService: ApplicationDataServiceService,
    private broadcaster: BroadcastService
  ) {


  }

  onClickChangeIcon(): void {
    const newIconImagePath = this.appDataService.selectImageFile();

    if (newIconImagePath) {
      const iconFileName = 'image/ic_launcher_' + new Date().getTime() + '.png';
      const targetPath = this.applicationFolderPath + '/' + iconFileName;
      this.appDataService.deleteFile(this.applicationFolderPath + '/' + this.applicationData.iconPath);
      const result = this.appDataService.copyFile(newIconImagePath, targetPath);

      if (result) {
        this.applicationData.iconPath = iconFileName;
        this.appDataService.saveApplicationData(this.applicationData);
      }
    }
  }


  onChangeData(value: string): void {
    this.applicationData.updatedAt = new Date().getTime();
    this.appDataService.saveApplicationData(this.applicationData);
  }


  onClickSendDevice(value: string): void {
    this.sendStatus = true;
    const self = this;
    setTimeout(function () {
      self.applicationData.updatedAt = new Date().getTime();
      self.appDataService.saveApplicationData(self.applicationData);
      self.appDataService.sendFileToDevice();
      self.sendStatus = false;
    }, 100);
  };


  ngAfterViewInit() {

  }


  ngOnInit() {

    console.log('application compononent ng on init');

    this.applicationFolderPath = this.route.snapshot.params['applicationFolderPath'];


    console.log('this.applicationFolderPath =' + this.applicationFolderPath);
    this.appDataService.initApplicationPath(this.applicationFolderPath);
    this.appDataService.loadApplicationData().then((result) => {
      this.applicationData = this.appDataService.getApplicationData();
      console.log('applicationData-' + JSON.stringify(this.applicationData));
      this.checkInitProcess();
    }).catch((err) => {
      console.log('err-' + JSON.stringify(err));
      this.noProject();
    });

    this.registerStringBroadcast();

  }

  ngOnDestroy() {
    if (this.messageListener) {
      this.messageListener.unsubscribe();
    }
  }


  registerStringBroadcast() {
    this.messageListener = this.broadcaster.on<any>('application')
      .subscribe(message => {

        const kind = message.kind;
        const activityId = message.activityId;
        console.log("application message received!! = " + kind);
        if (kind === 'send-device') {
          this.onClickSendDevice(null);
        } else if (kind === 'code-export') {

          this.clickSave();
          this.router.navigate(['/code-export', this.applicationFolderPath]);

        } else if (kind === 'change-activity-list') {

          this.onChangeData(null);
        } else if (kind === 'go-detail-activity') {
          this.clickActivity(activityId);

        } else if (kind === 'delete-activity') {
          this.clickDeleteActivity(activityId);
        } else if (kind === 'duplicate-activity') {
          this.clickDuplicateActivity(activityId);

        } else if (kind === 'new-activity') {
          console.log("new activity");
          this.clickNewActivity();

        } else if (kind === 'set-launcher-activity') {
          this.onClickLauncherActivity(activityId);
        } else if (kind === 'set-launcher-activity') {
          this.onClickLauncherActivity(activityId);
        } else if (kind === 'on-change-data') {
          this.onChangeData(null);
        } else if (kind === 'change-icon') {
          this.onClickChangeIcon();
        }
      });
  }



  checkInitProcess() {
    if (!this.applicationData) {
      this.noProject();
    }
    else {
      this.appDataService.addRecentProjectList(this.applicationData.applicationName);
    }
  }

  noProject() {
    alert('No app data');
    this.appDataService.removeRecentProjectList();
    this.router.navigate(['/init']);
  }


  clickNewActivity(): void {
    console.log("click new Activity");
    const activityId = 'activity_' + UUID.UUID();
    this.appDataService.createNewActivity(this.applicationFolderPath, activityId);

    // const newActivityMetaData = {
    //   activityId: activityId,
    //   activityName: 'UntitledActivityName_' + (this.applicationData.activityList.length),
    //   createdAt: now,
    //   updatedAt: now
    // };
    // const newActivityData = {
    //   activityId: activityId
    // };

    // if (this.applicationData.activityList.length === 0) {
    //   this.applicationData.launcherActivityId = activityId;
    // }

    // this.applicationData.activityList.push(newActivityMetaData);

    // this.appDataService.saveApplicationData(this.applicationData);
    // this.appDataService.saveActivityData(activityId, newActivityData);
    this.router.navigate(['/activity', this.applicationFolderPath, activityId]);


  }


  clickActivity(activityId): void {
    this.router.navigate(['/activity', this.applicationFolderPath, activityId]);
  }

  clickDeleteActivity(activityId): void {

    const activityName = this.appDataService.getActivityName(activityId);
    const result = confirm('will you delete ' + activityName + '?');
    if (result) {
      const index = this.findActivityPosition(activityId);
      this.applicationData.activityList.splice(index, 1);
      this.appDataService.deleteActivity(activityId);
      this.clickSave();
    }
  }

  findActivityPosition(activityId): any {
    for (let i = 0; i < this.applicationData.activityList.length; i++) {
      if (this.applicationData.activityList[i].activityId === activityId) {
        return i;
      }
    }
  }


  clickDuplicateActivity(activityId): void {


    const index = this.findActivityPosition(activityId);

    const now = new Date().getTime();
    const newActivityId = 'activity_' + UUID.UUID();

    const newObject = JSON.parse(JSON.stringify(this.applicationData.activityList[index]));
    newObject.activityId = newActivityId;
    newObject.activityName = 'Copy_' + newObject.activityName;
    newObject.createdAt = now;
    newObject.updatedAt = now;

    this.applicationData.activityList.splice(index + 1, 0, newObject);
    this.appDataService.saveApplicationData(this.applicationData);


    this.appDataService.duplicateActivityData(activityId, newActivityId);

    this.clickActivity(newActivityId);

  }

  onClickLauncherActivity(activityId): void {
    this.applicationData.launcherActivityId = activityId;
    this.appDataService.saveApplicationData(this.applicationData);
  }




  clickSave(): void {
    this.appDataService.saveApplicationData(this.applicationData);
  }


  clickBack(): void {
    // this.appDataService.closeMainWindowUrl();
    this.router.navigate(['/init']);
  }


  clickResource() {
    console.log('clickResource');
    this.resourceDialog.showDialog('image');
  }

  onSelectFile(target) {

  }


}
