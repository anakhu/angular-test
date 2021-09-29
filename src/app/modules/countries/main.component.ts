import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { LS_COUNTRY_SEARCH_VALUE } from './constants/countries-list.constants';
import { CountryDTO } from './models/country-dto.model';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  countries$?: Observable<CountryDTO[]>;

  countries: CountryDTO[] = [];

  searchValue: string = '';

  constructor(
    private countriesService: CountriesService,
    private localStorage: LocalStorageService,
  ) {}

  ngOnInit(): void {
    this.countriesService.getFavouriteCountries();
    this.searchValue = this.localStorage.getItem<string>(LS_COUNTRY_SEARCH_VALUE) || '';
    this.getCountries(this.searchValue);
  }

  getCountries(name?: string) {
    this.searchValue = name || '';
    this.localStorage.setItem<string>(LS_COUNTRY_SEARCH_VALUE, this.searchValue);
    this.countries$ = this.countriesService.getCountries(name).pipe(
      take(1),
      map((data: CountryDTO[]) => {
        const countries = data?.length ? data : [];
        return countries.map((country) => ({
          ...country,
          isFavourite: this.countriesService.isFavouriteCountry(country.ccn3),
        }));
      }),
    );
  }

  toggleCountryStatus(country: CountryDTO) {
    if (this.countriesService.isFavouriteCountry(country.ccn3)) {
      this.countriesService.removeFromFavourites(country.ccn3);
    } else {
      this.countriesService.addToFavourites(country);
    }

    this.getCountries(this.searchValue);
  }
}
