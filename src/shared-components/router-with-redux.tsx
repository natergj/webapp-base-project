import { Unsubscribe } from 'redux';
import * as React from 'react';
import PropTypes from 'prop-types'

interface routerWithRedux extends React.Props<any> {
  store?: any,
  history: any,
  children?: PropTypes.node
}

export const LOCATION_CHANGE = '@@routerWithRedux/LOCATION_CHANGE';

export function routerWithRedux<P>(
  Comp: React.ComponentClass<P> | React.StatelessComponent<P>,
): React.ComponentClass<routerWithRedux & P> {
  return class extends React.Component<routerWithRedux & P, {}> {
    store: PropTypes.object;
    unsubscribeFromHistory: PropTypes.object;

    static contextTypes = {
      store: PropTypes.object
    }

    handleLocationChange = location => {
      this.store.dispatch({
        type: LOCATION_CHANGE,
        payload: location
      })
    }

    componentWillMount() {
      const { store:propsStore, history } = this.props
      this.store = propsStore || this.context.store

      this.unsubscribeFromHistory = (history as any).listen(this.handleLocationChange)
      this.handleLocationChange((history as any).location)
    }

    componentWillUnmount() {
      if (this.unsubscribeFromHistory) this.unsubscribeFromHistory()
    }

    render() {
      return <Comp {...this.props} />;
    }
  };
}