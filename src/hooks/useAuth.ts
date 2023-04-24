import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {
    // if (session?.expires === 'RefreshAccessTokenError') {
    //   signOut({
    //     callbackUrl: '/login',
    //     redirect: shouldRedirect,
    //   });
    // }

    if (session === null) {
      if (router.route !== '/login') {
        router.replace('/login');
      }
      setIsAuthenticated(false);
    } else if (session !== undefined) {
      if (router.route === '/login') {
        router.replace('/');
      }
      setIsAuthenticated(true);
    }
  }, [router, session]);

  return isAuthenticated;
};
