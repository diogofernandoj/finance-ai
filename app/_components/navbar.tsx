"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import { DollarSignIcon, HouseIcon, TrendingUpDownIcon } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      <nav className="fixed bottom-0 z-50 flex h-20 w-full items-center justify-between gap-4 border-t border-solid border-border bg-background px-14 lg:hidden">
        <Link
          href="/"
          className={`rounded-full p-3 ${pathname === "/" && "bg-primary/10 text-primary"}`}
        >
          <HouseIcon size={30} />
        </Link>
        <Link
          href="/transactions"
          className={`rounded-full p-3 ${pathname === "/transactions" && "bg-primary/10 text-primary"}`}
        >
          <TrendingUpDownIcon size={30} />
        </Link>
        <Link
          href="/subscription"
          className={`rounded-full p-3 ${pathname === "/subscription" && "bg-primary/10 text-primary"}`}
        >
          <DollarSignIcon size={30} />
        </Link>
      </nav>
      <nav className="hidden justify-between border-b border-solid px-8 py-6 lg:flex">
        {/* ESQUERDA */}
        <div className="flex items-center gap-10">
          <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
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
    </>
  );
};

export default Navbar;
