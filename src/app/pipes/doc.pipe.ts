import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doc'
})
export class DocPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return value.split('/')[3];
  }

}
