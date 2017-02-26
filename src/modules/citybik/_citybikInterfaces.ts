import { Map, List } from 'immutable';
import { IAsyncAction } from '../../utils/asyncActions';

export type ICitybikModuleName = 'citybik';

type PartialState = Partial<ICityBikState>;
export interface ICityBikState {
  readonly citybikNetworks: List<ICitybikNetwork>;
  readonly currentNetwork: ICitybikNetwork;
  readonly currentNetworkLoadingStatus: IAsyncAction | null;

  getIn(keyPath: [ ICitybikModuleName, 'citybikNetworks' ]): List<ICitybikNetwork>;
  getIn(keyPath: [ ICitybikModuleName, 'currentNetworkLoadingStatus' ]): IAsyncAction;
  getIn(keyPath: [ ICitybikModuleName, 'currentNetwork' ]): ICitybikNetwork;

  merge(partial: PartialState): ICityBikState;
}

export interface ICitybikStation {
  station_id: string;
  name: string;
  short_name: string;
  lat: number;
  lon: number;
  rental_methods: string[];
  capacity: number;
  eightd_has_key_dispenser: boolean;

  getIn<K extends keyof ICitybikStation>(keyPath: [ K ]): ICitybikStation;
  get<K extends keyof ICitybikStation>(key: K): ICitybikStation[K];
}

interface ICitybikNetworkLocation {
  latitude: number;
  city: string;
  longitude: number;
  country: string;

  getIn<K extends keyof ICitybikNetworkLocation>(keyPath: [ K ]): ICitybikNetworkLocation;
  get<K extends keyof ICitybikNetworkLocation>(key: K): ICitybikNetworkLocation[K];
}

export interface ICitybikNetwork {
  company: string;
  href: string;
  location: ICitybikNetworkLocation;
  name: string;
  id: string;
  stations: List<ICitybikStation>;

  getIn<K extends keyof ICitybikNetwork>(keyPath: [ K ]): ICitybikNetwork;
  getIn<K extends keyof ICitybikNetworkLocation>(keyPath: [ 'location', K ]): ICitybikNetworkLocation;
  get<K extends keyof ICitybikNetwork>(key: K): ICitybikNetwork[K];
}
