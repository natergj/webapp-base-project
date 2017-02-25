import * as React from 'react';
import { List } from 'immutable';
import { Table } from 'antd';
import { ICitybikNetwork, ICitybikStation } from '../../../modules/citybik';

interface INetworkDetailProps {
  network: ICitybikNetwork;
}

export default class NetworkDetailComponent extends React.Component<INetworkDetailProps, {}> {
  public render() {
    const companyName = this.props.network.get('company');
    const numberOfStations = this.props.network.get('stations') ? this.props.network.get('stations').size : 0;
    return (
      <div className="network-details-component">
        <ul>
          <li>
            <ul className="detail-row">
              <li>Operated By:</li>
              <li>{companyName}</li>
            </ul>
            <ul className="detail-row">
              <li>Number of Stations:</li>
              <li>{numberOfStations}</li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}
