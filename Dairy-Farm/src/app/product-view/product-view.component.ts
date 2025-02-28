import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductRouterService } from '../services/product-router.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.css'
})
export class ProductViewComponent implements OnInit{
  product: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const productId = params.get('id');
      
      if (productId) {
        this.productService.getProductById(productId).subscribe(product => {
          this.product = product;
        });
      }
    });
  }
  addToCart(product: any): void {
    product.addedToCart = true;
    this.cartService.addToCart(product);
}
}
