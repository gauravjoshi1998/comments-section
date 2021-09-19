export class comment_model {
    uname: string = "";
    comm_txt: string = "";
    isEditingComment : boolean = false;
    isReplying : boolean = false;
    replies = [
      {
      name: "",
      reply_text: "",
      isEditingReply : false,
      dateTime: new Date()
    }
  ];
  dateTime = new Date();  
}