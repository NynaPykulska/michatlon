import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from './products.service';
import {Category} from '../shared/models/category.model';
import {Product} from '../shared/models/product.model';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  products: Product[] = [];

  selectedCategoryIndex = 0;

  componentDestroyed: Subject<boolean> = new Subject<boolean>();

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.products.pipe(takeUntil(this.componentDestroyed))
      .subscribe(prod => this.products = prod);
    this.productsService.productCategories.pipe(takeUntil(this.componentDestroyed))
      .subscribe(cat => this.categories = cat);
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
  }

}
