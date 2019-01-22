import * as React from "react";
import {
  WithStyles,
  createStyles,
  Theme,
  withStyles,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Grid,
  Button,
  IconButton
} from "@material-ui/core";
import TrashIcon from "@material-ui/icons/Delete";
import { Product } from "../../models";

const wishListProductCardStyles = (theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
      "@media (orientation: landscape)": {
        height: `20vh`
      },
      "@media (orientation: portrait)": {
        height: `30vh`
      }
    },
    details: {
      display: "flex",
      flexDirection: "column"
    },
    content: {
      flex: "1 0 auto"
    },
    cover: {
      width: "70%"
    },
    bottomControls: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    }
  });

interface WishListProductCardProps
  extends WithStyles<typeof wishListProductCardStyles> {
  product: Product;
  removeFromWishList: (product: Product) => void;
}

class WishListProductCardInner extends React.Component<
  WishListProductCardProps
> {
  handleRemove = (product: Product) => () => {
    this.props.removeFromWishList(product);
  };

  render() {
    const { classes, product } = this.props;
    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h2" variant="title">
              {product.description}
            </Typography>
          </CardContent>
          <div className={classes.bottomControls}>
            <Grid justify="space-between" container={true} spacing={8}>
              <Grid item={true}>
                <Typography
                  color="secondary"
                  variant="subtitle1"
                  component="span"
                >
                  {product.price}€
                </Typography>
              </Grid>
              <Grid item={true}>
                <Button
                  size="small"
                  color="primary"
                  href={product.link}
                  target="_blank"
                >
                  View Product
                </Button>
                <IconButton
                  color="default"
                  target="_blank"
                  onClick={this.handleRemove(product)}
                >
                  <TrashIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={product.imageUrl}
          title={product.description}
        />
      </Card>
    );
  }
}

export const WishListProductCard = withStyles(wishListProductCardStyles)(
  WishListProductCardInner
);
