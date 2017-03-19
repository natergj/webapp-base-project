import { expect } from 'chai';
import { API_FETCH } from '../../apiMiddleware';

import {
  fetchCitybikNetwork,
} from '../_citybikActionCreators';

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
