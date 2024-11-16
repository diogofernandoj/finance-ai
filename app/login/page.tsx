import { LogInIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect("/");
  }

  return (
    <div className="mx-auto flex h-full max-w-[600px] flex-col justify-center gap-2">
      <Image src="/logo.svg" width={173} height={39} alt="Finance AI" />
      <h2 className="text-2xl font-bold">Bem-vindo</h2>
      <p className="text-sm text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora alias
        quam cumque rem ducimus nihil autem debitis voluptatum fuga praesentium!
      </p>
      <SignInButton>
        <Button variant="outline">
          <LogInIcon size={20} /> Fazer login
        </Button>
      </SignInButton>
    </div>
  );
};

export default LoginPage;
