import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { configEndpointsApi } from '../api/config-endpoints-api';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
    constructor(private http: HttpClient) { }

  checkLoginStatus(): Observable<boolean> {
    const headers = new HttpHeaders({
      "X-CSRF": "1"
    });
    const options = { headers: headers };

    return this.http.get(configEndpointsApi.endpoints.identityProvider.read, options).pipe(
      map((response: any) => {
        return !!response[5].value;
        
      }),
      catchError((error) => {
        console.error('Error checking login status', error);
        return of(false);
      })
    );
    }

    getUsers(){
      const headers = new HttpHeaders({
            "X-CSRF": "1"
          });
          const options = { headers: headers };
          return this.http.get(configEndpointsApi.endpoints.identityProvider.read,options).subscribe((response:any)=>{
            console.log(response[5].value);
    });
  }
}