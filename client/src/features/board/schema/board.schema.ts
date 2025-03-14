import { z } from "@kandoo/shared";

export const boardSchema = z.object({
  id: z.string().uuid().optional(),
  name: z
    .string()
    .nonempty("the board's name is required")
    .max(20, "The board's name is too long (max 20 characters)"),
  columns: z
    .object({
      id: z.string().uuid().optional(),
      title: z
        .string()
        .nonempty("the column title is require")
        .max(20, "The column's title is too long (max 20 characters)"),
    })
    .array(),
});
