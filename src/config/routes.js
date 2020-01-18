import React from 'react';
import { Layout, Menu, Icon, Badge, } from 'antd';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import LoginContainer from '../views/Auth/LoginContainer';
import EmailContainer from '../views/Email/EmailContainer';
import { ROUTE_PATH, SIDE_BAR, CONSTANTS } from '../common/constants/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { connect } from 'react-redux';
import { AntdIcon } from '../common/components'
import { onLogOut } from '../views/Auth/action/auth-action';

const { Header, Sider, Content } = Layout;
export class PrivateRoute extends React.PureComponent {

  state = { collapsed: false }

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  handleLogout = () => {
    this.props.onLogOut()
  }

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

  renderHeader = () => <Header style={{ background: '#fff', paddingLeft: 24 }}>
    <AntdIcon size={CONSTANTS.LARGE} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
    <span style={{ float: 'right' }}>
      <Badge count={5}>
        <AntdIcon size={CONSTANTS.DEFAULT} type='mail' />
      </Badge>
      <span style={{ paddingLeft: '1.5rem', cursor: 'pointer' }} onClick={this.handleLogout} >
        <AntdIcon type="logout" size={CONSTANTS.DEFAULT} /> Log out
      </span>
    </span>
  </Header>;

  render() {
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
            <div style={{ width: '100%' }}>
              {this.renderHeader()}

              <Content style={{ height: '85%' }}>
                <ComponentView {...this.props} />
              </Content>
            </div>
          </Layout>
        }}
      />
    )
  }
}

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

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatchEvent => {
  return {
    onLogOut: () => dispatchEvent(onLogOut())
  }
}

const PrivateRoutes = connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
