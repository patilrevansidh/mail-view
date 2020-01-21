import React, { Component } from 'react';
import { AppTitle, AntdIcon } from '../../../common/components';
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

  renderActionButton = () => {
    return <Row>
      <Col xs={6}>
      </Col>
      <Col xs={10}>
        <span>
          <AntdIcon type='delete' size={CONSTANTS.DEFAULT} />
          <AntdIcon type='eye' size={CONSTANTS.DEFAULT} />
        </span>
      </Col>
      <Col xs={8}>
      </Col>
    </Row>
  }

  render() {
    const { type } = this.props;
    const emails = this.getEmailList();
    const title = type + (emails.length > 0 ? ` (${emails.length})` : '');
    return (
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
        {this.renderActionButton()}
        <div>
          {
            emails.map((mail, index) => <EmailListItem first={index === 0} mail={mail} />)
          }
        </div>
      </div>
    );
  }
}

export default EmailListView;