import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { ApplicationDataServiceService } from '../../../service/application-data-service.service';
import { LottieAnimationViewComponent } from '../../lottie-animation-view/lottie-animation-view.component';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-preview-object',
  templateUrl: './preview-object.component.html',
  entryComponents: [LottieAnimationViewComponent],
  styleUrls: ['./preview-object.component.css']
})
export class PreviewObjectComponent implements OnInit {

  @Input() prefix: string;
  @Input() objectData: any;
  @Output() onShowResourceDialog = new EventEmitter<string>();

  @ViewChild('videoView') videoView;
  @ViewChild('lottieView') lottieView: LottieAnimationViewComponent;

  applicationFolderPath;
  currentComponent = null;

  state: any;
  zoom;

  constructor(private appDataService: ApplicationDataServiceService, private elementRef: ElementRef, private resolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    this.state = this.appDataService.findStateByObjectId(this.objectData.id);
    this.applicationFolderPath = this.appDataService.getApplicationPath();
    this.zoom = this.appDataService.getZoom();
  }



  getFontStyle() {

    // const lineSpacingExtra = (this.objectData.textSize * 1.333 + this.objectData.lineSpacingExtra) * this.zoom;

    const lineSpacingExtra = (Number(this.objectData.textSize) * 1.3333 + Number(this.objectData.lineSpacingExtra)) * this.zoom;

    const cssObject = {

      'font-family': this.objectData.family + '-' + this.objectData.variant,
      'font-size': Number(this.objectData.textSize * this.zoom) + 'pt',
      'color': this.objectData.textColor,
      'line-height': (lineSpacingExtra) + 'px',
      'letter-spacing': Number(this.objectData.letterSpacing * this.zoom) + 'px',
      'text-align': this.objectData.textAlign
    };
    // console.log('cssObejct = ' + JSON.stringify(cssObject));
    return cssObject;
  }

  convertReadableString(text) {
    let readable = '';
    if (!text) {
      return '';
    }
    for (let i = 0; i < text.length; ++i) {
      const code = text.charCodeAt(i);
      if (code === 10) {
        readable += '<br>';
      } else if (code === 13) {

      } else {
        readable += text[i];
      }
    }
    return readable;
  }

  getObjectStyle() {
    if (this.objectData.type === 'LottieAnimationView') {
      if (this.objectData.dataUrl) {
        // const url = this.prefix + this.applicationFolderPath + '/' + this.objectData.dataUrl;
        const url = this.objectData.dataUrl;
        if (this.lottieView) {
          this.lottieView.setDataUrl(url);
        }
      }
    }

    this.state = this.appDataService.findStateByObjectId(this.objectData.id);
    if (this.state) {
      return this.appDataService.getObjectStyle(this.state);
    } else {
      return null;
    }
  }


}
