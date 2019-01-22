import * as React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Product } from "../../models";
import { WishListProductCard } from "./wish-list-product-card.component";
import { Typography, Grid } from "@material-ui/core";

interface WishListProps {
  wishList: Product[];
  open: boolean;
  close: () => void;
  removeFromWishList: (product: Product) => void;
}

export class WishList extends React.Component<WishListProps> {
  handleClose = () => {
    this.props.close();
  };

  render() {
    const { open, wishList, removeFromWishList } = this.props;
    return (
      <Dialog
        open={open}
        fullScreen={true}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">My Wish List</DialogTitle>
        <DialogContent>
          <Grid container={true} spacing={8}>
            {wishList.length > 0 ? (
              wishList.map((product, index) => (
                <Grid item={true} xs={12} lg={3} key={index}>
                  <WishListProductCard
                    product={product}
                    removeFromWishList={removeFromWishList}
                  />
                </Grid>
              ))
            ) : (
              <Typography variant="subheading">
                Your Wish List is empty, please add products to it
              </Typography>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Close
          </Button>
          <Button onClick={this.handleClose} color="secondary">
            Send to a Friend
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
