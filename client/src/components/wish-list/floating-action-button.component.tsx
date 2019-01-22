import * as React from "react";
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Tooltip,
  Fab,
  Badge
} from "@material-ui/core";
import HeartIcon from "@material-ui/icons/Favorite";
import { Product } from "../../models";
import { WishList } from "./wish-list.component";

const floatingActionButtonStyles = (theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing.unit * 4,
      right: theme.spacing.unit * 4,
      zIndex: 99
    }
  });

interface FloatingActionButtonProps
  extends WithStyles<typeof floatingActionButtonStyles> {
  wishList: Product[];
  removeFromWishList: (product: Product) => void;
}

class FABInner extends React.Component<
  FloatingActionButtonProps,
  { wishListOpen: boolean }
> {
  constructor(props: FloatingActionButtonProps) {
    super(props);
    this.state = { wishListOpen: false };
  }

  handleWishListStatus = (wishListOpen: boolean) => () => {
    this.setState({ wishListOpen });
  };

  render() {
    const { classes, wishList, removeFromWishList } = this.props;
    return (
      <>
        <Tooltip title="Open my wishlist">
          <Fab
            color="secondary"
            className={classes.fab}
            onClick={this.handleWishListStatus(true)}
          >
            <Badge color="primary" badgeContent={wishList.length}>
              <HeartIcon fontSize="large" />
            </Badge>
          </Fab>
        </Tooltip>
        <WishList
          wishList={wishList}
          open={this.state.wishListOpen}
          close={this.handleWishListStatus(false)}
          removeFromWishList={removeFromWishList}
        />
      </>
    );
  }
}

export const FAB = withStyles(floatingActionButtonStyles)(FABInner);
