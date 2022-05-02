import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-programacao',
  templateUrl: './modal-programacao.component.html',
  styleUrls: ['./modal-programacao.component.scss']
})
export class ModalProgramacaoComponent implements OnInit {

  public programacao: any;

  constructor(
    public dialogRef: MatDialogRef<ModalProgramacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.programacao = this.data.item;
    console.log(this.programacao);
  }

  public close() {
    this.dialogRef.close();
  }
}
