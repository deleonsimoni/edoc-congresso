import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-expositor-painel.component',
  templateUrl: './modal-expositor-painel.component.html',
  styleUrls: ['./modal-normas.component.scss']
})
export class ModalNormasPainelComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalNormasPainelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
  }

}

