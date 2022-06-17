import React, { useEffect, useState } from 'react';
import { Layout, notification } from 'antd';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchCpuData } from './features/thunks/parts';
import { genericActions } from './features/parts/genericSlice';
//Components
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Order from './components/Order';
import Cart from './components/Cart';
//Interfaces
import { CartInterface } from './models/model';
//React Router DOM - 6
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//CSS
import './App.css';

export const dbkey = process.env.REACT_APP_DB_SECRET ?? '';
const { Content } = Layout;

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { cartQuantity } = state.genericReducer;
  const [visible, setVisible] = useState<boolean>(false);
  const [cart, setCart] = useState<any>([]);

  // //Open notification function
  const openNotification = (data: any) => {
    notification.info({
      message: data.message,
      description: data.description,
      duration: 1,
      maxCount: 1,
      placement: 'bottomLeft',
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

  //Delete item from cart
  const deleteFromCart = (event: any) => {
    setCart((prev: any) =>
      prev.filter((item: any) => {
        dispatch(genericActions.cartQuantity(cartQuantity - item.quantity));
        dispatch(genericActions.cartQuantity(cartQuantity - 1));
        const notification = {
          message: `Product: ${event.brand} ${event.name}  `,
          description: `Deleted from cart`,
        };
        openNotification(notification);
        return item.id !== event.id;
      })
    );
  };

  //Remove from cart
  const removeFromCart = (event: any) => {
    if (event.quantity === 1) {
      dispatch(genericActions.cartQuantity(cartQuantity - 1));
      const notification = {
        message: `Product: ${event.brand} ${event.name}  `,
        description: `Deleted from cart`,
      };
      openNotification(notification);
      setCart((prev: any) =>
        prev.filter((item: any) => {
          return item.id !== event.id;
        })
      );
    } else {
      setCart((prev: any) =>
        prev.reduce((acc: any, item: any) => {
          if (item.id === event.id) {
            if (item.amount === 1) return acc;
            dispatch(genericActions.cartQuantity(cartQuantity - 1));
            const notification = {
              message: `Product: ${event.brand} ${event.name}  `,
              description: `Removed from cart`,
            };
            openNotification(notification);
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
              <Route path='/order' element={<Order />} />
            </Routes>
            <Cart
              visible={visible}
              onClose={onClose}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              cartData={cart}
              setCart={setCart}
              deleteFromCart={deleteFromCart}
            />
          </Layout>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
