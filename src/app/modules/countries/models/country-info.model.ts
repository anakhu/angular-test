import { CountryDTO } from './country-dto.model';

export type CountryInfo = Pick<CountryDTO, 'name' | 'region' | 'subregion'>;
