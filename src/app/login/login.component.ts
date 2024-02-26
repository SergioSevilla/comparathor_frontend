import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  credentials = { email: '', password: '' };

  submitFlag: boolean = false;

  loginForm: FormGroup;

  displayError : boolean = false;
  
  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',Validators.required)
    });
  }

  submitLogin(){

    if (this.loginForm.valid)
    {
      
      this.displayError = false;
      this.submitFlag = true;
      this.credentials.email = this.loginForm.controls.email.value;
      this.credentials.password = this.loginForm.controls.password.value;
      this.authService.login(this.credentials).subscribe((token) => {
        if (token!='Error') {
          localStorage.setItem('token', token);
          this.router.navigate(['/miscomparativas'])
        } else {
          this.displayError = true;
        }
      }); 
    }
    else
    {
      this.submitFlag = false;
    }
  }

}
