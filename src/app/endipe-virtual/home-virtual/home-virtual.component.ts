import { Component, OnInit, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { ModalBemVindoComponent } from 'src/app/modal-bem-vindo/modal-bem-vindo.component';

@Component({
  selector: 'app-home-virtual',
  templateUrl: './home-virtual.component.html',
  styleUrls: ['./home-virtual.component.scss']
})
export class HomeVirtualComponent implements OnInit {

  
  carregando = false;
  user;
  comments;

  constructor(    
    private toastr: ToastrService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService) { }

  ngOnInit() {

    this.retrieveUser();

    if(!localStorage.getItem("bemVindoEndipeVirtual")){

      const dialogRef = this.dialog.open(ModalBemVindoComponent, {});

      localStorage.setItem("bemVindoEndipeVirtual", "1");

    }


  }

  private retrieveUser() {

    this.user = this.authService.getDecodedAccessToken(this.authService.getToken());

  }

}
