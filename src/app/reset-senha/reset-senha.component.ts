import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ShareDataService } from '../services/share-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-senha',
  templateUrl: './reset-senha.component.html',
  styleUrls: ['./reset-senha.component.scss']
})
export class ResetSenhaComponent implements OnInit {

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
      mailCodePassword: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      cfPassword: [null, [Validators.required, Validators.minLength(6)]],
    });

  }

  ngOnInit() {
  }

  public resetarSenha() {

    if (this.loginForm.value.password !== this.loginForm.value.cfPassword) {
      this.toastr.error('Campo senha e confirmar senha não conferem', 'Erro: ');
      return;
    }

    this.submit = true;
    if (this.loginForm.valid) {
      this.authService.resetarSenha(this.loginForm.value)
        .subscribe((res: any) => {
          this.toastr.success('Senha alterada com sucesso', 'Sucesso: ');
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
