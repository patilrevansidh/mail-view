import React from 'react';
import { Icon } from 'antd';

function getSize(size) {
  switch (size) {
    case 'size':
      return { fontSize: 12 }
    case 'default':
      return { fontSize: 18 }
    case 'large':
      return { fontSize: 20 }
    default:
      return { fontSize: 18 }
  }
}

export const AntdIcon = (props) => {
  const { type, size, iconStyle, ...rest } = props;
  const style = { ...getSize(size) }
  return (
    <Icon type={type} style={{ ...style, iconStyle }} {...rest} />
  )
}
