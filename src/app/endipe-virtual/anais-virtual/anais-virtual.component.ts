import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AnaisService } from 'src/app/services/anais.service';
import { MatDialog, MatSnackBar, PageEvent } from '@angular/material';
@Component({
  selector: 'app-anais-virtual',
  templateUrl: './anais-virtual.component.html',
  styleUrls: ['./anais-virtual.component.scss']
})
export class AnaisVirtualComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private builder: FormBuilder,
    private anaisService: AnaisService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar

  ) {
  }

  public carregando = false;
  public anais = [];
  public sumarios;
  pager: any = {};
  pageEvent: PageEvent;
  sumarySelect;

  ngOnInit() {
    this.listar();
  }


  public listar() {
    this.carregando = true;
    this.anaisService.listarVirtual()
      .subscribe((res: any) => {
        this.carregando = false;
        this.anais = res;
        this.anais.sort( (a, b) => { 
          if (a.name.charAt(6) > b.name.charAt(6)) return 1
          if (a.name.charAt(6) < b.name.charAt(6)) return -1
          else return 0
        });
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao listar anais', 'Atenção: ');
      });
  }

  public listarSumario(anais, event) {

    if(this.sumarySelect == anais._id && !event){

      this.sumarySelect = null;
      this.sumarios = [];

    } else {

      this.carregando = true;
      let pageChoose = event && event.pageIndex + 1 || 1;
  
      this.anaisService.listarSumarioVirtual(anais._id, pageChoose)
      .subscribe((res: any) => {
        this.carregando = false;
        this.sumarySelect = anais._id;
        this.sumarios = res.summaries.summary;
        this.pager = res.pager;
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao listar anais', 'Atenção: ');
      });

    }
  }

}
