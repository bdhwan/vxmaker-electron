import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationDataServiceService } from '../../../service/application-data-service.service'



import * as glob from "../../../globals";


@Component({
  selector: 'app-preview-object',
  templateUrl: './preview-object.component.html',
  styleUrls: ['./preview-object.component.css']
})
export class PreviewObjectComponent implements OnInit {

  @ViewChild('videoView') videoView;




  prefix = glob.imgPrefix;
  applicationFolderPath;


  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;



  @Input() objectData: any;
  @Output() onShowResourceDialog = new EventEmitter<string>();

  state: any;
  zoom;
  lottieUrl = 'assets/sample/processing.json';

  constructor(private appDataService: ApplicationDataServiceService, private elementRef: ElementRef) {
    this.lottieConfig = {
      path: this.lottieUrl,
      autoplay: true,
      loop: true
    };
  }



  clickTest() {
    console.log("clickTest");
  }



  ngOnInit() {
    this.state = this.appDataService.findStateByObjectId(this.objectData.id);
    this.applicationFolderPath = this.appDataService.getApplicationPath();
  }




  getObjectStyle() {


    if (this.objectData.type === 'LottiView') {
      if (this.objectData.dataUrl) {
        const url = this.prefix + this.applicationFolderPath + '/' + this.objectData.dataUrl;
        this.lottieConfig['path'] = url;
      } else {
        this.lottieConfig['path'] = 'assets/sample/heart.json';
      }
    }




    this.state = this.appDataService.findStateByObjectId(this.objectData.id);
    if (this.state) {
      return this.appDataService.getObjectStyle(this.state);
    } else {
      return null;
    }
  }


  handleAnimation(anim: any) {
    this.anim = anim;
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }











}
