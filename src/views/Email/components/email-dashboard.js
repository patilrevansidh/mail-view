import React from 'react';
import { Layout, Row, Col, Tabs, Icon } from 'antd';
import '../styles/dashboard.scss';

const { TabPane } = Tabs;
const EMAIL_PANELS = [
  { NAME: 'Inbox', KEY: '1', ICON: 'inbox' },
  { NAME: 'Sent', KEY: '2', ICON: 'mail' },
  { NAME: 'Trash', KEY: '3', ICON: 'delete' },
]

class EmailDashboard extends React.PureComponent {

  state = { mode: 'left', activeKey: '1' }

  handleTabChange = (activeKey) => this.setState({ activeKey });

  renderTabsDetails = () => {
    const { activeKey } = this.state;
    switch (activeKey) {
      case '1':
        return 'Inbox';

      case '2':
        return 'Sent';

      case '3':
        return 'Trash'

      default:
        return 'Inbox';
    }
  }

  renderTabs = () => {
    return <Tabs onChange={this.handleTabChange} className='email-sidebar'
      defaultActiveKey='1' tabPosition={this.state.mode}
      style={{ height: '100%', textAlign: 'left' }}>
      {
        EMAIL_PANELS.map(panel => {
          const { ICON, NAME, KEY } = panel;
          const tabName = <span>
            {ICON && <Icon type={ICON} />}
            {NAME}
          </span>;
          return <TabPane tab={tabName} key={KEY}>
            <div className='email-list-conainer'>
              {this.renderTabsDetails()}
            </div>
          </TabPane>
        })
      }
    </Tabs>
  }

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        {this.renderTabs()}
      </Layout>
    );
  }
}

export default EmailDashboard;