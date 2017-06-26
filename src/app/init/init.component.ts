import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ApplicationDataServiceService } from '../service/application-data-service.service';


@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appDataService: ApplicationDataServiceService
  ) { }

  ngOnInit() {
    this.appDataService.changeWindowSize(800, 502, true);
  }


  clickDownloadApp(url) {
    this.appDataService.openUrl(url);
  }

}
