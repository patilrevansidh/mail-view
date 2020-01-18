import { Button, Col, Layout, Row } from 'antd';
import React from 'react';
import { AntdIcon, PrimaryButton } from '../../../common/components';
import EmailCompose from './email-compose';
import EmailList from './email-list';
import '../styles/dashboard.scss';

// const { TabPane } = Tabs;
const EMAIL_PANELS = [
  { NAME: 'Inbox', KEY: '1', ICON: 'inbox' },
  { NAME: 'Sent', KEY: '2', ICON: 'mail' },
  { NAME: 'Trash', KEY: '3', ICON: 'delete' },
];

class EmailDashboard extends React.PureComponent {

  state = { mode: 'left', activeKey: '1', showCompose: false }

  handleTabChange = (activeKey) => this.setState({ activeKey });

  handleClick = (activeKey) => this.setState({ activeKey });

  handleCompose = () => this.setState({ showCompose: !this.state.showCompose });

  renderTabsDetails = () => {
    const { activeKey } = this.state;
    const emailPanel = EMAIL_PANELS.find((i) => i.KEY === activeKey);
    return <EmailList type={emailPanel.NAME} />;
  }

  render() {
    const { user: { contacts = [] } } = this.props;
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
            <EmailCompose
              contacts={contacts}
              onToggleCompose={this.handleCompose}
              visible={showCompose} />
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default EmailDashboard;