import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from '../services/usuario.service';
import { matchValidator } from './signin.validator';
import { SignupSuccessDialogComponent } from '../dialogs/signup-success-dialog/signup-success-dialog.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})



export class SigninComponent {

  user = { email: '', nombre: '', password: '', direccion: '' };

  


  signinForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    password: new FormControl('', [Validators.required, matchValidator('confirmPassword', true)]),
    confirmPassword: new FormControl('', [Validators.required, matchValidator('password')])
  });

  constructor(private usuarioService: UsuarioService, public dialog: MatDialog) {
  }


  
  submitSignin() {

    if (this.signinForm.valid) {
      this.user.direccion = this.signinForm.controls['address'].value;
      this.user.nombre = this.signinForm.controls['name'].value;
      this.user.password = this.signinForm.controls['password'].value;
      this.user.email = this.signinForm.controls['email'].value;
      console.log(this.user);
      this.usuarioService.createUser(this.user)
        .subscribe(
          (response) => {
            this.openSuccessDialog();
          },
          (error) => {
            console.error('Error al crear usuario:', error);
          }
        );
    }
  }

  openSuccessDialog(): void {
    const dialogRef = this.dialog.open(SignupSuccessDialogComponent, {
      width: '300px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      
      console.log('Dialog cerrado', result);
    });
  }

}



