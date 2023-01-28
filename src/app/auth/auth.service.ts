import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public jwtHelper: JwtHelperService,
    private apiService: ApiService
  ) {}

  login(email: string, password: string) {
    return this.apiService.login(email, password).pipe(
      tap((response: any) => {
        localStorage.setItem('ua_auth', response.token);
      })
    );
  }

  signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    major: string,
    minor: string
  ) {
    return this.apiService
      .signUp(firstName, lastName, email, password, major, minor)
      .pipe(
        tap((response: any) => {
          localStorage.setItem('ua_auth', response.token);
        })
      );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('ua_auth');

    if (token === null) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }
}
