import React from 'react';
import { Button } from 'antd';

export const PrimaryButton = (props) => {
  const { children, ...rest } = props;
  return <Button className='primary-button' {...rest}>{children}</Button>
}

export const DefaultButton = (props) => {
  const { children, ...rest } = props;
  return <Button {...rest}>{children}</Button>
}
