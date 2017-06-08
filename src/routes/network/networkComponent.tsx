import * as React from 'react';
import TitleBar from '../../shared-components/title-bar/title-bar';
import { ICitybikNetwork } from '../../modules/citybik';
import { List } from 'immutable';
import { IAsyncAction } from '../../utils/asyncActions';
import { Spin } from 'antd';
import InitializeWithData from '../../shared-components/initialize-with-data/initialize-with-data';

import NetworkDetailContainer from './descendants/_networkDetailContainer';
import NetworkStationsContainer from './descendants/_networkStationsContainer';

interface INetworkProps {
  network: ICitybikNetwork;
  fetchCitybikNetwork: (networkId: string) => any;
  loadingStatus: IAsyncAction;
  match: any;
}

class NetworkComponent extends React.Component<INetworkProps, {}> {

  public componentDidMount() {
    const { networkId } = this.props.match.params;
    this.props.fetchCitybikNetwork(networkId);
  }

  public componentWillReceiveProps(nextProps) {
    const networkId = this.props.match.params.networkId;
    const nextNetworkId = nextProps.match.params.networkId;
    if (networkId !== nextNetworkId) {
      this.props.fetchCitybikNetwork(nextNetworkId);
    }
  }

  public render() {
    const { networkId } = this.props.match.params;
    const title = this.props.network ?
      this.props.network.get('name') :
      networkId;

    return (
      <div className="my-main-page">
        <TitleBar
          title={title}
        />
        <NetworkDetailContainer />
        <NetworkStationsContainer />
      </div>
    );
  }

}

export default NetworkComponent;
