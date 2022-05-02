import { Pipe, PipeTransform } from '@angular/core';
import { THEME_SIMPOSIO } from '../declarations';

@Pipe({
  name: 'theme'
})
export class ThemePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    const theme = THEME_SIMPOSIO.find(el => el.id == value);
    return theme ? theme.name : null;

  }

} 
