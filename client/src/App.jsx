import { Avatar, Layout, Menu, Space } from 'antd';
import 'antd/es/menu/style/index'
import Contents from './Contents';
import { useNavigate } from 'react-router-dom';
import { Content, Footer, Header } from "antd/es/layout/layout"
import { BellFilled, BellOutlined, BellTwoTone, BookOutlined, DashboardOutlined, PoweroffOutlined, TableOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons'
import Sider from 'antd/es/layout/Sider';
import './css/style.css';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3500/"

function App() {
  const navigate = useNavigate();

  return (
     
    <Layout className='container'>
      <Header style={{
        backgroundColor: 'lightslategray',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }} >

        <h2>
          Admin Management Side
        </h2>

        <Space size={12} direction='horizontal'>
          <BellFilled />
          {/* <Dropdown
            overlay={(
              <Menu>
                <Menu.Item key="/edit-profile">
                  Edit Profile
                </Menu.Item>
                <Menu.Item key="/logout" icon= {<PoweroffOutlined />} danger= "true">
                  Logout
                </Menu.Item>
              </Menu>
            )}
            >
            <a 
              onClick={e => e.preventDefault()}>
              Open Dropdown
            </a>
          </Dropdown> */}
          <Avatar icon={<UserOutlined />} />
          <h3>Thomas Brown</h3>
        </Space>

      </Header >

      <Layout>
        <Sider theme="light" style={{ width: 300 }}>
          <Menu onClick={({ key }) => {
            if (key == "logout") {
              confirm("Are You Sure You Want to LogOut");
            } else {
              navigate(key);
            }
          }}
            defaultSelectedKeys={[window.location.pathname]}
            items={[
              { label: "Dashboard", key: "/", icon: <DashboardOutlined /> },
              { label: "Users", key: "/users", icon: <TableOutlined /> },
              {
                label: "Manage Academic", key: "/manage-academics", icon: <UnorderedListOutlined />,
                children: [
                  { label: "Courses", key: "/courses", icon: <BookOutlined /> },
                  { label: "Classes", key: "/classes", icon: <BookOutlined /> },
                  { label: "Departments", key: "/departments", icon: <BookOutlined /> },
                  { label: "Colleges", key: "/colleges", icon: <BookOutlined /> }
                ],
              },
              { label: "Teacher", key: "/teacher", icon: <UnorderedListOutlined /> },
              { label: "Student", key: "/student", icon: <UnorderedListOutlined /> },
              { label: "Events", key: "/events", icon: <TableOutlined /> },
              { label: "Assigning and Scheduling", key: "/assign-and-schedule", icon: <TableOutlined /> },
              { label: "Logout", key: "/logout", icon: <PoweroffOutlined />, danger: true },
            ]}
            mode="inline">
          </Menu>
        </Sider>
        <Content style={{ padding: 20, overflow: 'auto' }}>
          <Contents />
        </Content>
      </Layout>
      <Footer style={{ backgroundColor: 'lightgrey' }}>
        Hello
      </Footer>
    </Layout>

  )
}

export default App
