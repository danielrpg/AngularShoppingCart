import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private myShoppingCart: Product[] = [];
  // This is our object that can be observed
  private myCart = new BehaviorSubject<Product[]>([]);
  // And we can specify its observable
  myCart$ = this.myCart.asObservable();

  addProduct(product: Product): void {
    this.myShoppingCart.push(product);
    // And we can notify the subscribers
    this.myCart.next(this.myShoppingCart);
  }

  getShoppingCart(): Product[] {
    return this.myShoppingCart;
  }

  getTotal(): number {
    return this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
  }
}
