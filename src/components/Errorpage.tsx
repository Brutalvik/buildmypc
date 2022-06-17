import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Errorpage: React.FC = () => {
  const navigate = useNavigate();

  const backToHomepage = () => {
    navigate('/');
  };
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button type='primary' onClick={backToHomepage}>
          Back Home
        </Button>
      }
    />
  );
};

export default Errorpage;
