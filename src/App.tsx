import React, { useEffect, useState } from 'react';
import { Layout, notification } from 'antd';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchCpuData } from './features/thunks/parts';
import Header from './components/Header';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import { genericActions } from './features/parts/genericSlice';
import { CartInterface } from './models/model';

export const dbkey = process.env.REACT_APP_DB_SECRET ?? '';
const { Content } = Layout;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { error, part, loading, cartQuantity, types } = state.genericReducer;
  const [visible, setVisible] = useState<boolean>(false);
  const [cart, setCart] = useState<any>([]);

  // //Open notification function
  const openNotification = (data: any) => {
    notification.info({
      message: data.message,
      description: data.description,
      duration: 1,
      maxCount: 1,
      placement: 'bottomRight',
    });
  };

  //Add to cart
  const addToCart = (event: any) => {
    const cartData = {
      id: event.id,
      name: event.name,
      brand: event.brand,
      clock: event.clock,
      socket: event.socket,
      price: event.price,
      quantity: 1,
    };

    setCart((prev: any) => {
      dispatch(genericActions.cartQuantity(cartQuantity + 1));
      const notification = {
        message: `Product: ${event.brand} ${event.name}  `,
        description: `Price: ${event.price}  Added to cart`,
      };
      openNotification(notification);
      const itemExists = cart?.find((item: any) => item.id === event.id);
      if (itemExists) {
        return prev.map((item: any) =>
          item.id === event.id
            ? { ...item, quantity: item.quantity + 1 }
            : { ...item }
        );
      }
      return [...prev, { ...cartData }];
    });
  };

  //Remove from cart
  const removeFromCart = (event: any) => {
    if (cartQuantity === 0) {
      const notification = {
        message: `Aww Snap `,
        description: `No more products or Cart empty`,
      };
      openNotification(notification);
    } else {
      setCart((prev: any) =>
        prev.reduce((acc: any, item: any) => {
          if (item.id === event.id) {
            if (item.amount === 1) return acc;
            dispatch(genericActions.cartQuantity(cartQuantity - 1));
            return [...acc, { ...item, quantity: item.quantity - 1 }];
          } else {
            return [...acc, item];
          }
        }, [] as CartInterface[])
      );
    }
  };

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
              <Route
                path='/'
                element={
                  <Home
                    addToCart={addToCart}
                    openNotification={openNotification}
                    cart={cart}
                    setCart={setCart}
                    removeFromCart={removeFromCart}
                  />
                }
              />
            </Routes>
            <Cart
              visible={visible}
              onClose={onClose}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartData={cart}
              setCart={setCart}
            />
          </Layout>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
