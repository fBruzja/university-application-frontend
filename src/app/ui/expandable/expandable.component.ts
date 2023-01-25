import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent {
  @Input() expanded = true;
  @Input() isExpandable = false;
  @Input() label: string = '';

  toggleExpansion() {
    this.expanded = !this.expanded;
  }
}
