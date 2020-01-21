import { Col, Layout, Row } from 'antd';
import React from 'react';
import { AntdIcon, PrimaryButton } from '../../../common/components';
import '../styles/dashboard.scss';
import EmailCompose from './email-compose';
import EmailList from './email-list';

// const { TabPane } = Tabs;
const EMAIL_PANELS = [
  { NAME: 'Inbox', KEY: '1', ICON: 'inbox' },
  { NAME: 'Sent', KEY: '2', ICON: 'mail' },
  { NAME: 'Trash', KEY: '3', ICON: 'delete' },
];

class EmailDashboard extends React.PureComponent {

  state = { mode: 'left', activeKey: '1', showCompose: false, selected: [] }

  handleTabChange = (activeKey) => this.setState({ activeKey });

  handleClick = (activeKey) => this.setState({ activeKey });

  handleCompose = () => this.setState({ showCompose: !this.state.showCompose });

  handleSend = (payload) => {
    this.handleCompose()
    this.props.onSend(payload)
  }
  handleDelete = (type) => {
    const { user: { email = '' } } = this.props;
    const payload = { email, type, selected: this.state.selected }
    this.props.onDelete(payload);
    this.setState({ selected: [] });
  }

  handleMarkAsRead = () => {
    const { user: { email = '' } } = this.props;
    const payload = { email, selected: this.state.selected }
    this.props.onMarkasRead(payload);
    this.setState({ selected: [] });
  }

  handleSelection = (id) => {
    let { selected = [] } = this.state;
    if (selected.includes(id)) {
      selected = selected.filter(i => i !== id);
      this.setState({ selected });
      return;
    }
    this.setState({ selected: [...selected, id] });
  }

  renderTabsDetails = () => {
    const { activeKey, selected = [] } = this.state;
    const { userEmail } = this.props;
    const emailPanel = EMAIL_PANELS.find((i) => i.KEY === activeKey);
    return <EmailList
      selectedEmails={selected}
      onView={this.handleView}
      onSelect={this.handleSelection}
      onDelete={this.handleDelete}
      onMarkAsRead={this.handleMarkAsRead}
      userEmail={userEmail}
      type={emailPanel.NAME} />;
  }

  render() {
    const { user: { contacts = [], email = '' } } = this.props;
    const { showCompose } = this.state;
    return (
      <Layout style={{ height: '100%' }}>
        <Row className='email-container'>
          <Col xs={4}>
            <Row gutter={[8, 16]}>
              <Col xs={24} md={24} className='compose-button-container'>
                <PrimaryButton onClick={this.handleCompose} className='compose-button' block='large'>Compose Mail</PrimaryButton>
              </Col>
              {
                EMAIL_PANELS.map(item => <Col xs={24} md={24} className='menu-item-container'>
                  <span onClick={() => this.handleClick(item.KEY)} className='email-menu-item'>
                    {item.ICON && <AntdIcon className='menu-icon' size='large' type={item.ICON} />}
                    <span className='menu-item-label'>{item.NAME}</span>
                  </span>
                </Col>)
              }
            </Row>
          </Col>
          <Col xs={20} className='email-list-container'>
            {this.renderTabsDetails()}
            {
              showCompose && <EmailCompose
                onSend={this.handleSend}
                from={email}
                contacts={contacts}
                onToggleCompose={this.handleCompose}
                visible={showCompose} />
            }
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default EmailDashboard;