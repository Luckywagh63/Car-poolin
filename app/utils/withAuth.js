// app/utils/withAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('user'); // Check if user is logged in

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/login'); // Redirect to login if not authenticated
      }
    }, [isAuthenticated, router]);

    return isAuthenticated ? <WrappedComponent {...props} /> : null; // Render wrapped component only if authenticated
  };
};

export default withAuth;
