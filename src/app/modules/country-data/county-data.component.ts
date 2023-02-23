import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { myData } from 'src/app/components/data';
import { ScaleFade, ScaleFadeStagger } from '../../shared/animations';


@Component({
  selector: 'app-county-data',
  templateUrl: './county-data.component.html',
  styleUrls: ['./county-data.component.scss'],
  animations:[ScaleFade,ScaleFadeStagger]
})
export class CountyDataComponent implements OnInit {
  dataForm!: FormGroup;
  countries = myData;
  currentDistricts = new Map();
  firstState=true;
  currentStates!: [];
  countrySelection = new FormControl();
  stateLength=0;
  firstDistrictAdded=true;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.countries);
    this.dataForm = this.formBuilder.group({
      country_name: [],
      states: new FormArray([]),
    });
  }
  initSatate() {
    return this.formBuilder.group({
      state_name: [null],
      districts: new FormArray([]),
    });
  }
  addFirstState(){
    this.states().push(this.initSatate());
  }
  initDistrict() {
    return this.formBuilder.group({
      district_name: [null],
      cities: new FormArray([]),
    });
  }
  initCity() {
    return this.formBuilder.group({
      city_name: [null],
    });
  }

  addState(){
    const control = <FormArray>this.dataForm.controls['states'];
    control.push(this.initSatate());
    this.stateLength++;
  }
  addDistrict(stateIndex:number) {
    const control = (<FormArray>this.dataForm.controls['states']).at(stateIndex).get('districts') as FormArray;
    control.push(this.initDistrict());
  }

  addCity(stateIndex:number, cityIndex:number) {
    const control = ((<FormArray>this.dataForm.controls['states']).at(stateIndex).get('districts') as FormArray).at(cityIndex).get('cities') as FormArray;
    control.push(this.initCity());
    console.log(this.dataForm.value);
  }

   states() {
    return this.dataForm.get('states') as FormArray;
  }

  districtsAtStateIndex(stateIndex:number){
    return this.states().at(stateIndex).get('districts') as FormArray;
  }

  countrySelected() {
    this.dataForm.reset();
    this.dataForm.get('states')?.patchValue([]);
    this.currentDistricts.clear();
    console.log(this.countrySelection);
    this.currentStates = this.countrySelection.value.state_list;
    this.dataForm.controls['country_name'].patchValue(
      this.countrySelection.value.country_name
    );
    if(this.states().length==0){
      this.addFirstState();
      this.firstState=false;
    }
  }
  addFirstDistrict(stateIndex:number){
    this.districtsAtStateIndex(stateIndex).push(this.initDistrict())

  }
  getDistrictList(stateIndex: number, event: any) {
    let selectedStateName = event.value;
    let countryName = this.countrySelection.value.country_name;
    let countryIndex = countryName == 'India' ? 0 : 1;
    this.countries[countryIndex].state_list.forEach((element: any) => {
      if (element.state_name == selectedStateName) {
        this.currentDistricts.set(stateIndex, element.district_list);
      }
    });
    this.districtsAtStateIndex(stateIndex).reset();
    if(this.districtsAtStateIndex(stateIndex).length==0){
      this.addFirstDistrict(stateIndex);
    }
  }
  districtSelection(stateIndex:number,districtIndex:number){
    if(this.cityOfStatesOfDistricts(stateIndex,districtIndex).length==0){
      this.addCity(stateIndex,districtIndex);
    }
  }

  cityOfStatesOfDistricts(stateIndex:number,districtIndex:number){
    return this.districtsAtStateIndex(stateIndex).at(districtIndex).get('cities') as FormArray;
  }

  removeState(stateIndex:number){
    if(this.stateLength>0){
      this.states().removeAt(stateIndex);
      this.stateLength--;
    }
  }
  removeDistrict(stateIndex:number,districtIndex:number){
    this.districtsAtStateIndex(stateIndex).removeAt(districtIndex);
  }
  removeCity(stateIndex:number,districtIndex:number,cityIndex:number){
    this.cityOfStatesOfDistricts(stateIndex,districtIndex).removeAt(cityIndex);
  }
}
