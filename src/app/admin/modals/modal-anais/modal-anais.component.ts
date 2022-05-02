import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AnaisService } from 'src/app/services/anais.service';

@Component({
  selector: 'app-modal-anais',
  templateUrl: './modal-anais.component.html',
  styleUrls: ['./modal-anais.component.scss']
})
export class ModalAnaisComponent implements OnInit {

  public anaisForm: FormGroup;
  public submit = false;

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<ModalAnaisComponent>,
    private anaisService: AnaisService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit() {
    this.createForm();
    if(this.data.anal){
      const dataCtrel = this.anaisForm.get("summary") as FormArray;
      this.data.anal.summary.forEach((sumary, key) => {
        dataCtrel.push(this.builder.group(sumary));
      });

    }
  }

  private createForm() {
    this.anaisForm = this.builder.group({
      _id: [null, []],
      name: [null, [Validators.required]],
      link: [null, [Validators.required]],
      image: [null, []],
      summary: this.builder.array([]),

    });

    if (this.data.anal) {
      this.anaisForm.patchValue({
        name: this.data.anal.name,
        link: this.data.anal.link,
        _id: this.data.anal._id,
        image: this.data.anal.image
      });
    }

  }

  public close(): void {
    this.dialogRef.close();
  }

  get summaries() {
    return this.anaisForm.get("summary");
  }

  public addSumary() {
    const dataCtrel = this.anaisForm.get("summary") as FormArray;
    dataCtrel.push(this.builder.group({ name: [null], link: [null]}));
  }

  public removeSumary(pos) {
    const dataCtrel = this.anaisForm.get("summary") as FormArray;
    dataCtrel.removeAt(pos);
  }

  public register() {
    this.submit = true;
    if (this.anaisForm.valid) {

      if (this.data.anal) {

        this.anaisService.atualizar(this.anaisForm.value)
          .subscribe((res: any) => {
            this.toastr.success('Anais alterado com sucesso', 'Sucesso');
            this.close();
          }, err => {
            this.toastr.error('Ocorreu um erro ao alterar', 'Atenção: ');
          });

      } else {
        this.anaisService.cadastrar(this.anaisForm.value)
          .subscribe((res: any) => {
            this.toastr.success('Anais cadastrado com sucesso', 'Sucesso');
            this.close();
          }, err => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção: ');
          });
      }

    }
  }



}
