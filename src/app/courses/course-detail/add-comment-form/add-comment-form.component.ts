import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export interface CommentFormData {
  content: string;
}

@Component({
  selector: 'app-add-comment-form',
  templateUrl: './add-comment-form.component.html',
  styleUrls: ['./add-comment-form.component.scss'],
})
export class AddCommentFormComponent {
  @Output()
  commentChanged: EventEmitter<CommentFormData> =
    new EventEmitter<CommentFormData>();

  formGroup = new FormGroup(
    {
      comment: new FormControl('', Validators.required),
    },
    {
      updateOn: 'blur',
    }
  );

  constructor() {}

  addComment() {
    this.commentChanged.emit(this.formGroup.value as CommentFormData);
  }
}
