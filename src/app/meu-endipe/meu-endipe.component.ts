import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ScheduleService } from 'src/app/services/schedule.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-meu-endipe',
  templateUrl: './meu-endipe.component.html',
  styleUrls: ['./meu-endipe.component.scss']
})
export class MeuEndipeComponent implements OnInit {

  countDownDate;
  days; 
  hours;
  minutes;
  seconds;

  user;
  schedules = [];
  apresentacoes = [];
  mediators = [];
  monitors = [];
  carregando = false;
  carregandoLista = false;
  carregandoApresentacao = false;
  scheduleSelect;
  comments: any;
  postAuthorEmail = '';
  newComment = null;
  remainingText;

  constructor(
    private authService: AuthService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private toastr: ToastrService,
    private scheduleService: ScheduleService,
    private sanitizer: DomSanitizer,

  ) { }
/*
  ngOnInit() {

    this.countDownDate = new Date("Oct 29, 2020 00:00:00").getTime();

    setInterval(() => {

      var now = new Date().getTime();
    
      let distance = this.countDownDate - now;
      
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

    }, 1000);
  }*/
  ngOnInit() {
    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());

    //INCRIÇÕES USUARIO
    if(this.user){
      this.getUserSubscribers();
      this.getUserPresentation();
      if(this.user.monitor){
        this.getUserMonitors();
      }
      if(this.user.mediador){
        this.getUserMediator();
      }
    }
  }

  selectSchedule(id){
    if(this.scheduleSelect == id){
      this.scheduleSelect = null;
    } else {
      this.scheduleSelect = id;
      this.listarChatWork(this.scheduleSelect);
    }
  }

  getUserSubscribers(){
    this.carregandoLista = true;
    this.http.get(`${this.baseUrl}/live/getSubscribersUser`).subscribe(
      (res: any) => {
        this.schedules = res.filter((obj) => obj );
        this.carregandoLista = false;

        if(this.schedules) {
          this.schedules.forEach(element => {
            if(element.type != 3 && element.authors){
              element.authors = element.authors.split(',');
            }
          });
        }

      },
      (err) => {
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
        this.carregandoLista = false;
      }
    );
  }

  getUserPresentation(){
    this.carregandoApresentacao = true;
    this.http.get(`${this.baseUrl}/live/getPresentationsUser`).subscribe(
      (res: any) => {
        this.apresentacoes = res.filter((obj) => obj );
        this.carregandoApresentacao = false;

        if(this.apresentacoes) {
          this.apresentacoes.forEach(element => {
            if(element.authors){
              element.authors = element.authors.split(',');
            }
          });
        }

      },
      (err) => {
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
        this.carregandoApresentacao = false;
      }
    );
  }

  getUserMediator(){
    this.http.get(`${this.baseUrl}/live/getUserMediator`).subscribe(
      (res: any) => {
        this.mediators = res.filter((obj) => obj );

        if(this.mediators) {
          this.mediators.forEach(element => {
            if(element.authors){
              element.authors = element.authors.split(',');
            }
          });
        }

      },
      (err) => {
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
      }
    );
  }

  getUserMonitors(){
    this.http.get(`${this.baseUrl}/live/getUserMonitors`).subscribe(
      (res: any) => {
        this.monitors = res.filter((obj) => obj );

        if(this.monitors) {
          this.monitors.forEach(element => {
            if(element.authors){
              element.authors = element.authors.split(',');
            }
          });
        }

      },
      (err) => {
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
      }
    );
  }

  public isSubscribe(scheduleSelect) {
    if (this.user._id && scheduleSelect.hasOwnProperty('subscribers')) {
        return scheduleSelect.subscribers.some(el => el.userId == this.user._id);
    }
  
    return false;
  }
    
  public cancelSignUp(type, scheduleFull) {
      this.carregando = true;
      if (type == 4) {
          this.scheduleService.cancelEnrollSchedule(scheduleFull._id)
              .subscribe(res => {
                this.getUserSubscribers();
                this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                  this.carregando = false;
              }, err => {
                  this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                  this.carregando = false;
              });
  
      } else if (type == 5) {
          this.scheduleService.cancelEnrollSchedulePainel(scheduleFull._id)
              .subscribe(res => {
                this.getUserSubscribers();
                this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                  this.carregando = false;
              }, err => {
                  this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                  this.carregando = false;
              });
  
      } else {
          this.scheduleService.cancelEnrollScheduleRodaDeConversa(scheduleFull._id)
              .subscribe(res => {
                this.getUserSubscribers();
                this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                  this.carregando = false;
              }, err => {
                  this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                  this.carregando = false;
              });
      }
  }


  //CHAT
  listarChatWork(id){
    this.carregando = true;
    this.http.get(`${this.baseUrl}/chat-admin/chatWork?idWork=${id}`).subscribe(
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

  justifyChange(value) {
    this.remainingText = 120 - this.newComment.length;
  }

  atualizarChat(){
    this.listarChatWork(this.scheduleSelect);
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

              this.http.put(`${this.baseUrl}/chat-admin/chatWork?id=${this.comments._id}`, { mensagem: chatMessage }).subscribe((res: any) => {
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

              this.http.post(`${this.baseUrl}/chat-admin/chatWork?idWork=${this.scheduleSelect}`, { mensagem: chatMessage }).subscribe((res: any) => {
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
