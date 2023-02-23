import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  productDetails$ = new BehaviorSubject<number>(0);

  showCart$ = new Subject<boolean>();
  onaddToCart$ = new Subject<boolean>();

  constructor() { }

  


}
