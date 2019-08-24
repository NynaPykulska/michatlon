import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from '../shared/models/cart-item.model';
import {CartService} from './cart.service';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ProductsService} from '../products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: CartItem[];
  sumPrice = 0;

  private cartItemsSub: Subscription;
  private destroy: Subject<boolean> = new Subject();

  constructor(private cartService: CartService, private productsService: ProductsService) {
    this.cartItemsSub = this.cartService.inCartSubject
      .pipe(takeUntil(this.destroy))
      .subscribe(data => {
        this.cartItems = data;
        this.sumPrice = this.cartItems.reduce((p, c) => p + (c.quantity * c.price), 0);
      });
  }

  ngOnInit() {
  }

  pay() {
    console.log('pay');
    this.productsService.updateProductsQuantity(this.cartItems.map(elem => elem.id));
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

}
