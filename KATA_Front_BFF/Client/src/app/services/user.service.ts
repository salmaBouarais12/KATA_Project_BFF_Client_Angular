import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { configEndpointsApi } from '../api/config-endpoints-api';
import { UsersResponse } from './dtos/UsersResponse';
import { UserResponse } from './dtos/UserResponse';
import { User } from '../domain/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private headers = new HttpHeaders({
    "X-CSRF": "1"
  });

  constructor(private http: HttpClient) { }

  private createOptions(): { headers: HttpHeaders } {
    return { headers: this.headers };
  }

  getUsers(): Observable<User[]> {
    return this.http.get<UsersResponse>(configEndpointsApi.endpoints.users.read, this.createOptions())
      .pipe(map(this.mapUsersResponseToUsers));
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<UserResponse>(`${configEndpointsApi.endpoints.users.read}/${id}`, this.createOptions());
  }

  addUser(user: User): Observable<User> {
    return this.http.post<UserResponse>(configEndpointsApi.endpoints.users.read, user, this.createOptions());
  }

  editUser(user: User): Observable<User> {
    return this.http.put<UserResponse>(`${configEndpointsApi.endpoints.users.edit}${user.id}`, user, this.createOptions());
  }

  deleteUser(user: User): Observable<User> {
    return this.http.delete<UserResponse>(`${configEndpointsApi.endpoints.users.edit}${user.id}`, this.createOptions());
  }

  mapUsersResponseToUsers(response: UsersResponse): User[] {
    return response.persons.map(p => ({
      id: p.id,
      firstName: p.firstName,
      lastName: p.lastName
    }));
  }
}
