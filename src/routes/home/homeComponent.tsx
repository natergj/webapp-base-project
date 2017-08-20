import * as Antd from 'antd';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import TitleBar from '../../shared-components/title-bar/title-bar';
import { ICitybikNetwork } from '../../modules/citybik';
import { List } from 'immutable';

interface IMainProps extends RouteComponentProps<any> {
  networks: List<ICitybikNetwork>;
  fetchCitybikNetworks: any;
}

class Main extends React.Component<IMainProps, any> {

  constructor(props: IMainProps) {
    super(props);
    this.getMenuItems = this.getMenuItems.bind(this);
    this.onMenuItemSelect = this.onMenuItemSelect.bind(this);
  }

  public componentDidMount() {
    this.props.fetchCitybikNetworks();
  }

  public render() {
    return (
      <div className="my-main-page">
        <TitleBar
          title="USA Bike Share Networks"
          menuItems={this.getMenuItems()}
          onMenuItemSelect={this.onMenuItemSelect}
        />
        <div className="my-content">
          <h1>Select a city from the title bar menu to view current bike share station statistics.</h1>
          <h2>This project uses the open API provided by
            <a href="https://api.citybik.es/v2/">https://api.citybik.es/v2/</a>
          </h2>
        </div>
      </div>
    );
  }

  private onMenuItemSelect(e: any) {
    const selectedNetwork = this.props.networks.get(e.key);
    this.props.history.push('bikeshare/' + selectedNetwork.get('id'));
  }

  private getMenuItems() {
    if (this.props.networks.size === 0) {
      return [ <div key={0}><Antd.Icon type="loading" /> loading...</div> ];
    }
    const networkArray = this.props.networks.toJS();
    return networkArray.map((network: ICitybikNetwork) => {
      return <div key={network.id}>{network.location.city}</div>;
    });
  }
}

export default Main;
