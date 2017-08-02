import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';

@Component({
  selector: 'app-event-stage-change-cell',
  templateUrl: './event-stage-change-cell.component.html',
  styleUrls: ['./event-stage-change-cell.component.css']
})
export class EventStageChangeCellComponent implements OnInit, AfterViewInit {


  context: CanvasRenderingContext2D;
  @ViewChild('myCanvasS') myCanvasS;
  @ViewChild('myCanvas') myCanvas;
  
  @Input('stateEventData') stateEventData;


  w = 200;
  h = 200;

  startX;
  startY;
  beforeX;
  beforeY;

  handlerRadius = 10;
  leftPoint = { 'x': 0.2, 'y': 0.8 };
  rightPoint = { 'x': 0.64, 'y': 0.21 };

  isSelectedLeftPoint;
  isSelectedRightPoint;

  isExpanded;

  constructor(private elementRef: ElementRef, private appDataService: ApplicationDataServiceService) { }

  ngOnInit() {
    console.log('state event data = ' + JSON.stringify(this.stateEventData));
  }


  getObjectName(objectId) {
    return this.appDataService.findObjectById(objectId);
  }


  toggleDetail() {
    this.isExpanded = !this.isExpanded;
    console.log("isExpanded = " + this.isExpanded);
    if (this.isExpanded) {

    }
  }


  makeGraphe() {
    const canvas = this.myCanvas.nativeElement;
    this.context = canvas.getContext('2d');
    this.w = this.myCanvas.nativeElement.getAttribute('canvasW');
    this.h = this.myCanvas.nativeElement.getAttribute('canvasH');
    this.updateGraph();
  }

  ngAfterViewInit() {
    this.makeGraphe();

  }

  updateGraph() {

    const ctx = this.context;
    const left = this.leftPoint;
    const right = this.rightPoint;

    ctx.clearRect(0, 0, this.w, this.h);

    ctx.beginPath();
    ctx.moveTo(0, this.h);
    ctx.bezierCurveTo(left.x * this.w, (1 - left.y) * this.h, right.x * this.w, (1 - right.y) * this.h, this.w, 0);
    ctx.stroke();
    ctx.closePath();


    let needHandler = true;
    if (this.w < 110) {
      needHandler = false;
    }


    if (needHandler) {

      ctx.beginPath();
      ctx.moveTo(0, this.h);
      ctx.lineTo(this.w, 0);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(0, this.h);
      ctx.lineTo(left.x * this.w, (1 - left.y) * this.h);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.arc(left.x * this.w, (1 - left.y) * this.h, this.handlerRadius, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.closePath();

      ctx.beginPath();
      ctx.moveTo(this.w, 0);
      ctx.lineTo(right.x * this.w, (1 - right.y) * this.h);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(right.x * this.w, (1 - right.y) * this.h, this.handlerRadius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }








  mouseDown(event: MouseEvent) {

    this.startX = event.offsetX;
    this.startY = event.offsetY;
    this.beforeX = event.offsetX;
    this.beforeY = event.offsetY;
    const distancLeft = Math.sqrt(Math.pow(this.startX - this.leftPoint.x * this.w, 2) + Math.pow(this.startY - (1 - this.leftPoint.y) * this.h, 2));
    const distancRight = Math.sqrt(Math.pow(this.startX - this.rightPoint.x * this.w, 2) + Math.pow(this.startY - (1 - this.rightPoint.y) * this.h, 2));
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
    let currentX = event.offsetX;
    let currentY = event.offsetY;

    let differX = (this.beforeX - currentX);
    let differY = (this.beforeY - currentY);

    if (this.isSelectedLeftPoint) {
      this.leftPoint.x = this.leftPoint.x - differX / this.w;
      this.leftPoint.y = this.leftPoint.y + differY / this.h;
    } else if (this.isSelectedRightPoint) {
      this.rightPoint.x = this.rightPoint.x - differX / this.w;
      this.rightPoint.y = this.rightPoint.y + differY / this.h;
    }

    this.updateGraph();

    this.beforeX = currentX;
    this.beforeY = currentY;
  }

  mouseUp(event: MouseEvent) {

    this.isSelectedLeftPoint = false;
    this.isSelectedRightPoint = false;
  }


}
