import { Content } from 'antd/lib/layout/layout';
import { AppInterface } from '../models/model';
import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { genericActions } from '../features/parts/genericSlice';
import { Avatar, Button, List, Skeleton } from 'antd';
import Notification from './Notification';

const Home: React.FC<AppInterface> = ({
  addToCart,
  openNotification,
  cart,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { error, part, loading, types } = state.genericReducer;

  const data = state.partsReducer;

  const [renderData, setRenderData] = useState<any[]>([]);

  //Update cart in store
  useEffect(() => {
    if (cart) {
      dispatch(genericActions.cart(cart));
    }
  });

  //Fetch render data from store
  useEffect(() => {
    Object.entries(data).map((reqData) => {
      part.map((req) => {
        if (req === reqData[0]) {
          setRenderData(reqData[1]);
        }
      });
    });
  }, [part, data]);

  const Results = () => {
    return (
      <>
        <Notification openNotification={() => openNotification} />
        <List
          loading={loading}
          itemLayout='horizontal'
          size='large'
          dataSource={renderData}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  key={item.id}
                  onClick={() => addToCart?.(item)}
                  type='primary'
                >
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
      <Sidebar />
      <Content className='content'>
        {error ? (
          <h1 style={{ color: 'black' }}>Error Fetching Data</h1>
        ) : (
          renderData && <Results />
        )}
      </Content>
    </>
  );
};

export default Home;
