import { Map } from 'immutable';

export interface ICitybikStation extends Map<string, any> {
  station_id: string;
  name: string;
  short_name: string;
  lat: number;
  lon: number;
  rental_methods: string[];
  capacity: number;
  eightd_has_key_dispenser: boolean;
}

export interface ICitybikNetwork extends Map<string, any>  {
  company: string;
  href: string;
  location: {
    latitude: number;
    city: string;
    longitude: number;
    country: string;
  };
  name: string;
  id: string;
}
