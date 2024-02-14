import { Component, Injectable, OnInit } from '@angular/core';
import { Categoria } from '../../entities/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';

export class TreeNode {
  categoria: Categoria;
  hijos?: TreeNode[];
}

export class TreeFlatNode {
  categoria: Categoria;
  level: number;
  expandable: boolean;
}




@Injectable({ providedIn: "root" })
export class ChecklistDatabase {
  dataChange = new BehaviorSubject<TreeNode[]>([]);
  treeData: any[];

  get data(): TreeNode[] {
    return this.dataChange.value;
  }

  constructor(private categoriaService: CategoriaService) {

    this.categoriaService.obtenerCategorias()
      .subscribe(categorias => {
        // Transformar categorías planas en estructura de árbol
        if (categorias) { // Verifica que categorias no sea undefined
          // Transformar categorías planas en estructura de árbol
          this.treeData = this.buildTree(categorias);
          this.initialize();
        } else {
          console.error('La llamada a categoriaService.obtenerCategorias() devolvió undefined.');
        } 
      });
      this.initialize();  

  }

  buildTree(categorias: Categoria[], parentId: number | null = null): TreeNode[] {
    const treeNodes: TreeNode[] = [];
    categorias
      .filter(categoria => categoria.parentId === parentId)
      .forEach(categoria => {
        const children = this.buildTree(categorias, categoria.id);
        const treeNode: TreeNode = { categoria };
        if (children.length) {
          treeNode.hijos = children;
        }
        treeNodes.push(treeNode);
      });
    return treeNodes;
  }

  
  initialize() {

    const data = this.treeData

    // Notify the change.
    this.dataChange.next(data);
  }

  public filter(filterText: string) {
    let filteredTreeData;
    if (filterText) {
      // Filter the tree
      function filter(array: any[], text: string) {
        const getChildren = (result: any[], object: { item: string; children: any[]; }) => {
          if (object.item .toLowerCase() === text.toLowerCase() ) {
            result.push(object);
            return result;
          }
          if (Array.isArray(object.children)) {
            const children = object.children.reduce(getChildren, []);
            if (children.length) result.push({ ...object, children });
          }
          return result;
        };

        return array.reduce(getChildren, []);
      }

      filteredTreeData = filter(this.treeData, filterText);
    } else {
      // Return the initial tree
      filteredTreeData = this.treeData;
    }

    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    // file node as children.
    const data = filteredTreeData;
    // Notify the change.
    this.dataChange.next(data);
  }
}


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar-producto.component.html',
  styleUrl: './buscar-producto.component.scss'
})
export class BuscarProductoComponent implements OnInit{

  categorias: TreeNode[] = [];
  //treeControl = new NestedTreeControl<TreeNode>(node => node.hijos);
  //dataSource = new MatTreeNestedDataSource<TreeNode>();

  checklistSelection = new SelectionModel<TreeFlatNode>(true /* multiple */);
  nestedNodeMap = new Map<TreeNode, TreeFlatNode>();
  flatNodeMap = new Map<TreeFlatNode, TreeNode>();
  treeFlattener: MatTreeFlattener<TreeNode, TreeFlatNode>;
  treeControl: FlatTreeControl<TreeFlatNode>;
  dataSource: MatTreeFlatDataSource<TreeNode, TreeFlatNode>;

  //constructor(private categoriaService: CategoriaService) { }
  constructor(private _database: ChecklistDatabase) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TreeFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
  
    _database.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }



  ngOnInit(): void {
    //this.obtenerCategorias();
  }

 /* obtenerCategorias(): void {

    
    this.categoriaService.obtenerCategorias()
      .subscribe(categorias => {
        // Transformar categorías planas en estructura de árbol
        this.categorias = this.buildTree(categorias);
        console.log("eeeo   " + this.categorias[0].categoria.nombre);
        console.log("eeeo   " + this.categorias[1].categoria.nombre);
        console.log("eeeo   " + this.categorias[2].categoria.nombre);
        console.log("eeeo   " + this.categorias[3].categoria.nombre);
        console.log("eeeo   " + this.categorias[4].categoria.nombre);
        console.log("eeeo   " + this.categorias[4].categoria.nombre);
        this.dataSource.data = this.categorias;
      });
  }
*/
  //hasChild = (_: number, node: TreeNode) => !!node.hijos && node.hijos.length > 0;


  getLevel = (node: TreeFlatNode) => node.level;

  isExpandable = (node: TreeFlatNode) => node.expandable;
  
  getChildren = (node: TreeNode): TreeNode[] => node.hijos ? node.hijos : [];
  
  hasChild = (_: number, _nodeData: TreeFlatNode) => _nodeData.expandable;
  
  hasNoContent = (_: number, _nodeData: TreeFlatNode) => _nodeData.categoria.nombre === "";
  


  transformer = (node: TreeNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.categoria === node.categoria
        ? existingNode
        : new TreeFlatNode();
    flatNode.categoria = node.categoria;
    flatNode.level = level;
    flatNode.expandable = !!node.hijos;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };




  private buildTree(categorias: Categoria[], parentId: number | null = null): TreeNode[] {
    const treeNodes: TreeNode[] = [];
    categorias
      .filter(categoria => categoria.parentId === parentId)
      .forEach(categoria => {
        const children = this.buildTree(categorias, categoria.id);
        const treeNode: TreeNode = { categoria };
        if (children.length) {
          treeNode.hijos = children;
        }
        treeNodes.push(treeNode);
      });
    return treeNodes;
  }

  todoItemSelectionToggle(node: TreeFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
  
    // Force update for the parent
    descendants.every(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }
  


  todoLeafItemSelectionToggle(node: TreeFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  checkAllParentsSelection(node: TreeFlatNode): void {
    let parent: TreeFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: TreeFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  getParentNode(node: TreeFlatNode): TreeFlatNode | null {
    console.log(this.checklistSelection.selected);
    const currentLevel = this.getLevel(node);
  
    if (currentLevel < 1) {
      return null;
    }
  
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
  
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
  
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
  
  
  getSelectedItems(): string {
    if (!this.checklistSelection.selected.length) return "Categorías";
    return this.checklistSelection.selected.map(s => s.categoria.nombre).join(",");
  }

  descendantsAllSelected(node: TreeFlatNode): boolean {
    console.log(node.categoria.nombre);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  descendantsPartiallySelected(node: TreeFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

}
