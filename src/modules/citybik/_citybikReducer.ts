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
  SET_CURRENT_CITYBIK_NETWORK_LOADING_STATUS,
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
    case SET_CURRENT_CITYBIK_NETWORK: {
      return state.merge({ currentNetwork: action.payload });
    }
    case SET_CITYBIK_NETWORKS_LIST: {
      return state.merge({ citybikNetworks: action.payload });
    }
    case SET_CURRENT_CITYBIK_NETWORK_LOADING_STATUS: {
      return state.merge({ currentNetworkLoadingStatus: action.payload });
    }
  }
};
