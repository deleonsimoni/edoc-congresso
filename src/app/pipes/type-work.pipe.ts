import { Pipe, PipeTransform } from '@angular/core';
import { WORK_OPTIONS } from '../declarations';

@Pipe({
  name: 'typeWork'
})
export class TypeWorkPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    return WORK_OPTIONS.filter(element => element.id === value)[0].name;

  }

}
