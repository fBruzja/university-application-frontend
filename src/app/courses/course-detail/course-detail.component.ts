import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  disabled = true;
  loading = false;
  course: any = {};
  user: any = {};
  attendees: any[] = [];
  courseId: string = '';

  courseData: any = {
    title: '',
    description: '',
    time: '',
    location: '',
    attendees: [],
  };

  constructor(
    private route: ActivatedRoute,
    public jwtHelper: JwtHelperService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.user = this.jwtHelper.decodeToken(localStorage.getItem('ua_auth')!);

    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id')!;
      this.loadCourse(this.courseId);
    });
  }

  loadCourse(courseId: string) {
    this.loading = true;
    this.apiService.getCourseById(courseId).subscribe((response: any) => {
      this.course = response;
      this.getCourseAttendees(response.attendees);
    });
  }

  getCourseAttendees(attendees: string[]) {
    if (attendees.length > 0) {
      for (let attendee in attendees) {
        this.apiService.getUserById(attendees[attendee]).subscribe((user) => {
          this.loading = true;
          this.attendees.push(user);
          this.loading = false;
        });
      }
    } else {
      this.loading = false;
    }
  }

  attendCourse() {
    this.apiService
      .addCourseAttendee(this.courseId, this.user.userId)
      .subscribe(() => this.reloadCourse(this.courseId));
  }

  dropCourse() {
    this.apiService
      .removeCourseAttendee(this.courseId, this.user.userId)
      .subscribe(() => {
        this.reloadCourse(this.courseId);
        this.attendees = this.attendees.filter(
          (user) => user.userId != this.user.userId
        );
      });
  }

  reloadCourse(courseId: string) {
    this.loadCourse(courseId);
  }

  isAttendingCourse(): boolean {
    if (this.course.attendees) {
      for (let i = 0; i < this.course.attendees.length; i++) {
        if (this.course.attendees[i] == this.user.userId) {
          return true;
        }
      }

      return false;
    }

    return false;
  }
}
