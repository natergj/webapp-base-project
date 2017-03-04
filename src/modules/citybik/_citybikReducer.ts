import { fromJS, List, Record } from 'immutable';
import {
  IAsyncAction,
} from '../../utils/asyncActions';
import {
  ICityBikState,
  ICitybikStation,
  ICitybikNetwork,
  ICitybikModuleName,
} from './_citybikInterfaces';
import {
  ModuleName,
  SET_CITYBIK_NETWORKS_LIST,
  SET_CURRENT_CITYBIK_NETWORK,
  CURRENT_CITYBIK_NETWORK_LOADING_STATUS_LOADING,
  CURRENT_CITYBIK_NETWORK_LOADING_STATUS_DONE,
  CURRENT_CITYBIK_NETWORK_LOADING_STATUS_ERROR,
  CURRENT_CITYBIK_NETWORK_LOADING_STATUS_UNCAUGHT,
  CITYBIK_NETWORKS_LOADING_STATUS_LOADING,
  CITYBIK_NETWORKS_LOADING_STATUS_DONE,
  CITYBIK_NETWORKS_LOADING_STATUS_ERROR,
  CITYBIK_NETWORKS_LOADING_STATUS_UNCAUGHT,
} from './_citybikConstants';

export const initialState: ICityBikState = fromJS({
  citybikNetworks: [],
  currentNetwork: {},
  currentNetworkLoadingStatus: null,
});

// Selectors
export function getCurrentNetwork(state: ICityBikState): ICitybikNetwork {
  return state.getIn([ ModuleName, 'currentNetwork' ]);
}
export function getCitybikNetworks(state: ICityBikState): List<ICitybikNetwork> {
  return state.getIn([ ModuleName, 'citybikNetworks' ]);
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
