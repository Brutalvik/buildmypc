import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { GenericInterface } from '../features/parts/genericSlice';
import { Avatar, Button, List, Skeleton } from 'antd';

const Results: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { error, types, part, loading } = state.genericReducer;
  const data = state.partsReducer;

  const [renderData, setRenderData] = useState<any[]>();
  const [filterData, setFilterData] = useState<GenericInterface['types']>();

  //   console.log(request);
  //   console.log(data)

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

  console.log('Data : ', renderData);

  return (
    <>
      <List
        className='demo-loadmore-list'
        loading={loading}
        itemLayout='horizontal'
        loadMore={loadMore}
        dataSource={renderData!}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key='list-loadmore-edit'>Remove</a>,
              <a key='list-loadmore-more'>Add to Cart</a>,
            ]}
          >
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={<Avatar />}
                title={item.name}
                description={item.clock}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
};

export default Results;
