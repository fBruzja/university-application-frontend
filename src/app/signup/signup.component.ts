import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { SignUpFormData } from './signup-form/signup-form.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  onSignUpDataChanged(data: SignUpFormData) {
    this.authService
      .signUp(data.firstName, data.lastName, data.email, data.password)
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }
}
