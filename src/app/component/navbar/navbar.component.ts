import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;

  constructor( private authServices: AuthService) { }
  ngOnInit(): void {
    this.isLoggedIn$ = this.authServices.isLoggedIn();
  }

  onLogOut(){
    this.authServices.logOut()
  }
}
