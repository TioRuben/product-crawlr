import * as React from "react";
import { Order } from "../../models";
import { TopBar } from "./top-bar.component";
import { BottomBar } from "./bottom-bar.component";

interface ShopAppBarProps {
  order: Order;
  setOrder: (order: Order) => void;
  setTextFilter: (text: string) => void;
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
