import { Pipe, PipeTransform } from '@angular/core';
import { SCHEDULE_TYPE } from '../declarations';

@Pipe({
  name: 'modalitiesWork'
})
export class ModalitiesWorkPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return SCHEDULE_TYPE.filter(element => element.id == value)[0].name.toUpperCase();
  }

}
