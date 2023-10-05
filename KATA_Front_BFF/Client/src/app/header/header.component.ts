import { Component } from '@angular/core';
import { configEndpointsApi } from '../api/config-endpoints-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RoomService } from '../services/room.service';
import { Room } from '../domain/room';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(private http: HttpClient,private authenticationService: AuthenticationService) { }

  getUser() {
    this.authenticationService.getUsers();
  }
}
