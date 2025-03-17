import { ItemSchema } from "@/core/schema";
import { z } from "@kandoo/shared";

export const BoardSchema = z.object({
  name: z
    .string()
    .nonempty("the board's name is required")
    .max(20, "The board's name is too long (max 20 characters)"),
  list: ItemSchema.array(),
});

export const DeleteBoardShema = z.object({
  id: z
    .string()
    .nonempty("The board's id must be provide to remove element")
    .uuid(),
});
