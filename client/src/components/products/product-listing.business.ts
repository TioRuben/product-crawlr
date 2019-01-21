import { Order } from "../../models";

export const orderMethod = (order: Order) => (a: any, b: any) => {
  if (order.orderBy === "price") {
    return a.price < b.price ? (order.asc ? -1 : 1) : order.asc ? 1 : -1;
  } else {
    return a.description < b.description
      ? order.asc
        ? -1
        : 1
      : order.asc
      ? 1
      : -1;
  }
};

export const filterMethod = (text: string) => (element: any) => {
  return true;
};
