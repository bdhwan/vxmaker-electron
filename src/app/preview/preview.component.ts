import { Component, OnInit } from '@angular/core';
import {DndModule} from 'ng2-dnd';


@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

   simpleDrop: any = null;

  constructor() { }

  ngOnInit() {
  }

}
