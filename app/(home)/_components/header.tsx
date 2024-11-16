import AiReportButton from "./ai-report-button";
import PeriodSelect from "./period-select";

interface HeaderProps {
  month: string;
  hasPremiumPlan: boolean;
}

const Header = async ({ month, hasPremiumPlan }: HeaderProps) => {
  return (
    <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="flex items-center gap-3">
        <AiReportButton hasPremiumPlan={hasPremiumPlan} month={month} />
        <PeriodSelect />
      </div>
    </div>
  );
};

export default Header;
