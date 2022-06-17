import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import Results from './Results';
import Sidebar from './Sidebar';
import { ResultsInterface } from '../models/model';

const Home: React.FC<ResultsInterface> = ({
  cart,
  openNotification,
  addToCart,
  removeFromCart,
}) => {
  return (
    <>
      <Sidebar />
      <Content className='content'>
        <Results
          cart={cart}
          openNotification={openNotification}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      </Content>
    </>
  );
};

export default Home;
