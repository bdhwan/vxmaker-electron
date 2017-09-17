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
  objectTypeData = [];
  @Input() prefix: any;


  constructor(private broadcaster: BroadcastService) { }

  ngOnInit() {

  }



  public setObjectTypeData(objectTypeData: any) {
    this.objectTypeData = objectTypeData;

  }

  clickResource() {

    // this.onShowResourceDialog.emit("image");
  }


  clickNewObject(type: string) {

    console.log("clickNewObject -" + type);
    // this.onClickNewObject.emit(type);

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
