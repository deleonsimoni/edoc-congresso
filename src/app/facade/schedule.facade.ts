import { Injectable } from '@angular/core';
import { WORK_OPTIONS, PROGRAMACOES } from '../declarations';
import { AdminService } from '../admin/admin.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ScheduleFacade {

    private workOptions = WORK_OPTIONS;
    public programacoes = PROGRAMACOES;

    constructor(
        private adminService: AdminService
    ) { }

    public retrieveSchedule(modality = 'abertura'): Observable<any> {

        const formatedModality = this.formatFilters(modality);
        const axis = this.filterModality(formatedModality);

        if (axis) {
            return this.adminService.retrieveByFilter(axis.id).pipe(map(res => this.orderByHour(res)));
        }

        return new Observable(obs => {
            const schedules: any[] = [];
            let schedule: any = {};
            let title: string;

            const programation = this.programacoes.find(el => {
                return this.formatFilters(formatedModality).includes(this.formatFilters(el.titulo).substring(0, 4));
            });

            console.log(programation);

            if (programation && programation.sessao) {
                programation.sessao.forEach(el => {
                    schedule = {};
                    schedule.theme = el.tema ? el.tema : '';
                    schedule.date = programation.data;
                    schedule.hour = el.horario;

                    if (el.titulos.length > 1) {
                        el.titulos.forEach(titleCard => {
                            if (title) {
                                title = title.concat('\n' + titleCard);
                                if (el.titulos[el.titulos.length - 1]) {
                                    schedule.title = title;
                                    schedules.push(schedule);
                                }
                            } else {
                                title = titleCard;
                            }
                        });
                    } else {
                        schedule.title = el.titulos[0];
                        schedules.push(schedule);
                    }
                });

                return obs.next(schedules);
            }

            return obs.next(null);
            // return obs.next(programation);
        });

    }

    private filterModality(label) {
        return this.workOptions.find(el => this.formatFilters(label).includes(this.formatFilters(el.name).substring(0, 4)));
    }

    private formatFilters(label): string {
        label = label.toLowerCase();
        return label.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    private orderByHour(data) {
        return data.sort((a, b) => Number(a.hour.replace(':', '')) - Number(b.hour.replace(':', '')));
    }

}
