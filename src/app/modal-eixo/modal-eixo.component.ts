import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-eixo',
  templateUrl: './modal-eixo.component.html',
  styleUrls: ['./modal-eixo.component.scss']
})
export class ModalEixoComponent implements OnInit {

  public eixo: any;

  constructor(
    public dialogRef: MatDialogRef<ModalEixoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.eixo = this.data.item;
  }

  public close() {
    this.dialogRef.close();
  }

}
