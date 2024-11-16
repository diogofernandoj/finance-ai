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
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
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
