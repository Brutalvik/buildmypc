import { Button, Result } from 'antd';
import React, { useEffect, useState } from 'react';

const Order: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState<number>(0);

  const generateOrderNumber = (max: number, min: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    const order = generateOrderNumber(10000000, 1000000);
    setOrderNumber(order);
  }, []);

  return (
    <Result
      status='success'
      title='Successfully Purchased!'
      subTitle={`Order number: ${orderNumber}. Thank you for your purchase`}
      extra={[
        <Button type='primary' key='console'>
          Buy Again
        </Button>,
      ]}
    />
  );
};

export default Order;
