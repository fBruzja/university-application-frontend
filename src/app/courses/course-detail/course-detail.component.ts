import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from 'src/app/api.service';
import { CommentFormData } from './add-comment-form/add-comment-form.component';

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
  comments: any[] = [];

  courseData: any = {
    title: '',
    description: '',
    time: '',
    location: '',
    attendees: [],
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    public jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.user = this.jwtHelper.decodeToken(localStorage.getItem('ua_auth')!);

    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id')!;
      this.loadComments(this.courseId);
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
        this.apiService
          .getUserById(attendees[attendee])
          .subscribe((user: any) => {
            this.loading = true;
            let index = this.attendees.findIndex(
              (x) => x.userId === user.userId
            );
            index === -1
              ? this.attendees.push(user)
              : console.log('object already exists');
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

  loadComments(courseId: string) {
    this.loading = true;
    this.apiService.getCommentsByCourse(courseId).subscribe((comments: any) => {
      this.comments = comments;
      this.loading = false;
    });
  }

  reloadComments() {
    this.loadComments(this.courseId);
  }

  onCommentDataChanged(data: CommentFormData) {
    const author = `${this.user.firstName} ${this.user.lastName}`;
    this.apiService
      .addComment(data.comment, author, this.courseId, 0)
      .subscribe(() => {
        this.reloadComments();
      });
  }

  onCommentLiked(commentId: number) {
    this.apiService.likeComment(this.user.userId, commentId).subscribe(() => {
      this.reloadComments();
    });
  }

  hasLiked(likedBy: number[]): boolean {
    let index = likedBy.findIndex((x: number) => x === this.user.userId);
    return index !== -1;
  }

  goToPersonPage(userId: any) {
    if(userId !== this.user.userId) {
      this.router.navigate(['/person-detail', userId]);
    }
  }
}
