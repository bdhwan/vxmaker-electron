import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

declare var electron: any;

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit() {

    electron.ipcRenderer.sendSync('change-window', 800, 502, true);
    // console.log() 
  }


}
