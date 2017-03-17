import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-object-new',
  templateUrl: './object-new.component.html',
  styleUrls: ['./object-new.component.css']
})
export class ObjectNewComponent implements OnInit {

  @Output() onClickNewObject = new EventEmitter<string>();
  @Output() onChangeTreeData = new EventEmitter<any>();


  constructor() { }

  ngOnInit() {

  }

  objectTypeData =[];

  public setObjectTypeData(objectTypeData:any){
    this.objectTypeData = objectTypeData;
  }
  

  clickNewObject(type:string){

    console.log("clickNewObject -"+type);
    this.onClickNewObject.emit(type);
    
  }

}
