import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ShareDataService } from '../services/share-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueci-senha',
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss']
})
export class EsqueciSenhaComponent implements OnInit {

  public loginForm: FormGroup;
  public submit = false;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private share: ShareDataService,
    private toastr: ToastrService,
    private router: Router
  ) {

    this.loginForm = this.builder.group({
      // tslint:disable-next-line: max-line-length
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      document: [null, [Validators.required]]
    });

  }

  ngOnInit() {
  }

  public recuperarSenha() {
    this.submit = true;
    if (this.loginForm.valid) {
      this.authService.recuperarSenha(this.loginForm.value)
        .subscribe((res: any) => {
          this.toastr.success('Sua nova senha foi enviada para seu email', 'Sucesso: ');
          this.router.navigate(['home']);
        }, err => {
          if (err.status === 401) {
            this.toastr.error('Email ou senha inválidos', 'Erro: ');
          }
          if (err.status === 400) {
            this.toastr.error(err.error.message, 'Atenção');
          }
        });
    }
  }

  get validate() {
    return this.loginForm.controls;
  }

}
