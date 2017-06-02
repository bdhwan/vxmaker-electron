import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, Injector } from '@angular/core';
declare let require: any;
const bodymovin: any = require('bodymovin/build/player/bodymovin.js');

@Component({
  selector: 'app-lottie-animation-view',
  templateUrl: './lottie-animation-view.component.html',
  styleUrls: ['./lottie-animation-view.component.css']
})
export class LottieAnimationViewComponent implements OnInit {


  // @Input() options: any;
  @Input() width: number;
  @Input() height: number;

  // @Output() animCreated: any = new EventEmitter();

  @ViewChild('lavContainer') lavContainer: ElementRef;

  public viewWidth: string;
  public viewHeight: string;
  private _options: any;
  private url: string;
  private anim;


  ngOnInit() {

  }


  public setDataUrl(url): void {
    if (this.url !== url) {
      this.url = url;
      if (this.url) {
        // if (this.anim) {
        //   this.anim.stop();
        // }
        bodymovin.destroy();
        this.resetAnimator();
      }
    }
  }

  public resetAnimator() {
    this._options = {
      container: this.lavContainer.nativeElement,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: this.url
    };
    this.anim = bodymovin.loadAnimation(this._options);
    // this.anim.play();
  }

}
