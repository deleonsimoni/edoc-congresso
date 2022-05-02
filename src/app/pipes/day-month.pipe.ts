import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayMonth'
})
export class DayMonthPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let dayWithMont:String = value;

    switch (dayWithMont.substring(0, dayWithMont.indexOf('/'))) {
      case "29":
        return dayWithMont + " - Quinta"
      case "30":
        return dayWithMont + " - Sexta"
      case "31":
        return dayWithMont + " - Sábado"
      case "01":
        return dayWithMont + " - Domingo"
      case "02":
        return dayWithMont + " - Segunda"
      case "03":
        return dayWithMont + " - Terça"
      case "04":
        return dayWithMont + " - Quarta"
      case "05":
        return dayWithMont + " - Quinta"
      case "06":
        return dayWithMont + " - Sexta"
      case "07":
        return dayWithMont + " - Sábado"
      case "08":
        return dayWithMont + " - Domingo"
      case "09":
        return dayWithMont + " - Segunda"
      case "10":
        return dayWithMont + " - Terça"
      case "11":
        return dayWithMont + " - Quarta"
      case "12":
        return dayWithMont + " - Quinta"
    

      default:
        return null
        break;
    }
  }

}
