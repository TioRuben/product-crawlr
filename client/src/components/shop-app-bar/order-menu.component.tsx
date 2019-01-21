import * as React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  IconButton,
  withStyles,
  Menu,
  MenuItem
} from "@material-ui/core";
import OrderIcon from "@material-ui/icons/SwapVert";

const orderMenuStyles = (theme: Theme) =>
  createStyles({
    orderIcon: {
      color: theme.palette.primary.contrastText
    }
  });

interface OrderMenuProps extends WithStyles<typeof orderMenuStyles> {}

class OrderMenuInner extends React.Component<
  OrderMenuProps,
  { open: HTMLElement | null }
> {
  constructor(props: OrderMenuProps) {
    super(props);
    this.state = { open: null };
  }

  handleClick = event => {
    this.setState({ open: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ open: null });
  };
  render() {
    const { classes } = this.props;
    const { open: anchorEl } = this.state;
    return (
      <div>
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <OrderIcon className={classes.orderIcon} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>Price</MenuItem>
          <MenuItem onClick={this.handleClose}>Title</MenuItem>
        </Menu>
      </div>
    );
  }
}

export const OrderMenu = withStyles(orderMenuStyles)(OrderMenuInner);
