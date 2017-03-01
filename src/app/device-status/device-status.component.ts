import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';



declare var electron: any;



@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.css']
})
export class DeviceStatusComponent implements OnInit, OnDestroy {

  deviceList = [];

  constructor(public zone: NgZone) { }

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
    this.deviceList = electron.ipcRenderer.sendSync('get-device-list');
  }

}
