import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import Header from "./_components/header";
import { isMatch } from "date-fns";
import { getDashboard } from "../_data/get-dashboard";
import TransactionsPieChart from "./_components/transaction-pie-chart";
import ExpensesPerCategory from "./_components/expenses-per-category";

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

  const dashboard = await getDashboard(month);

  return (
    <>
      <Navbar />
      <div className="space-y-6 p-6">
        <Header />
        <div className="grid h-full grid-cols-[2fr,1fr] grid-rows-1 gap-6">
          <div className="flex flex-col gap-6">
            <SummaryCards {...dashboard} />
            <div className="grid grid-cols-3">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
