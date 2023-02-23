import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartServiceService } from 'src/app/services/cartService/cart-service.service';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';
import { ScaleFade, ScaleFadeStagger } from '../../shared/animations';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [ScaleFadeStagger, ScaleFade],
})
export class CartComponent implements OnInit {
  @ViewChild('addToCartLayer') addToCartLayer!: ElementRef;
  @ViewChild('displayCard') displayCard!: ElementRef;
  productDetails: any = [];
  productCount: number = 0;
  showCart: boolean = false;
  totalPrice: number = 0;
  showdiv = false;
  constructor(
    private productsService: ProductServiceService,
    private productDetailObservable: CartServiceService,
    private _router:Router,

  ) {
    this.productDetailObservable.productDetails$.next(0);

  }

  ngOnInit(): void {
    this.getProductDetails();
    this.showCartList();
  }

  getProductDetails() {
    this.productsService.products().subscribe(
      (res) => {
        this.productDetails = res.products;
        console.log(res, 'resssssssss');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  showCartList() {
    this.productDetailObservable.showCart$.subscribe((val) => {
      this.showdiv = val;
    });
  }
  toCheckOut() {
    this.productsService.setProductData(this.productDetails,this.totalPrice);
    this._router.navigate(['checkout'])
  }
  onBuyButton(clickedItemIndex: number) {
    this.productDetails[clickedItemIndex]['addToCart'] = true;
    this.productDetails[clickedItemIndex]['numberOfItemInCart'] = 1;
    this.productDetails[clickedItemIndex]['totalPrice'] =
      this.productDetails[clickedItemIndex].price;
    this.productCount++;
    this.productDetailObservable.productDetails$.next(this.productCount);
    this.getTotalPrice();
    // this._animateCard();
  }

  onIncreaseDecreaseFromChield(data: any) {
    this.onIncreaseDecrease(data.itemIndex, data.type);
  }
  currentClickedItemAtIndex(clickedItemIndex: number) {
    return this.productDetails[clickedItemIndex].numberOfItemInCart;
  }

  onIncreaseDecrease(clickedItemIndex: any, value: number) {
    if (this.currentClickedItemAtIndex(clickedItemIndex) >= 1 || value == 1) {
      this.productDetails[clickedItemIndex].numberOfItemInCart += value;
      if (
        this.currentClickedItemAtIndex(clickedItemIndex) == 0 &&
        this.productCount > 0
      ) {
        this.productDetailObservable.productDetails$.next(this.productCount);
        this.deleteItem(clickedItemIndex);
      }
    }
    this.productDetails[clickedItemIndex].totalPrice =
      this.productDetails[clickedItemIndex].numberOfItemInCart *
      this.productDetails[clickedItemIndex].price;
    this.getTotalPrice();
  }

  deleteItem(itemIndex: number) {
    this.productDetails[itemIndex]['addToCart'] = false;
    this.productCount--;
    this.productDetailObservable.productDetails$.next(this.productCount);
    this.getTotalPrice();
    if (this.totalPrice == 0) {
      this.productDetailObservable.showCart$.next(false);
    }
  }
  getTotalPrice() {
    this.totalPrice = 0;
    this.productDetails.forEach((element: any) => {
      element.addToCart
        ? (this.totalPrice += element.totalPrice)
        : (this.totalPrice += 0);
    });
  }

  clearCart() {
    this.productDetails.forEach((element: any) => {
      element['addToCart'] = false;
    });
    this.totalPrice = 0;
    this.productCount = 0;
    this.productDetailObservable.productDetails$.next(this.productCount);
  }
  shopNow(){
    this._router.navigate(['cart']);
  }
}
