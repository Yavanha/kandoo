import { z } from "@kandoo/shared";

export const ItemSchema = z.object({
  colId: z.string().uuid().optional(),
  title: z
    .string()
    .nonempty("the column title is require")
    .max(20, "The column's title is too long (max 20 characters)"),
});

export const FormSchema = z.object({
  list: z.array(ItemSchema),
});
