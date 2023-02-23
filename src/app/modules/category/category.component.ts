import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CategoryData } from 'src/app/constant/category-data';
import { FormsService } from 'src/app/services/forms.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  data = new CategoryData();
  categorySelection = new FormControl();
  subCategorySelection = new FormControl();
  dataFinal!: FormGroup; // final data by form
  myFormGroup!: FormGroup;
  myFormArray!: FormArray;
  myFormControl = new FormControl();
  constructor(
    private formBuilder: FormBuilder,
    private forms: FormsService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.dataFinal = this.formBuilder.group({
      categories: new FormArray([]),
    });
  }
  createForm() {
    this.myFormGroup = this.formBuilder.group({
      name: [null],
      email: [null],
      phone: [null],
    });
    this.myFormArray = this.formBuilder.array([]);
  }

  // ---------Addition of Category----------------
  onAdd() {
    if (this.categorySelection.value && this.subCategorySelection.value) {
      let newSubCat = this.forms.initFirstSubCategory();
      const newCat = this.forms.initFirstCategory();
      newCat?.patchValue({
        catName: this.categorySelection.value.catName,
        catId: this.categorySelection.value.catId,
      });
      newSubCat?.patchValue({
        subCatName: this.subCategorySelection.value?.subCatName,
        subCatId: this.subCategorySelection.value?.subCatId,
        catId: this.subCategorySelection.value?.catId,
      });
      if (newSubCat.value.catId == newCat.value.catId) {
        newSubCat = this.addClasses(newSubCat);
        this.addCategory(newSubCat, newCat);
      }
    } else {
      this.openSnackBar('First Select Data', 'close', '3000');
    }
  }
  // ---------Addition of subClasses----------------

  addClasses(newSubCat: FormGroup) {
    const classes = this.subCategorySelection.value['classes'];
    classes.forEach((subClass: any) => {
      (<FormArray>newSubCat.controls['classes']).push(
        this.formBuilder.group({
          className: [subClass.className],
          classCount: [subClass.classCount],
        })
      );
    });
    return newSubCat;
  }
  /* @description ---------------Addition of category and sub Category----------------*/
  addCategory(newSubCat: FormGroup, newCat: FormGroup) {
    const catIndex = this.isCategoryPresent(newSubCat.value.catId);

    if (catIndex !== -1) {
      const subCatIndex = this.isSubCategoryPresent(
        catIndex,
        newSubCat.value.subCatId
      );
      subCatIndex !== -1
        ? this.openSnackBar('Data already present', 'close', '1500')
        : this.addNewSubCategory(catIndex, newSubCat),
        this.openSnackBar('Data added successfully', 'close', '3000');
    } else {
      this.addNewCategory(newCat, newSubCat);
      this.openSnackBar('Data added successfully', 'close', '3000');
    }
    this.subCategorySelection.reset();
  }
  isCategoryPresent(catId: number): number {
    return this.categories.value.findIndex((obj: any) => obj.catId === catId);
  }

  isSubCategoryPresent(indexOfCategory: number, newSubCatId: number): number {
    return this.subCategoryArrayAtIndex(indexOfCategory)?.value.findIndex(
      (obj: any) => obj.subCatId === newSubCatId
    );
  }

  get categories() {
    return this.dataFinal.controls['categories'] as FormArray;
  }

  subCategoryArrayAtIndex(catIndex: number) {
    return this.dataFinal.get([
      'categories',
      catIndex,
      'subCatData',
    ]) as FormArray;
  }

  addNewCategory(newCat: FormGroup, newSubCat: FormGroup) {
    (<FormArray>newCat.get('subCatData')).push(newSubCat);
    this.categories.push(newCat);
  }

  addNewSubCategory(catIndex: number, newSubCat: FormGroup) {
    (<FormArray>this.categories.at(catIndex).get('subCatData')).push(newSubCat);
  }
  //--------------DELETION OF DATA----------------------

  onDelete(catIndex: number, subCatIndex: number) {
    if (confirm('Do you want to delete')) {
      (<FormArray>this.categories.at(catIndex).get('subCatData')).removeAt(
        subCatIndex
      );
      const subCatlength = (<FormArray>(
        this.categories.at(catIndex).get('subCatData')
      )).length;
      if (subCatlength == 0) {
        (<FormArray>this.categories).removeAt(catIndex);
        this.categorySelection.reset();
      }
    }
  }
  //---------------Class Count Increment Decrement-------------------

  onIncreaseDecrease(
    classData: any,
    catIndex: number,
    subCatIndex: number,
    value: number
  ) {
    const currentValue = classData.classCount;
    const className = classData.className;
    const classIndex = className == 'A' ? 0 : className == 'B' ? 1 : 2;
    if (value == -1 && currentValue > 0) {
      (<FormArray>(
        this.categories
          .at(catIndex)
          .get(['subCatData', subCatIndex])
          ?.get('classes')
      ))
        .at(classIndex)
        .get('classCount')
        ?.patchValue(currentValue + value);
    } else if (value == 1) {
      (<FormArray>(
        this.categories
          .at(catIndex)
          .get(['subCatData', subCatIndex])
          ?.get('classes')
      ))
        .at(classIndex)
        .get('classCount')
        ?.patchValue(currentValue + value);
    }
    let classTotal = this.getClassTotal(
      <FormArray>(
        this.categories
          .at(catIndex)
          .get(['subCatData', subCatIndex])
          ?.get('classes')
      )
    );
    this.categories
      .at(catIndex)
      .get(['subCatData', subCatIndex])
      ?.get('classTotal')
      ?.patchValue(classTotal);
  }
  getClassTotal(subCat: FormArray) {
    let classTotal = 0;
    subCat.value.forEach((element: any) => {
      classTotal += element.classCount;
    });
    return classTotal;
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
  finalSubmit() {
    this.openSnackBar('You can checkout Console for data', 'close', '3000');
    console.log(this.categories.value, 'Final Data');
  }
  toCart() {
    this.router.navigate(['/cart']);
  }
  toSelectLocation(){
    this.router.navigate(['/address'])
  }
  toHighChart(){
    this.router.navigate(['/high-chart'])

  }
}
