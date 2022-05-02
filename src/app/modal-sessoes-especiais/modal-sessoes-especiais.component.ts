import { Component, OnInit, Inject } from '@angular/core';
import { ModalProgramacaoComponent } from '../modal-programacao/modal-programacao.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-sessoes-especiais',
  templateUrl: './modal-sessoes-especiais.component.html',
  styleUrls: ['./modal-sessoes-especiais.component.scss']
})
export class ModalSessoesEspeciaisComponent implements OnInit {

  public programacao: any;

  constructor(
    public dialogRef: MatDialogRef<ModalProgramacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.programacao = this.data.item;
  }

  public close() {
    this.dialogRef.close();
  }

}
