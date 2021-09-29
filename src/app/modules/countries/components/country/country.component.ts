import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../models/country-dto.model';
import { CountryData } from '../../models/country.model';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  country?: CountryData;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((result) => {
      if (result.country) {
        this.country = this.getDataForCard(result.country);
      }
    });
  }

  getDataForCard(country: Country): CountryData {
    return {
      name: country.name.official,
      region: country.region,
      subregion: country.subregion,
      languages: Object.values(country.languages),
      currencies: Object.values(country.currencies),
      isFavourite: country.isFavorite,
      capital: country?.capital?.length ? country.capital[0] : '',
      flagUrl: country.flags[0],
    };
  }
}
