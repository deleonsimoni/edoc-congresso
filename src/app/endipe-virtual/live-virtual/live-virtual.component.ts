import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-live-virtual',
  templateUrl: './live-virtual.component.html',
  styleUrls: ['./live-virtual.component.scss']
})
export class LiveVirtualComponent implements OnInit {

  date;
  schedules = [];
  scheduleSelect;
  carregando = false;
  linkYoutubeSafe;
  chatYoutubeSafe;

  pagerBooks: any = {};

  constructor(
    private auth: AuthService,
    private toastr: ToastrService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private scheduleService: ScheduleService,
    private _sanitizer: DomSanitizer,

  ) { }

  ngOnInit() {
    this.getListVirtual();
  }

  selectSchedule(schedule) {
    if (this.scheduleSelect == schedule._id) {
      this.scheduleSelect = null;
    } else {
      if(schedule.virtual && schedule.virtual.linkYoutube){
        schedule.virtual.linkYoutube = '//www.youtube.com/embed/' + this.getIdYoutube(schedule.virtual.linkYoutube);
        this.linkYoutubeSafe = this._sanitizer.bypassSecurityTrustResourceUrl(schedule.virtual.linkYoutube);
        this.chatYoutubeSafe = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/live_chat?v='+ this.getIdYoutube(schedule.virtual.linkYoutube) + '&embed_domain=' + window.location.hostname);
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

  public getListVirtual() {

    this.carregando = true;

    this.http.get(`${this.baseUrl}/live/getScheduleByDay`).subscribe(
      (res: any) => {

        this.date = res.date;

        if (res.abertura) {
          res.abertura.forEach(element => {
            element.type = 1;
          });
          this.schedules.concat(res.abertura);
        }

        if (res.encerramento) {
          res.encerramento.forEach(element => {
            element.type = 12;
          });
          this.schedules.concat(res.encerramento);
        }

        res.simposio.forEach(element => {
          element.type = 8;
        });

        res.atividadeCultural.forEach(element => {
          element.type = 7;
        });

        res.lancamentoDeLivros.forEach(element => {
          element.type = 9;
        });

        res.rodaReunioesEntidadesRedes.forEach(element => {
          element.type = 11;
        });

        res.sessoesEspeciais.forEach(element => {
          element.type = 10;
        });



        this.schedules = [
          ...res.atividadeCultural,
          ...res.rodaReunioesEntidadesRedes,
          ...res.simposio,
          ...res.sessoesEspeciais,
          ...res.lancamentoDeLivros,
          ...res.abertura,
          ...res.encerramento

        ]

        if (this.schedules) {
          this.schedules.forEach(element => {
            if (element.authors) {
              element.authors = element.authors.split(',');
            }
          });
        }

        this.schedules.sort(function (a, b) {
          return a.startTime.replace(':', '') - b.startTime.replace(':', '');
        });

        this.carregando = false;

      },
      (err) => {
        this.carregando = false;
        this.toastr.error("Servidor momentâneamente inoperante", "Atenção");
      }
    );

  }


  selectBookSchedule(schedule){
    if(this.scheduleSelect == schedule._id){
      this.scheduleSelect = null;
    } else {
      this.scheduleSelect = schedule._id;
      this.getBooksPaginated(schedule, null);

    }
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
}



