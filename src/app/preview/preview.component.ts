import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';



@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @ViewChild('mainScreen') elementView: ElementRef;


  constructor() { }

  ngOnInit() {

    console.log(" this.viewHeight = " + this.elementView.nativeElement.offsetHeight);

  }


  onResize(event) {

    console.log("event.target.innerWidth =" + event.target.innerWidth + ", event.target.innerHeight=" + event.target.innerHeight);
    console.log(" this.viewHeight = " + this.elementView.nativeElement.offsetHeight);

  }



  public setObjectData(data): void {
    
  }



}
