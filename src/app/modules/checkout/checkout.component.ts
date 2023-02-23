import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServiceService } from 'src/app/services/productService/product-service.service';
import { ScaleFade, ScaleFadeStagger } from 'src/app/shared/animations';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [ScaleFadeStagger, ScaleFade],

})
export class CheckoutComponent implements OnInit {
  productDetails: any = [];
  totalPrice: number = 0;

  constructor(
    private productService: ProductServiceService,
    private _router: Router
  ) {
    this.productDetails = productService.getProductData();
    this.totalPrice = productService.totalPrice;
  }

  ngOnInit(): void {
    if (this.productDetails == undefined) {
      // this._router.navigate(['cart']);
    }
  }

}
