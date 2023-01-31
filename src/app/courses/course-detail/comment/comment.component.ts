import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommentFormData } from '../add-comment-form/add-comment-form.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input()
  comment: any = {};

  @Input()
  disabled = false;

  @Output()
  commentLiked: EventEmitter<number> = new EventEmitter<number>();

  likeComment() {
    this.commentLiked.emit(this.comment.id);
  }
}
