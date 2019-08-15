import { Injectable } from '@angular/core';
import {ProductsService} from '../products/products.service';
import {CartItem} from '../shared/models/cart-item.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private inCart: CartItem[] = [];
  inCartSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject([]);

  constructor(private productsService: ProductsService) { }

  addToCart(prodId: string) {
    const productData = this.productsService.products.value.find(elem => elem._id === prodId);
    const prodIndex = this.inCart.findIndex(elem => elem.id === prodId);
    if (prodIndex === -1) {
      this.inCart.push({
        id: prodId,
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
    productData.quantity --;
  }
}
