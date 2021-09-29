import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';
import { CountryInfoComponent } from './components/country-info/country-info.component';
import { CellButtonComponent } from './components/cell-button/cell-button.component';
import { CountryComponent } from './components/country/country.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainComponent,
    CountriesListComponent,
    CountryInfoComponent,
    CellButtonComponent,
    CountryComponent,
  ],
  imports: [CommonModule, RouterModule, SharedModule, AgGridModule.withComponents([])],
  exports: [MainComponent],
})
export class CountriesModule {}
