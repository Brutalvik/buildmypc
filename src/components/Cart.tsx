import { Button, Drawer } from 'antd';
import React from 'react';
import { CartDrawerInterface } from '../models/model';

const Cart: React.FC<CartDrawerInterface> = ({ onClose, visible }) => {
  return (
    <>
      <Drawer
        title='Cart'
        placement='right'
        onClose={onClose}
        visible={visible}
        keyboard={true}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <Button type='primary'>Pay</Button>
      </Drawer>
    </>
  );
};

export default Cart;
