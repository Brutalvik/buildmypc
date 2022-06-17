import { Content } from 'antd/lib/layout/layout';
import React from 'react';
import Results from './Results';
import Sidebar from './Sidebar';

const Home: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Content className='content'>
        <Results />
      </Content>
    </>
  );
};

export default Home;
