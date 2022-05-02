import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-alimentacao',
  templateUrl: './modal-alimentacao.component.html',
  styleUrls: ['./modal-alimentacao.component.scss']
})
export class ModalAlimentacaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalAlimentacaoComponent>,

  ) { }


  public close() {
    this.dialogRef.close();
  }


  ngOnInit() {
  }

}
