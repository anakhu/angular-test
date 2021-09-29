import { Component, Input, Output } from '@angular/core';
import { ColDef, GridApi, GridOptions, GridReadyEvent } from 'ag-grid-community';
import {
  PAGE_SIZE_OPTIONS,
  PaginationActions,
} from '../../../shared/constants/pagination.constants';
import { Country } from '../../models/country-dto.model';
import { Pagination } from '../../../shared/models/pagination.model';
import { CountryInfoComponent } from '../country-info/country-info.component';
import { CountryInfo } from '../../models/country-info.model';
import { CellButtonComponent } from '../cell-button/cell-button.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LS_PAGE_SIZE } from '../../constants/countries-list.constants';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent {
  gridApi?: GridApi;

  frameworkComponents: any = {
    infoCell: CountryInfoComponent,
    cellBtn: CellButtonComponent,
  };

  paginationSettings: Pagination = {
    isLastPage: false,
    isFirstPage: true,
    currentPage: 0,
    totalPages: 0,
    amountPerPage: PAGE_SIZE_OPTIONS[0],
  };

  @Input() countries: Country[] = [];

  @Output() updateCountryEvent = new EventEmitter<Country>();

  columnDefs: ColDef[] = [
    {
      headerName: '',
      field: 'flags',
      width: 90,
      cellClass: 'country-flag',
      cellRenderer: (cell: any) => {
        return `<img width="40" src="${cell.data.flags[0]}"></img>`;
      },
    },
    {
      headerName: 'Country',
      flex: 1,
      cellRendererParams: (cell: any) => {
        const { name, region, subregion } = cell.data;
        return {
          name: name.official,
          region,
          subregion,
        } as CountryInfo;
      },
      cellRenderer: 'infoCell',
      onCellClicked: (cell: any) => this.router.navigate([`/countries/${cell.data.ccn3}`]),
    },
    {
      headerName: '',
      cellStyle: {
        justifyContent: 'center',
      },
      field: 'isFavourite',
      onCellClicked: (cell: any) => this.updateCountryEvent.emit(cell.data),
      cellRendererParams: (cell: any) => {
        return { iconClass: cell.value ? 'favorite' : 'favorite_border' };
      },
      cellRenderer: 'cellBtn',
      width: 90,
    },
  ];

  gridOptions: GridOptions = {
    suppressScrollOnNewData: true,
    rowHeight: 80,
    rowSelection: 'multiple',
  };

  constructor(private localStorage: LocalStorageService, private router: Router) {}

  onPaginationChanged() {
    if (this.gridApi) {
      const currentPage = this.gridApi.paginationGetCurrentPage();
      const totalPages = this.gridApi.paginationGetTotalPages();
      this.paginationSettings = {
        amountPerPage: this.paginationSettings.amountPerPage,
        isLastPage: currentPage >= totalPages - 1,
        isFirstPage: currentPage === 0,
        totalPages,
        currentPage: currentPage + 1,
      };
    }
  }

  changePage(action: PaginationActions) {
    switch (action) {
      case PaginationActions.first:
        this.gridApi?.paginationGoToFirstPage();
        break;
      case PaginationActions.last:
        this.gridApi?.paginationGoToLastPage();
        break;
      case PaginationActions.next:
        this.gridApi?.paginationGoToNextPage();
        break;
      case PaginationActions.previous:
        this.gridApi?.paginationGoToPreviousPage();
        break;
      default:
        break;
    }
  }

  setCurrentPage(page: number) {
    this.gridApi?.paginationGoToPage(page - 1);
  }

  setPageSize(amount: number) {
    this.paginationSettings = { ...this.paginationSettings, amountPerPage: amount };
    this.gridApi?.paginationSetPageSize(amount);
    this.localStorage.setItem<number>(LS_PAGE_SIZE, amount);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    const presetPageSize = this.localStorage.getItem<number>(LS_PAGE_SIZE);
    this.paginationSettings.amountPerPage = presetPageSize || PAGE_SIZE_OPTIONS[0];
  }
}
