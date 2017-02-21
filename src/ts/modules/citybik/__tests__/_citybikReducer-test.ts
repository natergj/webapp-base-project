import { expect } from 'chai';
import { fromJS, Map } from 'immutable';
import * as sinon from 'sinon';

import * as CitybikReducer from '../_citybikReducer';
import * as CitybikConstants from '../_citybikConstants';

describe('_citybikReducer', () => {
  let testState: Map<string, any>;

  beforeEach(() => {
    testState = fromJS({
      [CitybikConstants.ModuleName]: CitybikReducer.initialState,
    });
  });
  afterEach(() => {
    testState = undefined;
  });

  it('should return the state\'s value of citybikNetworks when getCitybikNetworks is called', () => {
    const testNetworks = fromJS([ 'testNetwork' ]);
    const newState = testState.merge({ [CitybikConstants.ModuleName]: { citybikNetworks: testNetworks } });
    expect(CitybikReducer.getCitybikNetworks(newState)).to.eql(testNetworks);
  });

  it('should return the state\'s value of currentNetwork when getCurrentNetwork is called', () => {
    const testNetwork = 'testNetwork';
    const newState = testState.merge({ [CitybikConstants.ModuleName]: { currentNetwork: testNetwork } });
    expect(CitybikReducer.getCurrentNetwork(newState)).to.eql(testNetwork);
  });

  it('should return the state\'s value of currentNetworkLoadingStatus when getCurrentNetworkLoadingStatus is called', () => {
    const testCurrentNetworkLoadingStatus = 'LOADING';
    const newState = testState.merge({ [CitybikConstants.ModuleName]: { currentNetworkLoadingStatus: testCurrentNetworkLoadingStatus } });
    expect(CitybikReducer.getCurrentNetworkLoadingStatus(newState)).to.eql(testCurrentNetworkLoadingStatus);
  });
});
