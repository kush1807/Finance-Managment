'use client';
import './globals.css';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import LoginModal from '../components/LoginModal';
import api from '@/lib/api';
import { ThemeProvider } from '../app/context/ThemeContext';
import { useRouter } from 'next/navigation';



export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [dashboard, setDashboard] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchDashboard(token);
    }else{
      router.push('/login');
    }
  }, [router]);

  const handleLogin = (token: string, userObj: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userObj));
    setUser(userObj);
    fetchDashboard(token);
     router.push('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setDashboard(null);
    router.push('/login');
  };

  const fetchDashboard = async (token: string) => {
    try {
      const res = await api.get('/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboard(res.data);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    }
  };

  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex p-8 transition-colors duration-300">

            <Sidebar
              user={user}
              dashboard={dashboard}
              onOpenLogin={() => setLoginOpen(true)}
              onLogout={handleLogout}
            />
            <main className="flex-1 mx-6">{children}</main>
            <LoginModal
              open={loginOpen}
              onClose={() => setLoginOpen(false)}
              onLogin={handleLogin}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
