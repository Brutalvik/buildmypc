import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { genericActions } from '../features/parts/genericSlice';
import { Avatar, Button, List, notification, Skeleton } from 'antd';
import Notification from './Notification';
import { AppInterface, CartInterface } from '../models/model';

const Results: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { error, types, part, loading, cartQuantity, notificaitonMessage } =
    state.genericReducer;

  const data = state.partsReducer;

  const [renderData, setRenderData] = useState<any[]>([]);
  const [cart, setCart] = useState<any>([]);

  // //Open notification function
  const openNotification = (data: any) => {
    notification.info({
      message: data.message,
      description: data.description,
      duration: 1,
      maxCount: 1,
      placement: 'bottomRight',
    });
  };

  //  //Add to cart
  const addToCart = (event: any) => {
    const cartData = {
      id: event.id,
      name: event.name,
      brand: event.brand,
      clock: event.clock,
      socket: event.socket,
      price: event.price,
      quantity: 1,
    };

    setCart((prev: any) => {
      dispatch(genericActions.cartQuantity(cartQuantity + 1));
      const notification = {
        message: `Product: ${event.brand} ${event.name}  `,
        description: `Price: ${event.price}  Added to cart`,
      };
      openNotification(notification);
      const itemExists = cart?.find((item: any) => item.id === event.id);
      if (itemExists) {
        return prev.map((item: any) =>
          item.id === event.id
            ? { ...item, quantity: item.quantity + 1 }
            : { ...item }
        );
      }
      return [...prev, { ...cartData }];
    });
  };

  // // //Remove from cart
  // const removeFromCart = (event: any) => {
  //   if (cartQuantity === 0) {
  //     const notification = {
  //       message: `Aww Snap `,
  //       description: `No more products or Cart empty`,
  //     };
  //     openNotification(notification);
  //   } else {
  //     setCart((prev: any) =>
  //       prev.reduce((acc: any, item: any) => {
  //         if (item.id === event.id) {
  //           if (item.amount === 1) return acc;
  //           dispatch(genericActions.cartQuantity(cartQuantity - 1));
  //           return [...acc, { ...item, quantity: item.quantity - 1 }];
  //         } else {
  //           return [...acc, item];
  //         }
  //       }, [] as CartInterface[])
  //     );
  //   }
  // };

  //Update cart in store
  useEffect(() => {
    if (cart) {
      dispatch(genericActions.cart(cart));
    }
  }, [cart, dispatch]);

  //Fetch render data from store
  useEffect(() => {
    Object.entries(data).map((reqData) => {
      part.map((req) => {
        if (req === reqData[0]) {
          setRenderData(reqData[1]);
        }
      });
    });
  }, [part, renderData]);

  const loadMore = !loading ? (
    <div
      style={{
        textAlign: 'center',
        marginTop: 12,
        height: 32,
        lineHeight: '32px',
      }}
    >
      <Button onClick={() => console.log()}>Load More</Button>
    </div>
  ) : null;

  //   console.log('Data : ', renderData);

  const Resultsrender = () => {
    return (
      <>
        <Notification openNotification={() => openNotification} />
        <List
          loading={loading}
          itemLayout='horizontal'
          size='large'
          loadMore={loadMore}
          dataSource={renderData}
          renderItem={(item) => (
            <List.Item
              actions={[
                // <Button key={item.id} onClick={() => removeFromCart(item)}>
                //   Remove
                // </Button>,
                <Button key={item.id} onClick={() => addToCart(item)}>
                  Add to Cart
                </Button>,
              ]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                <List.Item.Meta
                  avatar={<Avatar />}
                  title={`${item.brand} ${item.name}  -- ${item.socket}`}
                  description={`Clock Speed: ${item.clock}  ||  Total Cores: ${item.cores} || L3 Cache: ${item.l3} `}
                />
                <div>
                  <h4>$ {item.price}</h4>
                </div>
              </Skeleton>
            </List.Item>
          )}
        />
      </>
    );
  };

  return (
    <>
      {error ? (
        <h1 style={{ color: 'black' }}>Error Fetching Data</h1>
      ) : (
        renderData && <Resultsrender />
      )}
    </>
  );
};

export default Results;
