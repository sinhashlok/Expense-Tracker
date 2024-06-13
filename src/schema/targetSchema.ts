import { z } from "zod";

export const targetSchema = z.object({
  targetAmount: z.coerce.number().min(1),
});
