import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Product} from '../../shared/models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() addToCart: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  addToCartClicked() {
    this.addToCart.emit(this.product._id);
  }

}
