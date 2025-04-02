export type GenricListItemFormType = {
  itemId?: string;
  title: string;
};

export type GenericListFormType = {
  list: GenricListItemFormType[];
};

export type NamedListFormType = {
  name: string;
} & GenericListFormType;
