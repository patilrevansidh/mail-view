import React, { Component } from 'react';
import EmailComponent from './components/email-dashboard';
import { connect } from 'react-redux';

class EmailContainer extends Component {
  render() {
    const { user } = this.props;    
    return (
      <EmailComponent user={user} />
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(EmailContainer);