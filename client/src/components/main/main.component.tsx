import * as React from "react";
import { ProductListing } from "../products";
import { Order } from "../../models";

interface MainContentProps {
  addToWishList: (productId: number) => void;
  wishList: number[];
  order: Order;
}

export class MainContent extends React.Component<MainContentProps> {
  render() {
    const { addToWishList, wishList, order } = this.props;
    return (
      <main style={{ padding: "1em" }}>
        <ProductListing
          addToWishList={addToWishList}
          wishList={wishList}
          order={order}
        />
      </main>
    );
  }
}
