import { Component, OnInit } from '@angular/core';
import { ModalProgramacaoComponent } from '../modal-programacao/modal-programacao.component';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-transporte',
  templateUrl: './modal-transporte.component.html',
  styleUrls: ['./modal-transporte.component.scss']
})
export class ModalTransporteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalProgramacaoComponent>,
  ) { }

  public close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
