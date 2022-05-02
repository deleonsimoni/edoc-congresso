import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  user;
  carregando = false;
  comments;
  chats = [];
  chatSelected;
  pager: any = {};

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.retrieveUser();
    this.getListChatAdmin(null);
  }

  private retrieveUser() {
    this.user = this.auth.getDecodedAccessToken(this.auth.getToken());
  }

  getListChatAdmin(event){
    this.carregando = true;
    let pageChoose = event && event.pageIndex + 1 || 1;
    this.http.get(`${this.baseUrl}/chat-admin/list?page=${pageChoose}`).subscribe(
      (res: any) => {
        this.chats = res.chat;
        this.pager = res.pager;
        this.carregando = false;
      },
      (err) => {
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
        this.carregando = false;
      }
    );
  }

  selectChat(id){
    if(this.chatSelected == id){
      this.chatSelected = null;
      this.comments = null;
    } else {
      this.carregando = true;
      this.chatSelected = null;
      this.chatSelected = id;
      this.http.get(`${this.baseUrl}/chat-admin/chat?id=${id}`).subscribe(
        (res: any) => {
          this.comments = res;
          this.carregando = false;
        },
        (err) => {
          this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
          this.carregando = false;
        }
      );
    }
  }


}
