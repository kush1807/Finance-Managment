"use client";
import React from "react";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";

type Transaction = {
  id: string;
  description?: string;
  amount: number;
  type: "EXPENSE" | "INCOME" | string;
  category: { name: string; icon?: string };
  createdAt: string;
};

export default function TransactionCard({ tx }: { tx: Transaction }) {
  return (
    <Tooltip.Root delayDuration={150}>
      <Tooltip.Trigger asChild>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          layout
          className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 py-3"
        >
          <div>
            <div className="font-medium">{tx.description || tx.category.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{tx.category.name}</div>
          </div>
          <div className="text-right">
            <div className={`${tx.type === "EXPENSE" ? "text-red-600" : "text-green-600"}`}>
              {tx.type === "EXPENSE" ? `- ₹${tx.amount}` : `₹${tx.amount}`}
            </div>
            <div className="text-xs text-gray-400">{new Date(tx.createdAt).toLocaleString()}</div>
          </div>
        </motion.div>
      </Tooltip.Trigger>

      <Tooltip.Portal>
        <Tooltip.Content side="top" align="center" className="rounded px-3 py-2 bg-gray-800 text-white text-sm shadow">
          <div className="leading-tight">
            <div className="font-semibold">{tx.description || tx.category.name}</div>
            <div>Category: {tx.category.name}</div>
            <div>Amount: ₹{tx.amount}</div>
            <div>Type: {tx.type}</div>
          </div>
          <Tooltip.Arrow className="fill-current text-gray-800" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
