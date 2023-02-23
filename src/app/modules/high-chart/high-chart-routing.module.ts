import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HighChartComponent } from './high-chart.component';

const routes: Routes = [
  {
    path:'',
    component:HighChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HighChartRoutingModule { }
