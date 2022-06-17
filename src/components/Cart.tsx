import { Button, Drawer } from 'antd';
import React from 'react';
import { CartDrawerInterface } from '../models/model';
import Cartdata from './Cartdata';

const Cart: React.FC<CartDrawerInterface> = ({ onClose, visible }) => {
  console.log(visible);
  return (
    <>
      <Drawer
        title='Cart'
        placement='right'
        onClose={onClose}
        visible={visible}
        keyboard={true}
        size='large'
      >
        <Cartdata />
      </Drawer>
    </>
  );
};

export default Cart;
