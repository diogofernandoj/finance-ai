import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Navbar from "../_components/navbar";
import SummaryCards from "./_components/summary-cards";
import Header from "./_components/header";
import { isMatch } from "date-fns";
import { getDashboard } from "../_data/get-dashboard";
import TransactionsPieChart from "./_components/transaction-pie-chart";
import ExpensesPerCategory from "./_components/expenses-per-category";
import LastTransactions from "./_components/last-transactions";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";

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
  const canUserAdd = await canUserAddTransaction();
  const user = await (await clerkClient()).users.getUser(userId);

  return (
    <div className="flex h-full flex-col pb-20 lg:overflow-hidden lg:pb-0">
      <Navbar />
      <div className="flex h-full flex-col space-y-6 p-6 lg:overflow-hidden">
        <Header
          month={month}
          hasPremiumPlan={user.publicMetadata.subscriptionPlan === "premium"}
        />
        <div className="flex h-full flex-col gap-6 lg:grid lg:grid-cols-[2fr,1fr] lg:grid-rows-1 lg:overflow-hidden">
          <div className="flex flex-col gap-6 lg:overflow-hidden">
            <SummaryCards canUserAddTransaction={canUserAdd} {...dashboard} />
            <div className="flex h-full flex-col gap-6 lg:grid lg:grid-cols-3 lg:grid-rows-1 lg:overflow-hidden">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
