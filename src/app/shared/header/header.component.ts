import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CartService} from '../../cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public cartService: CartService) { }

  ngOnInit() {
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
