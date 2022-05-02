import { Pipe, PipeTransform } from '@angular/core';
import { AXIS } from '../declarations';

@Pipe({
  name: 'axis'
})
export class AxisPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    return AXIS.filter(element => element.id == value)[0].name.toUpperCase();

  }

}
