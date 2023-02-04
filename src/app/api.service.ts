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

  addComment(content: string, author: string, course: string, likes: number) {
    return this.http.post('http://localhost:8080/api/comments/add-comment', {
      content,
      author,
      likes,
      course,
    });
  }

  likeComment(userId: string, commentId: number) {
    return this.http.put(
      `http://localhost:8080/api/comments/like/${userId}/${commentId}`,
      {}
    );
  }

  findFriendshipRequestsByUserId(userId: number) {
    return this.http.get(
      `http://localhost:8080/api/friendship/user-id/${userId}`
    );
  }

  createFriendship(userId: any, friendId: any) {
    return this.http.post(
      `http://localhost:8080/api/friendship/add-friendship`,
      {
        userId,
        friendId,
      }
    );
  }

  addFriend(userId: any, friendId: any) {
    return this.http.put(
      `http://localhost:8080/api/users/add-friend/${userId}/${friendId}`,
      {}
    );
  }

  removeFriend(userId: any, friendId: any) {
    return this.http.put(
      `http://localhost:8080/api/users/remove-friend/${userId}/${friendId}`,
      {}
    );
  }

  getSpecificFriendship(userId: any, friendId: any) {
    return this.http.get(
      `http://localhost:8080/api/friendship/specific/${userId}/${friendId}`
    );
  }

  areTwoUsersFriends(userId1: any, userId2: any) {
    return this.http.get(
      `http://localhost:8080/api/friendship/friends/are/${userId1}/${userId2}`
    );
  }

  countNotifications(userId: any) {
    return this.http.get(
      `http://localhost:8080/api/friendship/friends/notification/count/${userId}`
    );
  }

  getActiveFriendships(userId: any) {
    return this.http.get(
      `http://localhost:8080/api/friendship/friends/active/friendships/${userId}`
    );
  }

  getPendingActiveFriendships(userId: any) {
    return this.http.get(
      `http://localhost:8080/api/friendship/friends/active/pending/friendships/${userId}`
    );
  }

  setStatusToNotified(userId: any, friendId: any) {
    return this.http.put(
      `http://localhost:8080/api/friendship/friends/set/notified/${userId}/${friendId}`,
      {}
    );
  }

  changeFriendRequestStatus(userId: any, friendId: any, notificationState: any) {
    return this.http.put(
      `http://localhost:8080/api/friendship/friends/change/friendship/request/${userId}/${friendId}`,
      {notificationState}
    );
  }

  acceptFriendRequest(userId: any, friendId: any) {
    return this.http.put(
      `http://localhost:8080/api/friendship/friends/request/accept/${userId}/${friendId}`,
      {}
    );
  }

  rejectFriendRequest(userId: any, friendId: any) {
    return this.http.put(
      `http://localhost:8080/api/friendship/friends/request/reject/${userId}/${friendId}`,
      {}
    );
  }
}
