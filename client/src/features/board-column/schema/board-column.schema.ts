import { z } from "@kandoo/shared";

export const BoardColumnSchema = z.object({
  title: z
    .string()
    .nonempty("the column title is require")
    .max(20, "The column's title is too long (max 20 characters)"),
});
