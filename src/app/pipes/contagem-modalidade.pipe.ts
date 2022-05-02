import { Pipe, PipeTransform } from '@angular/core';
import { MODALITIES } from '../declarations';

@Pipe({
  name: 'contagemModalidade'
})
export class ContagemModalidadePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let posterLength = value.filter(element => element.modalityId === 3).length;
    let painelLength = value.filter(element => element.modalityId === 5).length;
    let minicursoLenth = value.filter(element => element.modalityId === 4).length;


    return `${posterLength} Pôster - ${painelLength} Painel - ${minicursoLenth} Mini Curso `

  }

}
