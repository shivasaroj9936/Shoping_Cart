import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnInit {
  addressForm!: FormGroup;
  buttonEnable = true;
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.creatForm();
  }
  creatForm() {
    this.addressForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      address: ['', [Validators.required]],
      postalCode: ['', [Validators.required, , Validators.minLength(6)]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
    });
  }
  get control() {
    return this.addressForm.controls;
  }
  addressSubmit() {}
}
