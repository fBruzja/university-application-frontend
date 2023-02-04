import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { DialogComponent } from 'src/app/ui/dialog/dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userId: string = '';
  notificationCount: number = 0;
  friendships: any[] = [];
  pendingNotifications: Observable<any>[] = [];
  rejectionNotifications: Observable<any>[] = [];
  acceptedNotifications: Observable<any>[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    public jwtHelper: JwtHelperService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUserId();
    this.countNotifications();
  }

  openDialog(notification: Observable<any>): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        title: 'Someone wants to be your friend',
        message: 'Are you sure you want to do this?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      notification.subscribe((data: any) => {
        if (result) {
          this.apiService
            .acceptFriendRequest(data.userId, this.userId)
            .subscribe(() => {
              this.loadUserId();
              this.countNotifications();
            });
        } else {
          this.apiService
            .rejectFriendRequest(data.userId, this.userId)
            .subscribe(() => {
              this.loadUserId();
              this.countNotifications();
            });
        }
      });
    });
  }

  loadUserId() {
    this.userId = this.jwtHelper.decodeToken(
      localStorage.getItem('ua_auth')!
    ).userId;
    this.getActiveFriendshipNotifications();
  }

  shouldShowSettingsButton() {
    return (
      this.authService.isAuthenticated() && !this.router.url.includes('/user/')
    );
  }

  shouldShowCalendarButton() {
    return (
      this.authService.isAuthenticated() &&
      !this.router.url.includes('calendar')
    );
  }

  shouldShowButtonWhenNotAuthenticated() {
    return this.authService.isAuthenticated();
  }

  logOut(): void {
    localStorage.removeItem('ua_auth');
    this.router.navigate(['login']);
  }

  goToUserSettings() {
    this.loadUserId();
    this.router.navigate(['user', this.userId]);
  }

  countNotifications() {
    this.apiService
      .countNotifications(parseInt(this.userId))
      .subscribe((notificationNumber: any) => {
        this.notificationCount = notificationNumber;
      });
  }

  getPendingNotifications() {
    this.apiService
      .getPendingActiveFriendships(this.userId)
      .subscribe((pendingFriendships: any) => {
        this.pendingNotifications = pendingFriendships.map(
          (friendship: any) => {
            return this.apiService.getUserById(friendship.userId);
          }
        );
      });
  }

  getAcceptedNotifications() {
    const filteredFriendships = this.friendships.filter((friendship: any) => {
      return friendship.notificationState === 'accepted';
    });

    this.acceptedNotifications = filteredFriendships.map((friendship: any) => {
      return this.apiService.getUserById(friendship.friendId);
    });
  }

  getRejectionNotifications() {
    const filteredFriendships = this.friendships.filter((friendship: any) => {
      return friendship.notificationState === 'rejected';
    });

    this.rejectionNotifications = filteredFriendships.map((friendship: any) => {
      return this.apiService.getUserById(friendship.friendId);
    });
  }

  getActiveFriendshipNotifications() {
    this.apiService
      .getActiveFriendships(this.userId)
      .subscribe((friendships: any) => {
        this.friendships = friendships;
        this.getRejectionNotifications();
        this.getPendingNotifications();
        this.getAcceptedNotifications();
      });
  }

  setNotifiedToTrue(notification: Observable<any>) {
    notification.subscribe((data) => {
      console.log(data);

      this.apiService
        .setStatusToNotified(this.userId, data.userId)
        .subscribe(() => {
          this.loadUserId();
          this.countNotifications();
        });
    });
  }
}
