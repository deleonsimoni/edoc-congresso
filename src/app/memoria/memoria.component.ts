import { Component, OnInit, ViewChild } from '@angular/core';
import { SCHEDULE_TYPE, WORK_OPTIONS } from "../declarations";
import { BehaviorSubject } from "rxjs";
import { ScheduleService } from "../services/schedule.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-memoria',
  templateUrl: './memoria.component.html',
  styleUrls: ['./memoria.component.scss']
})
export class MemoriaComponent implements OnInit {

  public workModalities = WORK_OPTIONS;
  public programacoes = SCHEDULE_TYPE;
  public schedules$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  @ViewChild('selecioneDia', { static: false }) selecioneDia: any;
  public days = ["25/07", "26/07", "27/07", "28/07", "29/07"];
  daySelect;
  modalitySelect;
  modalitySelect2;
  pressbutton;
  carregando = false;
  axisId;
  workTitle;
  public user: any;
  public loading = false;

  public modalities2 = [
    {
      name: 'Oficina',
      type: 4
    },
    {
      name: 'Painel',
      type: 5
    },
    {
      name: 'Exposição',
      type: 2
    },

  ];

  public modalities = [
    {
      name: 'Abertura',
      type: 1
    },

    {
      name: 'Encerramento',
      type: 12
    },
    {
      name: 'Lançamentos de Livros',
      type: 9
    },

    {
      name: 'Conferências',
      type: 8
    },
    {
      name: 'Oficina',
      type: 4
    },
    {
      name: 'Painel',
      type: 5
    },
    {
      name: 'Exposição',
      type: 2
    },
  ];

  public eixos = [
    { id: 1, name: "Eixo 1: Educação Online" },
    { id: 2, name: "Eixo 2: Fenômenos da Cibercultura" },
    { id: 3, name: "Eixo 3: Hiperartesanias docentes e Hiperescritas de si" },
    { id: 4, name: "Eixo 4: Escola Básica" },
    { id: 5, name: "Eixo 5: Redes Educativas" },
    { id: 6, name: "Eixo 6: Ativismo Online e redes sociais" },
  ];


  constructor(private scheduleService: ScheduleService,
    private authService: AuthService,
    private auth: AuthService,
  ) {

  }


  ngOnInit() {

    this.user = this.auth.getDecodedAccessToken(this.auth.getToken());

  }

  public selectDate(day) {
    this.daySelect = day;
  }

  public selectModality(modality) {
    this.modalitySelect = modality.type;
    this.selecioneDia.nativeElement.focus();

  }

  public selectModality2(modality) {
    this.modalitySelect2 = modality.type;
    this.selecioneDia.nativeElement.focus();

  }
  public filterWorks() {
    this.pressbutton = Math.random();
  }

}





