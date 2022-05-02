import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-cadastro-sucesso',
  templateUrl: './modal-cadastro-sucesso.component.html',
  styleUrls: ['./modal-cadastro-sucesso.component.scss']
})
export class ModalCadastroSucessoComponent implements OnInit {

  public count = 10;

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ModalCadastroSucessoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.count--;
      if (this.count === 0) {
        // this.router.navigate(['/home']);
      }
    }, 1000);
  }

  public close() {
    this.dialogRef.close();
    this.router.navigate(['/home']);
  }

}
