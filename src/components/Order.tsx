import { Button, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { genericActions } from '../features/parts/genericSlice';

const Order: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cartQuantity } = useAppSelector((state) => state.genericReducer);
  const [orderNumber, setOrderNumber] = useState<number>(0);

  const generateOrderNumber = (max: number, min: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const order = generateOrderNumber(10000000, 1000000);
    setOrderNumber(order);
  }, []);

  const navigatePage = () => {
    navigate('/');
    dispatch(genericActions.cartQuantity(0));
    dispatch(genericActions.cart([]));
  };

  const Somethingwrong = () => {
    return (
      <Result
        status='500'
        title='500'
        subTitle='Sorry, something went wrong.'
        extra={
          <Button type='primary' onClick={navigatePage}>
            Back Home
          </Button>
        }
      />
    );
  };

  const Processedorder = () => {
    return (
      <Result
        status='success'
        title='Successfully Purchased!'
        subTitle={`Order number: ${orderNumber}. Thank you for your purchase`}
        extra={[
          <Button type='primary' key='console' onClick={navigatePage}>
            Buy Again
          </Button>,
        ]}
      />
    );
  };

  return !cartQuantity ? <Somethingwrong /> : <Processedorder />;
};

export default Order;
