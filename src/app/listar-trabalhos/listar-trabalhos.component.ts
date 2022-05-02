import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listar-trabalhos',
  templateUrl: './listar-trabalhos.component.html',
  styleUrls: ['./listar-trabalhos.component.scss']
})
export class ListarTrabalhosComponent implements OnInit {

  @Input() receberDados = new Observable();
  @Output() enviarDados = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
