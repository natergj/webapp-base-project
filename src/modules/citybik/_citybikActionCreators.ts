import { push } from 'react-router-redux';
import {
  SET_CITYBIK_NETWORKS_LIST,
  SET_CURRENT_CITYBIK_NETWORK,
  SET_CURRENT_CITYBIK_NETWORK_LOADING_STATUS,
} from './_citybikConstants';
import {
  setCurrentCitybikNetworkLoadingStatus,
} from './_citybikActions';

export function fetchCitybikNetworks() {
  return (dispatch: any) => {
    window.fetch('http://api.citybik.es/v2/networks', {
      method: 'GET',
    })
    .then(handleResponse)
    .then((data: any) => {
      const usNetworks = data.networks
      .filter((network: any) => {
        return network.location && network.location.country === 'US';
      })
      .sort((a: any, b: any) => {
        return a.location.city.localeCompare(b.location.city);
      });
      dispatch({ type: SET_CITYBIK_NETWORKS_LIST, payload: usNetworks });
    })
    .catch((e: any) => {
      console.error(e);
    });
  };
}

export function fetchCitybikNetwork(networkId: string) {
  return (dispatch: any) => {
    dispatch(setCurrentCitybikNetworkLoadingStatus('LOADING'));
    window.fetch(`http://api.citybik.es/v2/networks/${networkId}`)
    .then(handleResponse)
    .then((data) => {
      dispatch({ type: SET_CURRENT_CITYBIK_NETWORK, payload: data.network });
      dispatch(setCurrentCitybikNetworkLoadingStatus('DONE'));
    });
  };
}

export function goToCitybikNetwork(networkId: string) {
  return (dispatch: any) => {
    dispatch(push(networkId));
  };
}

const handleResponse = (response: any) => {
  switch (response.status) {
    case 200:
      return response.json();
    default:
      throw Error('Unhandled error code from networks request.');
  }
};
