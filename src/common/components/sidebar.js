import { Icon, Layout, Menu } from 'antd';
import React from 'react';
const { Header, Sider, Content } = Layout;

export default class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}
