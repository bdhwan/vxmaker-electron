import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter, ViewContainerRef, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { ApplicationDataServiceService } from '../../../service/application-data-service.service';
import { LottieAnimationViewComponent } from '../../lottie-animation-view/lottie-animation-view.component';



@Component({
  selector: 'app-preview-object',
  templateUrl: './preview-object.component.html',
  entryComponents: [LottieAnimationViewComponent],
  styleUrls: ['./preview-object.component.css']
})
export class PreviewObjectComponent implements OnInit {

  @ViewChild('videoView') videoView;
  @ViewChild('lottieView') lottieView: LottieAnimationViewComponent;

  @Input() prefix: any;
  applicationFolderPath;

  currentComponent = null;


  @Input() objectData: any;
  @Output() onShowResourceDialog = new EventEmitter<string>();

  state: any;
  zoom;
  // lottieUrl = 'assets/sample/processing.json';

  constructor(private appDataService: ApplicationDataServiceService, private elementRef: ElementRef, private resolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    this.state = this.appDataService.findStateByObjectId(this.objectData.id);
    this.applicationFolderPath = this.appDataService.getApplicationPath();
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
