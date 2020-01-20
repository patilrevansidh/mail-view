import React, { Component } from 'react';
import EmailComponent from './components/email-dashboard';
import { onEmailSend } from './action/email-actions';
import { connect } from 'react-redux';
import MailListing from './components/email-list';
class EmailContainer extends Component {

  handleSendEmail = (payload) => {
    this.props.onSendEmail(payload)
  }

  render() {
    const { user = {}, userEmail = {} } = this.props;
    return (
      <EmailComponent
        userEmail={userEmail}
        onSend={this.handleSendEmail}
        user={user} />
    );
  }
}

const mapStateToProps = state => {
  const currentUser = state.user || {};
  console.log('***',state.email[currentUser.mail])
  return {
    user: currentUser,
    userEmail: (currentUser && state.email) && state.email[currentUser.email] || { sent: [], inbox: [], trash: [] }
  }
}

const mapDispatchToProps = dispatchEvent => {
  return {
    onSendEmail: payload => dispatchEvent(onEmailSend(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer);