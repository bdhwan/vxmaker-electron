import { Component, ViewChild, EventEmitter, OnInit, Output, Input, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-event-state-change-timeline',
  templateUrl: './event-state-change-timeline.component.html',
  styleUrls: ['./event-state-change-timeline.component.css']
})
export class EventStateChangeTimelineComponent implements OnInit, AfterViewInit {


  @Input('stateEventData') stateEventData;
  @Input('timeLineSizeW') timeLineSizeW;
  @Input('timeLineSizeH') timeLineSizeH;
  @Input('maxTime') maxTime;
  @Input('timeLinePadding') timeLinePadding;

  @ViewChild('myCanvas') myCanvas;

  @Output() onChangeTimeLine = new EventEmitter<string>();



  isSelectedLeftPoint;
  isSelectedRightPoint;
  isSelectedCenter;
  isDown;

  context: CanvasRenderingContext2D;

  p = 10;

  startX;
  startY;
  beforeX;
  beforeY;

  handlerRadius = 5;

  constructor() { }
  ngOnInit() {


  }

  ngAfterViewInit() {
    this.makeGraphe();
  }


  makeGraphe() {
    const canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext('2d');
    this.p = Number(this.timeLinePadding);
    this.updateGraph();
  }



  public updateGraph() {

    const ctx = this.context;


    ctx.clearRect(0, 0, this.timeLineSizeW, this.timeLineSizeH);
       // 눈금
    for (var i = 0; i < 30; i++) {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.p + 10*i, 1);
    ctx.lineTo(this.p + 10*i, (this.timeLineSizeH - this.p * 2)-2 );
    ctx.strokeStyle = "#ececec";
    ctx.stroke();
    }
    ctx.lineWidth = 1;
    ctx.rect(this.p, this.p, this.timeLineSizeW - this.p * 2, this.timeLineSizeH - this.p * 2);
    ctx.strokeStyle = "#898989";
    ctx.stroke();



 



    //draw duration
    const contentW = this.timeLineSizeW - this.p * 2;
    const contentH = this.timeLineSizeH - this.p * 2;

    const left = this.stateEventData.startDelay / this.maxTime * contentW;
    const duration = this.stateEventData.duration / this.maxTime * contentW;

    //타임라인 왼쪽 핸들러
    ctx.fillStyle = '#288097';
    ctx.fillRect(this.p + left, this.p, this.handlerRadius, contentH);

    //타임라인
    ctx.fillStyle = '#46a2ba';
    ctx.fillRect(this.p + left + this.handlerRadius, this.p, duration - this.handlerRadius * 2, contentH);

    //타임라인 오른쪽 핸들러
    ctx.fillStyle = '#288097';
    ctx.fillRect(this.p + left + duration - this.handlerRadius, this.p, this.handlerRadius, contentH);

  }


  mouseDown(event: MouseEvent) {

    this.isDown = true;
    this.isSelectedLeftPoint = false;
    this.isSelectedRightPoint = false;
    this.isSelectedCenter = false;

    this.startX = event.offsetX - this.p;
    this.startY = event.offsetY - this.p;
    this.beforeX = event.offsetX - this.p;
    this.beforeY = event.offsetY - this.p;

    //draw duration
    const contentW = this.timeLineSizeW - this.p * 2;
    const contentH = this.timeLineSizeH - this.p * 2;

    const left = this.stateEventData.startDelay / this.maxTime * contentW;
    const duration = this.stateEventData.duration / this.maxTime * contentW;


    const distancLeft = Math.sqrt(Math.pow(this.startX - left, 2));
    const distancRight = Math.sqrt(Math.pow(this.startX - (left + duration), 2));

    this.isSelectedLeftPoint = false;
    this.isSelectedRightPoint = false;

    if (distancLeft < this.handlerRadius) {
      this.isSelectedLeftPoint = true;
    } else if (distancRight < this.handlerRadius) {
      this.isSelectedRightPoint = true;
    } else {
      this.isSelectedCenter = true;
    }

  }


  mouseMove(event: MouseEvent) {

    if (!this.isSelectedLeftPoint && !this.isSelectedRightPoint && !this.isSelectedCenter) {
      return;
    }

    const currentX = event.offsetX - this.p;
    const currentY = event.offsetY - this.p;

    const differX = (this.beforeX - currentX);
    const differY = (this.beforeY - currentY);

    //draw duration
    const contentW = this.timeLineSizeW - this.p * 2;
    const contentH = this.timeLineSizeH - this.p * 2;

    if (this.isSelectedLeftPoint) {
      const exStart = Math.round((Number(this.stateEventData.startDelay) - (differX / contentW * this.maxTime)));
      if (exStart < 0) {
        this.stateEventData.startDelay = 0;
      }
      else {
        this.stateEventData.startDelay = exStart;
        this.stateEventData.duration = Math.round((Number(this.stateEventData.duration) + (differX / contentW * this.maxTime)));
      }
    } else if (this.isSelectedRightPoint) {
      this.stateEventData.duration = Math.round((Number(this.stateEventData.duration) - (differX / contentW * this.maxTime)));
    } else {
      const exStart = Math.round((Number(this.stateEventData.startDelay) - (differX / contentW * this.maxTime)));
      if (exStart < 0) {
        this.stateEventData.startDelay = 0;
      } else {
        this.stateEventData.startDelay = exStart;
      }
    }

    this.updateGraph();
    this.beforeX = currentX;
    this.beforeY = currentY;

  }

  mouseUp(event: MouseEvent) {

    if (!this.isDown) {
      return;
    }
    this.isSelectedLeftPoint = false;
    this.isSelectedRightPoint = false;
    this.isSelectedCenter = false;
    this.isDown = false;

    console.log("call onChangeTimeLine");
    this.onChangeTimeLine.emit('change');


  }



}
