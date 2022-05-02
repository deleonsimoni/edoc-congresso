import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ReviewService } from 'src/app/services/review.service';
import { worker } from 'cluster';
@Component({
  selector: 'app-modal-review-reviewer',
  templateUrl: './modal-review-reviewer.component.html',
  styleUrls: ['./modal-review-reviewer.component.scss']
})
export class ModalReviewReviewerComponent implements OnInit {

  public reviewForm: FormGroup;
  public load = false;

  constructor(
    private builder: FormBuilder,
    public dialogRef: MatDialogRef<ModalReviewReviewerComponent>,
    private toastr: ToastrService,
    private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit() {
    this.createForm();

    if (this.data.work.reviewReviewer) {
      this.data.work.reviewReviewer.review.workId = this.data.work._id;
      this.reviewForm.patchValue(this.data.work.reviewReviewer.review);
    } else {
      this.reviewForm.get('workId').patchValue(this.data.work._id);
    }
  }

  public registerReview() {
    this.load = true;
    if (this.reviewForm.valid) {

      if (this.reviewForm.controls['icAllow'].value == 'Nao' && !this.reviewForm.controls['justify'].value) {
        this.toastr.error("Atenção", "Preencha o campo de justificativa");
        return
      } if (this.reviewForm.controls['icAllow'].value == 'Nao' && this.reviewForm.controls['justify'].value && this.reviewForm.controls['justify'].value.length < 250) {
        this.toastr.error("Atenção", "Preencha a justificativa com ao menos 250 caracteres");
        return
      } else {
        this.reviewService.reviewReviewer(this.reviewForm.value)
          .subscribe((res: any) => {
            this.toastr.success('Parecer cadastrado com sucesso', 'Sucesso');
            this.close(res);

          }, err => {
            this.toastr.error('Ocorreu um erro ao cadastrar', 'Atenção:');
          });
      }

    } else {
      this.toastr.error("Error", "Preencha corretamente o formulario");
    }

  }
  getLengthJustify() {
    return this.reviewForm.controls['justify'].value ? this.reviewForm.controls['justify'].value.length : 0;
  }

  private createForm() {
    this.reviewForm = this.builder.group({
      question1: [null, [Validators.required]],
      question2: [null, [Validators.required]],
      question3: [null, [Validators.required]],
      question4: [null, [Validators.required]],
      question5: [null, [Validators.required]],
      question6: [null, [Validators.required]],
      question7: [null, [Validators.required]],
      question8: [null, [Validators.required]],
      question9: [null, [Validators.required]],
      icAllow: [null, [Validators.required]],
      justify: [null, []],
      workId: [],
    });
  }

  public close(work): void {
    this.dialogRef.close(work);
  }

}
