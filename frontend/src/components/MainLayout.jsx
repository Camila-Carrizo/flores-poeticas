import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, BgColorsOutlined } from '@ant-design/icons';
import PageTransition from './PageTransition';

const { Header, Content, Footer, Sider } = Layout;

const sidebarItems = [
  { key: '/', icon: <HomeOutlined />, label: <Link to="/">Inicio</Link> },
  { key: '/colores', icon: <BgColorsOutlined />, label: <Link to="/colores">Colores</Link> },
];

export default function MainLayout() {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={200}
        breakpoint="lg"
        collapsedWidth={0}
        style={{ background: 'linear-gradient(180deg, #1B3A2B 0%, #243d30 100%)' }}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname === '/' ? '/' : location.pathname]}
          items={sidebarItems}
          style={{ marginTop: 16, borderRight: 0 }}
        />
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" className="herbario-title header-brand" style={{ textDecoration: 'none' }}>
            Mi Jardín
          </Link>
        </Header>
        <Content className="main-content">
          <PageTransition />
        </Content>
        <Footer className="app-footer">
          Que te sirva de inspiración para las mas lindas poesías. Te amo Virgi
        </Footer>
      </Layout>
    </Layout>
  );
}
