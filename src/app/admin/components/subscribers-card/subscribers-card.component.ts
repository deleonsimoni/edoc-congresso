import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'subscribers-card',
  templateUrl: './subscribers-card.component.html',
  styleUrls: ['./subscribers-card.component.scss']
})
export class SubscribersCardComponent {

  @Input() subscribed: any;
  @Output() selected = new EventEmitter();

  constructor(
    private adminService: AdminService,
  ) { }

  public selectUser(user): void {
    this.selected.emit(user);
  }

  public confirmPayment(user) {
    this.adminService.validatePayment(user._id)
      .subscribe(() => {
        user.payment.icPaid = true;
      }, err => {
        console.log(err);
      });
  }

  public denyPayment(user) {
    this.adminService.invalidatePayment(user._id)
      .subscribe(() => {
        user.payment.icPaid = false;
      }, err => {
        console.log(err);
      });
  }
}
