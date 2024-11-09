"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { useRouter } from "next/navigation";

const MONTH_OPTIONS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const PeriodSelect = () => {
  const { push } = useRouter();
  const handleMonthChange = (month: string) => {
    return push(`/?month=${month}`);
  };

  return (
    <Select
      defaultValue={(new Date().getMonth() + 1).toString()}
      onValueChange={(value) => handleMonthChange(value)}
    >
      <SelectTrigger className="w-40">
        <SelectValue defaultValue="01" placeholder="Mês" />
      </SelectTrigger>
      <SelectContent className="w-40">
        {MONTH_OPTIONS.map((month) => (
          <SelectItem key={month.value} value={month.value}>
            {month.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default PeriodSelect;
