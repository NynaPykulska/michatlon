import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Product} from '../../shared/models/product.model';
import {CartService} from '../../cart/cart.service';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }

  addToCartClicked() {
    this.productsService.addToCart(this.product._id);
  }

}
