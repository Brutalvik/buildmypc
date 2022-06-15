import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { partsActions } from './features/parts/partsSlice';
import { fetchCpuData } from './features/thunks/parts';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import './App.css';

const key = process.env.REACT_APP_DB_SECRET ?? '';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  // const data = useAppSelector((state) => state.partsReducer);

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchCpuData(key, 'cpu'));
      await dispatch(fetchCpuData(key, 'gpu'));
      await dispatch(fetchCpuData(key, 'memory'));
      await dispatch(fetchCpuData(key, 'motherboard'));
    };
    getData();
  }, []);

  return (
    <Layout>
      <Header />
      <Content />
      <Footer />
    </Layout>
  );
};

export default App;
