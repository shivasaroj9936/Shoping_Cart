import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountyDataComponent } from './county-data.component';

const routes: Routes = [
  {
    path: '',
    component: CountyDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryDataRoutingModule {}
