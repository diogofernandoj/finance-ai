import PeriodSelect from "./period-select";

const Header = () => {
  return (
    <div className="flex items-center justify-between gap-6">
      <h2 className="text-xl font-bold">Dashboard</h2>
      <PeriodSelect />
    </div>
  );
};

export default Header;
