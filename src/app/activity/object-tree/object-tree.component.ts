import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { TreeModule, TreeComponent } from 'angular2-tree-component';
import { ApplicationDataServiceService } from '../../service/application-data-service.service'



@Component({
  selector: 'app-object-tree',
  templateUrl: './object-tree.component.html',
  styleUrls: ['./object-tree.component.css']
})
export class ObjectTreeComponent implements OnInit {


  @ViewChild(TreeComponent)
  private tree: TreeComponent;
  @Input() prefix: any;
  @Input() viewMode: any;


  options = {
    allowDrag: true,
    allowDrop: (element, to) => {
      return to.parent.hasChildren;
    }
  };

  nodes = [];
  selectedNode;


  @Output() onSelectNode = new EventEmitter<string>();
  @Output() onChangeNode = new EventEmitter<string>();


  constructor(private appDataService: ApplicationDataServiceService) { }



  selectNode($event): void {
    // console.log("select data = " + JSON.stringify(Object.keys(event.node.data)));
    this.selectedNode = $event.node.data;
    this.onSelectNode.emit(this.selectedNode.id);
  }


  changeNode($event): void {
    $event.node.parentId = $event.to.parent.id;
    this.onChangeNode.emit();
  }


  getIcon(type) {
    return this.appDataService.getIconSmall(type);
  }


  ngOnInit() {

  }

  public focusDrillDown(): void {
    this.tree.treeModel.focusDrillDown();
  }

  public expandAll(): void {
    this.tree.treeModel.expandAll();
  }

  public updateTreeModel(): void {
    this.tree.treeModel.update();
  }

  public selectObjectNode(target): void {
    this.tree.treeModel._setActiveNodeSingle(target, true);
    this.selectedNode = target;
    this.onSelectNode.emit(this.selectedNode.id);
  }

  public initObjectData(): void {

    this.nodes = this.appDataService.getActivityData().objectList;
    this.tree.treeModel.update();
    //  this.tree.
    // if (!this.selectedNode) {
    //   const target = this.nodes[0];
    //   this.tree.treeModel._setActiveNodeSingle(target, true);
    //   this.selectedNode = target;
    //   this.onSelectNode.emit(this.selectedNode.id);
    // }

    const self = this;

    setTimeout(function () {
      console.log('will expand all');
      self.expandAll();
    }, 10);
  }


}
