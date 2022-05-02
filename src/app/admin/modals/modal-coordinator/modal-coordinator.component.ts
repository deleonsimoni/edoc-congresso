import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalEixoComponent } from 'src/app/modal-eixo/modal-eixo.component';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-modal-coordinator',
  templateUrl: './modal-coordinator.component.html',
  styleUrls: ['./modal-coordinator.component.scss']
})
export class ModalCoordinatorComponent implements OnInit {

  public coordinatorForm: FormGroup;
  public submit = false;
  public axisId;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ModalEixoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminService: AdminService
  ) {

    this.coordinatorForm = this.builder.group({
      authors: this.builder.array([
        this.createFields()
      ])
    });

  }

  ngOnInit() {
    this.axisId = this.data;
  }

  private createFields() {
    return this.builder.group({
      email: [null, [Validators.required]]
    });
  }

  public addAuthors() {
    const authors = this.coordinatorForm.get('authors') as FormArray;
    authors.push(this.createFields());
  }

  public close() {
    this.dialogRef.close();
  }

  public saveCoordinator(): void {
    this.submit = true;
    if (this.coordinatorForm.valid) {
      this.adminService.registerCoordinator(this.coordinatorForm.value, this.axisId)
        .subscribe(({ coordinators }: any) => {
          if (coordinators.temErro) {
            this.toastr.error(coordinators.mensagem);
          } else {
            this.close();
          }
        });
    } else {
      this.toastr.error('Preencha todos os campos');
    }
  }

  get authors() {
    return this.coordinatorForm.get('authors');
  }

}
