import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject } from 'rxjs';
import { LoaderEnabled } from 'src/app/core/services/loader.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CountriesApi } from '../constants/api.constants';
import { LS_SELECTED_COUNTRIES } from '../constants/countries-list.constants';
import { CountryDTO } from '../models/country-dto.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient, private localStorage: LocalStorageService) {}

  cache: { [key: string]: AsyncSubject<CountryDTO[]> } = {};

  selectedCountries: Map<string, { country: CountryDTO }> = new Map();

  @LoaderEnabled()
  getCountries(name?: string): AsyncSubject<CountryDTO[]> {
    const url = name ? CountriesApi.contriesByName + name : CountriesApi.allCountries;

    if (!this.cache[url]) {
      this.cache[url] = new AsyncSubject();
      this.http.get<CountryDTO[]>(url).subscribe((data) => {
        this.cache[url].next(data);
        this.cache[url].complete();
        return this.cache[url];
      });
    }

    return this.cache[url];
  }

  isFavouriteCountry(ccn3: string): boolean {
    return !!this.selectedCountries.get(ccn3);
  }

  addToFavourites(country: CountryDTO) {
    this.selectedCountries.set(country.ccn3, { country });
    this.saveCountries();
  }

  removeFromFavourites(ccn3: string) {
    this.selectedCountries.delete(ccn3);
    this.saveCountries();
  }

  saveCountries(): void {
    const itemsToSave: CountryDTO[] = [];
    this.selectedCountries.forEach((value) => {
      itemsToSave.push(value.country);
    });
    this.localStorage.setItem<CountryDTO[]>(LS_SELECTED_COUNTRIES, itemsToSave);
  }

  getFavouriteCountries() {
    const countries = this.localStorage.getItem<CountryDTO[]>(LS_SELECTED_COUNTRIES);
    if (countries?.length) {
      const countryMap = new Map();
      countries.forEach((country) => {
        countryMap.set(country.ccn3, { country });
      });
      this.selectedCountries = countryMap;
    }
  }
}
