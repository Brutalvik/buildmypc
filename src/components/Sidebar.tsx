import React, { useEffect } from 'react';
import { Checkbox, Collapse, Layout, Menu, MenuProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Spin } from 'antd';
import { genericActions } from '../features/parts/genericSlice';

const { Sider } = Layout;
const { Panel } = Collapse;

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.partsReducer);
  const generic = useAppSelector((state) => state.genericReducer);
  const { loading, part } = generic;

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

  const subMenuItems = Object.entries(data).map((items) => {
    return items;
  });

  const handleMenuSelection = async (event: any) => {
    const selection = event.domEvent.currentTarget.outerText;
    // const { item, key, keyPath, selectedKeys, domEvent } = event;
    dispatch(genericActions.part(selection));
  };

  const onCheckboxChange = (event: CheckboxChangeEvent) => {
    if (event.target.checked) {
      console.log(event.target.value);
    }
  };

  // subMenuItems.map((item) => console.log(item));

  return (
    <Sider className='site-layout-background' width={200}>
      {loading ? (
        <Spin className='side-spin' />
      ) : (
        <Collapse>
          {menuItems.map((values, index) => (
            <Panel header={capitalize(values)} key={index}>
              {subData(values)?.map((value, index) => {
                return (
                  <Checkbox
                    key={index}
                    value={value}
                    onChange={onCheckboxChange}
                  >
                    {value}
                  </Checkbox>
                );
              })}
            </Panel>
          ))}
        </Collapse>
      )}
    </Sider>
  );
};

export default Sidebar;
