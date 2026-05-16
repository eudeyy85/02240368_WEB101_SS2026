'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password });
      login(res.data.token, res.data.user);
      router.push('/feed');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:'100vh',background:'#fff',display:'flex'}}>
      {/* Left side - branding */}
      <div style={{flex:1,background:'linear-gradient(135deg,#fe2c55,#ff6b81,#25f4ee)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'40px'}}>
        <div style={{color:'white',textAlign:'center'}}>
          <div style={{fontSize:'80px',marginBottom:'20px'}}>🎵</div>
          <h1 style={{fontSize:'48px',fontWeight:'800',marginBottom:'16px',letterSpacing:'-1px'}}>TikTok</h1>
          <p style={{fontSize:'20px',opacity:0.9,maxWidth:'300px',lineHeight:'1.5'}}>Watch, create and share videos that matter to you.</p>
        </div>
      </div>

      {/* Right side - form */}
      <div style={{width:'480px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 48px',background:'#fff'}}>
        <div style={{width:'100%',maxWidth:'360px'}}>
          <h2 style={{fontSize:'28px',fontWeight:'700',color:'#161823',marginBottom:'8px'}}>Log in to TikTok</h2>
          <p style={{color:'#757575',marginBottom:'32px',fontSize:'15px'}}>Manage your account and more</p>

          {error && (
            <div style={{background:'#fff0f3',border:'1px solid #fe2c55',color:'#fe2c55',padding:'12px 16px',borderRadius:'8px',marginBottom:'20px',fontSize:'14px'}}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{marginBottom:'16px'}}>
              <label style={{display:'block',fontSize:'14px',fontWeight:'500',color:'#161823',marginBottom:'6px'}}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{width:'100%',padding:'12px 16px',border:'1px solid #e3e3e4',borderRadius:'8px',fontSize:'15px',outline:'none',transition:'border 0.2s',background:'#f8f8f8',color:'#161823'}}
                onFocus={e => e.target.style.border='1px solid #fe2c55'}
                onBlur={e => e.target.style.border='1px solid #e3e3e4'}
              />
            </div>

            <div style={{marginBottom:'24px'}}>
              <label style={{display:'block',fontSize:'14px',fontWeight:'500',color:'#161823',marginBottom:'6px'}}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={{width:'100%',padding:'12px 16px',border:'1px solid #e3e3e4',borderRadius:'8px',fontSize:'15px',outline:'none',background:'#f8f8f8',color:'#161823'}}
                onFocus={e => e.target.style.border='1px solid #fe2c55'}
                onBlur={e => e.target.style.border='1px solid #e3e3e4'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{width:'100%',padding:'14px',background:loading?'#ccc':'#fe2c55',color:'white',border:'none',borderRadius:'8px',fontSize:'16px',fontWeight:'600',cursor:loading?'not-allowed':'pointer',transition:'background 0.2s'}}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p style={{textAlign:'center',marginTop:'24px',color:'#757575',fontSize:'14px'}}>
            Don't have an account?{' '}
            <Link href="/register" style={{color:'#fe2c55',fontWeight:'600',textDecoration:'none'}}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
