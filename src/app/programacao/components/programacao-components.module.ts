import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpeningScheduleCardComponent } from './opening-schedule-card/opening-schedule-card.component';
import { InscrevaseComponent } from './inscrevase/inscrevase.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UtilNgxMaterialModule } from 'src/app/util-ngx-material/util-ngx-material.module';
import { GlobalComponentsModule } from 'src/app/components/global-components.module';
import { ProgramacaoAbertaComponent } from './programacao-aberta/programacao-aberta.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        OpeningScheduleCardComponent,
        InscrevaseComponent,
        ProgramacaoAbertaComponent,
        
    ],
    imports: [
        CommonModule,
        UtilNgxMaterialModule,
        PipesModule,
        GlobalComponentsModule,
        FormsModule,
    ],
    exports: [
        OpeningScheduleCardComponent
    ]
})
export class ProgramacaoComponentsModule { }
