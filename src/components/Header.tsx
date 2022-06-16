import React, { useState } from 'react';
import { ItemInterface } from '../models/model';
import { Layout, Menu, MenuProps, Badge, Drawer } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Cart from './Cart';

const { Header } = Layout;

const nav: MenuProps['items'] = ['Build PC', 'Pre-Built PC', 'Laptops'].map(
  (key) => ({
    key,
    label: `${key}`,
  })
);

const HeaderData: React.FC<ItemInterface> = ({ items }: ItemInterface) => {
  const { cartQuantity } = useAppSelector((state) => state.genericReducer);
  const [visible, setVisible] = useState<boolean>(false);

  const onClose = () => {
    setVisible(false);
  };

  const showDrawer = () => {
    setVisible(true);
  };

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
        <Cart visible={visible} onClose={onClose} />
      </Badge>
    </Header>
  );
};

export default HeaderData;
