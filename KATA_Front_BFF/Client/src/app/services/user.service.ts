import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from '../domain/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { configEndpointsApi } from '../api/config-endpoints-api';
import { UsersResponse } from './dtos/UsersResponse';
import { UserResponse } from './dtos/UserResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      "X-CSRF": "1"
    });
    const options = { headers: headers };
    return this.http.get<UsersResponse>(configEndpointsApi.endpoints.users.read,options)
      .pipe(map(this.mapUsersResponseToUsers));
  }

  getUserById(id : number): Observable<User> {
    return this.http.get<UserResponse>(configEndpointsApi.endpoints.users.read + "/" + id);
  }

  addUser(user: User) : Observable<User> {
    return this.http.post<UserResponse>(configEndpointsApi.endpoints.users.read, {
      ...user,
    });
  }

  editUser(user: User) : Observable<User> {
    return this.http.put<UserResponse>(configEndpointsApi.endpoints.users.edit + user.id, {
      ...user,
    });
  }

  deleteUser(user: User) : Observable<User> {
    return this.http.delete<UserResponse>(configEndpointsApi.endpoints.users.edit + user.id);
  }
  
  mapUsersResponseToUsers(response: UsersResponse): User[] {
    return response.persons.map(p => ({
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName
    }));
  }
}
