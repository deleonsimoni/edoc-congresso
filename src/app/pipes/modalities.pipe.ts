import { Pipe, PipeTransform } from '@angular/core';
import { MODALITIES } from '../declarations';

@Pipe({
  name: 'modalities'
})
export class ModalitiesPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    return MODALITIES.filter(element => element.id === value)[0].name.toUpperCase();

  }

}
