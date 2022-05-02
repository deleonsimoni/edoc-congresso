import { Component, OnInit, ViewChild } from '@angular/core';

import { SCHEDULE_TYPE, WORK_OPTIONS } from "../../../declarations";
import { BehaviorSubject } from "rxjs";
import { ScheduleService } from "../../../services/schedule.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-programacao-aberta',
  templateUrl: './programacao-aberta.component.html',
  styleUrls: ['./programacao-aberta.component.scss']
})
export class ProgramacaoAbertaComponent implements OnInit {

 

  public workModalities = WORK_OPTIONS;
  public programacoes = SCHEDULE_TYPE;
  public schedules$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  @ViewChild('selecioneDia', {static: false}) selecioneDia: any;
  public days = ["29/10", "30/10", "31/10", "01/11", "02/11", "03/11", "04/11", "05/11", "06/11", "07/11", "08/11", "09/11", "10/11", "11/11", "12/11"];
  daySelect;
  modalitySelect;
  carregando = false;
  public user: any;
  public loading = false;
  public modalities = [
    {
      name: 'Abertura',
      type: 1
    },
    {
      name: 'Atividade Cultural',
      type: 7
    },
    {
      name: 'Conexão Entrevista',
      type: 11
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
      name: 'Sessão Especial',
      type: 10
    },
    {
      name: 'Simpósios',
      type: 8
    }
  ];


  constructor(
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

}
