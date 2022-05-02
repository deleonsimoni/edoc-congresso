import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NoticiasService } from 'src/app/services/noticias.service';
import { MatDialog } from '@angular/material';
import { ModalNewsComponent } from '../modals/modal-news/modal-news.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  public newsForm: FormGroup;
  public carregando = false;
  public noticias = [];
  private noticiasUnsub$ = new Subject();

  constructor(
    private toastr: ToastrService,
    private builder: FormBuilder,
    private noticiasService: NoticiasService,
    private dialog: MatDialog,
  ) {

    this.createForm();

  }

  ngOnInit() {
    this.listar();
  }

  ngOnDestroy() {
    this.noticiasUnsub$.next();
    this.noticiasUnsub$.complete();
  }

  private createForm(): void {
    this.newsForm = this.builder.group({
      name: [null, [Validators.required]]
    });
  }

  public deletar(news) {
    this.carregando = true;
    this.noticiasService.deletar(news)
      .subscribe((res: any) => {
        this.carregando = false;
        this.toastr.success('Noticia excluída com sucesso', 'Sucesso');
        this.listar();
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao excluir', 'Atenção: ');
      });
  }

  public listar() {
    this.carregando = true;
    this.noticiasService.listar()
      .pipe(takeUntil(this.noticiasUnsub$))
      .subscribe((res: any) => {
        this.carregando = false;
        this.noticias = res;
      }, err => {
        this.carregando = false;
        this.toastr.error('Ocorreu um erro ao listar noticias', 'Atenção: ');
      });
  }

  public register(news) {
    if(news == 0) {
      news = null;
    }
    const dialogRef = this.dialog.open(ModalNewsComponent, {
      data: {
        news: news
      }
    });

    dialogRef.afterClosed().subscribe(() => this.listar());
  }

  get validate() {
    return this.newsForm.controls;
  }

}
