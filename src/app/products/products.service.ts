import { Injectable } from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {Product} from '../shared/models/product.model';
import {Category} from '../shared/models/category.model';
import {BehaviorSubject} from 'rxjs';
import {CartService} from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: BehaviorSubject<Product[]> = new BehaviorSubject(null);
  productCategories: BehaviorSubject<Category[]> = new BehaviorSubject(null);

  constructor(private api: ApiService, private cartService: CartService) {
    this.requestProducts();
    this.requestProductCategories();
  }

  getProductInfo(id: string) {
    return this.products.value.find(elem => elem._id === id);
  }

  addToCart(id: string) {
    const productsValue = this.products.value;
    const selectedProductIndex = productsValue.findIndex(elem => elem._id === id);
    this.cartService.addToCart(productsValue[selectedProductIndex]);
    productsValue[selectedProductIndex].quantity --;
    this.products.next(productsValue);
  }

  requestProducts() {
    this.api.getProducts().subscribe(response => {
      this.products.next(response);
    });
  }

  requestProductCategories() {
    this.api.getCategories().subscribe(response => {
      this.productCategories.next(response);
    });
  }

  saveNewProduct(product: Product) {
    this.api.postProduct(product).subscribe(res => {
      this.requestProducts();
    });
  }

  saveNewCategory(category: Category) {
    this.api.postCategory(category).subscribe(res => {
      this.requestProductCategories();
    });
  }

  updateProduct(product: Product) {
    this.api.putProduct(product).subscribe(res => {
      console.log(res);
      this.requestProducts();
    });
  }

  updateCategory(category: Category) {
    this.api.putCategory(category).subscribe(res => {
      console.log(res);
      this.requestProductCategories();
    });
  }

  deleteProduct(product: Product) {
    this.api.deleteProduct(product._id).subscribe(res => {
      console.log(res);
      this.requestProducts();
    });
  }

  deleteCategory(category: Category) {
    this.api.deleteCategory(category._id).subscribe(res => {
      console.log(res);
      this.requestProductCategories();
    });
  }


}
