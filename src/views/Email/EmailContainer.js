import React, { Component } from 'react';
import EmailComponent from './components/email-dashboard';
import { onEmailSend } from './action/email-actions';
import { connect } from 'react-redux';
class EmailContainer extends Component {

  handleSendEmail = (payload) => {
    this.props.onSendEmail(payload)
  }

  render() {
    const { user } = this.props;
    return (
      <EmailComponent
        onSend={this.handleSendEmail}
        user={user} />
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
    onSendEmail: payload => dispatchEvent(onEmailSend(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer);