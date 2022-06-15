import React from 'react';
import { ItemInterface } from '../models/model';
import { Layout, Menu } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header } = Layout;

const nav: MenuProps['items'] = ['Build PC', 'Pre-Built PC', 'Laptops'].map(
  (key) => ({
    key,
    label: `${key}`,
  })
);

const HeaderData: React.FC<ItemInterface> = ({ items }: ItemInterface) => {
  return (
    <Header className='header'>
      <div className='logo'>
        <h1>Build IT</h1>
      </div>
      <Menu
        theme='dark'
        mode='horizontal'
        style={{ fontWeight: 'bolder' }}
        items={nav}
      />
      <ShoppingCartOutlined className='cart' />
    </Header>
  );
};

export default HeaderData;
