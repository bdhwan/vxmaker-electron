import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BroadcastService } from '../../service/broadcast.service';


@Component({
  selector: 'app-object-new',
  templateUrl: './object-new.component.html',
  styleUrls: ['./object-new.component.css']
})
export class ObjectNewComponent implements OnInit {

  @Output() onClickNewObject = new EventEmitter<string>();
  @Output() onChangeTreeData = new EventEmitter<any>();
  @Output() onShowResourceDialog = new EventEmitter<string>();


  constructor(private broadcaster: BroadcastService) { }

  ngOnInit() {

  }

  objectTypeData = [];

  public setObjectTypeData(objectTypeData: any) {
    this.objectTypeData = objectTypeData;

    for (var i = 0; i < this.objectTypeData.length; i++) {
      console.log("type = " + JSON.stringify(this.objectTypeData[i]));
    }
  }

  clickResource() {

    this.onShowResourceDialog.emit("image");
  }


  clickNewObject(type: string) {

    console.log("clickNewObject -" + type);
    this.onClickNewObject.emit(type);

  }

  clickPSD() {


    const message = {
      kind: 'select-psd',
    };
    this.broadcaster.broadcast('activity', message);

  }

}
