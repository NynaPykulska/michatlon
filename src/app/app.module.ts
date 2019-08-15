import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.component';
import {ProductsService} from './products/products.service';
import { ProductComponent } from './products/product/product.component';
import { SortPipe } from './shared/pipes/sort.pipe';
import { CategoryFilterPipe } from './shared/pipes/category-filter.pipe';
import { CartComponent } from './cart/cart.component';

const appRoutes: Routes = [
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  }
];

registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductsComponent,
    AdminComponent,
    ProductComponent,
    SortPipe,
    CategoryFilterPipe,
    CartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgbModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
