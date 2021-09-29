import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take, filter, mergeAll } from 'rxjs/operators';
import { Country } from '../models/country-dto.model';
import { CountriesService } from './countries.service';

@Injectable({ providedIn: 'root' })
export class CountryResolver implements Resolve<Country> {
  constructor(private countryService: CountriesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    this.countryService.getFavouriteCountries();
    const ccn3 = route.paramMap.get('id');
    return this.countryService.getCountries().pipe(
      take(1),
      mergeAll(),
      filter((country) => country.ccn3 === ccn3),
    );
  }
}
