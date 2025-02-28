import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductRouterService {

  constructor(private router:Router) { }
  navigateToHome() {
    this.router.navigate([""]);
  }
}
