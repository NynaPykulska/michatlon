import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartItem} from '../shared/models/cart-item.model';
import {CartService} from './cart.service';
import {Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {

  cartItems: CartItem[];

  private cartItemsSub: Subscription;
  private destroy: Subject<boolean> = new Subject();

  constructor(private cartService: CartService) {
    this.cartItemsSub = this.cartService.inCartSubject.pipe(takeUntil(this.destroy)).subscribe(data => this.cartItems = data);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroy.next(true);
  }

}
