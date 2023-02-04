import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { differenceInDays, differenceInHours } from 'date-fns';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    public jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.logOut();
    }

    this.checkIfAnyCourseStartsWithin24Hours();
  }

  checkIfAnyCourseStartsWithin24Hours() {
    const user = this.jwtHelper.decodeToken(localStorage.getItem('ua_auth')!);
    this.apiService.getUserById(user.userId).subscribe((user: any) => {
      if (user.notifications) {
        user.courses.forEach((course: any) => {
          this.apiService.getCourseById(course).subscribe((course: any) => {
            const difference = differenceInHours(
              new Date(course.courseTime),
              new Date()
            );

            if (difference <= 24) {
              this.snackBar.open(
                `Your course: ${course.title} starts in at least 24 hours!`,
                'Close',
                {
                  duration: 5000,
                }
              );
            }
          });
        });
      }
    });
  }

  logOut(): void {
    localStorage.removeItem('ua_auth');
    this.router.navigate(['login']);
  }
}
