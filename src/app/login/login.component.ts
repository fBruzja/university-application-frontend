import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginFormData } from './login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading: boolean = false;

  constructor(private router: Router ,private authService: AuthService) {}

  onLoginDataChanged(data: LoginFormData) {
    this.authService.login(data.email, data.password).subscribe(() => {
      this.router.navigate(["/courses"]);
    });
  }

}
