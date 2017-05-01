import { Component, OnInit, OnDestroy, NgZone, Output, EventEmitter  } from '@angular/core';

import { ApplicationDataServiceService } from '../../service/application-data-service.service';


declare var electron: any;



@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.css']
})
export class DeviceStatusComponent implements OnInit, OnDestroy {

  deviceList = [];

  @Output() onClickSendDevice = new EventEmitter<string>();

  constructor(public zone: NgZone,  private appDataService: ApplicationDataServiceService) { }

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

  public clickSendFile(): void {
    this.onClickSendDevice.emit('send');

    // this.appDataService.saveActivityData
    // this.appDataService.sendFileToDevice();
  }

}
