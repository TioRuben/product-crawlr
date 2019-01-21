import * as React from "react";
import { Order } from "../../models";
import { TopBar } from "./top-bar.component";
import { BottomBar } from "./bottom-bar.component";

interface ShopAppBarProps {
  order: Order;
  productCount: number;
  setOrder: (order: Order) => void;
}

export class ShopAppBar extends React.Component<ShopAppBarProps> {
  render() {
    return (
      <>
        <TopBar />
        <BottomBar {...this.props} />
      </>
    );
  }
}
