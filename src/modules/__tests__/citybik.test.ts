import { expect } from 'chai';
import { API_FETCH } from '../apiMiddleware';
import { List, Map, fromJS } from 'immutable';

import {
  ModuleName,
  fetchCitybikNetwork,
  initialState,
  getCitybikNetworks,
  getCurrentNetwork,
  getCurrentNetworkLoadingStatus,
} from '../citybik';

describe('_citybikActionCreators', () => {

  describe('fetchCitybikNetwork', () => {
    it('should return action with type API_FETCH', () => {
      expect(fetchCitybikNetwork('id').type).to.equal(API_FETCH);
    });

    it('should return payload with url `http://api.citybik.es/v2/networks/${networkId}`,', () => {
      expect(fetchCitybikNetwork('id').payload.url).to.equal('http://api.citybik.es/v2/networks/id');
    });
  });
});

describe('_citybikReducer', () => {
  let testState: Map<string, any>;

  beforeEach(() => {
    testState = Map({
      [ModuleName]: initialState,
    });
  });
  afterEach(() => {
    testState = undefined;
  });

  it('should return the state\'s value of citybikNetworks when getCitybikNetworks is called', () => {
    const testNetworks = fromJS([ 'testNetwork' ]);
    const newState = testState.merge({ [ModuleName]: { citybikNetworks: testNetworks } });
    expect(getCitybikNetworks(newState)).to.eql(testNetworks);
  });

  it('should return an empty List when getCitybikNetworks is called and no networks exist in state', () => {
    expect(getCitybikNetworks(testState)).to.eql(List([]));
  });

  it('should return the state\'s value of currentNetwork when getCurrentNetwork is called', () => {
    const testNetwork = 'testNetwork';
    const newState = testState.merge({ [ModuleName]: { currentNetwork: testNetwork } });
    expect(getCurrentNetwork(newState)).to.eql(testNetwork);
  });

  it('should return an empty Map when getCurrentNetwork is called and no network exists in state', () => {
    expect(getCurrentNetwork(testState)).to.eql(Map({}));
  });

  it('should return the state\'s value of currentNetworkLoadingStatus when getCurrentNetworkLoadingStatus is called', () => {
    const testCurrentNetworkLoadingStatus = 'LOADING';
    const newState = testState.merge({ [ModuleName]: { currentNetworkLoadingStatus: testCurrentNetworkLoadingStatus } });
    expect(getCurrentNetworkLoadingStatus(newState)).to.eql(testCurrentNetworkLoadingStatus);
  });
});
