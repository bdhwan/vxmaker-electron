import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-object-property',
  templateUrl: './object-property.component.html',
  styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnInit {

  constructor() { }


  data;

  ngOnInit() {
  }


  public setObjectData(data:any){
    this.data = data;
    console.log("data  ="+this.data);
  }

}
