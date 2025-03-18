import { createStore } from "jotai";

export const store = createStore();

export type JotaiStoretype = ReturnType<typeof createStore>;
