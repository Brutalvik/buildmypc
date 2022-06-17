import React from 'react';
import { AppInterface } from '../models/model';
import { Layout, Menu, Badge } from 'antd';
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

      <Menu
        mode='horizontal'
        style={{
          fontWeight: 'bolder',
          width: '400px',
          backgroundColor: '#08142c',
          height: '65px',
        }}
      >
        <Link to='/'>
          <Menu.Item key={1}>
            <h3>Home</h3>
          </Menu.Item>
        </Link>
        <Link to='/order'>
          <Menu.Item key={2}>
            <h3>Order Summary</h3>
          </Menu.Item>
        </Link>
      </Menu>
      <Badge className='cart' count={cartQuantity}>
        <ShoppingCartOutlined onClick={showDrawer} />
      </Badge>
    </Header>
  );
};

export default HeaderData;
