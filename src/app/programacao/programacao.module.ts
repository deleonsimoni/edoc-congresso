import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgramacaoComponent } from './programacao.component';
import { ProgramacaoComponentsModule } from './components/programacao-components.module';
import { UtilNgxMaterialModule } from '../util-ngx-material/util-ngx-material.module';
import { GlobalComponentsModule } from '../components/global-components.module';
import { PipesModule } from '../pipes/pipes.module';
import { ScheduleVirtualComponent } from '../endipe-virtual/schedule-virtual/schedule-virtual.component';

@NgModule({
    declarations: [
        ProgramacaoComponent,
    ],
    imports: [
        CommonModule,
        ProgramacaoComponentsModule,
        GlobalComponentsModule,
        UtilNgxMaterialModule,
        PipesModule
    ],
    exports: [
        ProgramacaoComponent
    ]
})
export class ProgramacaoModule { }
