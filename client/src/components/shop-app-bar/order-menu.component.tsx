import * as React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Button
} from "@material-ui/core";
import OrderIcon from "@material-ui/icons/SwapVert";
import AscendingIcon from "@material-ui/icons/ArrowUpward";
import DescendingIcon from "@material-ui/icons/ArrowDownward";
import { Order } from "../../models";

const orderMenuStyles = (theme: Theme) =>
  createStyles({
    orderIcon: {}
  });

interface OrderMenuProps extends WithStyles<typeof orderMenuStyles> {
  order: Order;
  setOrder: (order: Order) => void;
}

class OrderMenuInner extends React.Component<OrderMenuProps> {
  getOrderIcon = (order: Order, item: "price" | "title") =>
    order.orderBy === item ? (
      order.asc ? (
        <AscendingIcon />
      ) : (
        <DescendingIcon />
      )
    ) : (
      <OrderIcon />
    );

  onOrderHandler = (item: "price" | "title") => () => {
    this.props.setOrder({
      orderBy: item,
      asc: this.props.order.orderBy === item ? !this.props.order.asc : true
    });
  };

  render() {
    const { order } = this.props;
    return (
      <div>
        <Button size="small" onClick={this.onOrderHandler("price")}>
          {this.getOrderIcon(order, "price")} Price
        </Button>
        <Button size="small" onClick={this.onOrderHandler("title")}>
          {this.getOrderIcon(order, "title")} Title
        </Button>
      </div>
    );
  }
}

export const OrderMenu = withStyles(orderMenuStyles)(OrderMenuInner);
