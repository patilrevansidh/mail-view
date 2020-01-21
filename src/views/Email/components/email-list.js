import React, { Component } from 'react';
import { AppTitle, AntdIcon, PrimaryButton } from '../../../common/components';
import { CONSTANTS } from '../../../common/constants/index';
import { EmailListItem } from './email-view';
import { Input, Row, Col, Checkbox } from 'antd';
const { Search } = Input;

class EmailListView extends Component {

  state = { selected: [] }

  getEmailList = () => {
    const { userEmail = { inbox: [], sent: [], trash: [], }, type = '' } = this.props
    const listType = type.toLowerCase();
    return userEmail[listType] || []
  }

  handleDelete = () => {
    const { onDelete, type = '' } = this.props;
    onDelete(type.toLowerCase());
  }

  renderActionButton = () => {
    const { onMarkAsRead } = this.props;
    return <Row type="flex" justify="space-around" align="middle">
      <Col xs={3}>
        <PrimaryButton> Refresh </PrimaryButton>
      </Col>
      <Col xs={10}>
        <span >
          <span className='app-border padding-1rem margin-right-05rem'>
            <AntdIcon onClick={this.handleDelete} type='delete' size={CONSTANTS.DEFAULT} />
          </span>
          <span className='app-border padding-1rem'>
            <AntdIcon onClick={onMarkAsRead} type='eye' size={CONSTANTS.DEFAULT} />
          </span>
        </span>
      </Col>
      <Col xs={8}>
        aslda
      </Col>
    </Row>
  }

  render() {
    const { type, onSelect, onView, selectedEmails } = this.props;
    const emails = this.getEmailList();
    const title = type + (emails.length > 0 ? ` (${emails.length})` : '');
    return (
      <div>
        <div>
          <span className='email-list-header'>
            <AppTitle title={title} />
            <span className='search-container'>
              <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={value => console.log(value)}
              />
            </span>
          </span>
        </div>
        <div >
          {this.renderActionButton()}
        </div>
        <div>
          {
            emails.map((mail, index) => <EmailListItem
              isSelected={selectedEmails.includes(mail.id)}
              onView={onView} onSelect={onSelect}
              first={index === 0} mail={mail} />)
          }
        </div>
      </div >
    );
  }
}

export default EmailListView;