import React, { useEffect, useState } from 'react';
import { Checkbox, Collapse, Layout, Menu, MenuProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Spin } from 'antd';
import { genericActions } from '../features/parts/genericSlice';

const { Sider } = Layout;
const { Panel } = Collapse;

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.partsReducer);
  const generic = useAppSelector((state) => state.genericReducer);
  const { loading, part } = generic;

  const [selectedOptions, setSelectedOptions] = useState<[]>();

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const subData = (head: string) => {
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

  const menuItems = Object.keys(data).map((key) => {
    return key;
  });

  const handleMenuSelection = async (event: string | string[]) => {
    console.log(event);
  };

  const onCheckboxChange = (event: CheckboxChangeEvent) => {
    if (event.target.checked) {
      console.log(event.target.value);
    }
  };

  // subMenuItems.map((item) => console.log(item));

  const Submenu = () => {
    return (
      <Collapse expandIconPosition='end' onChange={handleMenuSelection}>
        {menuItems.map((values) => (
          <Panel header={capitalize(values)} key={values}>
            {subData(values)?.map((value, index) => {
              return (
                <Checkbox key={index} value={value} onChange={onCheckboxChange}>
                  {value}
                </Checkbox>
              );
            })}
          </Panel>
        ))}
      </Collapse>
    );
  };
  return (
    <Sider className='site-layout-background' width={200}>
      {loading ? <Spin className='side-spin' /> : <Submenu />}
    </Sider>
  );
};

export default Sidebar;
