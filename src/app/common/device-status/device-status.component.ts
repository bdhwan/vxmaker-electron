import { Component, OnInit, OnDestroy, NgZone, Output, Input, EventEmitter } from '@angular/core';

import { ApplicationDataServiceService } from '../../service/application-data-service.service';
import { BroadcastService } from '../../service/broadcast.service';
import { timeout } from 'q';
import { Observable, Subscription } from 'rxjs/Rx';

declare var electron: any;


@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.css']
})
export class DeviceStatusComponent implements OnInit, OnDestroy {

  deviceList = [];

  @Output() onClickSendDevice = new EventEmitter<string>();
  @Input() sendStatus: Boolean;

  isSaving;
  isSending;

  appStatus;
  ticks = 0;
  private timer;
  private sub: Subscription;

  constructor(public zone: NgZone, private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }

  ngOnInit() {
    electron.ipcRenderer.sendSync('regist-device-connect-status');
    electron.ipcRenderer.on('device-status', (event, arg) => {
      this.zone.run(() => {
        this.refreshDeviceStatus();
      });
    });
    this.refreshDeviceStatus();

    this.timer = Observable.timer(0, 60000);
    // subscribing to a observable returns a subscription object
    this.sub = this.timer.subscribe(t => this.tickerFunc(t));
  }

  ngOnDestroy() {
    electron.ipcRenderer.sendSync('unregist-device-connect-status');
    this.sub.unsubscribe();
  }

  tickerFunc(tick) {
    console.log(this);
    this.ticks = tick;
    this.checkAppStatus();
  }

  public setIsSaving(value) {
    this.isSaving = value;
  }
  public setIsSending(value) {
    this.isSending = value;
  }





  refreshDeviceStatus(): void {
    this.appDataService.refreshDeviceList();
    this.deviceList = this.appDataService.getDeviceList();
  }

  public clickSaveFile(): void {

    this.isSaving = true;

    const message = {
      kind: 'save'
    };
    this.broadcaster.broadcast('activity', message);
    this.broadcaster.broadcast('application', message);
  }

  public clickSendFile(): void {
    this.isSending = true;
    this.checkInstallAndRun();
  }


  public clickExportCode(): void {
    const message = {
      kind: 'code-export'
    };
    this.broadcaster.broadcast('activity', message);
    this.broadcaster.broadcast('application', message);
  }


  public clickExportGuide(): void {
    const message = {
      kind: 'code-export'
    };
    this.broadcaster.broadcast('activity', message);
    this.broadcaster.broadcast('application', message);
    // this.onClickSendDevice.emit('send');
  }


  clickHowToConnect(url) {
    this.appDataService.openUrl(url);
  }
  clickInstall() {
    this.appStatus = 'installing';
    this.appDataService.installApk('apk/vxmaker.apk').then(result => {
      console.log("isInstalled = " + result);
      if (!result) {
        alert('Please make developer mode!');
      } else {
        this.appStatus = 'installed';
        this.clickStartActivity();
      }
    }).catch(error => {
      console.log("error is isntalled = " + error);
      this.checkAppStatus();
    });
  }

  clickReadHeartBeat() {

    this.appDataService.readHeartBeat('/sdcard/vxmaker/vxmheartbeat/heartbeat.txt').then(result => {
      const heartbeat = JSON.parse(JSON.stringify(result));
      console.log("isInstalled = " + heartbeat.time);
      const lastHeartBeat = new Date(heartbeat.time);
      const now = new Date().getTime();
      const differ = now - heartbeat.time;

      if (differ > 1000 * 10) {
        this.clickStartActivity();
      }
    }).catch(error => {
      console.log("error is isntalled = " + error);
    });

  }
  clickStartActivity() {

    const option = {
      wait: true,
      action: 'com.altamirasoft.action.START'
    };

    this.appDataService.startActivity(option).then(result => {
      console.log("start = " + result);
    }).catch(error => {
      console.log("error start = " + error);
    });
  }


  checkInstallAndRun() {
    //check heart beat
    this.appDataService.readHeartBeat('/sdcard/vxmaker/vxmheartbeat/heartbeat.txt').then(result => {
      const heartbeat = JSON.parse(JSON.stringify(result));
      const lastHeartBeat = new Date(heartbeat.time);
      const now = new Date().getTime();
      const differ = now - heartbeat.time;
      if (differ > 1000 * 10) {
        //start activity
        const option = {
          wait: true,
          action: 'com.altamirasoft.action.START'
        };
        return this.appDataService.startActivity(option);
      } else {
        //working now
        return this.appDataService.emptyPromise(true);
      }
    }).then(result => {
      console.log("start activity result = " + result);

      const message = {
        kind: 'send-device'
      };
      this.broadcaster.broadcast('activity', message);
      this.broadcaster.broadcast('application', message);

    }).catch(error => {
      console.log("error heart beat = " + error);
      this.isSending = false;
      this.checkAppStatus();

    });
  }


  checkAppStatus() {

    const self = this;
    this.appDataService.isInstalled('com.altamirasoft.vxmaker_android').then(result => {
      console.log('installed = ' + result);
      if (self.appStatus === 'installing') {

      } else {
        if (result) {
          self.appStatus = 'installed';
        } else {
          self.appStatus = 'not_installed';
        }
      }
    }).catch(error => {
      console.log('not installed');
      self.appStatus = 'not_installed';
    });
  }




  clickIsInstalled() {
    this.appDataService.isInstalled('com.altamirasoft.vxmaker_android').then(result => {
      console.log("isInstalled = " + result);
    }).catch(error => {
      console.log("error is isntalled = " + error);
    });
  }









}
