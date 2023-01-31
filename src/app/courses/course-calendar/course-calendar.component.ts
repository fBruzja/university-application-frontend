import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { startOfYear, subYears } from 'date-fns';
import { ApiService } from 'src/app/api.service';

interface Course {
  date: string;
  name: string;
}

type CalendarEventWithMeta = CalendarEvent<
  { type: 'course'; course: Course } | { type: 'normal' }
>;

@Component({
  selector: 'app-course-calendar',
  templateUrl: './course-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate = startOfYear(subYears(new Date(), 0));

  events: CalendarEventWithMeta[] = [];

  constructor(private apiService: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchHolidays();
  }

  private fetchHolidays() {
    this.apiService.getCourseList().subscribe((courses: any) => {
      this.events = courses.map((course: any) => {
        return {
          start: new Date(course.courseTime),
          title: course.title,
          allDay: true,
          meta: {
            type: 'course',
            course,
          },
        };
      });
      this.cdr.markForCheck();
    });
  }
}
