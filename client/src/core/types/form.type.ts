type Item = {
  itemId?: string;
  title: string;
};

export type GenericListFormType = {
  list: Item[];
};

export type NamedListFormType = {
  name: string;
} & GenericListFormType;
