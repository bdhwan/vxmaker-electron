import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'
import { BroadcastService } from '../../service/broadcast.service';

@Component({
  selector: 'app-event-detail-stage-change',
  templateUrl: './event-detail-stage-change.component.html',
  styleUrls: ['./event-detail-stage-change.component.css']
})
export class EventDetailStageChangeComponent implements OnInit, AfterViewInit {

  @Input() viewMode: string;
  @Input() prefix: string;

  @Output() onNewAfterAnimationEvent = new EventEmitter<string>();
  @Output() onCloseEvent = new EventEmitter<string>();

  selectedTriggerEvent;
  selectedImplementEvent;

  stateEventList;

  maxTotalTime;
  initTotalTime = 0;

  presetInterpolatorList = [
    {
      'name': 'linear',
      'value': [0, 0, 1, 1]
    },
    {
      'name': 'ease',
      'value': [0.25, 0.1, 0.25, 1]
    },
    //ease-in
    {
      'name': 'easeIn',
      'value': [0.42, 0, 1, 1]
    },
    {
      'name': 'easeInQuad',
      'value': [0.55, 0.085, 0.68, 0.53]
    },
    {
      'name': 'easeInCubic',
      'value': [0.55, 0.055, 0.675, 0.19]
    },
    {
      'name': 'easeInQuart',
      'value': [0.895, 0.03, 0.685, 0.22]
    },
    {
      'name': 'easeInQuint',
      'value': [0.755, 0.05, 0.855, 0.06]
    },
    {
      'name': 'easeInSine',
      'value': [0.47, 0, 0.745, 0.715]
    },
    {
      'name': 'easeInExpo',
      'value': [0.95, 0.05, 0.795, 0.035]
    },
    {
      'name': 'easeInCirc',
      'value': [0.6, 0.04, 0.98, 0.335]
    },
    {
      'name': 'easeInBack',
      'value': [0.6, -0.28, 0.735, 0.045]
    },
    //ease-out

    {
      'name': 'easeOut',
      'value': [0, 0, 0.58, 1]
    },
    {
      'name': 'easeOutQuad',
      'value': [0.25, 0.46, 0.45, 0.94]
    },
    {
      'name': 'easeOutCubic',
      'value': [0.215, 0.61, 0.355, 1]
    },
    {
      'name': 'easeOutQuart',
      'value': [0.165, 0.84, 0.44, 1]
    },
    {
      'name': 'easeOutQuint',
      'value': [0.23, 1, 0.32, 1]
    },
    {
      'name': 'easeOutSine',
      'value': [0.39, 0.575, 0.565, 1]
    },
    {
      'name': 'easeOutExpo',
      'value': [0.19, 1, 0.22, 1]
    },
    {
      'name': 'easeOutCirc',
      'value': [0.075, 0.82, 0.165, 1]
    },
    {
      'name': 'easeOutBack',
      'value': [0.175, 0.885, 0.32, 1.275]
    },
    //ease-in-out
    {
      'name': 'easeInOut',
      'value': [0.42, 0, 0.58, 1]
    },
    {
      'name': 'easeInOutQuad',
      'value': [0.455, 0.03, 0.515, 0.955]
    },
    {
      'name': 'easeInOutCubic',
      'value': [0.645, 0.045, 0.355, 1]
    },
    {
      'name': 'easeInOutQuart',
      'value': [0.77, 0, 0.175, 1]
    },
    {
      'name': 'easeInOutQuint',
      'value': [0.86, 0, 0.07, 1]
    },
    {
      'name': 'easeInOutSine',
      'value': [0.445, 0.05, 0.55, 0.95]
    },
    {
      'name': 'easeInOutExpo',
      'value': [1, 0, 0, 1]
    },
    {
      'name': 'easeInOutCirc',
      'value': [0.785, 0.135, 0.15, 0.86]
    },
    {
      'name': 'easeInOutBack',
      'value': [0.68, -0.55, 0.265, 1.55]
    }
  ];


  constructor(private appDataService: ApplicationDataServiceService, private broadcaster: BroadcastService) { }


  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  getMaxTotalTime() {
    let tempTotalTime = 0;
    for (let i = 0; i < this.stateEventList.length; i++) {
      const time = Number(this.stateEventList[i].startDelay) + Number(this.stateEventList[i].duration);
      if (time > tempTotalTime) {
        tempTotalTime = time;
      }
    }
    return tempTotalTime + 500;
  }

  calculateMaxTotalTime() {

    const tempTotalTime = this.getMaxTotalTime();
    if (this.initTotalTime === 0) {
      this.initTotalTime = tempTotalTime + 1000;
    }


    if (this.initTotalTime > tempTotalTime) {
      this.maxTotalTime = this.initTotalTime;
    } else {
      this.maxTotalTime = tempTotalTime;
    }
    this.initTotalTime = this.maxTotalTime;
  }


  clickAddAfterAnimation() {

    const message = {
      kind: 'new-after-animation',
      implEventId: this.selectedImplementEvent.id
    };
    this.broadcaster.broadcast(this.viewMode, message);
  }

  haveAfterAnimation() {
    if (this.appDataService.findTriggerEventByAfterTriggerEventId(this.selectedImplementEvent.id)) {
      return true;
    } else {
      return false;
    }
  }

  clickCancel() {
    const message = {
      kind: 'close-event',
    };
    this.broadcaster.broadcast(this.viewMode, message);

  }

  clickDone() {
    console.log("done");
    const message = {
      kind: 'close-event',
    };
    this.broadcaster.broadcast(this.viewMode, message);
  }



  getAfterAnimation() {


  }


  getObjectName(objectId) {
    return this.appDataService.findObjectById(objectId);
  }

  onChangeInterpolator(interpolator, target) {
    target.cubicValue = interpolator.split(',').map(Number);
  }

  onChangeTimeLineFromStateCell(value) {
    console.log("ok here will update all");
    this.calculateMaxTotalTime();
  }

  public onChangeData() {

    this.selectedTriggerEvent = this.appDataService.getSelectedTriggerEvent();
    this.selectedImplementEvent = this.appDataService.getSelectedImplementEvent();

    if (this.selectedImplementEvent && this.selectedImplementEvent.type === 'stageChange') {
      this.selectedImplementEvent.fromStageName = this.appDataService.findStageByStageId(this.selectedImplementEvent.fromStageId).name;
      this.selectedImplementEvent.toStageName = this.appDataService.findStageByStageId(this.selectedImplementEvent.toStageId).name;
      this.stateEventList = this.appDataService.findStateChangeEventByImplementEventId(this.selectedImplementEvent.id);
      this.calculateMaxTotalTime();

    }

  }



  getObjectData(objectId) {
    return this.appDataService.findObjectById(objectId);
  }



  getIcon(type) {
    return this.appDataService.getIconSmall(type);
  }



  getTriggerEventTypeIcon(type) {
    return this.appDataService.getTriggerEventIcon(type);
  }

  getImplEventTypeIcon(type) {
    return this.appDataService.getImplEventIcon(type);
  }

}
