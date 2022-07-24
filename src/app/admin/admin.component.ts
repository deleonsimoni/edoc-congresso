import { Component, OnInit } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('showInfos', [
      state('void', style({
        opacity: 0
      })),
      state('*', style({
        opacity: 1
      })),
      transition('void => *', animate('300ms ease-in', style({
        opacity: 1
      }))),
      transition('* => void', animate('300ms ease-out', style({
        opacity: 0
      })))
    ])
  ]
})
export class AdminComponent implements OnInit {

  user: any;
  menu: any[];

  private adminRoutes = [
    { name: 'INSCRITOS', path: '/admin/inscritos' },
    { name: 'NOTÍCIAS', path: '/admin/noticias' },
    { name: 'ANAIS', path: '/admin/anais' },
    { name: 'CONFERENCISTAS', path: '/admin/conferencistas' },
    { name: 'PARECERISTAS/COORDENADORES', path: '/admin/coordenadores' },
    { name: 'TRABALHOS/PARECERISTAS', path: '/admin/vincular-trabalho' },
    { name: 'PROGRAMAÇÃO', path: '/admin/programacao' },
    { name: 'EMAIL', path: '/admin/email' },
    { name: 'CHAT', path: '/admin/chat' }


  ];

  private nonAdminRoutes = [
    { name: 'PARECERISTA', path: '/admin/review-list' }
  ];

  private coordinatorRoutes = [
    { name: 'TRABALHOS E PARECERISTAS', path: '/admin/vincular-trabalho' },
    { name: 'CADASTRAR PARECERISTAS', path: '/admin/coordenadores' },
  ];

  private editorRoutes = [
    { name: 'ANAIS', path: '/admin/anais' }
  ];



  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.retrieveUser();
  }

  private retrieveUser() {
    this.user = this.auth.getDecodedAccessToken(this.auth.getToken());

    if (this.user && this.user.icAdmin && this.user.reviewer) {
      this.menu = this.adminRoutes.concat(this.nonAdminRoutes);
    } else if (this.user.icAdmin) {
      this.menu = this.adminRoutes;
    } else if (this.user.icEditor) {
      this.menu = this.editorRoutes;
      this.router.navigate(['/admin/anais']);
    } else if (this.user.reviewer && this.user.reviewer.icCoordinator) {
      //this.menu = this.menu.concat(this.coordinatorRoutes);
      this.menu = this.coordinatorRoutes;
    } else {
      this.menu = this.nonAdminRoutes;
    }

  }



}
