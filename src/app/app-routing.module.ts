import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './modules/countries/components/country/country.component';
import { MainComponent } from './modules/countries/main.component';
import { CountryResolver } from './modules/countries/services/country.resolver';

const routes: Routes = [
  {
    path: 'countries',
    component: MainComponent,
  },
  {
    path: 'countries/:id',
    component: CountryComponent,
    resolve: {
      country: CountryResolver,
    },
  },
  {
    path: '**',
    redirectTo: '/countries',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
