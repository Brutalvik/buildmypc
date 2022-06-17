import React, { useEffect, useState } from 'react';
import { Button, List } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Cartdata: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { error, types, part, loading, cart, cartQuantity } =
    state.genericReducer;
  const [renderData, setRenderData] = useState<any[]>([]);

  const handleIncrementQuantity = (event: any) => {};

  const handleDecrementQuantity = (event: any) => {};

  useEffect(() => {
    setRenderData(cart);
  }, [cart]);

  const Cartrender = () => {
    return (
      renderData && (
        <>
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
                <List.Item.Meta
                  title={item.name}
                  description={`Price per unit: $ ${item.price}`}
                />
                <div>
                  <h4>
                    Subtotal : $ {(item.price * item.quantity).toFixed(2)}
                  </h4>
                </div>
              </List.Item>
            )}
          />
          <div style={{ float: 'right' }}>
            <Button type='primary' shape='round' size='large'>
              Pay
            </Button>
          </div>
        </>
      )
    );
  };

  return cartQuantity === 0 ? (
    <h1 style={{ color: 'black' }}>No items in the cart</h1>
  ) : (
    <Cartrender />
  );
};

export default Cartdata;
