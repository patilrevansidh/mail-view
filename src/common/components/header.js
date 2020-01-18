import React from 'react';
import '../styles/header.scss';

export const AppTitle = (props) => {
  const { title } = props;
  return <span className='header-title'>{title}</span>
}