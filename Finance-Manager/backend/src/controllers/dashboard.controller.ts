import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const getDashboard = async (req: Request, res: Response) => {
  const userId = (req as any).user?.userId;
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    // 1. Total Spend
    const totalSpendResult = await prisma.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId: userId,
        type: 'EXPENSE', // Assuming only 'EXPENSE' should count as 'spend'
      },
    });
    const totalSpend = totalSpendResult._sum.amount || 0;

    // 2. Transaction Count
    const transactionCount = await prisma.transaction.count({
      where: {
        userId: userId,
      }
    });

    // 3. Recent Transactions (e.g., last 5)
    const recentTransactions = await prisma.transaction.findMany({
        where: { userId: userId },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { category: true } // Assuming a relationship with a Category model
    });

    return res.json({
      dashboard: {
        totalSpend: totalSpend,
        transactionCount: transactionCount,
        recentTransactions: recentTransactions,
        // ... other statistics (e.g., spending by category)
      },
      user: (req as any).user // Optionally return user info
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error fetching dashboard data" });
  }
};