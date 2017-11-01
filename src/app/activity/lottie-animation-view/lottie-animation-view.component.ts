import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, Injector } from '@angular/core';
declare let require: any;
const bodymovin: any = require('bodymovin/build/player/bodymovin.js');
import { ApplicationDataServiceService } from '../../service/application-data-service.service';


@Component({
  selector: 'app-lottie-animation-view',
  templateUrl: './lottie-animation-view.component.html',
  styleUrls: ['./lottie-animation-view.component.css']
})
export class LottieAnimationViewComponent implements OnInit {


  @Input() initUrl;
  @Input() width: number;
  @Input() height: number;

  // @Output() animCreated: any = new EventEmitter();

  @ViewChild('lavContainer') lavContainer: ElementRef;

  public viewWidth: string;
  public viewHeight: string;
  private _options: any;
  private url: string;
  private anim;
  animationData;

  ngOnInit() {
    console.log("set lottie = " + this.initUrl);
    if (this.initUrl) {
      this.setDataUrl(this.initUrl);
    }
  }


  constructor(private appDataService: ApplicationDataServiceService) {

  }


  public setDataUrl(url): void {
    if (this.url !== url) {
      this.url = url;
      if (this.url) {
        if (this.anim) {
          this.anim.stop();
        }
        this.resetAnimator();
      }
    }
  }

  public resetAnimator() {
    const temp = JSON.stringify(this.appDataService.readFileSync(this.url));
    // const temp2 = JSON.stringify(temp);
    const start = temp.indexOf(',animationData={');
    console.log("start postion =" + start);
    console.log("this.url = " + this.url);

    if (start === -1) {
      this.animationData = JSON.parse(temp);
    } else {
      const end = temp.indexOf('},renderer=');
      this.animationData = JSON.parse(temp.substr(start - 1, end));

    }
    // if (start > 0) {
    //   this.animationData = JSON.parse(JSON.stringify(temp.sub));
    // }
    // else {
    //   this.animationData = JSON.parse(JSON.stringify(temp));
    // }
    if (!this._options) {
      this._options = {
        container: this.lavContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: this.animationData
      };
      this.anim = bodymovin.loadAnimation(this._options);
    }
    // this.anim.setData(this.lavContainer.nativeElement,this.animationData);
    this.anim.play();
  }

}
