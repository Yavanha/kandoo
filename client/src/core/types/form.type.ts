import { z } from "@kandoo/shared";
import { FormSchema, ItemSchema } from "../schema";

export type ItempType = z.infer<typeof ItemSchema>;
export type GenericFormType = z.infer<typeof FormSchema>;
