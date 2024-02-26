import { Component, Injectable, OnInit } from '@angular/core';
import { Categoria } from '../../entities/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../../entities/producto';
import { ProductoService } from '../../services/producto.service';
import { EstadoService } from '../../services/estado.service';
import { Estado } from '../../entities/estado';
import { Router } from '@angular/router';


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
  treeData: TreeNode[] = []


  get data(): TreeNode[] {
    return this.dataChange.value;
  }

  constructor(private categoriaService: CategoriaService) {

    this.categoriaService.obtenerCategorias()
      .subscribe(categorias => {

        if (categorias) { 

          this.treeData = this.buildTree(categorias);
          this.initialize();
        } else {
          console.error('La llamada al servicio devolvió undefined.');
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


    this.dataChange.next(data);
  }

  public filter(filterText: string) {
    let filteredTreeData;
    if (filterText) {

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

      filteredTreeData = this.treeData;
    }


    const data = filteredTreeData;

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


  checklistSelection = new SelectionModel<TreeFlatNode>(true /* multiple */);
  nestedNodeMap = new Map<TreeNode, TreeFlatNode>();
  flatNodeMap = new Map<TreeFlatNode, TreeNode>();
  treeFlattener: MatTreeFlattener<TreeNode, TreeFlatNode>;
  treeControl: FlatTreeControl<TreeFlatNode>;
  dataSource: MatTreeFlatDataSource<TreeNode, TreeFlatNode>;

  productos : Producto[] = [];

  textoBuscar: string = '';


  constructor(private _database: ChecklistDatabase, private productoService: ProductoService, private categoriaService: CategoriaService
          ,private estadoService: EstadoService, private router: Router) {
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
  }




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
    
    if (!node) { return false;}
    if (!this.treeControl) { return false;}
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  descendantsPartiallySelected(node: TreeFlatNode): boolean {
    if (!node) return false;
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  submitSearch() {
    this.productos = [];

    if (this.checklistSelection.selected.length == 0)
    {
      this.productoService.obtenerProductos().subscribe(
        (productos: Producto[]) => {

          this.productos = productos;
          


          if (this.textoBuscar != '') {
            this.productos = this.productos.filter(producto => producto.nombre.includes(this.textoBuscar));
          }

          this.productos.forEach((producto) => {
            this.categoriaService.obtenerCategoriasId(producto.categoria).subscribe(
              (categoria: Categoria) => {
                producto.categoriaNombre = categoria.nombre;
              });
            this.estadoService.obtenerEstadoPorId(producto.estado).subscribe(
                (estado: Estado) => {
                  producto.estadoNombre = estado.nombre;
                });
            if (producto.foto != null) 
            {
              this.productoService.obtenerFotoProducto(producto.id).subscribe(
                foto => {
                  producto.fotoBlob = URL.createObjectURL(foto);

                },
                error => {
                  console.error('Error al obtener la foto del producto:', error);
                }
              );
            }
            else {
              producto.fotoBlob = "assets/images/sin_imagen.jpg"
            }
          })
        },
        error => {
          console.error('Error al obtener productos:', error);
        }
      );
    }
    else {
      this.checklistSelection.selected.forEach((node) => {
        this.productoService.obtenerProductoPorCategoria(node.categoria.id).subscribe(
          (productos: Producto[]) => {
            if (this.textoBuscar != '') {
              productos.filter(producto => producto.nombre.includes(this.textoBuscar))
            }
            this.productos.push(...productos);
            this.productos.forEach((producto) => {
              this.categoriaService.obtenerCategoriasId(producto.categoria).subscribe(
                (categoria: Categoria) => {
                  producto.categoriaNombre = categoria.nombre;
                });

              this.estadoService.obtenerEstadoPorId(producto.estado).subscribe(
                  (estado: Estado) => {
                    producto.estadoNombre = estado.nombre;
                  });
              if (producto.foto != null) 
              {
                this.productoService.obtenerFotoProducto(producto.id).subscribe(
                foto => {
                  producto.fotoBlob = URL.createObjectURL(foto);

                },
                error => {
                  console.error('Error al obtener la foto del producto:', error);

                }
                );
              }
              else {
                producto.fotoBlob = "assets/images/sin_imagen.jpg"
              }
            })
            
          },
          error => {
            console.error('Error al obtener productos:', error);

          }
        );
      });
    }

    
  }

  verDetalle(producto: Producto): void {
    this.router.navigate(['/producto'], { state: { producto } }); 
  }
}
