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

  shouldShowSettingsButton() {
    return this.authService.isAuthenticated() && !this.router.url.includes("/user/");
  }

  shouldShowCalendarButton() {
    return this.authService.isAuthenticated() && !this.router.url.includes("calendar");
  }

  shouldShowLogoutButton() {
    return this.authService.isAuthenticated();
  }

  logOut(): void {
    localStorage.removeItem('ua_auth');
    this.router.navigate(['login']);
  }

  goToUserSettings() {
    this.router.navigate(['user', this.userId]);
  }
}
