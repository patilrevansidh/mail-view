import React from 'react';
import { Layout, Menu, Icon, } from 'antd';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import LoginContainer from '../views/Auth/LoginContainer';
import EmailContainer from '../views/Email/EmailContainer';
import { ROUTE_PATH, SIDE_BAR, IMP_KEYS } from '../common/constants/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { connect } from 'react-redux';

const { Header, Sider, Content } = Layout;
export class PrivateRoute extends React.PureComponent {

  state = { collapsed: false }

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  renderSidebar = () => <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
    <div className="logo" />
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      {
        SIDE_BAR.map((item) => {
          const { keyValue, icon, label, children = [] } = item;
          if (children.length) {
            return <Menu.SubMenu
              title={
                <div>
                  <Icon type={icon} />
                  <span className="submenu-title-wrapper">
                    {label}
                  </span>
                </div>
              }>
              {
                children.map(i => {
                  return <Menu.Item key={i.keyValue}>
                    {icon && <Icon type={i.icon} />}
                    <span>{i.label}</span>
                  </Menu.Item>
                })
              }

            </Menu.SubMenu>
          }
          return <Menu.Item key={keyValue}>
            {icon && <Icon type={icon} />}
            <span>{label}</span>
          </Menu.Item>
        })
      }
    </Menu>
  </Sider>;

  renderHeader = () => <Header style={{ background: '#fff', padding: 0 }}>
    <Icon className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
  </Header>;

  render() {
    const isLoggedLocal = localStorage.getItem(IMP_KEYS.AUTH_STORAGE_KEYS);
    const { user: { isLoggedIn = false }, path, component } = this.props
    if (!isLoggedIn) {
      return <Redirect to='/login' />
    }
    const ComponentView = component;

    return (
      <Route
        path={path}
        component={() => {
          return <Layout>
            {this.renderSidebar()}
            {this.renderHeader()}
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <ComponentView {...this.props} />
            </Content>
          </Layout>
        }}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const PrivateRoutes = connect(mapStateToProps)(PrivateRoute);
export class App extends React.PureComponent {
  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router basename={ROUTE_PATH.BASE}>
              <Switch>
                <PrivateRoutes exact path={ROUTE_PATH.BASE} component={EmailContainer} />
                <Route exact path={ROUTE_PATH.AUTH} component={LoginContainer} />
              </Switch>
            </Router>
          </PersistGate>
        </Provider>
      </Layout>
    )
  }
}