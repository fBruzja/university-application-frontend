import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.scss']
})
export class CoursesOverviewComponent implements OnInit {

  courses: any[] = [];
  loading = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.apiService.getCourseList().subscribe((response: any) => {
      this.courses = response;
      this.loading = false;
    })
  }

  async onCourseSelected(categoryId: string): Promise<void> {
    await this.router.navigate([categoryId], {
      relativeTo: this.route
    });
  }

}
