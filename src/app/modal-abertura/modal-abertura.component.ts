import { Component, OnInit, Inject, SimpleChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalProgramacaoComponent } from '../modal-programacao/modal-programacao.component';
import { trigger, style, state, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-modal-abertura',
  templateUrl: './modal-abertura.component.html',
  styleUrls: ['./modal-abertura.component.scss'],
  animations: [
    trigger('showDetail', [
      state('false', style({
        opacity: 0
      })),
      state('true', style({
        opacity: 1
      })),
      transition('false => true', animate('500ms ease-in', style({
        opacity: 1
      })))
    ])
  ]
})
export class ModalAberturaComponent implements OnInit {

  public programacoes: any = [];
  public moreDetail = false;

  constructor(
    public dialogRef: MatDialogRef<ModalProgramacaoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.programacoes = this.data;
    console.log(this.programacoes);
  }

  ngOnChange(changes: SimpleChanges) {
    console.log(changes);
  }

  public close() {
    this.dialogRef.close();
  }

  public showDetails() {
    const divAnimate = document.querySelector('#info');
    divAnimate.setAttribute('style', 'display: unset');
    console.log(divAnimate);
  }

}
