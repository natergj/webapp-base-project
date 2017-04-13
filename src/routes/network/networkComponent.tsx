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

const NetworkComponent = (props: INetworkProps) => {
  const { networkId } = props.match.params;
  const title = props.network ?
    props.network.get('name') :
    networkId;
  return (
    <InitializeWithData initializer={() => props.fetchCitybikNetwork(networkId)}>
      <div className="my-main-page">
        <TitleBar
          title={title}
        />
        <NetworkDetailContainer />
        <NetworkStationsContainer />
      </div>
    </InitializeWithData>
  );
};

export default NetworkComponent;
