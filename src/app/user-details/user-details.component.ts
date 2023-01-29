import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { UserSettingsFormData } from './user-details-settings-form/user-details-settings-form.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  loading = false;
  user: any = {};
  userId: string = "";
  courses: any[] = [];
  base64Image: string = "";
  userSettingsData: UserSettingsFormData = { notifications: false };

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.userId = params.get('id')!;
      this.loadUser(this.userId);
    });
  }

  loadUser(userId: string) {
    this.apiService.getUserById(userId).subscribe((user: any) => {
      this.loading = true;
      this.user = user;
      this.base64Image = user.profilePicture;
      console.log(user);
      
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

  onFileChange(event: any) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64Image = reader.result as string;
      this.apiService.updateProfilePicture(this.base64Image, this.userId).subscribe(() => this.reloadUser());
    };
  }

  reloadUser() {
    this.loadUser(this.userId);
  }

  onSettingsDataChanged(data: UserSettingsFormData) {
    this.userSettingsData = data;
    console.log('settings::', data);
  }
}
