import { Button, Result } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Order: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState<number>(0);
  const navigate = useNavigate();

  const generateOrderNumber = (max: number, min: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const order = generateOrderNumber(10000000, 1000000);
    setOrderNumber(order);
  }, []);

  const navigatePage = () => {
    navigate('/');
  };

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

export default Order;
