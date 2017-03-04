import { push } from 'react-router-redux';
import {
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
import { API_FETCH } from '../apiMiddleware';

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
