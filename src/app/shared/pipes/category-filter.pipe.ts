import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../models/product.model';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {

  transform(list: Product[], categoryId: string): Product[] {
    return list.filter(elem => elem.category_id === categoryId);
  }

}
