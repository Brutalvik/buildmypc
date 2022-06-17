import { Drawer } from 'antd';
import { CartDrawerInterface } from '../models/model';
import Cartdata from './Cartdata';
import React, { useEffect, useState } from 'react';
import { Button, Divider, List, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CartInterface } from '../models/model';
import { genericActions } from '../features/parts/genericSlice';
import { DeleteOutlined } from '@ant-design/icons';

const Cart: React.FC<CartDrawerInterface> = ({
  onClose,
  visible,
  addToCart,
  removeFromCart,
  cartData,
  setCart,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { loading, cart, cartQuantity } = state.genericReducer;
  const [renderData, setRenderData] = useState<any[]>([]);

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
        <Cartdata addToCart={addToCart} removeFromCart={removeFromCart} />
      </Drawer>
    </>
  );
};

export default Cart;
