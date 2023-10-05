import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { configEndpointsApi } from '../api/config-endpoints-api';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
    constructor(private http: HttpClient) { }

    getUsers(){
        const headers = new HttpHeaders({
            "X-CSRF": "1"
          });
          const options = { headers: headers };
          return this.http.get(configEndpointsApi.endpoints.identityProvider.read,options).subscribe((response:any)=>{
            console.log(response.data[5].value);
          });
}
}