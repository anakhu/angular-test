import { Component } from '@angular/core';
import { AgRendererComponent } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { CountryInfo } from '../../models/country-info.model';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss'],
})
export class CountryInfoComponent implements AgRendererComponent {
  params!: ICellRendererParams & CountryInfo;

  agInit(params: ICellRendererParams & CountryInfo): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams & CountryInfo): boolean {
    return this.params !== params;
  }
}
