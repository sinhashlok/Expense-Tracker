import { z } from "zod";

export const addExpenseSchema = z.object({
  title: z.string({ required_error: "Please add title for expense" }),
  amount: z.coerce.number().min(1),
  expneseType: z.string({
    required_error: "Please select an expense type.",
  }),
});
