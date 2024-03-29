import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { User } from '../entities/user';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-nav-toolbar',
  templateUrl: './nav-toolbar.component.html',
  styleUrl: './nav-toolbar.component.scss'
})
export class NavToolbarComponent {


  isAuthenticated: boolean = false;
  private authSubscription: Subscription;
  user: User;
  userName : string = '';
  opened = false;
  showMenuItems : boolean = false;
  showMenuComparisons : boolean = false;
  showMenuSettings : boolean = false;
  showMenuAdmin: boolean = false;

  constructor (private authService:AuthService)
  {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  public getUSers(): Observable<User[]> {
    return this.authService.users.asObservable();
  }

  ngOnInit(){
      this.getUSers().subscribe(res => {this.user = res[0];})
  }

  logout() {
    this.authService.logout();
  }
  
  ngOnDestroy() {

    this.authSubscription.unsubscribe();
  }

}
