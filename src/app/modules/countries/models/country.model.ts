import { Currency } from './country-dto.model';

export interface CountryData {
  name: string;
  region: string;
  subregion: string;
  languages: string[];
  currencies: Currency[];
  capital: string;
  flagUrl: string;
  isFavourite?: boolean;
}
