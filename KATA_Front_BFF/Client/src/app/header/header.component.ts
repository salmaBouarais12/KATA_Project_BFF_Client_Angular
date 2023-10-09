import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = true;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.authenticationService.checkLoginStatus().subscribe((result) => {
      this.isLoggedIn = result;
      console.log(result);
    });
  }

  getUser() {
    this.authenticationService.getUsers();
  }
}
