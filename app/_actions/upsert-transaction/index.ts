"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { UpsertTransactionSchema, upsertTransactionSchema } from "./schema";

export const upsertTransaction = async (params: UpsertTransactionSchema) => {
  upsertTransactionSchema.parse(params);
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db.transaction.upsert({
    where: {
      id: params.id ?? "",
    },
    update: { ...params, userId },
    create: { ...params, userId },
  });
  revalidatePath("/transactions");
};
