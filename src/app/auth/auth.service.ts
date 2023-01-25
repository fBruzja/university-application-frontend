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

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('ua_auth');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
