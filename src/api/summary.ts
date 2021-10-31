import {useQuery} from 'react-query';

export interface Summary {
  ID: string;
  Message: string;
  Global: Global;
  Countries?: CountriesEntity[] | null;
  Date: string;
}
export interface Global {
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
}
export interface CountriesEntity {
  ID: string;
  Country: string;
  CountryCode: string;
  Slug: string;
  NewConfirmed: number;
  TotalConfirmed: number;
  NewDeaths: number;
  TotalDeaths: number;
  NewRecovered: number;
  TotalRecovered: number;
  Date: string;
  Premium: Premium;
}
export interface Premium {}

export default function useSummaryAPI() {
  return useQuery<Summary, Error>('summary', () =>
    fetch('https://api.covid19api.com/summary').then(res => res.json()),
  );
}
