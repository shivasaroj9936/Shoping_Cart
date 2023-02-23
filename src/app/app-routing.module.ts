import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/category/category.module').then(
        (m) => m.CategoryModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./modules/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./modules/checkout/checkout.module').then(
        (m) => m.CheckoutModule
      ),
  },
  {
    path: 'address',
    // loadChildren: () =>   import('./modules/checkout/checkout.module').then(  (m) => m.CheckoutModule  ),
    loadChildren:()=>import('./modules/country-data/country-data.module').then((m)=>m.CountryDataModule)
  },
  {
    path: 'high-chart',
    loadChildren:()=> import('./modules/high-chart/high-chart.module').then((m)=>m.HighChartModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
