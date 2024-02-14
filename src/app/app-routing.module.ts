import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import {SigninComponent} from './signin/signin.component'
import { ComparativasComponent } from './comparativas/comparativas.component';
import { BuscarProductoComponent } from './productos/buscar/buscar-productocomponent';
import { WelcomeComponent } from './welcome/welcome.component';

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
    path: 'comparativas',
    component: ComparativasComponent
  },
  {
    path: 'buscarproductos',
    component: BuscarProductoComponent
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
