import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';



@Component({
  selector: 'app-object-property',
  templateUrl: './object-property.component.html',
  styleUrls: ['./object-property.component.css']
})
export class ObjectPropertyComponent implements OnInit {

  constructor(private http:Http) { 

  }


  selectedObject;
  selectedState;


  ngOnInit() {
     
  }

  getAllKeys(target) {
    return Object.keys(target);
  }

  toJson(target){
    return JSON.stringify(target);
  }


  public setSelectedObject(data: any) {
    this.selectedObject = data;
  }

  public setSelectedState(data: any) {
    this.selectedState = data;
  }



}


