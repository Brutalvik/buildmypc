import React from 'react';
import { AppInterface } from '../models/model';
import { Layout, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector } from '../app/hooks';
import { Link } from 'react-router-dom';
import '../App.css';

const { Header } = Layout;

const HeaderData: React.FC<AppInterface> = ({ showDrawer }) => {
  const { cartQuantity } = useAppSelector((state) => state.genericReducer);

  return (
    <Header className='header'>
      <div className='logo'>
        <h1>Build IT</h1>
      </div>

      <Link to='/'>
        <h3>Home</h3>
      </Link>
      <Link to='/order'>
        <h3>Order</h3>
      </Link>

      <Badge className='cart' count={cartQuantity}>
        <ShoppingCartOutlined onClick={showDrawer} />
      </Badge>
    </Header>
  );
};

export default HeaderData;
