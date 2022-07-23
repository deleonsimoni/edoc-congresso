import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayAndMonth'
})
export class DayAndMonthPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let dayWithMont: String = value;
    return dayWithMont.substring(0, dayWithMont.indexOf('/')) + " de Julho"

  }

}
