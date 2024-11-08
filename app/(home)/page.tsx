import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import { db } from "../_lib/prisma";

const HomePage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { type: "DEPOSIT" },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { type: "EXPENSE" },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { type: "INVESTMENT" },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );

  const balance = depositsTotal - expensesTotal - investmentsTotal;

  return (
    <>
      <Navbar />
      <div className="p-6">
        <SummaryCards
          depositsTotal={depositsTotal}
          expensesTotal={expensesTotal}
          investmentsTotal={investmentsTotal}
          balance={balance}
        />
      </div>
    </>
  );
};

export default HomePage;
