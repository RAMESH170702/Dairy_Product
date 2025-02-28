import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: string = "http://localhost:3000/product";
  constructor(private http: HttpClient) { }
  getProduct(): Observable<Product[]>{
    return this.http.get<Product[]>(this.product);
  }
  getProductById(productId: string): Observable<any> {
    return this.http.get<any>(`${this.product}/${productId}`);
  }
}
