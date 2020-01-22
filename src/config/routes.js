import React from 'react';
import { Layout, Menu, Icon, Badge, Avatar, } from 'antd';
import { HashRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import LoginContainer from '../views/Auth/LoginContainer';
import EmailContainer from '../views/Email/EmailContainer';
import { ROUTE_PATH, SIDE_BAR, CONSTANTS } from '../common/constants/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { connect } from 'react-redux';
import { AntdIcon } from '../common/components'
import '../common/styles/layout.scss'
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

  renderSidebar = (name) => <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
    <div className="logo" />
    <div className='user-profile'>
      <Avatar size='large' icon='user' />
      <div className='name'>{name}</div>
    </div>
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      {
        SIDE_BAR.map((item) => {
          const { keyValue, icon, label, children = [] } = item;
          if (children.length) {
            return <Menu.SubMenu
              title={
                <div>
                  <AntdIcon type={icon} />
                  <span className="submenu-title-wrapper">
                    {label}
                  </span>
                </div>
              }>
              {
                children.map(i => {
                  return <Menu.Item key={i.keyValue}>
                    {icon && <AntdIcon type={i.icon} />}
                    <span>{i.label}</span>
                  </Menu.Item>
                })
              }

            </Menu.SubMenu>
          }
          return <Menu.Item key={keyValue}>
            {icon && <AntdIcon type={icon} />}
            <span>{label}</span>
          </Menu.Item>
        })
      }
    </Menu>
  </Sider>;

  renderHeader = () => {
    const { userEmail } = this.props;
    const unreadMails = userEmail.inbox.filter(i => !i.read).length;
    return <Header style={{ background: '#fff', paddingLeft: 24 }}>
      <AntdIcon size={CONSTANTS.LARGE} type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle} />
      <span style={{ float: 'right' }}>
        <Badge count={unreadMails}>
          <AntdIcon size={CONSTANTS.DEFAULT} type='mail' />
        </Badge>
        <span style={{ paddingLeft: '1.5rem', cursor: 'pointer' }} onClick={this.handleLogout} >
          <AntdIcon type="logout" size={CONSTANTS.DEFAULT} /> Log out
      </span>
      </span>
    </Header>;
  }

  render() {
    const { user: { isLoggedIn = false, name = '' }, path, component } = this.props
    if (!isLoggedIn) {
      return <Redirect to='/login' />
    }
    const ComponentView = component;

    return (
      <Route
        path={path}
        component={() => {
          return <Layout>
            {this.renderSidebar(name)}
            <div className='full-width'>
              {this.renderHeader()}
              <Content className='content-view'>
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
      <Layout className='full-height'>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router basename={ROUTE_PATH.BASE}>
              <Switch>
                <PrivateRoutes exact path={ROUTE_PATH.EMAIL_DETAIL} component={EmailContainer} />
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
  const currentUser = state.user || {};
  return {
    user: currentUser,
    userEmail: (currentUser && state.email) && state.email[currentUser.email] || { sent: [], inbox: [], trash: [] }
  }
}
const mapDispatchToProps = dispatchEvent => {
  return {
    onLogOut: () => dispatchEvent(onLogOut())
  }
}

const PrivateRoutes = connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
