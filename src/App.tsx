import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useAppDispatch } from './app/hooks';
import { fetchCpuData } from './features/thunks/cpu';
import Header from './components/Header';
import Content from './components/Content';
import './App.css';

const { Footer } = Layout;
const key = process.env.REACT_APP_DB_SECRET ?? '';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCpuData(key));
  });

  return (
    <Layout>
      <Header />
      <Content />

      <Footer style={{ textAlign: 'center' }}>
        Developed By Vikram Kumar ©2018
      </Footer>
    </Layout>
  );
};

export default App;
