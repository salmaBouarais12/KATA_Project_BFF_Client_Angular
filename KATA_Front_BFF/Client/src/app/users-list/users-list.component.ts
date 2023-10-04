import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configEndpointsApi } from '../api/config-endpoints-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit{
  users: any[] = [];

  constructor(private http: HttpClient,private router: Router) { }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    // Making an HTTP GET request using Angular's HttpClient
    this.http.get(
      configEndpointsApi.endpoints.users.read).subscribe((data: any) => {  // Subscribing to the Observable
      console.log("data", data.persons);  // Logging the response data
      this.users = data.persons;
    });
  }

  editUser(user : any){
    console.log("edit user", user)
    this.router.navigateByUrl("/edit-user/" + user.id)
  }
}
