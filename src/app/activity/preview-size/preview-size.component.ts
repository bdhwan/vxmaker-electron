import { Component, OnInit } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'


@Component({
  selector: 'app-preview-size',
  templateUrl: './preview-size.component.html',
  styleUrls: ['./preview-size.component.css']
})
export class PreviewSizeComponent implements OnInit {

  zoom;

  constructor(private appDataService: ApplicationDataServiceService) { }

  ngOnInit() {
    this.zoom = this.appDataService.getZoom()*100;
  }

  changeZoom(){
    this.appDataService.setZoom(this.zoom/100);
  }





}
