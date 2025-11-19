'use client';
import React from 'react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';


interface SidebarProps {
  user: any;
  dashboard: any;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Sidebar({ user, dashboard, onOpenLogin, onLogout }: SidebarProps) {
  const userName = user?.name || 'Guest User';
  const userEmail = user?.email || 'Not logged in';

  return (
    <aside className="w-72 bg-[#0f1724] text-white min-h-screen p-6 flex flex-col justify-between rounded-l-2xl">
      <div>
        {/* User Profile Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
            <Image src="/avatar-placeholder.png" alt="avatar" width={48} height={48} loading="eager" />
          </div>
          <div>
            <h3 className="font-semibold">{userName}</h3>
            <p className="text-xs text-gray-300">{userEmail}</p>
          </div>
        </div>

        {/* Dashboard Summary */}
        {dashboard?.dashboard && (
          <div className="bg-gray-800 p-3 rounded-lg text-sm mb-4">
            <p>Total Spend: ₹{dashboard.dashboard.totalSpend}</p>
            <p>Transactions: {dashboard.dashboard.transactionCount}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-6 space-y-4 text-gray-300">
          <a className="block py-2 px-3 rounded-lg hover:bg-gray-800 font-medium">Dashboard</a>
          <a className="block py-2 px-3 rounded-lg hover:bg-gray-800">Expenses</a>
          <a className="block py-2 px-3 rounded-lg hover:bg-gray-800">Wallets</a>
          <a className="block py-2 px-3 rounded-lg hover:bg-gray-800">Summary</a>
          <a className="block py-2 px-3 rounded-lg hover:bg-gray-800">Accounts</a>
          <a className="block py-2 px-3 rounded-lg hover:bg-gray-800">Settings</a>
        </nav>
      </div>

      <div className="text-gray-400">
  {user ? (
    <button
      onClick={onLogout}
      className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-800"
    >
      Logout
    </button>
  ) : (
    <button
      onClick={onOpenLogin}
      className="w-full text-left py-2 px-3 rounded-lg hover:bg-gray-800"
    >
      Login
    </button>
  )}

  {/* ✅ Theme toggle here */}
  <ThemeToggle />
</div>

    </aside>
  );
}
