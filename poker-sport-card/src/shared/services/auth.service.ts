import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthEndpoints } from '../../app/core/constans/api.endpoins';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(
    username: string,
    password: string,
    email: string
  ): Observable<any> {
    const body = {
      username,
      password,
      email
    };

    console.log('Sending registration data:', JSON.stringify(body));

    return this.http.post(AuthEndpoints.REGISTER, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    });
  }

  loginUser(username: string, password: string): Observable<any> {
    const body = {
      username,
      password
    };

    return this.http.post(AuthEndpoints.LOGIN, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text'
    });
  }
}
