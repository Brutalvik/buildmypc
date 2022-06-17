import { Drawer } from 'antd';
import { AppInterface } from '../models/model';
import Cartdata from './Cartdata';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';

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
        />
      </Drawer>
    </>
  );
};

export default Cart;
