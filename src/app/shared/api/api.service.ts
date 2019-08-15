import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product.model';
import {Observable} from 'rxjs';
import {Category} from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly productsUrl = 'http://localhost:5000/products';
  readonly categoriesUrl = 'http://localhost:5000/categories';


  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  postProduct(body: Product) {
    return this.http.post(this.productsUrl, body);
  }

  postCategory(body: Category) {
    return this.http.post(this.categoriesUrl, body);
  }

  putProduct(body: Product) {
    const url = `${this.productsUrl}/${body._id}`;
    delete body._id;
    return this.http.put(url, body);
  }

  putCategory(body: Category) {
    const url = `${this.categoriesUrl}/${body._id}`;
    delete body._id;
    return this.http.put(url, body);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.productsUrl}/${id}`);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.categoriesUrl}/${id}`);
  }
}
