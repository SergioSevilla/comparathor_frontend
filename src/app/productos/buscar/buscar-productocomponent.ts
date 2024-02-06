import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../entities/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

interface TreeNode {
  categoria: Categoria;
  hijos?: TreeNode[];
}

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar-producto.component.html',
  styleUrl: './buscar-producto.component.scss'
})
export class BuscarProductoComponent implements OnInit{

  categorias: TreeNode[] = [];
  treeControl = new NestedTreeControl<TreeNode>(node => node.hijos);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.obtenerCategorias();
  }

  obtenerCategorias(): void {
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

  hasChild = (_: number, node: TreeNode) => !!node.hijos && node.hijos.length > 0;

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

}
