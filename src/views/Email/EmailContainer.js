import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onEmailSend, onEmailDelete, onMarkasRead } from './action/email-actions';
import EmailComponent from './components/email-dashboard';
class EmailContainer extends Component {

  // handleSendEmail = (payload) => {
  //   this.props.onSendEmail(payload)
  // }

  render() {
    const { user = {}, userEmail = {}, onSendEmail, onEmailDelete, onMarkasRead, } = this.props;
    return (
      <EmailComponent
        onMarkasRead={onMarkasRead}
        onDelete={onEmailDelete}
        userEmail={userEmail}
        onSend={onSendEmail}
        user={user} />
    );
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
    onSendEmail: payload => dispatchEvent(onEmailSend(payload)),
    onEmailDelete: payload => dispatchEvent(onEmailDelete(payload)),
    onMarkasRead: payload => dispatchEvent(onMarkasRead(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailContainer);