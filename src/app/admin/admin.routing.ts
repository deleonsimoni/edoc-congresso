import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SubscribedComponent } from './subscribed/subscribed.component';
import { NewsComponent } from './news/news.component';
import { CoordinatorComponent } from './coordinator/coordinator.component';
import { WorksComponent } from './works/works.component';
import { AdminGuard } from './admin.guard';
import { ConferencerComponent } from './conferencer/conferencer.component';
import { VincularTrabalhosComponent } from './vincular-trabalhos/vincular-trabalhos.component';
import { SchedulesComponent } from './schedules/schedules.component';
import { ReviewListWorksComponent } from './review-list-works/review-list-works.component';
import { AnaisComponent } from './anais/anais.component';
import { EmailComponent } from './email/email.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
    {
        path: 'admin', component: AdminComponent, canActivateChild: [AdminGuard], children: [
            {
                path: '', pathMatch: 'full', redirectTo: 'inscritos'
            },
            {
                path: 'inscritos', component: SubscribedComponent
            },
            {
                path: 'noticias', component: NewsComponent
            },
            {
                path: 'anais', component: AnaisComponent
            },
            {
                path: 'conferencistas', component: ConferencerComponent
            },
            {
                path: 'coordenadores', component: CoordinatorComponent
            },
            {
                path: 'vincular-trabalho', component: VincularTrabalhosComponent
            },
            {
                path: 'review-list', component: ReviewListWorksComponent
            },
            {
                path: 'programacao', component: SchedulesComponent
            },
            {
                path: 'email', component: EmailComponent
            },
            {
                path: 'chat', component: ChatComponent
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule { }
