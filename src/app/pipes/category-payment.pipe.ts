import { Pipe, PipeTransform } from '@angular/core';
import { CATEGORY_PAYMENT } from '../declarations';

@Pipe({
  name: 'categoryPayment'
})
export class CategoryPaymentPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    return CATEGORY_PAYMENT.filter(element => element.id == value)[0].name;

  }

}
