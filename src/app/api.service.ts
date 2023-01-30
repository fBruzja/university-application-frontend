import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfilePicture } from './shared/model/profile-picture';
import { UserSettings } from './shared/model/user-settings';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post('http://localhost:8080/api/users/login', {
      email,
      password,
    });
  }

  signUp(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    major: string,
    minor: string
  ) {
    return this.http.post('http://localhost:8080/api/users/register', {
      firstName,
      lastName,
      email,
      password,
      major,
      minor,
    });
  }

  getCourseList() {
    return this.http.get('http://localhost:8080/api/courses');
  }

  getCourseById(courseId: string) {
    return this.http.get(`http://localhost:8080/api/courses/${courseId}`);
  }

  getUserById(userId: string) {
    return this.http.get(`http://localhost:8080/api/users/${userId}`);
  }

  addCourseAttendee(courseId: string, attendee: string) {
    return this.http.put(
      `http://localhost:8080/api/courses/${courseId}/${attendee}`,
      {}
    );
  }

  removeCourseAttendee(courseId: string, attendee: string) {
    return this.http.put(
      `http://localhost:8080/api/courses/remove-attendee/${courseId}/${attendee}`,
      {}
    );
  }

  updateProfilePicture(profilePicture: string, userId: string) {
    return this.http.put(
      `http://localhost:8080/api/users/profile-picture/${userId}`,
      {
        base64Image: profilePicture,
      } as ProfilePicture
    );
  }

  updateUserSettings(notifications: boolean, userId: string) {
    return this.http.put(`http://localhost:8080/api/users/settings/${userId}`, {
      notifications,
    } as UserSettings);
  }

  getCommentsByCourse(courseId: string) {
    return this.http.get(`http://localhost:8080/api/comments/${courseId}`);
  }

  addComment(content: string, author: string, course: number, likes: number) {

  }
}
