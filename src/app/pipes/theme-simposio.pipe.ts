import { Pipe, PipeTransform } from '@angular/core';
import { THEME_SIMPOSIO } from '../declarations';

@Pipe({
  name: 'themeSimposio'
})
export class ThemeSimposioPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return THEME_SIMPOSIO.filter(element => element.id == value)[0].name;
  }

}
