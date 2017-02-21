import * as React from 'react';
import TitleBar from '../../shared-components/title-bar/title-bar';
import { ICitybikNetwork } from '../../modules/citybik';
import { List } from 'immutable';
import { IAsyncAction } from '../../utils/asyncActions';
import { Spin } from 'antd';

import NetworkDetailContainer from './children/_networkDetailContainer';
import NetworkStationsContainer from './children/_networkStationsContainer';

interface INetworkProps {
  network: ICitybikNetwork;
  fetchCitybikNetwork: (networkId: string) => any;
  loadingStatus: IAsyncAction;
  params: any;
}

class NetworkComponent extends React.Component<INetworkProps, any> {
  public componentWillMount() {
    this.props.fetchCitybikNetwork(this.props.params.networkId);
  }

  public render() {
    const title = this.props.network ?
      this.props.network.get('name') :
      this.props.params.networkId;
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
