import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { SearchService } from '../services/search.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  Category: string[] = [
    'Milk' , 'Butter' , 'Curd' , 'Cheese' 
  ];
  cartCount = 0;
  searchQuery: string = '';
  selectedCategory: string = '';
  isLoggedIn: boolean = false;
  username: string = '';
  constructor(private cartService: CartService, private searchService: SearchService, private authService: AuthService) {
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
    this.authService.getIsLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      if (isLoggedIn) {
        this.authService.getUsername().subscribe(username => {
          this.username = username;
        });
      }
    });
  }
  applySearchFilter(): void {
    this.searchService.setSearchQuery(this.searchQuery);
  }
  SearchFilter(): void {
    this.searchService.setSearchQuery(this.selectedCategory);
  } 
  ngOnInit(): void {
    this.authService.getIsLoggedIn().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
