import React, { Component } from 'react';
import { AuthService } from '../../common/service/authService';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { onLogin } from './action/auth-action';
import LoginForm from './components/loginForm';

class LoginContainer extends Component {

  authService = new AuthService()
  state = {
    loader: false,
    serverError: null
  }

  onLogin = async (payload) => {
    try {
      const userInfo = this.authService.login(payload)
      console.log('** userInfo **', userInfo)
      this.props.login(userInfo)
    } catch (error) {
      console.log('*****', error)
      this.setState({ serverError: error });
    }
  }
  render() {
    return (
      <Layout style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <LoginForm onLogin={this.onLogin} />
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatchEvent => {
  return {
    login: payload => dispatchEvent(onLogin(payload))
  }
}

export default LoginContainer;
// export default connect(null, mapDispatchToProps)(export default);