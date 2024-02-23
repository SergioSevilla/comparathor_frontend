import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import {SigninComponent} from './signin/signin.component'
import { BuscarProductoComponent } from './productos/buscar/buscar-producto.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CrearCategoriasComponent } from './categorias/crear/crear-categorias.component';
import { VerProductoComponent } from './productos/ver-producto/ver-producto.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { ValidacionesComponent } from './validaciones/validaciones/validaciones.component';
import { MisProductosComponent } from './productos/mis-productos/mis-productos.component';
import { CrearComparativaComponent } from './comparativas/crear-comparativa/crear-comparativa.component';
import { MisComparativasComponent } from './comparativas/mis-comparativas/mis-comparativas.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'buscarproductos',
    component: BuscarProductoComponent
  },
  {
    path: 'crearcategorias',
    component: CrearCategoriasComponent
  },
  {
    path: 'producto',
    component: VerProductoComponent
  },
  {
    path: 'crearproducto',
    component: CrearProductoComponent
  },
  {
    path: 'validaciones',
    component: ValidacionesComponent
  },
  {
    path: 'misproductos',
    component: MisProductosComponent
  },
  {
    path: 'crearcomparativa',
    component: CrearComparativaComponent
  },
  {
    path: 'miscomparativas',
    component: MisComparativasComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
