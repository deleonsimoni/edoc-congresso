import { Component, OnInit, ViewChild } from "@angular/core";

import { SCHEDULE_TYPE, WORK_OPTIONS } from "../../../declarations";
import { BehaviorSubject } from "rxjs";
import { ScheduleService } from "../../../services/schedule.service";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: 'app-inscrevase',
  templateUrl: './inscrevase.component.html',
  styleUrls: ['./inscrevase.component.scss']
})
export class InscrevaseComponent implements OnInit {

  public workModalities = WORK_OPTIONS;
  public programacoes = SCHEDULE_TYPE;
  public schedules$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public days = ["25/07", "26/07", "27/07", "28/07", "29/07"];
  daySelect;
  modalitySelect;
  pressbutton;
  carregando = false;
  axisId;
  workTitle;
  @ViewChild('selecioneDia', { static: false }) selecioneDia: any;
  public user: any;
  public loading = false;
  public modalities = [
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
    //this.listAllSchedules();

    this.user = this.auth.getDecodedAccessToken(this.auth.getToken());

  }

  /*
  private listAllSchedules() {
    this.typeId = this.getType();
    const date = this.daySelected$.getValue().replace("/", "-");

    this.scheduleService.retrieveSchedules(this.typeId, date).subscribe((data) => this.schedules$.next(data));
  }
*/

  public selectDate(day) {
    this.daySelect = day;
  }

  public selectModality(modality) {
    this.modalitySelect = modality.type;
    this.selecioneDia.nativeElement.focus();
  }

  public filterWorks() {
    this.pressbutton = Math.random();
  }


}
