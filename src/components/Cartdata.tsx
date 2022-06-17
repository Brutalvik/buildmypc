import React, { useEffect, useState } from 'react';
import { Button, Divider, List } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CartInterface } from '../models/model';
import { genericActions } from '../features/parts/genericSlice';

const Cartdata: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { loading, cart, cartQuantity } = state.genericReducer;
  const [renderData, setRenderData] = useState<any[]>([]);

  const handleIncrementQuantity = (event: any) => {
    setRenderData((prev: any) => {
      const itemExists = cart?.find((item: any) => item.id === event.id);
      if (itemExists) {
        dispatch(genericActions.cartQuantity(cartQuantity + 1));
        return prev.map((item: any) =>
          item.id === event.id
            ? { ...item, quantity: item.quantity + 1 }
            : { ...item }
        );
      }
    });
  };

  const handleDecrementQuantity = (event: any) => {
    if (event.quantity === 0) {
      setRenderData((prev: any) =>
        prev.filter((item: any) => {
          return item.id != event.id;
        })
      );
    } else {
      setRenderData((prev: any) =>
        prev.reduce((acc: any, item: any) => {
          if (item.id === event.id) {
            dispatch(genericActions.cartQuantity(cartQuantity - 1));
            return [...acc, { ...item, quantity: item.quantity - 1 }];
          } else {
            return [...acc, item];
          }
        }, [] as CartInterface[])
      );
    }
  };

  const calculateTotal = (items: any) => {
    return items.reduce(
      (acc: number, item: any) => acc + item.quantity * item.price,
      0
    );
  };

  const onPay = () => {
    dispatch(genericActions.cart(renderData));
    console.log(cart);
  };

  useEffect(() => {
    setRenderData(cart);
  }, [cart]);

  // useEffect(() => {
  //   dispatch(genericActions.cart(renderData));
  // }, [renderData, dispatch]);

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
          <div style={{ float: 'right' }}></div>
          <Divider />
          <h2>Total : ${calculateTotal(renderData).toFixed(2)}</h2>
          <Button
            type='primary'
            shape='round'
            size='large'
            style={{ marginLeft: '90%' }}
            onClick={onPay}
          >
            Pay
          </Button>
          <Divider />
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
