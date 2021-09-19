import { Component, HostListener, OnInit } from '@angular/core';
import { comment_model } from 'src/app/models/comment-model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.less']
})
export class CommentsComponent implements OnInit {
  user_name: string = "";
  comment_text: string = "";
  allComments: comment_model[] = [];

  comment_model = {
    uname: "",
    comm_txt: "",
    isReplying: false,
    isEditingComment: false,
    replies: [
      {
        name: "",
        reply_text: "",
        isEditingReply: false,
        dateTime: new Date()
      }
    ],
    dateTime: new Date()
  }
  replyingToComment: comment_model = new comment_model();
  replyingToCommentIndex: number = 0;
  sortDescending: boolean = false;
  sortAscending: boolean = true;

  constructor() { }

  ngOnInit(): void {
    // if(this.allComments[0].replies[0].name == ''){
    //   this.allComments[0].replies.splice(0, 0);
    // }
    debugger
    if (localStorage.getItem("allComments")) {
      this.allComments = JSON.parse(localStorage.getItem("allComments") || JSON.stringify(new comment_model()));
    }
    // this.user_name = "Gaurav";
    // this.comment_text = "This is a comment";
    // this.postComment();
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    localStorage.removeItem("allComments")
    localStorage.setItem("allComments", JSON.stringify(this.allComments))
    // any other code / dialog logic
  }

  resetModel() {
    this.comment_model = {
      uname: "",
      comm_txt: "",
      isReplying: false,
      isEditingComment: false,
      replies: [
        {
          name: "",
          reply_text: "",
          isEditingReply: false,
          dateTime: new Date()
        }
      ],
      dateTime: new Date()
    }
  }

  resetInputs() {
    this.user_name = "";
    this.comment_text = "";
  }

  postComment() {
    this.comment_model.uname = this.user_name;
    this.comment_model.comm_txt = this.comment_text;
    this.allComments.push(this.comment_model);
    this.resetModel();
    this.resetInputs();
  }

  replyToComment(comment: comment_model, ind: number) {
    comment.isReplying = true;
    this.replyingToComment = comment;
    this.replyingToCommentIndex = ind;
  }

  replyPosted(event: any) {
    this.allComments[this.replyingToCommentIndex].replies.push(event);
    console.log(this.allComments);
    this.replyingToComment.isReplying = false;
  }

  editComment(comment: comment_model, ind: number) {
    comment.isEditingComment = true;
  }

  updateComment(comment: comment_model, ind: number) {
    comment.isEditingComment = false;
  }

  editReply(comment: comment_model, reply: any, ind: number) {
    reply.isEditingReply = true;
  }

  updateReply(comment: comment_model, reply: any, ind: number) {
    reply.isEditingReply = false;
  }

  sortArrayInAscending() {
    return this.allComments.sort((a, b) => {
      this.sortDescending = false;
      this.sortAscending = true;
      return <any>new Date(b.dateTime) - <any>new Date(a.dateTime);
    });
  }

  sortArrayInDescending() {
    return this.allComments.sort((a, b) => {
      this.sortDescending = true;
      this.sortAscending = false;
      return <any>new Date(a.dateTime) - <any>new Date(b.dateTime);
    });
  }

  deleteComment(comment: comment_model, ind: number) {
    const index = this.allComments.indexOf(comment);
    if (index > -1) {
      this.allComments.splice(index, 1);
    }
  }

  deleteReply(comment: comment_model, reply: any, ind: number) {
    const index = comment.replies.indexOf(reply);
    if (index > -1) {
      comment.replies.splice(index, 1);
    }
  }

}
