import { Content } from 'antd/lib/layout/layout';
import { AppInterface } from '../models/model';
import Sidebar from './Sidebar';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { genericActions } from '../features/parts/genericSlice';
import { Button, List, Skeleton } from 'antd';
import Notification from './Notification';

const Home: React.FC<AppInterface> = ({
  addtocart,
  opennotification,
  cart,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { error, part, loading, types } = state.genericReducer;

  const data = state.partsReducer;

  const [renderData, setRenderData] = useState<any[]>([]);
  const [filteredData, setfilteredData] = useState<any[]>([]);

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

  console.log(renderData);

  //Filter data by type function
  const filterByValue = (array: any, string: string) => {
    return array.filter((o: any) =>
      Object.keys(o).some((k) => {
        return typeof o[k] === 'string'
          ? o[k].toLowerCase() === string.toLowerCase()
            ? o[k].toLowerCase().includes(string.toLowerCase())
            : null
          : null;
      })
    );
  };

  useEffect(() => {
    if (types.length > 0) {
      const filteredValue = Object.entries(data).map((reqData) => {
        return types.map((term: string) => {
          return filterByValue(reqData[1], term);
        });
      });
      filteredValue.map((item: any) => {
        item.map((item: any) => {
          item.length && setfilteredData(item);
        });
      });
    } else {
      setfilteredData([]);
    }
  }, [types, data]);

  console.log(filteredData.length);

  const render = (item: any) => {
    switch (item.type) {
      case 'cpu':
        return (
          <List.Item.Meta
            title={`${item.brand} ${item.name}  -- ${item.socket}`}
            description={`Clock Speed: ${item.clock}  ||  Total Cores: ${item.cores} || L3 Cache: ${item.l3} `}
          />
        );
      case 'memory':
        return (
          <List.Item.Meta
            title={`${item.brand} ${item.name}  -- ${item.for}`}
            description={`Version ${item.version}  || capacity: ${item.cores}`}
          />
        );
      case 'motherboard':
        return (
          <List.Item.Meta
            title={`${item.brand} ${item.name}`}
            description={`Chipset ${item.chipset}  || Socket: ${item.socket} || Form-Factor: ${item.formfactor}`}
          />
        );
      case 'gpu':
        return (
          <List.Item.Meta
            title={`${item.brand} ${item.name}  -- ${item.chipset}`}
            description={`Memory ${item.memory}  || Clock: ${item.memoryclock} || Shaders: ${item.shaders} || BUS: ${item.bus}`}
          />
        );
      default:
        return (
          <List.Item.Meta
            title={`${item.brand} ${item.name}  -- ${item.chipset}`}
          />
        );
    }
  };

  const Results = () => {
    return (
      <>
        <Notification openNotification={() => opennotification} />
        <List
          loading={loading}
          itemLayout='horizontal'
          size='large'
          dataSource={filteredData.length > 0 ? filteredData : renderData}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  key={item.id}
                  onClick={() => addtocart?.(item)}
                  type='primary'
                >
                  Add to Cart
                </Button>,
              ]}
            >
              <Skeleton avatar title={false} loading={loading} active>
                {render(item)}
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
          <Results />
        )}
      </Content>
    </>
  );
};

export default Home;
