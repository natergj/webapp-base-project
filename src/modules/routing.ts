import { Map, fromJS } from 'immutable';
import { LOCATION_CHANGE } from '../shared-components/router-with-redux';

export const ModuleName = 'routing';

const initialState: Map<string, any> = fromJS({
  locationBeforeTransitions: null,
});

export const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOCATION_CHANGE: {
      return state.merge({ locationBeforeTransitions: action.payload });
    }
    default: {
      return state;
    }
  }
};
