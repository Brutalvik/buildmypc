import React, { useEffect, useState } from 'react';
import { Checkbox, Collapse, Layout, Menu, MenuProps } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Spin } from 'antd';
import {
  genericActions,
  GenericInterface,
} from '../features/parts/genericSlice';
import { prepareValueInterceptor } from '@testing-library/user-event/dist/types/document/value';

//Desctructring Antd Components
const { Sider } = Layout;
const { Panel } = Collapse;

const Sidebar: React.FC = () => {
  //Declarations
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.partsReducer);
  const generic = useAppSelector((state) => state.genericReducer);

  //Destructring store state
  const { loading, part } = generic;

  const [selectedOptions, setSelectedOptions] = useState<any>();
  const [active, setActive] = useState<string>();

  //Capitalize function
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //Side menu subdata
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

  //Panel Headings
  const menuItems = Object.keys(data).map((key) => {
    return key;
  });

  //Handle panel selection
  const handleMenuSelection = async (event: any) => {
    setActive(event);
    setSelectedOptions(event);
  };

  //Handle checkbox selection
  const onCheckboxChange = (event: CheckboxChangeEvent) => {
    if (event.target.checked) {
      console.log(event.target.value);
    }
  };

  //Microcomponent to render collapsable side menu with checkboxes
  const Submenu = () => {
    return (
      <Collapse
        expandIconPosition='end'
        onChange={handleMenuSelection}
        activeKey={active}
      >
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

  //Render UI
  return (
    <Sider className='site-layout-background' width={200}>
      {loading ? <Spin className='side-spin' /> : <Submenu />}
    </Sider>
  );
};

export default Sidebar;
