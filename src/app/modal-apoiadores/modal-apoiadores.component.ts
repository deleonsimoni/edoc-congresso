import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-apoiadores',
  templateUrl: './modal-apoiadores.component.html',
  styleUrls: ['./modal-apoiadores.component.scss']
})
export class ModalApoiadoresComponent implements OnInit {

  public apoiadores: any;
  public imagensApoiadores: any;

  
  constructor(
    public dialogRef: MatDialogRef<ModalApoiadoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.apoiadores = this.data.item;
    this.imagensApoiadores = this.data.imagensApoiadores;

  }

  public close() {
    this.dialogRef.close();
  }
}
