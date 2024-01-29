import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrl: './nav-toolbar.component.scss'
})
export class NavToolbarComponent {


  isAuthenticated: boolean = false;
  private authSubscription: Subscription;

  constructor (private authService:AuthService)
  {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  logout() {
    this.authService.logout();
  }
  
  ngOnDestroy() {

    this.authSubscription.unsubscribe();
  }

}
