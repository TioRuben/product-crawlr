import * as React from "react";
import { ProductListing } from "../products";
import { Order, Product } from "../../models";

interface MainContentProps {
  addToWishList: (product: Product) => void;
  wishList: Product[];
  order: Order;
  textFilter: string;
}

export class MainContent extends React.Component<MainContentProps> {
  render() {
    const { addToWishList, wishList, order, textFilter } = this.props;
    return (
      <main style={{ padding: "1em" }}>
        <ProductListing
          addToWishList={addToWishList}
          wishList={wishList}
          order={order}
          textFilter={textFilter}
        />
      </main>
    );
  }
}
