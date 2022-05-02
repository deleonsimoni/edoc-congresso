import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../../admin.service';
import { MatDialog } from '@angular/material';
import { ModalReviewerComponent } from '../../modals/modal-reviewer/modal-reviewer.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'work-content',
  templateUrl: './work-content.component.html',
  styleUrls: ['./work-content.component.scss']
})
export class WorkContentComponent implements OnInit {

  @Input() subscribed: any;
  @Input() work: any;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminService
  ) { }

  ngOnInit() {
  }

  public addReviewer(axisId, workId) {
    const dialogRef = this.dialog.open(ModalReviewerComponent, {
      data: {
        axis: axisId,
        work: workId
      }
    });

    dialogRef.afterClosed();
  }

  // public confirmPayment(user) {
  //   this.adminService.validatePayment(user._id)
  //     .subscribe(() => {
  //       user.payment.icPaid = true;
  //     }, err => {
  //       console.log(err);
  //     });
  // }

  // public denyPayment(user) {
  //   this.adminService.invalidatePayment(user._id)
  //     .subscribe(() => {
  //       user.payment.icPaid = false;
  //     }, err => {
  //       console.log(err);
  //     });
  // }

  // public retrieveCategories(id) {
  //   return this.categories.filter(element => element.id === id)[0];
  // }

}
