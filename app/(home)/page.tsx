import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import { db } from "../_lib/prisma";
import Header from "./_components/header";
import { isMatch } from "date-fns";

const HomePage = async ({
  searchParams: { month },
}: {
  searchParams: { month: string };
}) => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }

  if (!month || !isMatch(month, "MM")) {
    redirect(`/?month=${new Date().getMonth() + 1}`);
  }

  const where = {
    date: {
      gte: new Date(`${new Date().getFullYear()}-${month}-01`),
      lt: new Date(`${new Date().getFullYear()}-${month}-31`),
    },
  };

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { AND: [{ type: "DEPOSIT" }, where] },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { AND: [{ type: "EXPENSE" }, where] },
        _sum: { amount: true },
      })
    )._sum.amount,
  );

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { AND: [{ type: "INVESTMENT" }, where] },
        _sum: { amount: true },
      })
    )._sum?.amount,
  );

  const balance = depositsTotal - expensesTotal - investmentsTotal;

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <Header />
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
