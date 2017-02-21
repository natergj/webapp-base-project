import { expect } from 'chai';
import { fromJS, Map } from 'immutable';
import * as sinon from 'sinon';

// Attach dummy fetch to window so it can be stubbed out.
const globalAny: any = global;
const window = globalAny.window;
window.fetch = (): any => null;

import * as CitybikActionCreators from '../_citybikActionCreators';
import * as CitybikActions from '../_citybikActions';
import * as CitybikConstants from '../_citybikConstants';

describe('_citybikActionCreators', () => {
  let sandbox: any;
  let dispatchEvents: any[];
  let dispatch: any;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(window, 'fetch');
    dispatchEvents = [];
    dispatch = (action: any) => {
      dispatchEvents.push(action);
    };
    window.fetch.returns(Promise.resolve({ status: 200, json: { network: 'testNetwork' } }));
  });
  afterEach(() => {
    sandbox.restore();
    sandbox = undefined;
    dispatchEvents = undefined;
    dispatch = undefined;
  });

  describe('fetchCitybikNetwork', () => {
    it('should call setCurrentCitybikNetworkLoadingStatus with LOADING status as first dispatch', () => {
      const setLoadingStatusStub = sandbox.stub(CitybikActions, 'setCurrentCitybikNetworkLoadingStatus', (status: string) => status);
      const thunk = CitybikActionCreators.fetchCitybikNetwork('networkID');
      thunk(dispatch);
      expect(setLoadingStatusStub.getCall(0).calledWith('LOADING')).to.be.true;
    });

    it('should dispatch as action with type SET_CURRENT_CITYBIK_NETWORK as dispatch on successful fetch', () => {
      // Todo.  Figure out how to test dispatchs that occur after successful fetch.
    });
  });
});
