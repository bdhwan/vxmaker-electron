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

  handlerRadius = 8;

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

    if (this.needHandler) {

      //가운데 기준선
      ctx.beginPath();
      ctx.strokeStyle = "#ececec";
      ctx.moveTo(this.p, this.h - this.p);
      ctx.lineTo(this.w - this.p, this.p);
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();

    }

    //그래프 곡선
    ctx.beginPath();
    ctx.strokeStyle = "#454545";
    
    ctx.moveTo(this.p, this.h - this.p);
    ctx.bezierCurveTo(this.p + this.stateEventData.cubicValue[0] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[1]) * (this.h - this.p * 2), this.p + this.stateEventData.cubicValue[2] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[3]) * (this.h - this.p * 2), this.w - this.p, this.p);
    if (this.needHandler) {
      ctx.lineWidth = 4;
    }
    else {
      ctx.lineWidth = 2;
    }
    ctx.stroke();
    ctx.closePath();


    if (this.needHandler) {



      //왼쪽 핸들러 직선
      ctx.beginPath();
      ctx.strokeStyle = "#898989";
      ctx.moveTo(this.p, this.h - this.p);
      ctx.lineTo(this.p + this.stateEventData.cubicValue[0] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[1]) * (this.h - this.p * 2));
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();

      //왼쪽 중심 원
      ctx.beginPath();
      ctx.strokeStyle = "#898989";
      ctx.fillStyle = "#fff";
      ctx.arc(this.p, this.h - this.p, this.handlerRadius * 0.6 , 0, 2 * Math.PI);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      ctx.fill();

      //왼쪽 핸들러 원
      ctx.beginPath();
      ctx.fillStyle = "#f08";
      ctx.arc(this.p + this.stateEventData.cubicValue[0] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[1]) * (this.h - this.p * 2), this.handlerRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.closePath();
      ctx.fill();



      //오른쪽 핸들러 직선
      ctx.beginPath();
      ctx.moveTo(this.w - this.p, this.p);
      ctx.lineTo(this.p + this.stateEventData.cubicValue[2] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[3]) * (this.h - this.p * 2));
      ctx.closePath();
      ctx.lineWidth = 2;
      ctx.stroke();

      //오른쪽 중심 원
      ctx.beginPath();
      ctx.fillStyle = "#fff";
      ctx.arc(this.w - this.p, this.p, this.handlerRadius * 0.6 , 0, 2 * Math.PI);
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.closePath();
      ctx.fill();

      //오른쪽 핸들러 원
      ctx.beginPath();
      ctx.fillStyle = "#0ab";
      ctx.arc(this.p + this.stateEventData.cubicValue[2] * (this.w - this.p * 2), this.p + (1 - this.stateEventData.cubicValue[3]) * (this.h - this.p * 2), this.handlerRadius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fill();
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

    if (distancLeft < this.handlerRadius * 5) {
      this.isSelectedLeftPoint = true;
    } else if (distancRight < this.handlerRadius * 5) {
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
      this.stateEventData.cubicValue[0] = Math.round((Number(this.stateEventData.cubicValue[0]) - (differX / (this.w - this.p * 2))) * 1000) / 1000;
      this.stateEventData.cubicValue[1] = Math.round((Number(this.stateEventData.cubicValue[1]) + (differY / (this.h - this.p * 2))) * 1000) / 1000;
    } else if (this.isSelectedRightPoint) {
      this.stateEventData.cubicValue[2] = Math.round((Number(this.stateEventData.cubicValue[2]) - (differX / (this.w - this.p * 2))) * 1000) / 1000;
      this.stateEventData.cubicValue[3] = Math.round((Number(this.stateEventData.cubicValue[3]) + (differY / (this.h - this.p * 2))) * 1000) / 1000;
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
