import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalAberturaComponent } from 'src/app/modal-abertura/modal-abertura.component';

@Component({
    // tslint:disable-next-line: component-selector
    selector: 'opening-schedule-card',
    templateUrl: './opening-schedule-card.component.html',
    styleUrls: ['./opening-schedule-card.component.scss']
})
export class OpeningScheduleCardComponent implements OnInit {

    @Input() programation: any = {};

    constructor(
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        console.log(this.programation);
    }

    public openDetails() {
        console.log(this.programation.sessao);
        this.dialog.open(ModalAberturaComponent, {
            data: this.programation.sessao
        });
    }

}
