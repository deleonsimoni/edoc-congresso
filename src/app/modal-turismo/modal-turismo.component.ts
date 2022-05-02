import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-turismo',
  templateUrl: './modal-turismo.component.html',
  styleUrls: ['./modal-turismo.component.scss']
})
export class ModalTurismoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalTurismoComponent>,

  ) { }

  public close() {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
