import React from 'react';
import { ItemInterface } from '../models/model';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

const Head: React.FC<ItemInterface> = ({ items }: ItemInterface) => {
  return (
    <Header className='header'>
      <div className='logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        // defaultSelectedKeys={['2']}
        items={items}
      />
    </Header>
  );
};

export default Head;
