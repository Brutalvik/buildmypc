import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useAppDispatch } from './app/hooks';
import { fetchCpuData } from './features/thunks/parts';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import './App.css';

export const dbkey = process.env.REACT_APP_DB_SECRET ?? '';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchCpuData(dbkey, 'cpu'));
      await dispatch(fetchCpuData(dbkey, 'gpu'));
      await dispatch(fetchCpuData(dbkey, 'memory'));
      await dispatch(fetchCpuData(dbkey, 'motherboard'));
    };
    getData();
  }, [dispatch]);

  return (
    <Layout>
      <Header />
      <Content />
      <Footer />
    </Layout>
  );
};

export default App;
