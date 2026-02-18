import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import PageTransition from './PageTransition';

const { Header, Content, Footer } = Layout;

export default function MainLayout() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Link to="/" className="herbario-title header-brand" style={{ textDecoration: 'none' }}>
          Flores Poéticas
        </Link>
      </Header>
      <Content className="main-content">
        <PageTransition />
      </Content>
      <Footer className="app-footer">
        Que te sirva de inspiración para las mas lindas poesías. Te amo Virgi
      </Footer>
    </Layout>
  );
}
