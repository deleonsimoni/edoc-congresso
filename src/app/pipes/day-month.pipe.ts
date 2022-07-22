import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayMonth'
})
export class DayMonthPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let dayWithMont: String = value;

    switch (dayWithMont.substring(0, dayWithMont.indexOf('/'))) {
      case "21":
        return dayWithMont + " - Segunda"
      case "26":
        return dayWithMont + " - Terça"
      case "27":
        return dayWithMont + " - Quarta"
      case "28":
        return dayWithMont + " - Quinta"
      case "29":
        return dayWithMont + " - Sexta"



      default:
        return null
        break;
    }
  }

}
