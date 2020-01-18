import React from 'react';
import { Button } from 'antd';

export const PrimaryButton = (props) => {
  const { children, rest } = props;
  return <Button {...rest} className='primary-button'>{children}</Button>
}