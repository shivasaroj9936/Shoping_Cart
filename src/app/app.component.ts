import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartServiceService } from './services/cartService/cart-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Shoping Cart';
  productCount: number = 0;
  toggle: boolean = true;

  constructor(private router: Router, public dialog: MatDialog, private productDetail: CartServiceService) { }

  ngOnInit(): void {
    this.productDetail.productDetails$.subscribe(
      (res) => {
        console.log(res);
        // if(res>=0){
          this.productCount = res;

        // }
      }
    )
  }
  toCart() {
    this.router.navigate(['/cart']);
  }
  onCartClick() {
    this.productDetail.showCart$.next(this.toggle);
    this.toggle = !this.toggle;
  }


}
