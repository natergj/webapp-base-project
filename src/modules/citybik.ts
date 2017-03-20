import { Map, List } from 'immutable';
import { IAsyncAction } from '../utils/asyncActions';
import { API_FETCH } from './apiMiddleware';
import { push } from 'react-router-redux';

export type ICitybikModuleName = 'citybik';

type PartialState = Partial<ICityBikState>;

export interface ICityBikState extends Map<string, any> {
  get(key: 'citybikNetworks'): List<ICitybikNetwork> | null;
  get(key: 'citybikNetwork'): ICitybikNetwork | null;
  get(key: 'currentNetworkLoadingStatus'): IAsyncAction | null;

  set(key: 'citybikNetworks', value: List<ICitybikNetwork> | null): ICityBikState;
  set(key: 'citybikNetwork', value: ICitybikNetwork | null): ICityBikState;
  set(key: 'currentNetworkLoadingStatus', value: IAsyncAction | null): ICityBikState;
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


export const ModuleName: ICitybikModuleName = 'citybik';

export const SET_CITYBIK_NETWORKS_LIST = 'module/citybik/SET_CITYBIK_NETWORKS_LIST';
export const SET_CURRENT_CITYBIK_NETWORK = 'module/citybik/SET_CURRENT_CITYBIK_NETWORK';
export const CURRENT_CITYBIK_NETWORK_LOADING_STATUS_LOADING = 'module/citybik/CURRENT_CITYBIK_NETWORK_LOADING_STATUS_LOADING';
export const CURRENT_CITYBIK_NETWORK_LOADING_STATUS_DONE = 'module/citybik/CURRENT_CITYBIK_NETWORK_LOADING_STATUS_DONE';
export const CURRENT_CITYBIK_NETWORK_LOADING_STATUS_ERROR = 'module/citybik/CURRENT_CITYBIK_NETWORK_LOADING_STATUS_ERROR';
export const CURRENT_CITYBIK_NETWORK_LOADING_STATUS_UNCAUGHT = 'module/citybik/CURRENT_CITYBIK_NETWORK_LOADING_STATUS_UNCAUGHT';
export const CITYBIK_NETWORKS_LOADING_STATUS_LOADING = 'module/citybik/CITYBIK_NETWORKS_LOADING_STATUS_LOADING';
export const CITYBIK_NETWORKS_LOADING_STATUS_DONE = 'module/citybik/CITYBIK_NETWORKS_LOADING_STATUS_DONE';
export const CITYBIK_NETWORKS_LOADING_STATUS_ERROR = 'module/citybik/CITYBIK_NETWORKS_LOADING_STATUS_ERROR';
export const CITYBIK_NETWORKS_LOADING_STATUS_UNCAUGHT = 'module/citybik/CITYBIK_NETWORKS_LOADING_STATUS_UNCAUGHT';

export const initialState: ICityBikState = Map({
  citybikNetworks: null,
  currentNetwork: null,
  currentNetworkLoadingStatus: null,
});

// Selectors
export function getCurrentNetwork(state: any): ICitybikNetwork {
  return state.getIn([ ModuleName, 'currentNetwork' ]) || Map({});
}
export function getCitybikNetworks(state: any): List<ICitybikNetwork> {
  return state.getIn([ ModuleName, 'citybikNetworks' ]) || List([]);
}
export function getCurrentNetworkLoadingStatus(state: any): IAsyncAction {
  return state.getIn([ ModuleName, 'currentNetworkLoadingStatus' ]);
}

// Reducer
export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    default: {
      return state;
    }
    case SET_CITYBIK_NETWORKS_LIST: {
      return state.merge({ citybikNetworks: action.payload });
    }
    case CITYBIK_NETWORKS_LOADING_STATUS_LOADING: {
      return state.merge({ currentNetworkLoadingStatus: 'LOADING' });
    }
    case CITYBIK_NETWORKS_LOADING_STATUS_DONE: {
      const usNetworks = action.payload.networks
        .filter((network: any) => {
          return network.location && network.location.country === 'US';
        })
        .sort((a: any, b: any) => {
          return a.location.city.localeCompare(b.location.city);
        });

      return state.merge({
        citybikNetworks: usNetworks,
      });
    }
    case CITYBIK_NETWORKS_LOADING_STATUS_ERROR: {
      return state.merge({ currentNetworkLoadingStatus: 'ERROR' });
    }
    case CITYBIK_NETWORKS_LOADING_STATUS_UNCAUGHT: {
      return state.merge({ currentNetworkLoadingStatus: 'ERROR' });
    }
    case CURRENT_CITYBIK_NETWORK_LOADING_STATUS_LOADING: {
      return state.merge({ currentNetworkLoadingStatus: 'LOADING' });
    }
    case CURRENT_CITYBIK_NETWORK_LOADING_STATUS_DONE: {
      return state.merge({
        currentNetwork: action.payload.network,
        currentNetworkLoadingStatus: 'DONE',
      });
    }
    case CURRENT_CITYBIK_NETWORK_LOADING_STATUS_ERROR: {
      return state.merge({ currentNetworkLoadingStatus: 'ERROR' });
    }
    case CURRENT_CITYBIK_NETWORK_LOADING_STATUS_UNCAUGHT: {
      return state.merge({ currentNetworkLoadingStatus: 'ERROR' });
    }
  }
};

export function fetchCitybikNetworks() {
  return {
    type: API_FETCH,
    payload: {
      url: 'http://api.citybik.es/v2/networks',
      startActionType: CITYBIK_NETWORKS_LOADING_STATUS_LOADING,
      successActionType: CITYBIK_NETWORKS_LOADING_STATUS_DONE,
      errorActionType: CITYBIK_NETWORKS_LOADING_STATUS_ERROR,
      uncaughtErrorActionType: CITYBIK_NETWORKS_LOADING_STATUS_UNCAUGHT,
    },
  };
}

export function fetchCitybikNetwork(networkId: string) {
  return {
    type: API_FETCH,
    payload: {
      url: `http://api.citybik.es/v2/networks/${networkId}`,
      startActionType: CURRENT_CITYBIK_NETWORK_LOADING_STATUS_LOADING,
      successActionType: CURRENT_CITYBIK_NETWORK_LOADING_STATUS_DONE,
      errorActionType: CURRENT_CITYBIK_NETWORK_LOADING_STATUS_ERROR,
      uncaughtErrorActionType: CURRENT_CITYBIK_NETWORK_LOADING_STATUS_UNCAUGHT,
    },
  };
}

export function goToCitybikNetwork(networkId: string) {
  return push(networkId);
}
