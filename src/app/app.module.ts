import { NgModule } from '@angular/core';
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
import { ComparativasComponent } from './comparativas/comparativas.component';
import { SignupSuccessDialogComponent } from './dialogs/signup-success-dialog/signup-success-dialog.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { BuscarProductoComponent } from './productos/buscar/buscar-productocomponent';
import { MatTreeModule } from '@angular/material/tree';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { WelcomeComponent } from './welcome/welcome.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    NavToolbarComponent,
    FooterComponent,
    LoginComponent,
    SigninComponent,
    ComparativasComponent,
    SignupSuccessDialogComponent,
    BuscarProductoComponent,
    WelcomeComponent,
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
    MatAutocompleteModule
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
