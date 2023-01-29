import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userId: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.userId = this.jwtHelper.decodeToken(localStorage.getItem("ua_auth")!).userId;
    
  }

  shouldShowButton() {
    return this.authService.isAuthenticated();
  }

  logOut(): void {
    localStorage.removeItem('ua_auth');
    this.router.navigate(['login']);
  }

  goToUserSettings() {
    console.log('userID::',this.userId);
    this.router.navigate(['user', this.userId]);
  }
}
