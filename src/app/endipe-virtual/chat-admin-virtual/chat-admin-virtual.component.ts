import { Component, OnInit, Inject, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-chat-virtual',
  templateUrl: './chat-admin-virtual.component.html',
  styleUrls: ['./chat-admin-virtual.component.scss']
})
export class ChatVirtualComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    ) { }

  @Input() comments: any;
  @Input() user: any;
  postAuthorEmail = '';
  carregando = false;
  newComment = null;
  remainingText;

  ngOnInit() {
    this.postAuthorEmail = this.user.email;
  }

  justifyChange(value) {
    this.remainingText = 240 - this.newComment.length;
  }

  parseContent(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  };

  isAuthor(email) {
    return email === this.postAuthorEmail;
  } 

  love (commentId){
    this.comments['chat'].forEach(comment => {
      if (comment.id == commentId)
        comment.loved = !comment.loved
    });      
  }

  reply(author) {
      if (!this.newComment.content)
      this.newComment.content = ''

      if (this.newComment.content.search('@' + author + '@') == -1) {
        if (this.newComment.content[0] == '@')
          this.newComment.content = ', ' + this.newComment.content
        else
          this.newComment.content = ' ' + this.newComment.content

         this.newComment.content = '@' + author + '@' + this.newComment.content
      }
  }

  addNewComment() {
      if(this.newComment){

            let chatMessage = this.newComment;
            chatMessage = chatMessage.replace(/(@[^@.]+)@/, '<span class="reply">$1</span>')
            chatMessage = chatMessage.replace(/https?:\/\/(www.)?([a-zA-Z0-9\-_]+\.[a-zA-Z0-9]+)/, '<a href="//$2">$2</a>')
            this.newComment = null;

            if(this.comments && this.comments._id){

              this.http.put(`${this.baseUrl}/chat-admin/chat?id=${this.comments._id}`, { mensagem: chatMessage }).subscribe((res: any) => {
                this.comments['chat'].push({
                    content: chatMessage,
                    publisher: {
                      user: this.user._id,
                      name: this.user.fullname, 
                      email: this.user.email
                    }
                  });

                this.toastr.success("Mensagem enviada com sucesso", "Sucesso");
              }, err => {
                this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
              });

            } else {

              this.http.post(`${this.baseUrl}/chat-admin/chat`, { mensagem: chatMessage }).subscribe((res: any) => {
                this.comments = res;
                /*this.comments['chat'] = ([{
                    content: chatMessage,
                    publisher: {
                      user: this.user._id,
                      name: this.user.fullname, 
                      email: this.user.email
                    }
                  }]);*/

                this.toastr.success("Mensagem enviada com sucesso", "Sucesso");
              }, err => {
                this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
              });

          }

      } else {
        this.toastr.error("Preencha sua mensagem antes de enviar", "Atenção");

      }
  }



}
