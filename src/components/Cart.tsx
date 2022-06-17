import { Button, Drawer } from 'antd';
import React from 'react';
import { CartDrawerInterface } from '../models/model';
import Cartdata from './Cartdata';

const Cart: React.FC<CartDrawerInterface> = ({ onClose, visible }) => {
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
        <div style={{ float: 'right' }}>
          <Button type='primary' shape='round' size='large'>
            Pay
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
