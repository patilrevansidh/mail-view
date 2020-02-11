import { Col, Input, Row } from 'antd';
import React, { Component } from 'react';
import { AntdIcon, AppTitle, DefaultButton } from '../../../common/components';
import { CONSTANTS } from '../../../common/constants/index';
import { EmailListItem, EmailDetailView } from './email-view';
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
    const { onMarkAsRead, isDetail, onBackRefresh } = this.props;
    return <Row className='margin-left-1rem' type="flex" justify="start" align="middle">
      <Col xs={6}>
        <span style={{ display: 'flex' }}>
          <DefaultButton className='margin-right-05rem' onClick={onBackRefresh}> {isDetail ? "Back" : "Refresh"} </DefaultButton>
          <DefaultButton className='margin-right-05rem padding-horizantal-05rem' onClick={this.handleDelete} icon='delete' size={CONSTANTS.DEFAULT} />
          <DefaultButton className='margin-right-05rem padding-horizantal-05rem' onClick={onMarkAsRead} icon='eye' size={CONSTANTS.DEFAULT} />
        </span>
      </Col>
    </Row>
  }

  render() {
    const { type, onSelect, onView, selectedEmails, isDetail, id, activeKey } = this.props;
    const emails = this.getEmailList();
    const title = type + (emails.length > 0 ? ` (${emails.length})` : '');
    const emailDetail = emails.find(i => i.id === id);
    return (
      <div>
        <div className='email-list-header'>
          <span >
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
            !isDetail && emails.map((mail, index) => <EmailListItem
              type={type} activeKey={activeKey}
              isSelected={selectedEmails.includes(mail.id)}
              onView={onView} onSelect={onSelect}
              first={index === 0} mail={mail} />)
            || <EmailDetailView emailDetail={emailDetail} />
          }
        </div>
      </div >
    );
  }
}

export default EmailListView;