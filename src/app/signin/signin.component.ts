import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})

export class SigninComponent {

  user = { email: '', nombre: '', password : '', direccion : '' };


  signinForm: FormGroup;

  constructor(private usuarioService: UsuarioService) {
    this.signinForm = new FormGroup({
      name: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required, Validators.email]),
      address : new FormControl(''),
      password: new FormControl('',Validators.required)
    });
  }

  submitSignin(){
    if (this.signinForm.valid)
    {
      this.user.nombre = this.signinForm.controls.name.value;
      this.user.email = this.signinForm.controls.email.value;
      this.user.password = this.signinForm.controls.password.value;
      this.user.password = this.signinForm.controls.password.value;
      this.usuarioService.createUser(this.user)
      .subscribe(
        (response) => {
          // Manejar la respuesta exitosa (código 201) 
          console.log('Usuario creado exitosamente:', response);
        },
        (error) => {
          // Manejar errores aquí, se pueden haber lanzado desde el servicio
          console.error('Error al crear usuario:', error);
        }
      );
    }
  }


}
