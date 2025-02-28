import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchQuery: string = '';
  selectedCategory: string = '';
  productList: Array<any> = [];
  filteredProductList: Array<any> = [];
  constructor(private productService: ProductService, 
              private cartService:CartService, 
              private searchService:SearchService) { }

  ngOnInit(): void {
    this.productService.getProduct().subscribe(data => {
      this.productList = data.map(product => ({ ...product, addedToCart: false }));
      this.filteredProductList = [...this.productList];
    });
    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery = query;
      this.applySearchFilter();
    });
  }
  applySearchFilter(): void {
    this.filteredProductList = this.productList.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
      (this.selectedCategory === '' || product.category.toLowerCase() === this.selectedCategory.toLowerCase())
    );
  }
  addToCart(product: any): void {
        product.addedToCart = true;
        this.cartService.addToCart(product);
  }
}