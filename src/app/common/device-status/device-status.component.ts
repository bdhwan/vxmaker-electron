import { Component, OnInit, OnDestroy, NgZone, Output, Input, EventEmitter } from '@angular/core';

import { ApplicationDataServiceService } from '../../service/application-data-service.service';
import { BroadcastService } from '../../service/broadcast.service';


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


  constructor(public zone: NgZone, private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }

  ngOnInit() {
    electron.ipcRenderer.sendSync('regist-device-connect-status');
    electron.ipcRenderer.on('device-status', (event, arg) => {
      this.zone.run(() => {
        this.refreshDeviceStatus();
      });
    });
    this.refreshDeviceStatus();
  }

  ngOnDestroy() {
    electron.ipcRenderer.sendSync('unregist-device-connect-status');
  }

  refreshDeviceStatus(): void {
    this.appDataService.refreshDeviceList();
    this.deviceList = this.appDataService.getDeviceList();
  }

  public clickSaveFile(): void {
    const message = {
      kind: 'save'
    };
    this.broadcaster.broadcast('activity', message);
    this.broadcaster.broadcast('application', message);
  }

  public clickSendFile(): void {
    const message = {
      kind: 'send-device'
    };
    this.broadcaster.broadcast('activity', message);
    this.broadcaster.broadcast('application', message);
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







}
