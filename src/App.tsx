import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { useAppDispatch } from './app/hooks';
import { fetchCpuData } from './features/thunks/parts';
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import './App.css';

const key = process.env.REACT_APP_DB_SECRET ?? '';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCpuData(key, 'cpu'));
  });

  return (
    <Layout>
      <Header />
      <Content />
      <Footer />
    </Layout>
  );
};

export default App;
