import React, { useEffect, useState } from 'react';
import { Layout, notification } from 'antd';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchCpuData } from './features/thunks/parts';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import './App.css';
import { genericActions } from './features/parts/genericSlice';
import { CartInterface } from './models/model';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';

export const dbkey = process.env.REACT_APP_DB_SECRET ?? '';
const { Content } = Layout;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { error, types, part, loading, cartQuantity, notificaitonMessage } =
    state.genericReducer;

  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchCpuData(dbkey, 'cpu'));
      await dispatch(fetchCpuData(dbkey, 'gpu'));
      await dispatch(fetchCpuData(dbkey, 'memory'));
      await dispatch(fetchCpuData(dbkey, 'motherboard'));
    };
    getData();
  }, [dispatch]);

  const onClose = () => {
    setVisible(false);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  return (
    <Router>
      <Layout>
        <Header showDrawer={showDrawer} />
        <Content className='main'>
          <Breadcrumbs />
          <Layout
            className='site-layout-background'
            style={{ padding: '24px 24px' }}
          >
            <Routes>
              <Route path='/' element={<Home />} />
            </Routes>
            <Cart visible={visible} onClose={onClose} />
          </Layout>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
