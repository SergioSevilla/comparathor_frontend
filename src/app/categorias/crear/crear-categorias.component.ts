import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../entities/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Atributo } from '../../entities/atributo';
import { AtributoService } from '../../services/atributo.service';

@Component({
  selector: 'app-crear-categorias',
  templateUrl: './crear-categorias.component.html',
  styleUrl: './crear-categorias.component.scss'
})


export class CrearCategoriasComponent implements OnInit {

  
  atributos: Atributo[] = [];
  categorias: Categoria[] = [];
  selectedCategoria: Categoria | null = null;
  newattrshow: boolean = false;
  treeData: CategoriaTreeNode[] = [];
  treeControl = new NestedTreeControl<CategoriaTreeNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<CategoriaTreeNode>();
  selectedNode: CategoriaTreeNode | null = null;

  constructor(private categoriaService: CategoriaService, private dialog: MatDialog, private atributoService: AtributoService) { }


  ngOnInit(): void {
    this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
      this.treeData = this.generateTreeData(categorias);
      this.dataSource.data = this.treeData;
      this.treeControl.expand(this.dataSource.data[0]);
    });
  }


  generateTreeData(categorias: Categoria[]): CategoriaTreeNode[] {
    const rootNodes: CategoriaTreeNode[] = [];
    const categoryMap = new Map<number, CategoriaTreeNode>();
  
    // Agregar el nodo raíz
    const rootNode: CategoriaTreeNode = {
      id: null,
      nombre: 'Root',
      parentId: null,
      children: []
    };
    rootNodes.push(rootNode);
    categoryMap.set(0, rootNode);
    categorias.forEach(categoria => {
      const node: CategoriaTreeNode = {
        id: categoria.id,
        nombre: categoria.nombre,
        parentId: categoria.parentId,
        children: []
      };
  
      if (categoria.parentId === null) {
        const parentNode = categoryMap.get(0);
        if (parentNode) {
          parentNode.children.push(node);
        }
        
      } else {
        const parentNode = categoryMap.get(categoria.parentId);
        if (parentNode) {
          parentNode.children.push(node);
        }
      }
  
      categoryMap.set(categoria.id, node);
    });
  
    return rootNodes;
  }

  hasChild(_: number, node: CategoriaTreeNode): boolean {
    return !!node.children && node.children.length > 0;
  }

  hasNoContent (_: number, node: CategoriaTreeNode): boolean {
    console.log("hasnocontent  "+node.nombre);
    return node.nombre === "";
  }

  onCategoriaSelection(categoria: Categoria): void {
    this.selectedCategoria = categoria;
  }

  addNewItem(node: CategoriaTreeNode) {
    let categoriaNueva : Categoria = new Categoria();
    categoriaNueva.costructor( 0, "", node.id, "","",null);
    this.categorias.push(categoriaNueva)


    this.treeData = this.generateTreeData(this.categorias);
    this.dataSource.data = this.treeData;
    let newNode = this.dataSource.data.find((categoria) => categoria.id == node.id)

    let nodeSearch = this.buscarNodo(node.id,this.dataSource.data[0]);
      if (nodeSearch) this.expandAddAll(nodeSearch);

  }

  saveNode(node: CategoriaTreeNode, itemValue: string) {
    console.log(node.id + "Salvamos! -> " +node.nombre );
    let categoria : Categoria = new Categoria();
    categoria.nombre = itemValue;
    categoria.parentId =node.parentId;
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: '¿Está seguro de crear la nueva categoría '+categoria.nombre+' ?'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriaService.addNewCategory(categoria).subscribe(
          (res) => {
            console.log('Categoría añadida exitosamente:', res);
            this.categoriaService.obtenerCategorias().subscribe(categorias => {
              this.categorias = categorias;
              this.treeData = this.generateTreeData(categorias);
              this.dataSource.data = this.treeData;
            });
          },
          (error) => {
            console.error('Error al agregar categoría:', error);
            // Maneja el error de acuerdo a tus necesidades
          }
        );
        let nodeSearch = this.buscarNodo(node.id,this.dataSource.data[0]);
          if (nodeSearch) this.expandAddAll(nodeSearch); // Llama al método para agregar la nueva categoría si el usuario confirma
      } else {
        console.log('El usuario canceló la acción.');
      }
    });
    
    
    


  }

  discardNode(node: CategoriaTreeNode) {
    this.categorias = this.categorias.filter((categoria) => categoria.id != 0);
    
    this.treeData = this.generateTreeData(this.categorias);
    this.dataSource.data = this.treeData;

    let nodeSearch = this.buscarNodo(node.parentId,this.dataSource.data[0]);
      if (nodeSearch) this.expandAddAll(nodeSearch);

  }

  expandAddAll(node: CategoriaTreeNode){
    
    if (node.children.length>=0) this.treeControl.expand(node);
    let actualNode = node;
    while (node.id!=null)
    {
      let tempNode = this.buscarNodo(node.parentId,this.dataSource.data[0]);
      if (tempNode) {
        node=tempNode;
        this.treeControl.expand(node);
      }
    }
    let tempNode = this.buscarNodo(null,this.dataSource.data[0]);
    if (tempNode) {
      node=tempNode;
      this.treeControl.expand(node);
    }

  }

  buscarNodo(id: number | null, node: CategoriaTreeNode): CategoriaTreeNode | null {
    if (node.id === id) {
      return node;
    }
  
    if (node.children) {
      for (const child of node.children) {
        const found = this.buscarNodo(id, child);
        if (found) {
          return found;
        }
      }
    }
  
    return null;
  }


  onNodeSelected(node: CategoriaTreeNode): void {
    this.selectedNode = node;
    if (this.selectedNode.id){
      this.atributoService.obtenerAtributoPorCategoria(this.selectedNode.id).subscribe( atributos => {
        this.atributos = atributos;
      });
    }
   
  }

  changeShowAttr() {
    console.log(this.newattrshow);
    this.newattrshow = !this.newattrshow;
  }

  saveAttr(valor: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: '¿Está seguro de crear el nuevo atributo '+valor+' en la categoria '+this.selectedNode?.nombre+' ?'
    });
    let categoriaid : number = 0;

    if (this.selectedNode) {
      if (this.selectedNode.id) categoriaid = this.selectedNode.id;
    } 
    let newAtributo = new Atributo();
    newAtributo.nombre=valor;
    newAtributo.categoria=categoriaid;
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atributoService.addNewAttr(categoriaid, valor).subscribe(
          (res) => {
            console.log('Atributo añadido exitosamente:', res);
            this.atributoService.obtenerAtributoPorCategoria(categoriaid).subscribe( atributos => {
              this.atributos = atributos;
            });
          },
          (error) => {
            console.error('Error al agregar atributo:', error);
            // Maneja el error de acuerdo a tus necesidades
          }
        );
      
      } else {
        console.log('El usuario canceló la acción.');
      }
    });

  
    this.changeShowAttr()
    
  }

  discardAttr() {


    this.changeShowAttr()
    
  }

}

interface CategoriaTreeNode {
  id: number | null;
  nombre: string;
  parentId: number | null;
  children: CategoriaTreeNode[];
}