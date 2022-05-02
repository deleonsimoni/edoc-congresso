import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ModalSubscribersScheduleComponent } from 'src/app/admin/modals/modal-subscribers-schedule/modal-subscribers-schedule.component';

@Component({
    selector: 'work-schedule-card',
    templateUrl: './work-schedule-card.component.html',
    styleUrls: ['./work-schedule-card.component.scss']
})
export class WorkScheduleCardComponent {

    @Input() schedule: any;
    @Input() admin = false;
    @Input() type: any;
    @Output() update: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() edit: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() user?: any;

    public carregando = false;

    public userId: String;
    constructor(
        private scheduleService: ScheduleService,
        private toastr: ToastrService,
        private dialog: MatDialog,

    ) { }

    ngAfterViewInit() {
        this.userId = this.user._id
    }

    ngOnDestroy() {
        this.schedule = {};
    }

    public removeSchedule(id) {

        this.scheduleService.deleteSchedule(this.type, id)
            .subscribe(() => this.update.emit(true));
    }

    public isSubscribe() {
        if (this.userId && this.schedule && this.schedule.hasOwnProperty('subscribers')) {
            return this.schedule.subscribers.some(el => el.userId == this.userId);
        }

        return false;
    }

    public showSubscribers(titulo, inscritos) {
        this.dialog.open(ModalSubscribersScheduleComponent, {
            data: {
              workTitle: titulo,
              subscribers: inscritos
            }
          });
    }


    public signUp(type) {
        this.carregando = true;
        if (type == 4) {
            this.scheduleService.enrollSchedule(this.schedule._id)
                .subscribe(res => {
                    this.schedule = res;
                    this.toastr.success('Inscrição realizada com sucesso', 'Sucesso');
                    this.carregando = false;
                }, err => {
                    this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                    this.carregando = false;
                });
        } else if (type == 5) {
            this.scheduleService.enrollSchedulePainel(this.schedule._id)
                .subscribe(res => {
                    this.schedule = res;
                    this.toastr.success('Inscrição realizada com sucesso', 'Sucesso');
                    this.carregando = false;
                }, err => {
                    this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                    this.carregando = false;
                });
        }
        else {
            this.scheduleService.enrollScheduleRodaDeConversa(this.schedule._id)
                .subscribe(res => {
                    this.schedule = res;
                    this.toastr.success('Inscrição realizada com sucesso', 'Sucesso');
                    this.carregando = false;
                }, err => {
                    this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                    this.carregando = false;
                });
        }
    }

    public cancelSignUp(type) {
        this.carregando = true;
        if (type == 4) {
            this.scheduleService.cancelEnrollSchedule(this.schedule._id)
                .subscribe(res => {
                    this.schedule = res;
                    this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                    this.carregando = false;
                }, err => {
                    this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                    this.carregando = false;
                });

        } else if (type == 5) {
            this.scheduleService.cancelEnrollSchedulePainel(this.schedule._id)
                .subscribe(res => {
                    this.schedule = res;
                    this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                    this.carregando = false;
                }, err => {
                    this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                    this.carregando = false;
                });

        } else {
            this.scheduleService.cancelEnrollScheduleRodaDeConversa(this.schedule._id)
                .subscribe(res => {
                    this.schedule = res;
                    this.toastr.success('Cancelamento de inscrição realizada com sucesso', 'Sucesso');
                    this.carregando = false;
                }, err => {
                    this.toastr.success('Servidor momentaneamente inoperante', 'Erro');
                    this.carregando = false;
                });
        }
    }

    public editSchedule() {
        this.edit.emit(this.schedule);
    }

}
