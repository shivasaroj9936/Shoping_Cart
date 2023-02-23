import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, AfterViewInit {
  paymentForm!: FormGroup;
  upiForm!: FormGroup;
  months: any = [];
  years: any = [];
  paymentOption = new FormControl();

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.creatForm();
    this.dateSelector();
  }

  ngAfterViewInit() {
    // this.setValidators();
  }
  creatForm() {
    this.paymentForm = this._fb.group({
      cardNumber: [null, Validators.required],
      month: [null],
      year: [null],
      cvv: [null],
      cardHolderName: [null],
    });
    this.upiForm = this._fb.group({
      upiId: [null, Validators.required],
    });
  }

  placeOrder() {
    if(this.paymentOption.value==1){
      this.paymentForm
      .get('cardHolderName')
      ?.patchValue((this.paymentForm.get('cardHolderName')?.value).trim());
    }
    else{
      this.upiForm
      .get('upiId')
      ?.patchValue((this.paymentForm.get('upiId')?.value));
    }
    this.openSnackBar('Your Order Placed', 'close', '3000');
    this._router.navigate(['cart']);
  }

  openSnackBar(content: any, action: any, duration: any) {
    let sb = this._snackBar.open(content, action, {
      duration: duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['custom_style'],
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
  dateSelector() {
    var year = new Date().getFullYear();
    for (var i = 1; i < 7; i++) {
      this.years.push(year + i);
    }
    for (var i = 1; i <= 12; i++) {
      this.months.push(i);
    }
  }
}
