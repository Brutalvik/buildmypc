import { Content } from 'antd/lib/layout/layout';
import { AppInterface } from '../models/model';
import Sidebar from './Sidebar';
import { SmileOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { genericActions } from '../features/parts/genericSlice';
import Notification from './Notification';
import Results from './Results';

const Home: React.FC<AppInterface> = ({
  addtocart,
  opennotification,
  cart,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { error, part, types } = state.genericReducer;

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

  return (
    <>
      <Notification openNotification={() => opennotification} />
      <Sidebar />
      <Content className='content'>
        {error ? (
          <h1 style={{ color: 'black' }}>Error Fetching Data</h1>
        ) : renderData.length <= 0 ? (
          <div className='content-data'>
            <h2>Please select a product</h2>
          </div>
        ) : (
          <Results
            filtereddata={filteredData}
            renderdata={renderData}
            addtocart={addtocart}
          />
        )}
      </Content>
    </>
  );
};

export default Home;
