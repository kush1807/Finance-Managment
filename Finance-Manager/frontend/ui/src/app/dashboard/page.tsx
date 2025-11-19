'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
// Assuming 'Chart' is your SpendChart component
import Chart from '@/components/Chart'; 

interface DashboardData {
  totalSpend: number;
  transactionCount: number;
  recentTransactions: { 
    id: string; 
    amount: number; 
    type: 'EXPENSE' | 'INCOME'; 
    description: string;
    createdAt: string; 
    category: { name: string };
  }[]; 
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // 💡 Data fetching logic (kept as is, using res.data.dashboard)
  const fetchDashboard = async (signal?: AbortSignal) => {
    // ... (Your fetch logic is fine)
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const res = await axios.get('http://localhost:4000/api/v1/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      });

      setData(res.data.dashboard);
      setError('');
    } catch (err: any) {
      // ... (Error handling)
      if (err?.response?.status === 401) {
        localStorage.removeItem('token');
        setData(null);
        router.push('/login');
        return;
      }
      setError(err.message || 'Failed to fetch dashboard');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // ... (Your useEffect logic for polling/cleanup is fine)
    const controller = new AbortController();
    let mounted = true;
    const loadData = async () => { if (!mounted) return; await fetchDashboard(controller.signal); };
    loadData();
    const poll = setInterval(loadData, 30000);
    return () => { mounted = false; controller.abort(); clearInterval(poll); };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  // Use optional chaining just in case data is null/undefined after loading check
  if (!data || !data.recentTransactions) return <div>No dashboard data available</div>;

  return (
    // 💡 REVERTING TO ORIGINAL OUTER CONTAINER CLASS
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          {/* Optional: Add logout button if you want it here */}
         
      </div>

      {/* 💡 REVERTING TO ORIGINAL GRID STRUCTURE */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* === MAIN 2/3 CONTENT AREA === */}
        <div className="col-span-2">
          
          {/* 💡 CHART INTEGRATION: Replacing the old h-40 placeholder */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded mb-6 p-4">
             <h3 className="text-xl font-semibold mb-3">Spending Trends</h3>
             {/* Use your Chart component here, passing the correct data */}
             <Chart data={data.recentTransactions} /> 
          </div>

          {/* 💡 RECENT TRANSACTIONS LIST */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-3">Recent Transactions</h3>
            {data.recentTransactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3"
              >
                <div>
                  <div className="font-medium">{t.description}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {t.category.name}
                  </div>
                </div>
                <div className="text-right font-semibold">
                  {/* Using totalSpend for context, but recent transactions only need formatting */}
                  ₹{(t.type === "EXPENSE" ? -t.amount : t.amount).toLocaleString()} 
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === SIDEBAR 1/3 CONTENT AREA === */}
        <aside className="bg-gray-50 dark:bg-gray-900 p-4 rounded space-y-4">
          
          {/* 💡 TOTAL SPEND CARD (Moved from New Code) */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h4 className="text-md font-medium text-gray-700 dark:text-gray-200">Total Spend</h4>
              <p className="text-2xl mt-1 font-bold text-gray-900 dark:text-white">
                ₹{data.totalSpend.toLocaleString()}
              </p>
          </div>

          <h4 className="font-semibold pt-2">Spend Statistics</h4>
          {/* 💡 REVERTING TO ORIGINAL SPEND STATISTICS DISPLAY */}
          {data.recentTransactions.slice(0, 4).map((t) => (
            <div key={t.id} className="mb-3">
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {t.category.name}
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded mt-1 relative">
                <div
                  style={{
                    width: `${Math.min(100, (t.amount / data.totalSpend) * 100)}%`, // Adjusted divisor for better context
                  }}
                  className="bg-teal-500 h-2 rounded"
                ></div>
              </div>
              <div className="text-xs text-gray-400 mt-1">₹{t.amount.toLocaleString()}</div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}