import React, { useEffect, useState } from 'react';
import { Checkbox, Collapse, Layout } from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Spin } from 'antd';
import { genericActions } from '../features/parts/genericSlice';
import { GenericInterface } from '../models/model';

//Desctructring Antd Components
const { Sider } = Layout;
const { Panel } = Collapse;

const Sidebar: React.FC = () => {
  //Declarations
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.partsReducer);
  const generic = useAppSelector((state) => state.genericReducer);

  //Destructring store state
  const { loading, error } = generic;

  const [selectedOptions, setSelectedOptions] =
    useState<GenericInterface['part']>();
  const [checkboxOptions, setCheckboxOptions] = useState<
    GenericInterface['types'] | any
  >();
  const [active, setActive] = useState<string>();

  //Capitalize function
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  //Side menu subdata
  const subData = (head: string) => {
    switch (head) {
      case 'cpu':
        return ['AMD', 'INTEL'];
      case 'motherboard':
        return ['AM4', 'LGA1151', 'LGA1200'];
      case 'memory':
        return ['DDR3', 'DDR4'];
      case 'gpu':
        return ['AMD-Radeon', 'Nvidia'];
      default:
        break;
    }
  };

  //Panel Headings
  const menuItems = Object.keys(data).map((key) => {
    return key;
  });

  //Handle panel selection
  const handleMenuSelection = (event: any) => {
    setActive(event);
    setSelectedOptions(event);
  };

  //Handle checkbox selection
  const onCheckboxChange = (event: any) => {
    setCheckboxOptions(event);
  };

  //Dispatching selected options to store
  useEffect(() => {
    if (selectedOptions) {
      dispatch(genericActions.part(selectedOptions));
    }
  }, [dispatch, selectedOptions]);

  useEffect(() => {
    if (checkboxOptions) {
      dispatch(genericActions.types(checkboxOptions));
    }
  }, [dispatch, checkboxOptions]);

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
            <Checkbox.Group
              options={subData(values)}
              onChange={onCheckboxChange}
              value={checkboxOptions}
            />
          </Panel>
        ))}
      </Collapse>
    );
  };

  //Render UI
  return (
    <Sider className='site-layout-background' width={200}>
      {!error ? (
        loading ? (
          <Spin className='side-spin' />
        ) : (
          <Submenu />
        )
      ) : (
        <p>Error loading sidebar - Please referesh the page</p>
      )}
    </Sider>
  );
};

export default Sidebar;
