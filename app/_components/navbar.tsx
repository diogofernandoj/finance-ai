"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-6">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        <Button className="rounded-full">FinanceAI</Button>
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-bold text-primary hover:text-primary"
              : "text-muted-foreground hover:text-white"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathname === "/transactions"
              ? "font-bold text-primary hover:text-primary"
              : "text-muted-foreground hover:text-white"
          }
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={
            pathname === "/subscription"
              ? "font-bold text-primary hover:text-primary"
              : "text-muted-foreground hover:text-white"
          }
        >
          Assinatura
        </Link>
      </div>
      {/* DIREITA */}
      <Button variant="outline">
        <UserButton showName />
      </Button>
    </nav>
  );
};

export default Navbar;
