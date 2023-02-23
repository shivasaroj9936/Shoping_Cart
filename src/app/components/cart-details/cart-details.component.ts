import { Component, Input, OnInit } from '@angular/core';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';
import { ScaleFade, ScaleFadeStagger } from 'src/app/shared/animations';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
  animations: [ScaleFadeStagger, ScaleFade],
})
export class CartDetailsComponent implements OnInit {
   productDetails: any=[];
   totalPrice!: number;

  constructor(private productService: ProductServiceService) {}

  ngOnInit(): void {
    this.productDetails = this.productService.getProductData();
    this.totalPrice = this.productService.totalPrice;
  }
}
