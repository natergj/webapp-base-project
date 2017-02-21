import { expect } from 'chai';
import { shallow } from 'enzyme';
import * as sinon from 'sinon';
import * as React from 'react';
import { fromJS } from 'immutable';

import Home from './homeComponent';

describe('Home', () => {
  const testProps = {
    fetchCitybikNetworks: sinon.stub(),
    goToCitybikNetwork: sinon.stub(),
    networks: fromJS([]),
  };

  it('should have a test', () => {
    const wrapper = shallow(<Home {...testProps} />);
    expect(wrapper).to.exist;
  });
});
