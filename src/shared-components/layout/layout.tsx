import * as React from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import Main from '../../routes/home/homeContainer';
import NetworkContainer from '../../routes/network/networkContainer';
import './layout.scss';

export default class AppLayout extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      mode: 'inline',
    };
  }

  public render() {
    return (
      <Layout className="layout">
        <Sider collapsible={true} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu mode="inline" theme="dark" className="left-nav">
            <Menu.Item key="1">
              <NavLink to="/bikeshare"><span><Icon type="user" /><span className="nav-text">Bike Share Networks</span></span></NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Content>
          <Route exact={true} path="/bikeshare/" component={Main} />
          <Route path="/bikeshare/:networkId" component={NetworkContainer} />
        </Content>
      </Layout>
    );
  }

  private onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline',
    });
  }
}
