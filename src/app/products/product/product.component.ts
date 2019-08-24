import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {Product} from '../../shared/models/product.model';
import {CartService} from '../../cart/cart.service';
import {ProductsService} from '../products.service';

interface ProductAvailability {
  label: string;
  class: string;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  product: Product;

  @Input() set setProduct(prod: Product) {
    this.product = prod;
    this.calculateAvailability();
  }
  availability: ProductAvailability;

  constructor(private productsService: ProductsService) { }

  addToCartClicked() {
    if (this.product.quantity > 0) {
      this.productsService.addToCart(this.product._id);
      this.calculateAvailability();
    }
  }

  calculateAvailability() {
    if (this.product.quantity > 99) {
      this.availability = {
        label: 'Duza',
        class: 'green'
      };
    } else if (this.product.quantity > 10) {
      this.availability = {
        label: 'Średnia',
        class: 'orange'
      };
    } else if (this.product.quantity > 0) {
      this.availability = {
        label: 'Ostatnie sztuki!',
        class: 'red'
      };
    } else {
      this.availability = {
        label: 'Produkt niedostepny',
        class: 'grey'
      };
    }
  }

}
