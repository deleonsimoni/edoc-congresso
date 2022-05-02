import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  public userForm: FormGroup;
  public userData: any;
  public carregando = false;
  public submit = false;

  constructor(
    private builder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    moment.locale('pt-br');
    this.userForm = this.builder.group({
      fullname: [null, [Validators.required]],
      socialname: [null, []],

      // tslint:disable-next-line: max-line-length
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      dateBirth: [null, [Validators.required]],
      phones: this.builder.group({
        telephone: [null],
        cellphone: [null, [Validators.required]],
      }),
      address: this.builder.group({
        street: [null, [Validators.required]],
        num: [null, [Validators.required]],
        district: [null, [Validators.required]],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]],
        country: [null, [Validators.required]],
        zip: [null, [Validators.required]]
      })
    });

  }

  ngOnInit() {
    this.authService.refresh().subscribe((res: any) => {
      this.fillForm(res.user);
    });

    this.userForm.controls['email'].disable();
  }

  private fillForm(user) {
    this.userData = user;
    this.userForm.patchValue({
      fullname: user.fullname,
      socialname: user.socialname,
      email: user.email,
      dateBirth: moment(user.dateBirth).format('L'),
      phones: user.phones,
      address: user.address
    });
  }

  public updateUser() {
    if (this.userForm.valid) {
      for (const key in this.userForm.value) {
        if (this.userForm.value.hasOwnProperty(key)) {
          this.userData[key] = this.userForm.value[key];
        }
      }

      if (!this.userForm.value.fullname) {
        this.toastr.error('Digite o nome e sobrenome.', 'Atenção: ');
        return;
      }

      if (!(this.userData.dateBirth instanceof Date)) {
        this.userData.dateBirth = moment(this.userData.dateBirth, 'DD/MM/YYYY');
      }

      this.carregando = true;

      this.userService.updateData(this.userData)
        .subscribe(res => {
          this.toastr.success('Dados atualizados com sucesso.');
          this.carregando = false;
          this.authService.refresh().subscribe((x: any) => {
            this.fillForm(x.user);
          });
        });
    } else {
      this.toastr.error('Preencha os campos do formulário corretamente.', 'Erro: ');
    }
  }

  get validate() {
    return this.userForm.controls;
  }

  get phones() {
    return this.userForm.get('phones')['controls'];
  }

  get address() {
    return this.userForm.get('address')['controls'];
  }

  get institution() {
    return this.userForm.get('institution')['controls'];
  }
}
