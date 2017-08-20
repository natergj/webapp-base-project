import { assert } from 'chai';
import { shallow } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import { fromJS } from 'immutable';
import { match } from 'react-router';
import * as H from 'history';

import Home from './homeComponent';

const mockMatch = {
  params: {},
};
const mockLocation = {};
const mockHistory = {};

describe('Home', () => {
  const testProps = {
    fetchCitybikNetworks: sinon.stub(),
    goToCitybikNetwork: sinon.stub(),
    networks: fromJS([]),
    match: mockMatch as match<any>,
    location: mockLocation as H.Location,
    history: mockHistory as H.History,
  };

  it('should have a test', () => {
    const wrapper = shallow(<Home {...testProps} />);
    assert.exists(wrapper);
  });
});
