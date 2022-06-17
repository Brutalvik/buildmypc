import { Drawer } from 'antd';
import { AppInterface } from '../models/model';
import Cartdata from './Cartdata';
import React from 'react';

const Cart: React.FC<AppInterface> = ({
  onClose,
  visible,
  addToCart,
  removeFromCart,
  deleteFromCart,
}) => {
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
        <Cartdata
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
          onClose={onClose}
        />
      </Drawer>
    </>
  );
};

export default Cart;
