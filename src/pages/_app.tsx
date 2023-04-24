import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/config/reactQuery';

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: 'rgb(94, 164, 136)',
            },
          }}
        >
          <Component {...pageProps} />
        </ConfigProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
