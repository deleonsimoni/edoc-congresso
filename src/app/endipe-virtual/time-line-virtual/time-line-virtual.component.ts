import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-time-line-virtual',
  templateUrl: './time-line-virtual.component.html',
  styleUrls: ['./time-line-virtual.component.scss']
})
export class TimeLineVirtualComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private toastr: ToastrService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
  ) { }

  comments: any;
  @Input() user: any;
  postAuthorEmail = '';
  carregando = false;
  newComment = null;
  remainingText;

  ngOnInit() {
    this.postAuthorEmail = this.user.email;
    this.listarMural();
  }

  listarMural() {
    this.carregando = true;
    this.http.get(`${this.baseUrl}/chat-admin/mural`).subscribe(
      (res: any) => {
        this.comments = res.mural;

        this.carregando = false;
      },
      (err) => {
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
        this.carregando = false;
      }
    );
  }

  justifyChange(value) {
    this.remainingText = 120 - this.newComment.length;
  }

  atualizarChat() {
    this.listarMural();
  }

  parseContent(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  };

  isAuthor(email) {
    return email === this.postAuthorEmail;
  }

  love(commentId) {
    this.comments['chat'].forEach(comment => {
      if (comment.id == commentId)
        comment.loved = !comment.loved
    });
  }

  removerComentario(commentId) {
    this.http.delete(`${this.baseUrl}/chat-admin/mural?id=${this.comments._id}&idChat=${commentId}`).subscribe((res: any) => {
      this.listarMural();
      this.toastr.success("Mensagem deletada com sucesso", "Sucesso");
    }, err => {
      this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
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
    if (this.newComment) {

      let chatMessage = this.newComment;
      chatMessage = chatMessage.replace(/(@[^@.]+)@/, '<span class="reply">$1</span>')
      chatMessage = chatMessage.replace(/https?:\/\/(www.)?([a-zA-Z0-9\-_]+\.[a-zA-Z0-9]+)/, '<a href="//$2">$2</a>')
      this.newComment = null;



      if (this.comments._id) {

        this.http.put(`${this.baseUrl}/chat-admin/mural?id=${this.comments._id}`, { mensagem: chatMessage }).subscribe((res: any) => {

          this.listarMural();

          this.toastr.success("Mensagem enviada com sucesso", "Sucesso");
        }, err => {
          this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
        });

      } else {

        this.http.post(`${this.baseUrl}/chat-admin/mural`, { mensagem: chatMessage }).subscribe((res: any) => {
          this.comments = res;
          this.comments['chat'] = ([{
            content: chatMessage,
            publisher: {
              user: this.user._id,
              name: this.user.fullname,
              email: this.user.email
            }
          }]);

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
