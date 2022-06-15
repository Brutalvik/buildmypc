import { Layout, Menu } from 'antd';
import { useAppSelector } from '../app/hooks';

const { Sider } = Layout;

const Sidebar = () => {
  const data = useAppSelector((state) => state.partsReducer);
  console.log(data);

  return (
    <Sider className='site-layout-background' width={200}>
      <Menu
        mode='inline'
        // defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
      />
    </Sider>
  );
};

export default Sidebar;
