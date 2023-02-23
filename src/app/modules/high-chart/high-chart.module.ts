import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HighChartRoutingModule } from './high-chart-routing.module';
import { HighChartComponent } from './high-chart.component';
import { ChartModule } from 'angular-highcharts';


@NgModule({
  declarations: [
    HighChartComponent
  ],
  imports: [
    CommonModule,
    HighChartRoutingModule,
    ChartModule
  ]
})
export class HighChartModule { }
