import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-bem-vindo',
  templateUrl: './modal-bem-vindo.component.html',
  styleUrls: ['./modal-bem-vindo.component.scss']
})
export class ModalBemVindoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalBemVindoComponent>,

  ) { }

  ngOnInit() {
  }

  public close(): void {
    this.dialogRef.close();
  }
  
}
