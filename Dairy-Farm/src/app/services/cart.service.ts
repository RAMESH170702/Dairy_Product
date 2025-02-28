import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);

  getCartItems(): Observable<Product[]> {
    return this.cartItemsSubject.asObservable();
  }


  getCartCount(): BehaviorSubject<number> {
    return this.cartCountSubject;
  }

  getCartItemsSubject(): BehaviorSubject<Product[]> {
    return this.cartItemsSubject;
  }

  addToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);

    if (existingItem) {
      // If the product is already in the cart, update its quantity
      existingItem.quantity = (existingItem.quantity ?? 0) + 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      const newItem = { ...product, quantity: 1 };
      this.cartItems.push(newItem);
    }

    this.cartCountSubject.next(this.cartItems.length);
    this.cartItemsSubject.next([...this.cartItems]);
  }
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartItemsSubject.next([...this.cartItems]);
  }
  clearCart(): void {
    this.cartItems = [];
    this.cartCountSubject.next(0);
    this.cartItemsSubject.next([]);
  }
}

