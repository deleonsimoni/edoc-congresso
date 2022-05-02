import { Pipe, PipeTransform } from '@angular/core';
import { WORK_OPTIONS } from '../declarations';

@Pipe({
  name: 'typeWorkRelatorio'
})
export class TypeWorkRelatorioPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    switch (Number(value)) {

      case 3:
        return 'Pôster'
      case 4:
        return 'Mini Curso'
      case 5:
        return 'Painel'
    }

  }

}
