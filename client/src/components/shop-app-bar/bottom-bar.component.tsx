import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
  WithStyles,
  withStyles,
  InputBase,
  Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { shopAppBarStyles } from "./shop-app-bar.styles";
import { OrderMenu } from "./order-menu.component";
import { Order } from "../../models";

interface BottomBarProps extends WithStyles<typeof shopAppBarStyles> {
  order: Order;
  productCount: number;
  setOrder: (order: Order) => void;
}

class BottomBarInner extends React.Component<BottomBarProps> {
  render() {
    const { classes, order, setOrder } = this.props;
    return (
      <AppBar position="sticky" color="default">
        <Toolbar variant="dense">
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <div className={classes.grow} />
          <OrderMenu order={order} setOrder={setOrder} />
        </Toolbar>
      </AppBar>
    );
  }
}

export const BottomBar = withStyles(shopAppBarStyles)(BottomBarInner);
