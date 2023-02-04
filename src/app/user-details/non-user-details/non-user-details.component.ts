import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-non-user-details',
  templateUrl: './non-user-details.component.html',
  styleUrls: ['./non-user-details.component.scss'],
})
export class NonUserDetailsComponent implements OnInit {
  loading = false;
  user: any = {};
  loggedInUser: any = {};
  userId: string = '';
  courses: any[] = [];
  base64Image: string = '';
  areTheseTwoUsersFriends: boolean = false;
  shouldShowCourses: boolean = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    public jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id')!;
      const loggedInUserId = this.jwtHelper.decodeToken(
        localStorage.getItem('ua_auth')!
      ).userId;
      this.loadLoggedInUser(loggedInUserId);
      this.loadUser(this.userId);
    });
  }

  loadLoggedInUser(userId: any) {
    this.apiService.getUserById(userId).subscribe((user: any) => {
      this.loading = true;
      this.loggedInUser = user;
      this.isUserAFriend();

      this.apiService
        .areTwoUsersFriends(this.userId, this.loggedInUser.userId)
        .subscribe((status: any) => {
          console.log(status);
          this.areTheseTwoUsersFriends = status;
        });

      this.loading = false;
    });
  }

  loadUser(userId: string) {
    this.apiService.getUserById(userId).subscribe((user: any) => {
      this.loading = true;
      this.user = user;
      this.base64Image = user.profilePicture;

      this.getCourseListFromUser(user.courses);
      this.loading = false;
    });
  }

  getCourseListFromUser(courses: any[]) {
    if (courses.length > 0) {
      for (let course in courses) {
        this.apiService.getCourseById(courses[course]).subscribe((course) => {
          this.loading = true;
          this.courses.push(course);
          this.loading = false;
        });
      }
    } else {
      this.loading = false;
    }
  }

  reloadLoggedInUserAndActualUserBeingSeen() {
    this.loadUser(this.userId);
    this.loadLoggedInUser(this.loggedInUser.userId);
  }

  addFriend() {
    this.apiService
      .createFriendship(parseInt(this.loggedInUser.userId), parseInt(this.userId))
      .subscribe(() => {
        this.reloadLoggedInUserAndActualUserBeingSeen();
      });
  }

  isUserAFriend() {
    console.log(this.loggedInUser);
    if(this.loggedInUser.friends) {
      let index = this.loggedInUser.friends.findIndex((x: number) => x === parseInt(this.userId));
      this.shouldShowCourses = index !== -1;
    }
  }
}
