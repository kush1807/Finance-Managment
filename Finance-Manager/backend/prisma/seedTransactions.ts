import { prisma } from "../src/utils/prisma";

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: "Nisha@example.com" },
  });

  if (!user) {
    console.error("❌ User not found. Please register/login first.");
    return;
  }

  const categories = await prisma.category.findMany();
  if (categories.length === 0) {
    console.error("❌ No categories found. Run category seed first.");
    return;
  }

  const findId = (name: string) =>
    categories.find(c => c.name === name)?.id || categories[0].id;

  // Start date for createdAt field
  const baseDate = new Date("2025-10-01T10:00:00Z");
  let dayOffset = 0;
  const nextDate = () => {
    const date = new Date(baseDate);
    date.setDate(date.getDate() + dayOffset++);
    return date;
  };

  await prisma.transaction.createMany({
    data: [
      {
        userId: user.id,
        categoryId: findId("Groceries"),
        amount: 250.75,
        type: "EXPENSE",
        description: "Weekly grocery shopping",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Utilities"),
        amount: 1200.0,
        type: "EXPENSE",
        description: "Electricity bill",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Salary"),
        amount: 40000.0,
        type: "INCOME",
        description: "Monthly salary credit",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Food"),
        amount: 450.5,
        type: "EXPENSE",
        description: "Dinner at local restaurant",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Entertainment"),
        amount: 799.0,
        type: "EXPENSE",
        description: "Netflix annual plan",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Transport"),
        amount: 300.0,
        type: "EXPENSE",
        description: "Cab ride to airport",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Salary"),
        amount: 40000.0,
        type: "INCOME",
        description: "Salary credited for August",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Shopping"),
        amount: 1250.0,
        type: "EXPENSE",
        description: "Bought new sneakers",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Rent"),
        amount: 15000.0,
        type: "EXPENSE",
        description: "Monthly house rent",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Health"),
        amount: 950.0,
        type: "EXPENSE",
        description: "Doctor visit & medicines",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Investment"),
        amount: 2000.0,
        type: "EXPENSE",
        description: "Mutual fund SIP",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Travel"),
        amount: 7800.0,
        type: "EXPENSE",
        description: "Weekend trip to Goa",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Gifts"),
        amount: 500.0,
        type: "EXPENSE",
        description: "Birthday gift for friend",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Savings"),
        amount: 5000.0,
        type: "INCOME",
        description: "Interest from fixed deposit",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Groceries"),
        amount: 890.0,
        type: "EXPENSE",
        description: "Monthly supermarket shopping",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Transport"),
        amount: 120.0,
        type: "EXPENSE",
        description: "Fuel refill",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Entertainment"),
        amount: 1500.0,
        type: "EXPENSE",
        description: "Concert tickets",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Salary"),
        amount: 40000.0,
        type: "INCOME",
        description: "Salary credited for September",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Education"),
        amount: 2500.0,
        type: "EXPENSE",
        description: "Online course subscription",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Utilities"),
        amount: 1100.0,
        type: "EXPENSE",
        description: "Water and gas bill",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Groceries"),
        amount: 600.0,
        type: "EXPENSE",
        description: "Vegetables and fruits",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Shopping"),
        amount: 2100.0,
        type: "EXPENSE",
        description: "Clothes for festival",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Food"),
        amount: 300.0,
        type: "EXPENSE",
        description: "Lunch at cafe",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Salary"),
        amount: 40000.0,
        type: "INCOME",
        description: "Salary credited for October",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Health"),
        amount: 1200.0,
        type: "EXPENSE",
        description: "Gym membership",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Transport"),
        amount: 75.0,
        type: "EXPENSE",
        description: "Bus fare",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Entertainment"),
        amount: 350.0,
        type: "EXPENSE",
        description: "Movie night",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Travel"),
        amount: 3000.0,
        type: "EXPENSE",
        description: "Flight tickets for trip",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Investment"),
        amount: 5000.0,
        type: "EXPENSE",
        description: "Stock purchase",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Savings"),
        amount: 10000.0,
        type: "INCOME",
        description: "Bonus from company",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Groceries"),
        amount: 450.0,
        type: "EXPENSE",
        description: "Dairy and snacks",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Rent"),
        amount: 15000.0,
        type: "EXPENSE",
        description: "Monthly rent for November",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Utilities"),
        amount: 950.0,
        type: "EXPENSE",
        description: "Internet bill",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Salary"),
        amount: 40000.0,
        type: "INCOME",
        description: "Salary credited for November",
        createdAt: nextDate(),
      },
      {
        userId: user.id,
        categoryId: findId("Entertainment"),
        amount: 1000.0,
        type: "EXPENSE",
        description: "Gaming subscription renewal",
        createdAt: nextDate(),
      },
    ],
  });

  console.log("✅ 33 Transactions seeded successfully with createdAt dates!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
