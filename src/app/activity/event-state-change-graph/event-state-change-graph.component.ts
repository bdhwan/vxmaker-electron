import { Component, ViewChild, EventEmitter, OnInit, AfterViewInit, Output, Input, ElementRef } from '@angular/core';


@Component({
  selector: 'app-event-state-change-graph',
  templateUrl: './event-state-change-graph.component.html',
  styleUrls: ['./event-state-change-graph.component.css']
})
export class EventStateChangeGraphComponent implements OnInit, AfterViewInit {

  @Input('stateEventData') stateEventData;
  @Input('graphSize') graphSize;
  @Input('paddingSize') paddingSize;
  @Input('needHandler') needHandler;
  @ViewChild('myCanvas') myCanvas;

  @Output() onChangeGraph = new EventEmitter<string>();


  context: CanvasRenderingContext2D;

  w = 200;
  h = 200;
  p = 0;

  startX;
  startY;
  beforeX;
  beforeY;

  handlerRadius = 10;

  isSelectedLeftPoint;
  isSelectedRightPoint;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {

  }


  ngAfterViewInit() {
    this.w = this.graphSize;
    this.h = this.graphSize;
    if (this.paddingSize) {
      this.p = this.paddingSize;
    }
    this.makeGraphe();
  }


  makeGraphe() {
    const canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext('2d');

    this.updateGraph();
  }



  public updateGraph() {

    const ctx = this.context;

    ctx.clearRect(0, 0, this.w, this.h);

    // ctx.rect(this.p, this.p, this.w - this.p * 2, this.h - this.p * 2);
    // ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.p, this.h - this.p);
    ctx.bezierCurveTo(this.p + this.stateEventData.cubicValue[0] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[1]) * (this.h - this.p * 2), this.p + this.stateEventData.cubicValue[2] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[3]) * (this.h - this.p * 2), this.w - this.p, this.p);
    ctx.stroke();
    ctx.closePath();

    if (this.needHandler) {

      ctx.beginPath();
      ctx.moveTo(this.p, this.h - this.p);
      ctx.lineTo(this.w - this.p, this.p);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(this.p, this.h - this.p);
      ctx.lineTo(this.p + this.stateEventData.cubicValue[0] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[1]) * (this.h - this.p * 2));
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(this.p + this.stateEventData.cubicValue[0] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[1]) * (this.h - this.p * 2), this.handlerRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(this.w - this.p, this.p);
      ctx.lineTo(this.p + this.stateEventData.cubicValue[2] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[3]) * (this.h - this.p * 2));
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(this.p + this.stateEventData.cubicValue[2] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[3]) * (this.h - this.p * 2), this.handlerRadius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }








  mouseDown(event: MouseEvent) {

    this.startX = event.offsetX - this.p;
    this.startY = event.offsetY - this.p;
    this.beforeX = event.offsetX - this.p;
    this.beforeY = event.offsetY - this.p;
    const distancLeft = Math.sqrt(Math.pow(this.startX - this.stateEventData.cubicValue[0] * (this.w - this.p * 2), 2) + Math.pow(this.startY - (1 - this.stateEventData.cubicValue[1]) * (this.h - this.p * 2), 2));
    const distancRight = Math.sqrt(Math.pow(this.startX - this.stateEventData.cubicValue[2] * (this.w - this.p * 2), 2) + Math.pow(this.startY - (1 - this.stateEventData.cubicValue[3]) * (this.h - this.p * 2), 2));
    this.isSelectedLeftPoint = false;
    this.isSelectedRightPoint = false;

    if (distancLeft < this.handlerRadius * 3) {
      this.isSelectedLeftPoint = true;
    } else if (distancRight < this.handlerRadius * 3) {
      this.isSelectedRightPoint = true;
    }

  }


  mouseMove(event: MouseEvent) {

    if (!this.isSelectedLeftPoint && !this.isSelectedRightPoint) {
      return;
    }
    const currentX = event.offsetX - this.p;
    const currentY = event.offsetY - this.p;

    const differX = (this.beforeX - currentX);
    const differY = (this.beforeY - currentY);

    if (this.isSelectedLeftPoint) {
      this.stateEventData.cubicValue[0] = Math.round((Number(this.stateEventData.cubicValue[0]) - (differX / (this.w-this.p*2))) * 1000) / 1000;
      this.stateEventData.cubicValue[1] = Math.round((Number(this.stateEventData.cubicValue[1]) + (differY / (this.h-this.p*2))) * 1000) / 1000;
    } else if (this.isSelectedRightPoint) {
      this.stateEventData.cubicValue[2] = Math.round((Number(this.stateEventData.cubicValue[2]) - (differX / (this.w-this.p*2))) * 1000) / 1000;
      this.stateEventData.cubicValue[3] = Math.round((Number(this.stateEventData.cubicValue[3]) + (differY / (this.h-this.p*2))) * 1000) / 1000;
    }

    this.updateGraph();
    this.beforeX = currentX;
    this.beforeY = currentY;
    this.onChangeGraph.emit('update');

  }

  mouseUp(event: MouseEvent) {

    this.isSelectedLeftPoint = false;
    this.isSelectedRightPoint = false;
  }



}
