import { Button, Col, Layout, Row } from 'antd';
import React from 'react';
import { AntdIcon } from '../../../common/components';
import EmailList from './email-list';
import '../styles/dashboard.scss';

// const { TabPane } = Tabs;
const EMAIL_PANELS = [
  { NAME: 'Inbox', KEY: '1', ICON: 'inbox' },
  { NAME: 'Sent', KEY: '2', ICON: 'mail' },
  { NAME: 'Trash', KEY: '3', ICON: 'delete' },
];

const EMAIL_LIST_TYPE = {
  INBOX: 'Inbox',
  SENT: 'Sent',
  TRASH: 'Trash'
}

class EmailDashboard extends React.PureComponent {

  state = { mode: 'left', activeKey: '1' }

  handleTabChange = (activeKey) => this.setState({ activeKey });

  renderTabsDetails = () => {
    const { activeKey } = this.state;
    switch (activeKey) {
      case '1':
        return <EmailList type={EMAIL_LIST_TYPE.INBOX} />;

      case '2':
        return 'Sent';

      case '3':
        return 'Trash'

      default:
        return 'Inbox';
    }
  }

  handleClick = (activeKey) => this.setState({ activeKey });

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Row className='email-container'>
          <Col xs={4}>
            <Row gutter={[8, 16]}>
              <Col xs={24} md={24} className='compose-button-container'>
                <Button className='compose-button' block='large'>
                  Compose
                </Button>
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
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default EmailDashboard;