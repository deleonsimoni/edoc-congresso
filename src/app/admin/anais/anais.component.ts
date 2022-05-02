import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnaisService } from 'src/app/services/anais.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ModalAnaisComponent } from '../modals/modal-anais/modal-anais.component';
import { ConfirmationDialogComponent } from '../modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-anais',
  templateUrl: './anais.component.html',
  styleUrls: ['./anais.component.scss']
})
export class AnaisComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private builder: FormBuilder,
    private anaisService: AnaisService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) {
  }

  public carregando = false;
  public anais = [];

  ngOnInit() {
    this.listar();
  }


  public listar() {
    this.carregando = true;
    this.anaisService.listar()
      .subscribe((res: any) => {
        this.carregando = false;
        this.anais = res;
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao listar anais', 'Atenção: ');
      });
  }

  public deletar(anais) {
    this.carregando = true;
    this.anaisService.deletar(anais)
      .subscribe((res: any) => {
        this.carregando = false;
        this.toastr.success('Anais excluído com sucesso', 'Sucesso');
        this.listar();
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao excluir', 'Atenção: ');
      });
  }

  public confirmDeleteAnais(anais) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Tem certeza que deseja remover o e-book?',
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
        this.deletar(anais);
        this.snackBar.open('Removendo e-book', 'Fechar', {
          duration: 2000,
        });
      }
    });

  }

  public register(anal) {
    if(anal == 0) {
      anal = null;
    }
    const dialogRef = this.dialog.open(ModalAnaisComponent, {
      disableClose: true,
      data: {
        anal: anal
      }
    });
    dialogRef.afterClosed().subscribe(() => this.listar());
  }



}
