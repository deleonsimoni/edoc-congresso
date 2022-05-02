import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from 'jwt-decode';
import { ShareDataService } from '../services/share-data.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DownloadFileService } from '../services/download-file.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
      password: [null, [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit() {
  }

  public login() {
    this.submit = true;
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value)
        .subscribe((res: any) => {
          this.authService.setUser(this.authService.getDecodedAccessToken(res.token), res.token);
          this.share.shareData.next(true);
          this.router.navigate(['home']);
        }, err => {
          if (err.status === 401) {
            this.toastr.error('Email ou senha inválidos', 'Erro: ');
          }
        });
    }
  }

  get validate() {
    return this.loginForm.controls;
  }
}
