import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavToolbarComponent } from './nav-toolbar/nav-toolbar.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { SignupSuccessDialogComponent } from './dialogs/signup-success-dialog/signup-success-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { BuscarProductoComponent } from './productos/buscar/buscar-producto.component';
import { MatTreeModule } from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { WelcomeComponent } from './welcome/welcome.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { CrearCategoriasComponent } from './categorias/crear/crear-categorias.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { VerProductoComponent } from './productos/ver-producto/ver-producto.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CardComentarioComponent } from './comentarios/card-comentario/card-comentario.component';
import { EstrellasComponent } from './puntuaciones/estrellas/estrellas.component';
import { CardPrecioComponent } from './precios/card-precio/card-precio.component';
import { ComentarioDialogComponent } from './dialogs/comentario-dialog/comentario-dialog.component';
import { ValidacionesComponent } from './validaciones/validaciones/validaciones.component';
import {MatTableModule} from '@angular/material/table';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { VerProductoDialogComponent } from './dialogs/ver-producto-dialog/ver-producto-dialog.component';
import { MisProductosComponent } from './productos/mis-productos/mis-productos.component';
import { MisComparativasComponent } from './comparativas/mis-comparativas/mis-comparativas.component';
import { CrearComparativaComponent } from './comparativas/crear-comparativa/crear-comparativa.component';
import { CrearComparativaDialogComponent } from './dialogs/crear-comparativa-dialog/crear-comparativa-dialog.component';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    FooterComponent,
    LoginComponent,
    SigninComponent,
    SignupSuccessDialogComponent,
    BuscarProductoComponent,
    WelcomeComponent,
    CrearCategoriasComponent,
    ConfirmDialogComponent,
    VerProductoComponent,
    CrearProductoComponent,
    CardComentarioComponent,
    EstrellasComponent,
    CardPrecioComponent,
    ComentarioDialogComponent,
    ValidacionesComponent,
    VerProductoDialogComponent,
    MisProductosComponent,
    MisComparativasComponent,
    CrearComparativaComponent,
    CrearComparativaDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    MatCheckboxModule,
    MatSelectModule,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule,
    MatTabsModule,
    MatTableModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
