import { z } from "zod";

export const targetSchema = z.object({
  spendingAmount: z.coerce.number().min(1),
  investmentAmount: z.coerce.number().min(1),
  totalIncome: z.coerce.number().min(1),
  
});
