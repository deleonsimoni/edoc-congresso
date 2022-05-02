import { NgModule } from '@angular/core';
import { MaskCpfPipe } from './mask-cpf.pipe';
import { AxisPipe } from './axis.pipe';
import { ModalitiesPipe } from './modalities.pipe';
import { TypeWorkPipe } from './type-work.pipe';
import { TypeWorkRelatorioPipe } from './type-work-relatorio.pipe';

import { DocPipe } from './doc.pipe';
import { ContagemModalidadePipe } from './contagem-modalidade.pipe';
import { CategoryPaymentPipe } from './category-payment.pipe';
import { ArraySortPipe } from './array-sort.pipe';
import { ThemePipe } from './theme.pipe';
import { CepPipe } from './cep.pipe';
import { DayMonthPipe } from './day-month.pipe';
import { DayAndMonthPipe } from './day-and-month.pipe';
import { ThemeSimposioPipe } from './theme-simposio.pipe';
import { ModalitiesWorkPipe } from './modalities-work.pipe';

@NgModule({
    declarations: [
        MaskCpfPipe,
        AxisPipe,
        ModalitiesPipe,
        TypeWorkPipe,
        DocPipe,
        ContagemModalidadePipe,
        CategoryPaymentPipe,
        ArraySortPipe,
        TypeWorkRelatorioPipe,
        ThemePipe,
        CepPipe,
        DayMonthPipe,
        DayAndMonthPipe,
        ThemeSimposioPipe,
        ModalitiesWorkPipe
    ],
    exports: [
        MaskCpfPipe,
        AxisPipe,
        ModalitiesPipe,
        CepPipe,
        TypeWorkPipe,
        DocPipe,
        ContagemModalidadePipe,
        CategoryPaymentPipe,
        ArraySortPipe,
        TypeWorkRelatorioPipe,
        ThemePipe,
        DayMonthPipe,
        DayAndMonthPipe,
        ThemeSimposioPipe,
        ModalitiesWorkPipe
    ],
})
export class PipesModule { }
