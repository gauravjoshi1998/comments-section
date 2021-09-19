import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { comment_model } from 'src/app/models/comment-model';

@Component({
  selector: 'app-replies',
  templateUrl: './replies.component.html',
  styleUrls: ['./replies.component.less']
})
export class RepliesComponent implements OnInit {
  @Input() inpComment: comment_model = new comment_model();

  @Output() replyPosted = new EventEmitter();
  @Output() replyCancelled = new EventEmitter();

  reply_name: string = "";
  reply_text: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
  }

  cancelReply(){
    this.reply_name = "";
    this.reply_text = "";
    this.replyCancelled.emit()
  }

  postReply(){
    this.replyPosted.emit({name: this.reply_name, reply_text: this.reply_text, isEditingReply: false, dateTime: new Date()});
    this.reply_name = "";
    this.reply_text = "";
  }

}
