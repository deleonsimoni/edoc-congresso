import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-subscribers-schedule',
  templateUrl: './modal-subscribers-schedule.component.html',
  styleUrls: ['./modal-subscribers-schedule.component.scss']
})
export class ModalSubscribersScheduleComponent implements OnInit {

  subscribers;
  titulo;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalSubscribersScheduleComponent>) {
    if (data) {
      this.subscribers = data.subscribers || [];
      this.titulo = data.workTitle || '';
    }
  }

  ngOnInit() {
  }

  public close() {
    this.dialogRef.close();
  }

}
