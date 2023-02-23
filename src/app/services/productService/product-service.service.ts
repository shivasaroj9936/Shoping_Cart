import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  BASE_URL = environment.baseUrl;
  productDetails: any;
  totalPrice: number = 0;

  constructor(private httpClient: HttpClient) {}
  products(): Observable<any> {
    return this.httpClient.get(
      `${this.BASE_URL}` + '/products/category/smartphones'
    );
  }

  setProductData(productData: any, totalPrice: number) {
    this.totalPrice = totalPrice;
    this.productDetails = productData;
  }
  getProductData() {
    return this.productDetails;
  }
}
