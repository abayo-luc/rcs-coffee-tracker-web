import React from 'react';
import {
  Breadcrumb,
  Layout as AntLayout,
  theme,
} from 'antd';
import { Header } from '../Header';
import { SideBar } from '../Sidebar';

const { Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: React.FC<LayoutProps> = ({
  children,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntLayout className='h-screen'>
      <Header />
      <AntLayout>
        <SideBar />
        <AntLayout className='px-8 pb-8'>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
};
