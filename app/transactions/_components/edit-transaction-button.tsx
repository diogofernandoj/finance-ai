"use client";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Transaction } from "@prisma/client";
import { PencilIcon } from "lucide-react";

interface EditTransactionButtonProps {
  transaction: Transaction;
}

const EditTransactionButton = ({ transaction }: EditTransactionButtonProps) => {
  return (
    <Dialog>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
      >
        <DialogTrigger>
          <PencilIcon />
        </DialogTrigger>
      </Button>
      <DialogContent>{transaction.name}</DialogContent>
    </Dialog>
  );
};

export default EditTransactionButton;
