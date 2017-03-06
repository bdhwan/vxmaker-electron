import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import { TreeModule, TreeComponent } from 'angular2-tree-component';


@Component({
  selector: 'app-object-tree',
  templateUrl: './object-tree.component.html',
  styleUrls: ['./object-tree.component.css']
})
export class ObjectTreeComponent implements OnInit {


  @ViewChild(TreeComponent)
  private tree: TreeComponent;


  @Output() onSelectNode = new EventEmitter<string>();
  @Output() onChangeNode = new EventEmitter<string>();


  constructor() { }

  options = {
    allowDrag: true,
    allowDrop: (element, to) => {
      return to.parent.hasChildren;
    }
  }



  nodes = [];



  selectedNode;

  selectNode(event): void {
    // console.log("select data = " + JSON.stringify(Object.keys(event.node.data)));
    this.selectedNode = event.node.data;
    this.onSelectNode.emit(this.selectedNode.id);
  }


  changeNode(event): void {
    // console.log("select data = " + JSON.stringify(Object.keys(event.node.data)));
    this.onChangeNode.emit();
  }




  ngOnInit() {

  }

  public updateTreeModel(): void {
    this.tree.treeModel.update();
  }

  public selectObjectNode(target): void {
    this.tree.treeModel._setActiveNodeSingle(target, true);
    this.selectedNode = target;
    this.onSelectNode.emit(this.selectedNode.id);
  }

  public setObjectData(data): void {
    this.nodes = data;
    this.tree.treeModel.update();
    //  this.tree.
    if (!this.selectedNode) {
      var target = this.nodes[0];
      this.tree.treeModel._setActiveNodeSingle(target, true);
      this.selectedNode = target;
      this.onSelectNode.emit(this.selectedNode.id);
    }
  }




}
