import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service';
import { ProductsService } from './../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  productList: Product[] = [];
  today = new Date();
  anotherDate = new Date(2023, 11, 12);

  counter = 0;
  subscriptions: Subscription[] = [];

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProduct()
      .subscribe(data => {
        this.productList = data;
      });

    this.subscriptions = [this.setShoppingCartLenght()];
  }

  private setShoppingCartLenght(): Subscription {
    return this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  onAddToShoppingCart(product: Product): void {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  ngDestroy(): void {
    this.subscriptions.forEach(sub => {
      if (sub !== null) {
        sub.unsubscribe();
      }
    });
  }
}
