import { Drawer } from 'antd';
import { AppInterface } from '../models/model';
import Cartdata from './Cartdata';
import React from 'react';

const Cart: React.FC<AppInterface> = ({
  onclose,
  visible,
  addtocart,
  removefromcart,
  deletefromcart,
}) => {
  return (
    <>
      <Drawer
        title='Cart'
        placement='right'
        onClose={onclose}
        visible={visible}
        keyboard={true}
        size='large'
      >
        <Cartdata
          addtocart={addtocart}
          removefromcart={removefromcart}
          deletefromcart={deletefromcart}
          onclose={onclose}
        />
      </Drawer>
    </>
  );
};

export default Cart;
