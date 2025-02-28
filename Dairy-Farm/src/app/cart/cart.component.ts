import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];
  constructor(private cartService: CartService,private router: Router, private authService:AuthService) {
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });
  }
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  proceedToPay(): void {
    this.authService.getIsLoggedIn().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['/payment']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
