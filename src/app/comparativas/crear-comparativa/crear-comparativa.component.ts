import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Categoria } from '../../entities/categoria';
import { AtributoService } from '../../services/atributo.service';
import { ProductoService } from '../../services/producto.service';
import { EstadoService } from '../../services/estado.service';
import { Producto } from '../../entities/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrearComparativaDialogComponent } from '../../dialogs/crear-comparativa-dialog/crear-comparativa-dialog.component';
import { ComparativaService } from '../../services/comparativa.service';

@Component({
  selector: 'app-crear-comparativa',
  templateUrl: './crear-comparativa.component.html',
  styleUrl: './crear-comparativa.component.scss'
})
export class CrearComparativaComponent implements OnInit {





  dataSource = new MatTreeNestedDataSource<CategoriaTreeNode>();
  treeControl = new NestedTreeControl<CategoriaTreeNode>(node => node.children);
  categorias: Categoria[] = [];
  treeData: CategoriaTreeNode[] = [];
  selectedNode: CategoriaTreeNode | null = null;
  showResults : boolean = false;
  productos : Producto [] = [];
  productosSeleccionados : Producto [] = [];

  formCrear: FormGroup;

  //constructor(private categoriaService: CategoriaService) { }
  constructor( private productoService: ProductoService, private categoriaService: CategoriaService
    ,private estadoService: EstadoService, private atributoService: AtributoService, private fbCrearComparativa: FormBuilder, private dialog: MatDialog,
    private comparativaService:ComparativaService) {
      this.formCrear = this.fbCrearComparativa.group({
        nombre: ['', [Validators.required, Validators.maxLength(150)]]
      });
  }


  ngOnInit(): void {
    this.categoriaService.obtenerCategorias().subscribe(categorias => {
      this.categorias = categorias;
      this.treeData = this.generateTreeData(categorias);
      this.dataSource.data = this.treeData;

      this.treeData.forEach(node => {
        if (node.id) {
          this.atributoService.obtenerAtributoPorCategoria(node.id).subscribe(atributos => {
            node.hasAtributos = atributos.length > 0;
          });
        }
      });
    });
  }
  
  generateTreeData(categorias: Categoria[]): CategoriaTreeNode[] {
    const rootNodes: CategoriaTreeNode[] = [];
    const categoryMap = new Map<number, CategoriaTreeNode>();
  
    categorias.forEach(categoria => {
      
      const node: CategoriaTreeNode = {
        id: categoria.id,
        nombre: categoria.nombre,
        parentId: categoria.parentId,
        children: [],
        hasAtributos : true
      };
  


      if (categoria.parentId === null) {
        rootNodes.push(node);
        categoryMap.set(categoria.id, node);

  
      } else {
        const parentNode = categoryMap.get(categoria.parentId);
        if (parentNode) {
          parentNode.children.push(node);
          categoryMap.set(categoria.id, node);
        }
      }
  
      
    });
  
    return rootNodes;
  }

  getSelectedItems(): string {
    if (!this.selectedNode) return "Categorías";
    return this.selectedNode.nombre;
  }

  hasChild(_: number, node: CategoriaTreeNode): boolean {
    return !!node.children && node.children.length > 0;
  }

  onNodeSelected(node: CategoriaTreeNode): void {
    this.selectedNode = node;
    if (this.selectedNode.id){
        this.productoService.obtenerProductoPorCategoria(this.selectedNode.id).subscribe((productos) => {
          this.productos = productos;
          this.productos.forEach((producto) => {
            this.categoriaService.obtenerCategoriasId(producto.categoria).subscribe(categoria => producto.categoriaNombre=categoria.nombre);
            this.estadoService.obtenerEstadoPorId(producto.estado).subscribe((estado) => producto.estadoNombre=estado.nombre);
            if (producto.foto != null) 
            {
              this.productoService.obtenerFotoProducto(producto.id).subscribe(
                foto => {
                  producto.fotoBlob = URL.createObjectURL(foto);
                  console.log(producto.fotoBlob);
                },
                error => {
                  console.error('Error al obtener la foto del producto:', error);
                  // Manejar el error, por ejemplo, mostrar un mensaje al usuario
                }
              );
            }
            else {
              producto.fotoBlob = "assets/images/sin_imagen.jpg"
            }
          });
          this.showResults = true;
        });
    }
  }

  isSelected(producto: Producto): boolean {

    let existe = this.productosSeleccionados.find((prod) => prod.id == producto.id)
    if (existe) return true; else return false;
  }

  onProductoSelect(producto: Producto) {
    let existe = this.productosSeleccionados.find((prod) => prod.id == producto.id)
    if (existe){
      this.productosSeleccionados = this.productosSeleccionados.filter((item) => item.id != producto.id);
    }
    else {
      this.productosSeleccionados.push(producto);
    }
    console.log("Productos seleccionados:");
    console.log(this.productosSeleccionados);
  }

  deseleccionar(producto: Producto) {
    this.productosSeleccionados = this.productosSeleccionados.filter((item) => item.id != producto.id);
    }

  crearComparacion() {
    const dialogRef = this.dialog.open(CrearComparativaDialogComponent, {
      width: '600px',
      data: { form: this.formCrear}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El dialogo se cerró con:', result);
      if (result) {
        this.comparativaService.addComparativa(result.nombre).subscribe((comparativa) => {
          this.comparativaService.addComparativaProductos(comparativa.id,this.productosSeleccionados).subscribe((comparativa) => {
            if (comparativa){
              console.log("creado ok");
            }
          })
        })
      }
    });

  }

}

interface CategoriaTreeNode {
  id: number | null;
  nombre: string;
  parentId: number | null;
  children: CategoriaTreeNode[];
  hasAtributos: boolean;
}
