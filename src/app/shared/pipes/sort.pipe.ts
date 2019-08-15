import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(list: any[], attr: string): any[] {
    if (list && list.length) {
      return list.sort((a, b) => +(a[attr] > b[attr]) - +(a[attr] < b[attr]));
    }
    return list;
  }
}
