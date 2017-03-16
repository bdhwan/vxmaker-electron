import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import * as glob from "../../globals";


@Component({
  selector: 'app-preview-object',
  templateUrl: './preview-object.component.html',
  styleUrls: ['./preview-object.component.css']
})
export class PreviewObjectComponent implements OnInit {

  prefix = glob.imgPrefix;

  @Input() objectData: any;

  constructor() { }

  ngOnInit() {

  }

}
