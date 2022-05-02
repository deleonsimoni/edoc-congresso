import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCpf'
})
export class MaskCpfPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let maskValue: string;

    maskValue = value.replace(/\D/g, '');

    if (maskValue.length === 11) {

      maskValue = maskValue.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
      maskValue = maskValue.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
      maskValue = maskValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
      return maskValue;


    } else {
      return value;
    }

  }

}
