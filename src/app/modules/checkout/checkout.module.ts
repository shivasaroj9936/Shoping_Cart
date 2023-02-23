import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { AddressComponent } from 'src/app/components/address/address.component';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NumberOnlyDirective } from 'src/app/directives/numberOnly/number-only.directive';
import { CartDetailsComponent } from 'src/app/components/cart-details/cart-details.component';
import { NameValidationDirective } from 'src/app/directives/nameValidation/name-validation.directive';
import { PreventStartingSpaceDirective } from '../../directives/prevent-starting-space/prevent-starting-space.directive';
import { TrimDirective } from '../../directives/trim/trim.directive';

@NgModule({
  declarations: [
    CheckoutComponent,
    AddressComponent,
    CartDetailsComponent,
    PaymentComponent,
    NumberOnlyDirective,
    NameValidationDirective,
    PreventStartingSpaceDirective,
    TrimDirective,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
})
export class CheckoutModule {}
