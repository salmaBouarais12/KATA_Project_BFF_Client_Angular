import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = true;
  logoutUrl!: string;
  constructor(private authenticationService: AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.checkLoginStatus().subscribe((result) => {
      this.isLoggedIn = result;
      console.log(result);
    });

    this.authenticationService.logout().then((result: string) => {
      this.logoutUrl = result;
    });
  }

  getUser() {
    this.authenticationService.getUsers();
  }

  navigateToLogout(): void {
    this.authenticationService.logout().then((result: string) => {
      const logoutUrl = result;
      window.location.href = logoutUrl;
    });
  }
}




