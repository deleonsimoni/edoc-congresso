import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../models/dialogData';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-inscricao',
  templateUrl: './modal-inscricao.component.html',
  styleUrls: ['./modal-inscricao.component.scss']
})
export class ModalInscricaoComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalInscricaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      instituicao: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      cfSenha: ['', [Validators.required]]
    });

  }

  close(): void {
    this.dialogRef.close();
  }

  register() {
    this.registerForm.reset();
    this.close();
  }

}
