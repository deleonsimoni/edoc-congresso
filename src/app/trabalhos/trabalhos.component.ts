import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-trabalhos',
  templateUrl: './trabalhos.component.html',
  styleUrls: ['./trabalhos.component.scss']
})
export class TrabalhosComponent implements OnInit {

  works = [1, 2, 3];

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit() {

    this.getWorks();

  }

  private getWorks() {

    const token = this.auth.getDecodedAccessToken(this.auth.getToken());

  }

}
