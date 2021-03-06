import { Layout } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AuthService } from '../../common/service/authService';
import { onLogin } from './action/auth-action';
import LoginForm from './components/loginForm';
import { withRouter, Redirect } from 'react-router-dom';
import { IMP_KEYS } from '../../common/constants';

class LoginContainer extends Component {

  authService = new AuthService()
  state = { loader: false, serverError: null }

  onLogin = async (payload) => {
    try {
      this.setState({ serverError: null, loader: true });
      const userInfo = await this.authService.login(payload);
      const { login, history } = this.props;
      localStorage.setItem(IMP_KEYS.AUTH_STORAGE_KEYS, true)
      login(userInfo);
      history.push('/');
    } catch (error) {
      console.log('** Error **', error)
      this.setState({ serverError: error, loader: false });
    }
  }

  render() {
    const { user: { isLoggedIn = false } } = this.props;
    const { loader, serverError } = this.state;
    if (isLoggedIn) {
      return <Redirect to='/' />
    }
    return (
      <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>        
        <LoginForm
          loader={loader}
          serverError={serverError}
          onLogin={this.onLogin} />
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatchEvent => {
  return {
    login: payload => dispatchEvent(onLogin(payload))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginContainer));