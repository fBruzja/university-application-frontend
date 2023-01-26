import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/users/login', {
      email,
      password,
    });
  }

  signUp(firstName: string, lastName: string, email: string, password: string) {
    return this.http.post('http://localhost:8080/api/users/register', {
      firstName,
      lastName,
      email,
      password,
    });
  }
}
