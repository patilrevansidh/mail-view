import React, { Component } from 'react';
import { AppTitle } from '../../../common/components';
import { Input } from 'antd';
const { Search } = Input;

class EmailListView extends Component {
  render() {
    const { type } = this.props;
    return (
      <div>
        <span>
          <AppTitle title={`${type} (5)`} />
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
    );
  }
}

export default EmailListView;