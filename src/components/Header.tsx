import React from 'react';
import { AppInterface } from '../models/model';
import { Layout, Menu, MenuProps, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector } from '../app/hooks';

const { Header } = Layout;

const nav: MenuProps['items'] = ['Build PC', 'Order Summary'].map((key) => ({
  key,
  label: `${key}`,
}));

const HeaderData: React.FC<AppInterface> = ({ showDrawer }) => {
  const { cartQuantity } = useAppSelector((state) => state.genericReducer);

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
      <Badge className='cart' count={cartQuantity}>
        <ShoppingCartOutlined onClick={showDrawer} />
      </Badge>
    </Header>
  );
};

export default HeaderData;
