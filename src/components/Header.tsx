import React from 'react';
import { ItemInterface } from '../models/model';
import { Layout, Menu } from 'antd';
import Logo from '../assets/buildit.png';
const { Header } = Layout;

const HeaderData: React.FC<ItemInterface> = ({ items }: ItemInterface) => {
  return (
    <Header className='header'>
      <div className='logo'>
        <h1>Build IT</h1>
      </div>
      <Menu
        theme='dark'
        mode='horizontal'
        // defaultSelectedKeys={['2']}
        items={items}
      />
    </Header>
  );
};

export default HeaderData;
