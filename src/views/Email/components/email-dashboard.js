import { Col, Layout, Row } from 'antd';
import React from 'react';
import { AntdIcon, PrimaryButton } from '../../../common/components';
import '../styles/dashboard.scss';
import EmailCompose from './email-compose';
import EmailList from './email-list';

// const { TabPane } = Tabs;
const EMAIL_PANELS = [
  { NAME: 'Inbox', KEY: '1', ICON: 'inbox', type:'warning' },
  { NAME: 'Send Mail', KEY: '2', ICON: 'mail' },
  { NAME: 'Important', KEY: '2', ICON: 'star', theme:'filled' },
  { NAME: 'Drafts', KEY: '2', ICON: 'file-text' },
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

  onRead = (id) => {
    const { user: { email = '' } } = this.props;
    const payload = { email, selected: [id] }
    this.props.onMarkasRead(payload);
  }

  renderTabsDetails = () => {
    const { selected = [] } = this.state;
    const { userEmail, onView, isDetail, id, onBackRefresh, user = {}, locationState = {} } = this.props;
    let activeKey = locationState.activeKey || this.state.activeKey

    const emailPanel = EMAIL_PANELS.find((i) => i.KEY === activeKey);
    return <EmailList isDetail={isDetail} id={id}
      onDelete={this.handleDelete}
      onBackRefresh={onBackRefresh}
      onSelect={this.handleSelection}
      onMarkAsRead={this.handleMarkAsRead}
      selectedEmails={selected}
      onRead={this.onRead}
      user={user}
      activeKey={activeKey}
      onView={onView} userEmail={userEmail}
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
              <Col xs={24} md={24} className='list-header-container'>
                FOLDERS
              </Col>
              {
                EMAIL_PANELS.map(item => <Col xs={24} md={24} className='menu-item-container'>
                  <span onClick={() => this.handleClick(item.KEY)} className='email-menu-item'>
                    {item.ICON && <AntdIcon className='menu-icon' size='large' type={item.ICON} theme={item.theme} />}
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