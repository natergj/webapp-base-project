import * as React from 'react';
import { List } from 'immutable';
import { Table } from 'antd';
import { ICitybikNetwork, ICitybikStation } from '../../../modules/citybik';

interface INetworkStationsProps {
  network: ICitybikNetwork;
}

export default class NetworkStationsComponent extends React.Component<INetworkStationsProps, {}> {

  public render() {
    const stations = this.props.network.get('stations');
    const dataSource = stations ? stations.toJS().sort(this.stationSorter) : [];

    const columns = [
      {
        title: 'Station',
        dataIndex: 'name',
        key: 'name',
        sorter: this.stationSorter,
        width: '50%',
      },
      {
        title: 'Free Bikes',
        dataIndex: 'free_bikes',
        key: 'free_bikes',
        width: '25%',
      },
      {
        title: 'Empty Slots',
        dataIndex: 'empty_slots',
        key: 'empty_slots',
        width: '25%',
      },
    ];
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }

  private stationSorter(a: ICitybikStation, b: ICitybikStation) {
    return a.name.localeCompare(b.name);
  }
}
