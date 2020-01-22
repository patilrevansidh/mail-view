import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onEmailSend, onEmailDelete, onMarkasRead, onRead } from './action/email-actions';
import EmailComponent from './components/email-dashboard';
import { withRouter } from 'react-router-dom';
import './styles/emai-view.scss';
class EmailContainer extends Component {
  state = { isDetail: false }
  componentDidMount() {
    const { computedMatch: { params = {} } } = this.props;
    if (params.id) {
      this.setState({ isDetail: true });
    }
  }

  handleEmailDetails = (id) => {
    const { onRead, user: { email = '' } } = this.props;
    onRead(email, id)
    this.props.history.push('/email/' + id)
  }

  handleGoBack = () => {
    if (this.state.isDetail) {
      this.props.history.goBack();
    }
  }

  render() {
    const { user = {}, userEmail = {}, onSendEmail, onEmailDelete, onMarkasRead, computedMatch: { params = {} } } = this.props;
    const { isDetail } = this.state;
    return (
      <EmailComponent id={params.id}
        isDetail={isDetail}
        onBackRefresh={this.handleGoBack}
        onView={this.handleEmailDetails}
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
    userEmail: (currentUser && state.email) && state.email[currentUser.email]
      || { sent: [], inbox: [], trash: [] }
  }
}

const mapDispatchToProps = dispatchEvent => {
  return {
    onSendEmail: payload => dispatchEvent(onEmailSend(payload)),
    onEmailDelete: payload => dispatchEvent(onEmailDelete(payload)),
    onMarkasRead: payload => dispatchEvent(onMarkasRead(payload)),
    onRead: (email, id) => dispatchEvent(onRead(email, id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmailContainer));