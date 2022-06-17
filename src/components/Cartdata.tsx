import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import Item from 'antd/lib/list/Item';
import { genericActions } from '../features/parts/genericSlice';

const Cartdata: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { error, types, part, loading, cart, cartQuantity } =
    state.genericReducer;
  const [renderData, setRenderData] = useState<any[]>([]);
  const [newCart, setNewCart] = useState<any>([]);

  const handleIncrementQuantity = (event: any) => {
    console.log('hadleincrement');
  };

  const handleDecrementQuantity = (event: any) => {
    const itemExists = cart?.map((item: any) => item.id === event.id);
    console.log('handledecrement');
  };

  useEffect(() => {
    setRenderData(cart);
  }, [cart]);

  return (
    <List
      loading={loading}
      itemLayout='horizontal'
      size='default'
      dataSource={renderData}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              key={item?.id}
              type='primary'
              onClick={() => handleDecrementQuantity(item)}
            >
              -
            </Button>,
            <p>{item?.quantity}</p>,
            <Button
              key={item.id}
              type='primary'
              onClick={() => handleIncrementQuantity(item)}
            >
              +
            </Button>,
          ]}
        >
          <List.Item.Meta title={item.name} description={`$ ${item.price}`} />
          <div>
            <h4>Total : $ {item.price * item.quantity}</h4>
          </div>
        </List.Item>
      )}
    />
  );
};

export default Cartdata;
