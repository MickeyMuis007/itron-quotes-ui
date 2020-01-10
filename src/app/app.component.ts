import { Component } from '@angular/core';
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";

interface FoodNode {
  name: string;
  url: string,
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: "Material",
    url: "material",
    children: [
      { name: "Side Nav", url: "material/side-nav" }
    ]
  }, {
    name: "MDB",
    url: "mdb",
    children: [
      {
        name: "Buttons",
        url: "mdb/button",
        children: [
          { name : "Basic", url: "mdb/button/basic"}
        ]
      }
    ]
  }
]

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      url: node.url,
      level: level
    }
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

}
