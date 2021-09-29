interface CountryName {
  common: string;
  official: string;
}

interface Demonym {
  f: string;
  m: string;
}

export interface Currency {
  name: string;
  symbol: string;
}

export interface CountryDTO {
  altSpellings: string[];
  area: number;
  capital: string[];
  cca2: string;
  cca3: string;
  ccn3: string;
  cioc: string;
  currencies: { [key: string]: Currency };
  demonyms: { [key: string]: Demonym };
  flag: string;
  flags: string[];
  idd: { root: string; suffixes: string[] };
  independent: boolean;
  landlocked: boolean;
  languages: { [key: string]: string };
  latlng: number[];
  name: CountryName;
  nativeName: { [key: string]: CountryName };
  region: string;
  status: string;
  subregion: string;
  tld: string[];
  translations: { [key: string]: CountryName };
  unMember: boolean;
}

export type Country = CountryDTO & { isFavorite?: boolean };
