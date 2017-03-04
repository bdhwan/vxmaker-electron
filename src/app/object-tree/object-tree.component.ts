import { Component, OnInit, ViewChild , Input, Output, EventEmitter} from '@angular/core';

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
    console.log("select data = " + JSON.stringify(Object.keys(event.node.data)));
    this.selectedNode = event.node.data;

    this.onSelectNode.emit(this.selectedNode.id);
  }

  



  addNode(): void {

    console.log("addNode ");

    var id = new Date().getTime();
    var newNode =
      {
        id: id,
        name: id + "",
        children: []
      }

    if (!this.selectedNode.children) {
      this.selectedNode.children = [];
    }

    this.selectedNode.children.push(newNode);
    this.tree.treeModel.update();

  }

  ngOnInit() {

  }


  public setObjectData(data): void {
    this.nodes = data;
    this.tree.treeModel.update();


    // this.tree.treeModel.setActiveNode(target,true,false);

    //  this.tree.
    if (!this.selectedNode) {
      var target = this.nodes[0];
      console.log("target = " + target);
      this.tree.treeModel._setActiveNodeSingle(target, true);
      this.selectedNode = target;
      this.onSelectNode.emit(this.selectedNode.id);
    }

  }

}
