import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ModalConferencerComponent } from '../modals/modal-conferencer/modal-conferencer.component';
import { ConferencistaService } from 'src/app/services/conferencista.service';

@Component({
  selector: 'app-conferencer',
  templateUrl: './conferencer.component.html',
  styleUrls: ['./conferencer.component.scss']
})
export class ConferencerComponent implements OnInit {

  public carregando = false;
  public conferencistas = [];

  constructor(
    private toastr: ToastrService,
    private conferencistasService: ConferencistaService,
    private dialog: MatDialog,
  ) {

  }

  ngOnInit() {
    this.listar();
  }

  public deletar(conferencistaId) {
    this.carregando = true;
    this.conferencistasService.deletar(conferencistaId)
      .subscribe((res: any) => {
        this.carregando = false;
        this.toastr.success('Conferencista excluído com sucesso', 'Sucesso');
        this.listar();
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao excluir', 'Atenção: ');
      });
  }

  public listar() {
    this.carregando = true;
    this.conferencistasService.listar()
      .subscribe((res: any) => {
        this.carregando = false;
        this.conferencistas = res;
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao listar conferencistas', 'Atenção: ');
      });
  }

  public addConferencer() {
    const dialogRef = this.dialog.open(ModalConferencerComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.listar();
    });
  }

}
