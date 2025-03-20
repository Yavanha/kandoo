import { GenricListItemFormType, NamedListFormType } from "../types";

type ObjectList = {
  id: string;
  title: string;
}[];

export const transformeToGenericListFormType = <T extends ObjectList>(
  source: T
): GenricListItemFormType[] => {
  const list = source.map(({ id, title }) => ({
    itemId: id,
    title,
  }));
  return list;
};

export const transformeToNamedListeFormType = <T extends ObjectList>(
  source: T,
  name: string
): NamedListFormType => {
  return {
    name,
    list: transformeToGenericListFormType<T>(source),
  };
};
