import { Component, OnInit, Input, Inject, KeyValueDiffer, KeyValueDiffers, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { PageEvent } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-schedule-virtual',
  templateUrl: './schedule-virtual.component.html',
  styleUrls: ['./schedule-virtual.component.scss']
})
export class ScheduleVirtualComponent implements OnInit {

  @Input() day: any;
  @Input() type: any;
  @Input() autor: any;
  @Input() eixo: any;
  @Input() titulo: any;
  @Input() search: any;

  @Input() user: any;

  page = null;
  schedules= [];
  pager: any = {};
  pagerBooks: any = {};
  pageEvent: PageEvent;
  pageEventBooks: PageEvent;
  carregando = false;
  carregandoLista = false;
  pageHot;
  scheduleSelect;
  differ: KeyValueDiffer<string, any>;
  @ViewChild('trabalho', {static: false}) trabalhoId: any;

  linkYoutubeSafe;

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private differs: KeyValueDiffers,
    private scheduleService: ScheduleService,
    private _sanitizer: DomSanitizer,

  ) { 
    this.differ = this.differs.find({}).create();
  }

  ngOnInit() {
    this.getSchedulePaginate(null, this.day, this.type, this.autor, this.eixo, this.titulo);
  }

  selectSchedule(schedule){
    if(this.scheduleSelect == schedule._id){
      this.scheduleSelect = null;
    } else {
      if(schedule.virtual && schedule.virtual.linkYoutube){
        schedule.virtual.linkYoutube = '//www.youtube.com/embed/' + this.getIdYoutube(schedule.virtual.linkYoutube);
        this.linkYoutubeSafe = this._sanitizer.bypassSecurityTrustResourceUrl(schedule.virtual.linkYoutube);
      }
      this.scheduleSelect = schedule._id;
    }
  }

  getIdYoutube(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
  }

  selectBookSchedule(schedule){
    if(this.scheduleSelect == schedule._id){
      this.scheduleSelect = null;
    } else {
      this.scheduleSelect = schedule._id;
      this.getBooksPaginated(schedule, null);

    }
  }

  ngDoCheck() {
    const change = this.differ.diff(this);
    if (change) {
      change.forEachChangedItem(item => {
        if(item.key == 'day' || item.key == 'type' || item.key == 'search'){
          this.getSchedulePaginate(null, this.day, this.type, this.autor, this.eixo, this.titulo);
        }
      });
    }
  }

  alerta(event, a, b){
    console.log(event)
  }

  getSchedulePaginate(event, day, type, autor, eixo, titulo){
    this.carregandoLista = true;
    let pageChoose = event && event.pageIndex + 1 || 1;
    this.http.get(`${this.baseUrl}/live/scheduleWorkPaginate?page=${pageChoose}&date=${day}&type=${type}&eixo=${eixo}&autor=${autor}&titulo=${titulo}`).subscribe(
      (res: any) => {
        this.schedules = res.schedule || [];
        if(this.schedules) {
          this.trabalhoId.nativeElement.focus()
          this.schedules.forEach(element => {
            if(element.authors){
              element.authors = element.authors.split(',');
            }
          });
        }
        this.pager = res.pager;
        this.carregandoLista = false;
      },
      (err) => {
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
        this.carregandoLista = false;
      }
    );
  }

  getBooksPaginated(schedule, event){
    this.carregando = true;
    let pageChoose = event && event.pageIndex + 1 || 1;
    this.http.get(`${this.baseUrl}/live/scheduleBooksPaginate?page=${pageChoose}&id=${schedule._id}`).subscribe(
      (res: any) => {
        schedule.books = res.books;
        this.pagerBooks = res.pager;
        this.carregando = false;

        let indexArray = 0;
        setTimeout( () => {
          schedule.books.forEach(element => {
  
            if((document.getElementById(element.nameMiniature) as HTMLImageElement)){
              let file = element.miniature.data;
              const base64 = btoa(new Uint8Array(file).reduce((data, byte) => data + String.fromCharCode(byte), ''));
              (document.getElementById(element.nameMiniature) as HTMLImageElement).src = 'data:image/jpg;base64,' + base64;
              indexArray++;  
            }
           
          }); 
        }, 100);
      },
      (err) => {
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
        this.carregando = false;
      }
    );
  }

public isSubscribe(scheduleSelect) {
  if (this.user._id && scheduleSelect.hasOwnProperty('subscribers')) {
      return scheduleSelect.subscribers.some(el => el.userId == this.user._id);
  }

  return false;
}

  public signUp(type, scheduleFull) {
    this.carregando = true;
    if (type == 4) {
        this.scheduleService.enrollSchedule(scheduleFull._id)
            .subscribe((res: any) => {
              this.carregando = false;
              if(res.msg){
                this.toastr.error(res.msg, 'Atenção');
              } else {
                this.getSchedulePaginate(null, this.day, this.type, this.autor, this.eixo, this.titulo);
                this.toastr.success('Inscrição realizada com sucesso', 'Sucesso');
              }
            }, err => {
                this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                this.carregando = false;
            });
    } else if (type == 5) {
        this.scheduleService.enrollSchedulePainel(scheduleFull._id)
            .subscribe((res: any) => {
              this.carregando = false;
              if(res.msg){
                this.toastr.error(res.msg, 'Atenção');
              } else {
                this.getSchedulePaginate(null, this.day, this.type, this.autor, this.eixo, this.titulo);
                this.toastr.success('Inscrição realizada com sucesso', 'Sucesso');
              }
            }, err => {
                this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                this.carregando = false;
            });
    }
    else {
        this.scheduleService.enrollScheduleRodaDeConversa(scheduleFull._id)
            .subscribe((res: any) => {
              this.carregando = false;
              if(res.msg){
                this.toastr.error(res.msg, 'Atenção');
              } else {
                this.getSchedulePaginate(null, this.day, this.type, this.autor, this.eixo, this.titulo);
                this.toastr.success('Inscrição realizada com sucesso', 'Sucesso');
              }
            }, err => {
                this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                this.carregando = false;
            });
    }
}

public cancelSignUp(type, scheduleFull) {
    this.carregando = true;
    if (type == 4) {
        this.scheduleService.cancelEnrollSchedule(scheduleFull._id)
            .subscribe(res => {
              this.getSchedulePaginate(null, this.day, this.type, this.autor, this.eixo, this.titulo);
              this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                this.carregando = false;
            }, err => {
                this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                this.carregando = false;
            });

    } else if (type == 5) {
        this.scheduleService.cancelEnrollSchedulePainel(scheduleFull._id)
            .subscribe(res => {
              this.getSchedulePaginate(null, this.day, this.type, this.autor, this.eixo, this.titulo);
              this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                this.carregando = false;
            }, err => {
                this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                this.carregando = false;
            });

    } else {
        this.scheduleService.cancelEnrollScheduleRodaDeConversa(scheduleFull._id)
            .subscribe(res => {
              this.getSchedulePaginate(null, this.day, this.type, this.autor, this.eixo, this.titulo);
              this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                this.carregando = false;
            }, err => {
                this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                this.carregando = false;
            });
    }
}

}
