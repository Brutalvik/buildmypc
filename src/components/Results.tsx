import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { genericActions } from '../features/parts/genericSlice';
import { Avatar, Button, List, Skeleton } from 'antd';
import Notification from './Notification';
import { ResultsInterface } from '../models/model';

const Results: React.FC<ResultsInterface> = ({
  cart,
  openNotification,
  addToCart,
  removeFromCart,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { error, types, part, loading, cartQuantity, notificaitonMessage } =
    state.genericReducer;

  const data = state.partsReducer;

  const [renderData, setRenderData] = useState<any[]>([]);

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
                <Button key={item.id} onClick={() => removeFromCart(item)}>
                  Remove
                </Button>,
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
