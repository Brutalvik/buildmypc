import React from 'react';
import { Layout } from 'antd';
import { ItemInterface } from '../models/model';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import { useAppSelector } from '../app/hooks';

const { Content } = Layout;

const ContentData: React.FC = () => {
  const data = useAppSelector((state) => state.partsReducer);

  return (
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumbs />
      <Layout className='site-layout-background' style={{ padding: '24px 0' }}>
        <Sidebar />
        <Content style={{ padding: '0 24px', minHeight: 280 }}>Content</Content>
      </Layout>
    </Content>
  );
};

export default ContentData;
