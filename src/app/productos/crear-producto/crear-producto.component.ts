import { Component, HostListener, Injectable, OnInit } from '@angular/core';
import { Categoria } from '../../entities/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { BehaviorSubject } from 'rxjs';
import { ProductoService } from '../../services/producto.service';
import { EstadoService } from '../../services/estado.service';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Producto } from '../../entities/producto';
import { AtributoService } from '../../services/atributo.service';
import { Atributo } from '../../entities/atributo';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValorService } from '../../services/valor.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss'
})
export class CrearProductoComponent implements OnInit{

  dataSource = new MatTreeNestedDataSource<CategoriaTreeNode>();
  treeControl = new NestedTreeControl<CategoriaTreeNode>(node => node.children);
  selectedNode: CategoriaTreeNode | null = null;
  atributos: Atributo[] = [];
  categorias: Categoria[] = [];
  treeData: CategoriaTreeNode[] = [];
  categoriasAtributos : {categoria: number , atributos: number}[] = [];
  console = console;
  newProductForm: FormGroup;
  atributosForm : string [] = [];
  showForm = false;
  dragAreaClass: string;
  imgSrc = "assets/images/sin_imagen.jpg";
  fileFoto : File;


  //constructor(private categoriaService: CategoriaService) { }
  constructor( private productoService: ProductoService, private categoriaService: CategoriaService
          ,private estadoService: EstadoService, private atributoService: AtributoService, private valorService : ValorService ,
           private fb: FormBuilder, private dialog: MatDialog) {
    
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

    this.newProductForm = this.fb.group({
      productName: ['', Validators.required],
      attributes: this.fb.array([]),
      photo: ['']
    });

    this.dragAreaClass = "dragarea";
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


  onNodeSelected(node: CategoriaTreeNode): void {
    this.selectedNode = node;
    if (this.selectedNode.id){
      this.atributoService.obtenerAtributoPorCategoria(this.selectedNode.id).subscribe( atributos => {
        this.atributos = atributos;
        this.initializeAttributes(atributos);
        this.showForm = true;
      });
    }
   
  }

  initializeAttributes(atributos: Atributo[]): void {

    const attributeControls = this.atributos.map(atributo => this.fb.control(''));
    this.newProductForm.setControl('attributes', this.fb.array(attributeControls));
  }

  hasChild(_: number, node: CategoriaTreeNode): boolean {
    return !!node.children && node.children.length > 0;
  }

  getSelectedItems(): string {
    if (!this.selectedNode) return "Categorías";
    return this.selectedNode.nombre;
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    this.newProductForm.patchValue({
      photo: file
    });
    this.fileFoto = file;
    this.previsualizaImagen();

  }

  handleDrop(files: FileList | undefined): void {
    this.console.log("ahora aqui");
    if (files && files.length > 0) {
      this.console.log("y ahora aqui");
      const file = files[0];
      this.fileFoto = files[0];
      this.newProductForm.patchValue({
        photo: file
      });
      this.previsualizaImagen();
    }
  }


  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }
  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.fileFoto = files[0];
      this.newProductForm.patchValue({
        photo: files[0]
      });
      this.previsualizaImagen();
    }
  }

  previsualizaImagen() {

      this.imgSrc = URL.createObjectURL(this.fileFoto);

  }



  onSubmit(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: '¿Está seguro que desea guardar el producto ?'
    });
    

    
    let producto : Producto = new Producto();
    if (this.newProductForm.valid) {
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (this.selectedNode) {
            if (this.selectedNode.id) {
              producto.nombre=this.newProductForm.controls['productName'].value;
              producto.categoria = this.selectedNode.id;
              this.productoService.addProducto(producto,producto.categoria).subscribe((producto) => {
                this.console.log("Producto agregado");
                const attributesArray = this.newProductForm.get('attributes') as FormArray;
                for (var i=0; i<attributesArray.length;i++)
                {
                  if (attributesArray.at(i).value!=''){
                    this.valorService.addValor(this.atributos[i].id,producto.id,attributesArray.at(i).value ).subscribe((valor) => {
                      this.console.log("Atributo "+this.atributos[i].nombre+" = "+valor.valor+" agregado");
                    })
                  }
                }
                if (this.fileFoto) {
                  this.productoService.addFoto(producto.id,this.fileFoto).subscribe((productoFoto) => {
                    this.console.log("foto agregada");
                  }) 
                }
              })
            }
          }
        }
        
      });

     
    } else {
      // Manejar errores de validación si es necesario
    }
    
  }

}

interface CategoriaTreeNode {
  id: number | null;
  nombre: string;
  parentId: number | null;
  children: CategoriaTreeNode[];
  hasAtributos: boolean;
}
