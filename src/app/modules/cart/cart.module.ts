import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent } from 'src/app/components/product-card/product-card.component';
import {MatSelectModule} from '@angular/material/select';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BackgroundColorDirective } from '../../directives/background-color/background-color.directive';


@NgModule({
  declarations: [
    CartComponent,
    ProductCardComponent,
    BackgroundColorDirective
  ],
  imports: [
    CommonModule,
    MatCardModule,
    CartRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
    // MatProgressSpinnerModule
  ]
})
export class CartModule { }
