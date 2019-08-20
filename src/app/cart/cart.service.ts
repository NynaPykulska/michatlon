import { Injectable } from '@angular/core';
import {CartItem} from '../shared/models/cart-item.model';
import {BehaviorSubject} from 'rxjs';
import {Product} from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private inCart: CartItem[] = [];
  inCartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);
  inCartNumberSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.inCartSubject.subscribe(data =>
      this.inCartNumberSubject.next(data.reduce((p, c) => p + c.quantity, 0))
    );
  }

  addToCart(productData: Product) {
    const prodIndex = this.inCart.findIndex(elem => elem.id === productData._id);
    if (prodIndex === -1) {
      this.inCart.push({
        id: productData._id,
        name: productData.name,
        description: productData.description,
        pictureURL: productData.pictureURL,
        price: productData.price,
        quantity: 1
      });
    } else {
      this.inCart[prodIndex].quantity ++;
    }
    this.inCartSubject.next(this.inCart);
  }
}
