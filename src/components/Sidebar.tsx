import { Layout, Menu } from 'antd';
const { Sider } = Layout;

const Sidebar = () => {
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
