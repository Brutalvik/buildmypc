import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { useAppSelector } from '../app/hooks';
import { Spin } from 'antd';

const { Sider } = Layout;

const Sidebar = () => {
  const data = useAppSelector((state) => state.partsReducer);
  // console.log(data);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const menuItems = Object.keys(data).map((key) => {
    return key;
  });

  const menu: MenuProps['items'] = menuItems.map((head, index) => {
    const key = index;

    const subData = () => {
      switch (head) {
        case 'cpu':
          return ['AMD', 'Intel'];
        case 'motherboard':
          return ['AMD', 'Intel'];
        case 'memory':
          return ['DDR3', 'DDR4'];
        case 'gpu':
          return ['Radeon', 'Nvidia'];
        default:
          break;
      }
    };

    console.log(subData());

    return {
      key,
      icon: React.createElement(head),
      label: capitalize(head),

      children: subData()?.map((icon, key) => {
        return {
          key,
          label: icon,
        };
      }),
    };
  });

  return (
    <Sider className='site-layout-background' width={200}>
      {data.loading ? (
        <Spin className='side-spin' />
      ) : (
        <Menu
          mode='inline'
          style={{ height: '100%' }}
          items={menu}
          onClick={(e) => console.log(e)}
        />
      )}
    </Sider>
  );
};

export default Sidebar;
