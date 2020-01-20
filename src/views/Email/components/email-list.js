import React, { Component } from 'react';
import { AppTitle } from '../../../common/components';
import { Input, Row, Col, Checkbox } from 'antd';
const { Search } = Input;

class EmailListView extends Component {
  getEmailList = () => {
    const { userEmail = { inbox: [], sent: [], trash: [], }, type = '' } = this.props
    const listType = type.toLowerCase();
    return userEmail[listType] || []
  }
  render() {
    const { type } = this.props;
    const emails = this.getEmailList();
    const title = type + (emails.length && `(${emails.length})`);
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
        <div>
          {
            emails.map((mail, index) => {
              const className = index === 0 ? 'email-first-list-item' : 'email-list-item';
              return <Row className={className}>
                <Col xs={4}>
                  <span>
                    <Checkbox />
                    <span>{mail.name}</span>
                  </span>
                </Col>
                <Col xs={16}>
                  <span>{mail.subject}</span>
                </Col>
              </Row>
            })
          }
        </div>
      </div>
    );
  }
}

export default EmailListView;