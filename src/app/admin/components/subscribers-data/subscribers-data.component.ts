import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../admin.service';
import { DownloadFileService } from 'src/app/services/download-file.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ModalEditProfileComponent } from '../../modals/modal-edit-profile/modal-edit-profile.component';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../../modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'subscribers-data',
  templateUrl: './subscribers-data.component.html',
  styleUrls: ['./subscribers-data.component.scss']
})
export class SubscribersDataComponent implements OnInit {

  @Input() subscribed: any;
  @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();
  public carregando = false;
  public carregandoTrabalhos = false;
  public works;
  public workWait = false;
  public newAuthor;

  constructor(
    private adminService: AdminService,
    private downloadService: DownloadFileService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    if (this.subscribed.works.length > 0) {
      this.userWorks(this.subscribed.works);
    }
  }

  validarComprovante(user) {

    this.http.post(`${this.baseUrl}/admin/validateDoc/` + user._id, {}).subscribe((res: any) => {
      user.payment.icValid = true;
    }, err => {
      console.log(err);
    });
  }

  invalidarComprovante(user) {
    this.http.post(`${this.baseUrl}/admin/invalidateDoc/` + user._id, {}).subscribe((res: any) => {
      user.payment.icValid = false;
    }, err => {
      console.log(err);
    });
  }

  public userWorks(userWorksId) {
    this.works = [];
    this.carregandoTrabalhos = true;

    if (userWorksId) {
      userWorksId.forEach(workId => {
        this.adminService.retrieveUserWorks(workId)
          .subscribe((res: any) => {
            this.carregandoTrabalhos = false;
            this.works.push(res);
          }, err => {
            this.carregandoTrabalhos = false;
            console.log(err);
          });
      });
    }

  }

  public download(nameFile) {
    const vm = this;
    function sucessoDownload() {
      vm.carregando = false;
    }
    function falhaDownload(err) {
      this.toastr.error('Erro ao relizar download.', 'Erro: ');
      vm.carregando = false;
    }
    this.carregando = true;
    this.downloadService.getFile(nameFile, sucessoDownload, falhaDownload);
  }

  public confirmPayment(user) {
    this.adminService.validatePayment(user._id)
      .subscribe(() => {
        user.payment.icPaid = true;
      }, err => {
        console.log(err);
      });
  }

  public denyPayment(user) {
    this.adminService.invalidatePayment(user._id)
      .subscribe(() => {
        user.payment.icPaid = false;
      }, err => {
        console.log(err);
      });
  }




  public confirmDeletarAutor(authorId, workId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Tem certeza que deseja remover o autor deste trabalho?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar'
        }
      }
    });
    const snack = this.snackBar.open('Caso clique em sim, o autor será removido do trabalho');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      snack.dismiss();
      if (confirmed) {
        this.deletarAutor(authorId, workId);
        this.snackBar.open('Removendo autor', 'Fechar', {
          duration: 2000,
        });
      }
    });

  }

  public deletarAutor(authorId, workId) {
    this.workWait = true;
    this.adminService.removeAuthor(authorId, workId)
      .subscribe(() => {
        this.workWait = false;
        this.toastr.success('Autor removido do trabalho.', 'Sucesso: ');
        this.update.emit(true);
      }, err => {
        this.workWait = false;
        this.toastr.error('Tente novamente mais tarde.', 'Erro: ');
      });
  }

  public incluirParticipanteTrabalho(workId) {
    this.workWait = true;
    this.adminService.insertAuthorWork(this.newAuthor, workId)
      .subscribe(() => {
        this.workWait = false;
        this.toastr.success('Autor incluído no trabalho.', 'Sucesso: ');
        this.update.emit(true);
      }, err => {
        this.workWait = false;
        this.toastr.error('Tente novamente mais tarde.', 'Erro: ');
      });
  }

  public confirmDeletarTrabalho(workId) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Tem certeza que deseja deletar o trabalho?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Cancelar'
        }
      }
    });
    const snack = this.snackBar.open('Caso clique em sim, este trabalho será excluido do sistema');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      snack.dismiss();
      if (confirmed) {
        this.deletarTrabalho(workId);
        this.snackBar.open('Deletando trabalho', 'Fechar', {
          duration: 2000,
        });
      }
    });

  }


  public deletarTrabalho(workId) {
    this.workWait = true;
    this.adminService.removeWork(workId)
      .subscribe(() => {
        this.workWait = false;
        this.toastr.success('Trabalho removido com sucesso.', 'Sucesso: ');
        this.update.emit(true);
      }, err => {
        this.workWait = false;
        this.toastr.error('Tente novamente mais tarde.', 'Erro: ');
      });
  }

  public retrieveModality(id) {
    return this.modalities.filter(element => element.id === id)[0];
  }

  public retrieveEixo(id) {
    return this.eixos.filter(element => element.id === id)[0];
  }

  public retrieveCategories(id) {
    return this.categories.filter(element => element.id === id)[0];
  }

  public editProfile() {
    const dialogRef = this.dialog.open(ModalEditProfileComponent, {
      data: this.subscribed
    });

    dialogRef.afterClosed()
      .subscribe(_ => this.update.emit(true));
  }

  public modalities = [

    { id: 4, name: 'Mediador de minicurso' },
    { id: 3, name: 'Expositor de pôster' },
    { id: 5, name: 'Coordenador e/ou expositor de painel' },

  ];

  public eixos = [
    { id: 1, name: 'A Didática como campo epistemológico e disciplinar' },
    { id: 2, name: 'A Didática e os Saberes docentes estruturantes na formação de professores' },
    { id: 3, name: 'A Didática e as tecnologias da informação e comunicação no currículo e práticas de ensino' },
    { id: 4, name: 'A Didática e Práticas de Ensino na perspectiva da Educação como Direito Constitucional e os desafios políticos da atualidade' },
    { id: 5, name: 'A Didática e as Práticas de ensino nas políticas de formação de Pedagogos(as)' },
    { id: 6, name: 'A Didática e as Práticas de Ensino nos cursos de Licenciatura: entre tensionamentos e perspectivas' },
    { id: 7, name: 'A Didática, Práticas de Ensino - Infâncias, Juventudes e Vida Adulta' },
    { id: 8, name: 'A Didática, Práticas de Ensino, Educação das Relações Étnico-raciais, Diversidade e Inclusão Escolar' },
    { id: 9, name: 'A Didática da Educação Superior' }

  ];

  public categories = [
    { id: 1, name: 'Estudantes de Graduação e pós-graduação com comprovação' },
    { id: 2, name: 'Professores e demais profissionais da Educação Básica' },
    { id: 3, name: 'Docentes de Educação Superior' }
  ];


}
