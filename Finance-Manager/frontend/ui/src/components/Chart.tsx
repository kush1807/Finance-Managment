"use client";
import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  CartesianGrid,
  Bar,
} from "recharts";

type Props = {
  data: any[]; // use specific type if you have one
};

export default function SpendChart({ data }: Props) {
  // Build time-series: group by day or category (simple example: last 7 tx)
  const chartData = useMemo(() => {
    const transactionsToProcess = Array.isArray(data) ? data : [];
  
  // 1. Process and reverse the 10 most recent transactions first (oldest -> newest)
  // This ensures the running balance calculation starts from the oldest transaction.
 const recentTx = transactionsToProcess
    .slice(0, 10) // Take the top 10 recent transactions
    .sort((a: any, b: any) => {
      // Sort chronologically (oldest date first for running balance)
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  // 2. Calculate the running balance
  let runningBalance = 0; 
  const chartDataWithBalance = recentTx.map((t: any) => {
    // Determine the value (expense is negative)
    const value = t.type === "EXPENSE" ? -t.amount : t.amount;
    
    // Update the running balance
    runningBalance += value;
    
    return {
      name: new Date(t.createdAt).toLocaleDateString(),
      // 💡 New data key: 'balance'
      balance: runningBalance, 
    };
  });
   console.log(data,"DATAAA",chartDataWithBalance)
  return chartDataWithBalance; 
 
}, [data]);

  if (!chartData.length) return <div className="h-40 flex items-center justify-center text-sm text-gray-500">No chart data.</div>;

  return (
    <div className="w-full h-40">
      <ResponsiveContainer width="100%" height="100%">
       <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
  <CartesianGrid strokeDasharray="3 3" stroke="#e6e9ee" />
  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
  <YAxis tick={{ fontSize: 12 }} />
  <ReTooltip formatter={(val: any) => `₹${val.toLocaleString()}`} />
  
  {/* 💡 CHANGE 3: Area -> Bar, using the 'balance' data key */}
  <Bar dataKey="balance" fill="#00baa7" />
</BarChart>
      </ResponsiveContainer>
    </div>
  );
}
