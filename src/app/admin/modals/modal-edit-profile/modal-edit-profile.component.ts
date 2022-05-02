import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-edit-profile',
  templateUrl: './modal-edit-profile.component.html',
  styleUrls: ['./modal-edit-profile.component.scss']
})
export class ModalEditProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public submit = false;
  public categoryId;

  public categories = [
    { id: 1, name: 'Estudantes de curso Normal/EM' },
    { id: 2, name: 'Estudantes de Graduação' },
    { id: 3, name: 'Estudantes de Pós-Graduação' },
    { id: 4, name: 'Profissionais da Educação Básica' },
    { id: 5, name: 'Profissionais da Educação Superior' }
  ];

  constructor(
    public dialogRef: MatDialogRef<ModalEditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {

    this.profileForm = this.builder.group({
      fullname: [null, [Validators.required]],
      // tslint:disable-next-line: max-line-length
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      document: [null, [Validators.required]],
      institution: this.builder.group({
        name: [null, [Validators.required]],
        initials: [null, [Validators.required]]
      }),
      categoryId: [null, []]
    });

  }

  ngOnInit() {
    this.fillForm();
  }

  private fillForm() {

    if (!this.profileForm.get('_id')) {
      this.profileForm.addControl('_id', new FormControl(null));
    }
    this.profileForm.patchValue(this.data);
  }

  public close(): void {
    this.dialogRef.close();
  }

  public get retrieveFormData() {
    return this.profileForm.getRawValue();
  }

  public updateUser() {
    this.submit = true;

    if (this.profileForm.valid) {
      const form = this.profileForm.getRawValue();
      if (this.data.payment && form.categoryId) {
        form.payment = this.data.payment;
        form.payment.categoryId = Number(form.categoryId);
      }

      this.adminService.updateUser(form)
        .subscribe(_ => {
          this.toastr.success('Dados do usuário alterados.', 'Sucesso');
          this.close();
        });
    }
  }

  public get validate() {
    return this.profileForm.controls;
  }

  public get validateInstitution() {
    return this.profileForm.get('institution')['controls'];
  }
}
