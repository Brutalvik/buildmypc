import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import { useAppSelector } from '../app/hooks';
import Results from './Results';

const { Content } = Layout;

const ContentData: React.FC = () => {
  const data = useAppSelector((state) => state.partsReducer);

  return (
    <Content className='main'>
      <Breadcrumbs />
      <Layout className='site-layout-background' style={{ padding: '24px 0' }}>
        <Sidebar />
        <Content className='content'>
          <Results />
        </Content>
      </Layout>
    </Content>
  );
};

export default ContentData;
