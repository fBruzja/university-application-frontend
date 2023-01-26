import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  shouldShowLogoutButton() {
    return this.authService.isAuthenticated();
  }

  logOut(): void {
    localStorage.removeItem('ua_auth');
    this.router.navigate(['login']);
  }
}
