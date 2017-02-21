import {
  Icon,
  Button,
  Dropdown,
  Menu,
} from 'antd';
import * as React from 'react';

export interface TitleBarProps extends React.Props<any> {
  title: string;
  menuIcon?: string;
  menuItems?: Array<string | JSX.Element>;
  onMenuItemSelect?: (params: any) => void;
  'data-test'?: string;
}

class TitleBar extends React.Component<TitleBarProps, {}> {
  constructor(props: TitleBarProps) {
    super(props);
    this.renderMenuItems = this.renderMenuItems.bind(this);
  }

  public render() {
    return (
      <h1 className="my-common-title-bar" data-test={this.props['data-test']}>
        <span className="my-common-title-bar-text">{this.props.title}</span>
        {this.props.children}
        {this.renderMenuItems()}
      </h1>
    );
  }

  private renderMenuItems() {
    if (!this.props.menuItems || this.props.menuItems.length === 0) {
      return null;
    }
    const menuItems = this.props.menuItems.map((item: any, index: number) => {
      return <Menu.Item key={index}>{item}</Menu.Item>;
    });
    const menu = (
      <Menu onClick={this.props.onMenuItemSelect} className="my-common-title-bar-menu" >
        {menuItems}
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <Icon type={this.props.menuIcon ? this.props.menuIcon : 'bars'} className="my-commom-title-bar-dropdown" />
      </Dropdown>
    );
  }
}

export default TitleBar;
