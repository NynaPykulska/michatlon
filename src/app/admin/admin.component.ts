import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsService} from '../products/products.service';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {Product} from '../shared/models/product.model';
import {Category} from '../shared/models/category.model';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  products: Product[];
  categories: Category[];

  private productsSub: Subscription;
  private categoriesSub: Subscription;

  private componentDestroyed: Subject<boolean> = new Subject();

  newCategory: Category = {
    _id: null,
    name: null
  };

  newProduct: Product = {
    _id: null,
    name: null,
    category_id: null,
    description: null,
    quantity: null,
    price: null,
    pictureURL: null
  };

  constructor(private productsService: ProductsService) {
    this.productsSub = this.productsService.products
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(prod => this.products = prod);
    this.categoriesSub = this.productsService.productCategories
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(cat => this.categories = cat);
  }

  ngOnInit() {
  }

  saveNewProduct() {
    console.log('save', this.newProduct);
    this.productsService.saveNewProduct(this.newProduct);
    this.resetNewProduct();
  }

  saveNewCategory() {
    console.log('save', this.newCategory);
    this.productsService.saveNewCategory(this.newCategory);
    this.resetNewCategory();
  }

  updateProduct(product: Product) {
    this.productsService.updateProduct(product);
  }

  updateCategoryName(category: Category) {
    this.productsService.updateCategory(category);
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product);
  }

  deleteCategory(category: Category) {
    this.productsService.deleteCategory(category);
  }



  private resetNewProduct() {
    this.newProduct = {
      _id: null,
      name: null,
      category_id: null,
      description: null,
      quantity: null,
      price: null,
      pictureURL: null
    };
  }

  private resetNewCategory() {
    this.newCategory = {
      _id: null,
      name: null
    };
  }

  ngOnDestroy() {
    this.componentDestroyed.next(true);
  }

}
