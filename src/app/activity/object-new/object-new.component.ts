import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BroadcastService } from '../../service/broadcast.service';


@Component({
  selector: 'app-object-new',
  templateUrl: './object-new.component.html',
  styleUrls: ['./object-new.component.css']
})
export class ObjectNewComponent implements OnInit {

  @Input() prefix: any;
  objectTypeData = [];



  constructor(private broadcaster: BroadcastService) {

  }

  ngOnInit() {

  }

  public setObjectTypeData(objectTypeData) {
    this.objectTypeData = objectTypeData;
  }




  clickResource() {
  }


  clickNewObject(type) {
    console.log("clickNewObject -" + type);
    const message = {
      kind: 'new-object',
      type: type
    };
    this.broadcaster.broadcast('activity', message);
  }



  clickPSD() {
    const message = {
      kind: 'select-psd',
    };
    this.broadcaster.broadcast('activity', message);
  }

}
