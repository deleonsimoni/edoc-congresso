import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-news',
  templateUrl: './modal-news.component.html',
  styleUrls: ['./modal-news.component.scss']
})
export class ModalNewsComponent implements OnInit, OnDestroy {

  public newsForm: FormGroup;
  private noticiasUnsub$ = new Subject();
  public submit = false;

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<ModalNewsComponent>,
    private noticiasService: NoticiasService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.noticiasUnsub$.next();
    this.noticiasUnsub$.complete();
  }

  private createForm() {
    this.newsForm = this.builder.group({
      _id: [],
      name: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });

    if (this.data.news) {
      this.newsForm.patchValue(this.data.news);
    }
  }

  public close(): void {
    this.dialogRef.close();
  }

  public registerNotice() {
    this.submit = true;
    if (this.newsForm.valid) {

      if (this.data.news) {

        this.noticiasService.atualizar(this.newsForm.value)
          .subscribe((res: any) => {
            this.toastr.success('Noticia alterada com sucesso', 'Sucesso');
            this.close();
          }, err => {
            this.toastr.error('Ocorreu um erro ao atualizar', 'Atenção: ');
          });

      } else {
        this.noticiasService.cadastrar(this.newsForm.value)
          .subscribe((res: any) => {
            this.toastr.success('Anais cadastrado com sucesso', 'Sucesso');
            this.close();
          }, err => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          });
      }

    }
  }

  get nameNotice() {
    return this.newsForm.get('name');
  }

  get descNotice() {
    return this.newsForm.get('description');
  }
}
