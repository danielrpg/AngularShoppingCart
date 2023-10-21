import { Component, OnInit } from '@angular/core';

import { StoreService } from '../../services/store.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  activeMenu = false;
  counter = 0;
  subscriptions: Subscription[] = [];

  constructor(
    private storeService: StoreService) {

  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  ngOnInit(): void {
    this.subscriptions = [this.setShoppingCartLenght()];
  }

  private setShoppingCartLenght(): Subscription {
    return this.storeService.myCart$.subscribe(products => {
      this.counter = products.length;
    });
  }

  ngDestroy(): void {
    this.subscriptions.forEach(sub => {
      if (sub !== null) {
        sub.unsubscribe();
      }
    });
  }
}
