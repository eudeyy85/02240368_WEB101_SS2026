'use client';  // run in browser

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // redirect to login page when visiting localhost:3000
    router.push('/login');
  }, []);

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh'}}>
      <p>Redirecting...</p>
    </div>
  );
}
