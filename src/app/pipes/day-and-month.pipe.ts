import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayAndMonth'
})
export class DayAndMonthPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let dayWithMont:String = value;

    switch (dayWithMont.substring(dayWithMont.indexOf('/')+1)) {
      case "10":
        return dayWithMont.substring(0, dayWithMont.indexOf('/')) + " de Outubro"
      case "11":
        return dayWithMont.substring(0, dayWithMont.indexOf('/')) + " de Novembro"
      default:
        return null;
    }
  }

}
