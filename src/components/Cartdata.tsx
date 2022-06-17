import React, { useEffect, useState } from 'react';
import { Button, Divider, List, Space } from 'antd';
import { useAppSelector } from '../app/hooks';
import { DeleteOutlined } from '@ant-design/icons';
import { CartDrawerInterface } from '../models/model';

const Cartdata: React.FC<CartDrawerInterface> = ({
  addToCart,
  removeFromCart,
}) => {
  const state = useAppSelector((state) => state.genericReducer);
  const { cartQuantity, loading, cart } = state;
  const [getCart, setGetCart] = useState<any[]>([]);

  const calculateTotal = (items: any) => {
    return items.reduce(
      (acc: number, item: any) => acc + item.quantity * item.price,
      0
    );
  };

  //Async function tp get cart data
  const data = async () => {
    setGetCart(cart);
  };

  //Get cart data useeffect
  useEffect(() => {
    data();
  }, [cart]);

  return cartQuantity === 0 ? (
    <h1 style={{ color: 'black' }}>No items in the cart</h1>
  ) : (
    getCart && (
      <>
        <List
          loading={loading}
          itemLayout='horizontal'
          size='default'
          dataSource={getCart}
          renderItem={(item) => (
            <List.Item
              actions={[
                <>
                  <Button
                    key={item?.price}
                    type='primary'
                    danger
                    onClick={() => console.log(item)}
                  >
                    {<DeleteOutlined />}
                  </Button>
                  <Space />
                  <Button
                    key={item?.id}
                    type='primary'
                    onClick={() => removeFromCart?.(item)}
                  >
                    -
                  </Button>
                </>,
                <p>{item?.quantity}</p>,
                <Button
                  key={item.id}
                  type='primary'
                  onClick={() => addToCart?.(item)}
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
                <h4>Subtotal : $ {(item.price * item.quantity).toFixed(2)}</h4>
              </div>
            </List.Item>
          )}
        />
        <div style={{ float: 'right' }}></div>
        <Divider />
        <h2>Total : ${calculateTotal(getCart).toFixed(2)}</h2>
        <Button
          type='primary'
          shape='round'
          size='large'
          style={{ marginLeft: '90%' }}
        >
          Pay
        </Button>
        <Divider />
      </>
    )
  );
};

export default Cartdata;
