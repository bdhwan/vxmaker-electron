import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { ApplicationDataServiceService } from '../../service/application-data-service.service';

@Component({
  selector: 'app-event-list-cell',
  templateUrl: './event-list-cell.component.html',
  styleUrls: ['./event-list-cell.component.css']
})
export class EventListCellComponent implements OnInit {
  @Input() aEvent: any;

  @Output() onClickDetailEvent = new EventEmitter<string>();
  @Output() onClickDeleteEvent = new EventEmitter<string>();
  constructor(private appDataService: ApplicationDataServiceService) { }

  ngOnInit() {
  }


  clickDeleteEvent($event, triggerEvent) {
    $event.stopPropagation();
    console.log('clickDeleteEvent =' + JSON.stringify(triggerEvent));
    this.onClickDeleteEvent.emit(JSON.stringify(triggerEvent));
  }


  clickDetailEvent($event, triggerEvent) {
    $event.stopPropagation();
    console.log('clickDetailEvent =' + JSON.stringify(triggerEvent));
    this.onClickDetailEvent.emit(JSON.stringify(triggerEvent));
  }

  clickDeleteEventBy($event) {
    this.onClickDeleteEvent.emit($event);
  }


  clickDetailEventBy($event) {
    this.onClickDetailEvent.emit($event);
  }


  getIcon(type) {
    return this.appDataService.getIconSmall(type);
  }



  getTriggerEventTypeIcon(type) {
    return this.appDataService.getTriggerEventIcon(type);
  }

  getImplEventTypeIcon(type) {
    return this.appDataService.getImplEventIcon(type);
  }





  getObjectData(objectId) {
    return this.appDataService.findObjectById(objectId);
  }




  getAfterAnimationEvent() {
    if (this.aEvent.implEvent.type === 'stageChange') {
      return this.appDataService.findTriggerEventByAfterTriggerEventId(this.aEvent.implEvent.id);
    }
    return null;
  }

  getCurrentStageId() {
    return this.appDataService.selectedStage.id;
  }
}
