import { Injectable } from '@angular/core';
import {ApiService} from '../shared/api/api.service';
import {Product} from '../shared/models/product.model';
import {Category} from '../shared/models/category.model';
import {BehaviorSubject} from 'rxjs';
import {CartService} from '../cart/cart.service';
import {take} from 'rxjs/operators';

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
    this.api.getProducts().pipe(take(1)).subscribe(response => {
      this.products.next(response);
    });
  }

  requestProductCategories() {
    this.api.getCategories().pipe(take(1)).subscribe(response => {
      this.productCategories.next(response);
    });
  }

  saveNewProduct(product: Product) {
    this.api.postProduct(product).pipe(take(1)).subscribe(res => {
      this.requestProducts();
    });
  }

  saveNewCategory(category: Category) {
    this.api.postCategory(category).pipe(take(1)).subscribe(res => {
      this.requestProductCategories();
    });
  }

  updateProduct(product: Product) {
    this.api.putProduct(product).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.requestProducts();
    });
  }

  updateCategory(category: Category) {
    this.api.putCategory(category).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.requestProductCategories();
    });
  }

  deleteProduct(product: Product) {
    this.api.deleteProduct(product._id).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.requestProducts();
    });
  }

  deleteCategory(category: Category) {
    this.api.deleteCategory(category._id).pipe(take(1)).subscribe(res => {
      console.log(res);
      this.requestProductCategories();
    });
  }

  updateProductsQuantity(ids: string[]) {
    console.log(ids);
    this.products.value
      .filter(elem => ids.includes(elem._id))
      .map(elem => {
        return {_id: elem._id, quantity: elem.quantity}; })
      .forEach(elem => {
        this.api.putProduct(elem).pipe(take(1)).subscribe(() => {});
      });
    this.requestProducts();
    this.cartService.clearCart();

  }

}
