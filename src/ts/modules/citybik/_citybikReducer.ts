import { fromJS, List } from 'immutable';
import {
  IAsyncAction
} from '../../utils/asyncActions';
import {
  ICitybikStation,
  ICitybikNetwork,
} from './_citybikInterfaces';
import {
  ModuleName,
  SET_CITYBIK_NETWORKS_LIST,
  SET_CURRENT_CITYBIK_NETWORK,
  SET_CURRENT_CITYBIK_NETWORK_LOADING_STATUS,
} from './_citybikConstants';

export const initialState = fromJS({
  citybikNetworks: [],
  currentNetwork: {},
  currentNetworkLoadingStatus: null,
});

// Selectors
export function getCurrentNetwork(state: any): ICitybikNetwork {
  return state.getIn([ ModuleName, 'currentNetwork' ]);
}
export function getCitybikNetworks(state: any): List<ICitybikNetwork> {
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
