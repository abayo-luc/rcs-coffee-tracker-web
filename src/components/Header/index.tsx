import React from 'react';
import { PoweroffOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Layout } from 'antd';
import { signOut } from 'next-auth/react';

const { Header: AntHeader } = Layout;

export const Header = () => {
  return (
    <AntHeader className='header bg-white sticky top-0'>
      <div className='flex flex-row justify-between'>
        <div className='logo' />
        <div>
          <Button
            type='text'
            onClick={() =>
              signOut({
                redirect: true,
                callbackUrl: '/login',
              })
            }
          >
            <span>
              Log out
              <PoweroffOutlined className='ml-2' />
            </span>
          </Button>
        </div>
      </div>
    </AntHeader>
  );
};
