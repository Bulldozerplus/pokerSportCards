import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthEndpoints } from '../../app/core/constans/api.endpoins';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(username: string, email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {
      username: username,
      email: email,
      password: password,
    };

    return this.http.post(AuthEndpoints.REGISTER, body, { headers });
  }

  loginUser(username: string, password: string): Observable<any> {
    const body = {
      username: username,
      password: password,
    }

    return this.http.post(AuthEndpoints.LOGIN, body)
  }
};
