import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalCoordinatorComponent } from '../modals/modal-coordinator/modal-coordinator.component';
import { AdminService } from '../admin.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-coordinator',
  templateUrl: './coordinator.component.html',
  styleUrls: ['./coordinator.component.scss']
})
export class CoordinatorComponent implements OnInit, OnDestroy {

  public coordinators = [];
  private coordinatorsUnsub$ = new Subject();
  @ViewChildren('checkboxMultiple') private checkboxesMultiple: QueryList<any>;

  public eixos = [
    { id: 1, name: "Eixo 1: A Didática como campo epistemológico e disciplinar" },
    { id: 2, name: "Eixo 2: A Didática e os Saberes docentes estruturantes na formação de professores" },
    { id: 3, name: "Eixo 3: A Didática e as tecnologias da informação e comunicação no currículo e práticas de ensino" },
    { id: 4, name: "Eixo 4: A Didática e Práticas de Ensino na perspectiva da Educação como Direito Constitucional e os desafios políticos da atualidade" },
    { id: 5, name: "Eixo 5: A Didática e as Práticas de ensino nas políticas de formação de Pedagogos(as)" },
    { id: 6, name: "Eixo 6: A Didática e as Práticas de Ensino nos cursos de Licenciatura: entre tensionamentos e perspectivas" },
    { id: 7, name: "Eixo 7: A Didática, Práticas de Ensino - Infâncias, Juventudes e Vida Adulta" },
    { id: 8, name: "Eixo 8: A Didática, Práticas de Ensino, Educação das Relações Étnico-raciais, Diversidade e Inclusão Escolar" },
    { id: 9, name: "Eixo 9: A Didática da Educação Superior" }
  ];

  public axisId = null;
  public user;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private toastr: ToastrService,
    private authService: AuthService

  ) { }

  ngOnInit() {
    this.retrieveUser();
  }

  retrieveUser() {
    this.user = this.authService.getDecodedAccessToken(
      this.authService.getToken()
    );
    if (this.user.reviewer && this.user.reviewer.icCoordinator) {
      this.axisId = this.user.reviewer.icModalityId;
      this.listReviewer();
    }
  }

  ngOnDestroy() {
    this.coordinatorsUnsub$.next();
    this.coordinatorsUnsub$.complete();
  }


  listReviewer() {
    this.adminService.retrieveCoordinators(this.axisId)
      .pipe(
        takeUntil(this.coordinatorsUnsub$)
      )
      .subscribe(({ coordinators }) => this.coordinators = coordinators);
  }

  showRegister() {
    const dialogRef = this.dialog.open(ModalCoordinatorComponent, { data: this.axisId });
    dialogRef.afterClosed().subscribe(res => {
      this.listReviewer();
    });
  }


  public markCoordinator(id, event): void {
    const index = event.source.value[1];
    const checkboxesArray = this.checkboxesMultiple.toArray();
    if (checkboxesArray[index].checked === false) {
      this.adminService.unmarkCoordinator(id)
        .subscribe(({ coordinators }: any) => {
          if (coordinators.temErro) {
            this.toastr.error(coordinators.mensagem);
          } else {
            this.toastr.success(coordinators.mensagem);
            this.listReviewer();
          }
        });
    } else {

      //Trava para o eixo possuir apenas um coordenador
      /*if (this.coordinators.some(coordinator => coordinator.reviewer.icCoordinator === true)) {
        this.toastr.error("Este eixo já possui coordenador cadastrado");
        checkboxesArray[index].checked = false;
      } else {*/
      this.adminService.markCoordinator(id)
        .subscribe(({ coordinators }: any) => {
          if (coordinators.temErro) {
            this.toastr.error(coordinators.mensagem);
          } else {
            this.toastr.success(coordinators.mensagem);
            this.listReviewer();
          }
        });
      //}

    }
  }


  public removeCoordinator(id) {
    this.adminService.deleteCoordinator(id)
      .pipe(
        takeUntil(this.coordinatorsUnsub$)
      )
      .subscribe(() => this.listReviewer());
  }


}
