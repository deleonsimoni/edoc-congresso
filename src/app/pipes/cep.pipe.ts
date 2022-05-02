import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cep'
})
export class CepPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value && value.length == 8){
      return value.replace(/^([\d]{5})-*([\d]{3})/,"$1-$2");
    } else {
      return value;
    }
  }

}
