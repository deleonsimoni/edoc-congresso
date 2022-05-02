import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-modal-review-admin',
  templateUrl: './modal-review-admin.component.html',
  styleUrls: ['./modal-review-admin.component.scss']
})
export class ModalReviewAdminComponent implements OnInit {

  public reviewForm: FormGroup;
  public load = false;

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<ModalReviewAdminComponent>,
    private toastr: ToastrService,
    private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit() {
    this.createForm();
    this.reviewForm.get('workId').patchValue(this.data.work._id);
  }

  public registerReview() {
    this.load = true;
    if (this.reviewForm.valid) {
      this.reviewService.cadastrar(this.reviewForm.value)
        .subscribe((res: any) => {
          this.toastr.success('Parecer cadastrado com sucesso', 'Sucesso');
          this.close(res);
        }, err => {
          this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção:');
        });
    } else {
      this.toastr.error("Error", "Preencha corretamente o formulario");
    }
  }

  private createForm() {
    this.reviewForm = this.builder.group({
      icAllow: [null, [Validators.required]],
      question1: [null, [Validators.required]],
      question2: [null, [Validators.required]],
      question3: [null, [Validators.required]],
      question4: [null, [Validators.required]],
      workId: [],
    });
  }

  public close(work): void {
    this.dialogRef.close(work);
  }

}
