// file: category-seed.ts (Updated)

import { prisma } from "../src/utils/prisma";

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Groceries", icon: "🛒" },
      { name: "Utilities", icon: "💡" },
      { name: "Salary", icon: "💰" },
      // 💡 MINIMUM FIX: ADDING ALL MISSING CATEGORIES USED IN transaction-seed.ts
      { name: "Food", icon: "🍕" },
      { name: "Entertainment", icon: "🍿" },
      { name: "Transport", icon: "🚗" },
      { name: "Shopping", icon: "🛍️" },
      { name: "Rent", icon: "🏠" },
      { name: "Health", icon: "🏥" },
      { name: "Investment", icon: "📈" },
      { name: "Travel", icon: "✈️" },
      { name: "Gifts", icon: "🎁" },
      { name: "Savings", icon: "🏦" },
      { name: "Education", icon: "📚" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ All Categories seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());