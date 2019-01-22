import * as React from "react";
import { debounce } from "throttle-debounce";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { WithStyles, withStyles, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { shopAppBarStyles } from "./shop-app-bar.styles";
import { OrderMenu } from "./order-menu.component";
import { Order } from "../../models";

interface BottomBarProps extends WithStyles<typeof shopAppBarStyles> {
  order: Order;
  setOrder: (order: Order) => void;
  setTextFilter: (text: string) => void;
}

interface BottomBarState {
  filterText: string;
}

class BottomBarInner extends React.Component<BottomBarProps, BottomBarState> {
  onTextKeyUpHandler = debounce(800, () => {
    this.props.setTextFilter(this.state.filterText);
  });

  updateText = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    this.setState({ filterText: event.target.value }, () => {
      this.onTextKeyUpHandler();
    });
  };

  constructor(props: BottomBarProps) {
    super(props);
    this.state = { filterText: "" };
  }

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
              onChange={this.updateText}
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
