import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private formBuilder:FormBuilder) { }

    //--------------- Category form------------

    initFirstCategory() {
      return this.formBuilder.group({
        catName: [null, Validators.required],
        catId: [null],
        subCatData: this.formBuilder.array([])
      })
    }

    //--------------- Sub-Category form------------

    initFirstSubCategory() {
      return this.formBuilder.group({
        subCatName: [null, Validators.required],
        subCatId: [null],
        catId: [null],
        classTotal: [0],
        classes: this.formBuilder.array([])
      })
    }
}
