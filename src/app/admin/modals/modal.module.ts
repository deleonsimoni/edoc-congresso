import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalConferencerComponent } from './modal-conferencer/modal-conferencer.component';
import { ModalCoordinatorComponent } from './modal-coordinator/modal-coordinator.component';
import { ModalNewsComponent } from './modal-news/modal-news.component';
import { ModalReviewerComponent } from './modal-reviewer/modal-reviewer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ModalReviewAdminComponent } from './modal-review-admin/modal-review-admin.component';
import { UtilNgxMaterialModule } from 'src/app/util-ngx-material/util-ngx-material.module';
import { ModalEditProfileComponent } from './modal-edit-profile/modal-edit-profile.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxMaskModule } from 'ngx-mask';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ModalReviewReviewerComponent } from './modal-review-reviewer/modal-review-reviewer.component';
import { ModalAnaisComponent } from './modal-anais/modal-anais.component';
import { ModalSubscribersScheduleComponent } from './modal-subscribers-schedule/modal-subscribers-schedule.component';

@NgModule({
  declarations: [
    ModalConferencerComponent,
    ModalCoordinatorComponent,
    ModalNewsComponent,
    ModalReviewerComponent,
    ModalReviewAdminComponent,
    ModalEditProfileComponent,
    ConfirmationDialogComponent,
    ModalReviewReviewerComponent,
    ModalAnaisComponent,
    ModalSubscribersScheduleComponent
  ],
  entryComponents: [
    ModalConferencerComponent,
    ModalCoordinatorComponent,
    ModalNewsComponent,
    ModalAnaisComponent,
    ModalReviewerComponent,
    ModalEditProfileComponent,
    ConfirmationDialogComponent,
    ModalSubscribersScheduleComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UtilNgxMaterialModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ModalConferencerComponent,
    ModalCoordinatorComponent,
    ModalNewsComponent,
    ModalReviewerComponent,
    ModalEditProfileComponent,
    ConfirmationDialogComponent,
    ModalSubscribersScheduleComponent,
  ]
})
export class ModalModule { }
