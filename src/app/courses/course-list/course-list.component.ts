import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatatableValueTransformerPipe } from 'src/app/shared/pipe/datatable-value-transformer.pipe';

export interface ColumnConfig {
  title?: string;
  time?: string;
  location?: string;
}

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent {

  valueTransformerPipe = new DatatableValueTransformerPipe();

  @Output() rowClicked: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  internalColumnConfig: ColumnConfig = {
    title: 'course',
    time: 'time',
    location: 'place'
  }; // default values

  @Input()
  courses: any[] = [];

  @Input()
  set columnConfig(config: ColumnConfig) {
    if (config) {
      Object.assign(this.internalColumnConfig, config);
    }
  }

  onRowClick(courseId: string) {
    this.rowClicked.emit(courseId);
  }

}
