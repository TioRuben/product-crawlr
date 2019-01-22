import * as React from "react";
import {
  WithStyles,
  withStyles,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Button,
  Grid,
  Tooltip,
  Fade
} from "@material-ui/core";
import HeartIcon from "@material-ui/icons/Favorite";
import { productItemStyles } from "./product-item.styles";
import { Product } from "../../models";

interface ProductItemProps extends WithStyles<typeof productItemStyles> {
  product: any;
  inWishList: boolean;
  addToWishList: (product: Product) => void;
}

class ProductItemInner extends React.Component<
  ProductItemProps,
  { enters: boolean }
> {
  constructor(props: ProductItemProps) {
    super(props);
    this.state = { enters: false };
  }

  handleMouse = (enters: boolean) => () => {
    this.setState({ enters });
  };

  handleAddToWishList = (product: Product) => () => {
    this.props.addToWishList(product);
  };

  render() {
    const { classes, product, inWishList } = this.props;
    const { enters } = this.state;
    return (
      <Card
        className={classes.card}
        key={product.vendorId}
        onMouseEnter={this.handleMouse(true)}
        onMouseLeave={this.handleMouse(false)}
      >
        <CardMedia
          image={product.imageUrl}
          title={product.description}
          className={classes.media}
        />
        <Fade in={enters}>
          <CardContent classes={{ root: classes.cardContent }}>
            <Tooltip
              title={inWishList ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <IconButton
                onClick={this.handleAddToWishList({
                  description: product.description,
                  imageUrl: product.imageUrl,
                  link: product.link,
                  price: product.price,
                  vendorId: product.vendorId
                })}
              >
                <HeartIcon
                  color={inWishList ? "secondary" : "disabled"}
                  classes={{ root: classes.icon }}
                />
              </IconButton>
            </Tooltip>
            <Typography align="center" variant="title" component="h2">
              {product.description}
            </Typography>
            <CardActions classes={{ root: classes.actions }}>
              <Grid justify="space-evenly" container={true} spacing={8}>
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
                </Grid>
              </Grid>
            </CardActions>
          </CardContent>
        </Fade>
      </Card>
    );
  }
}

export const ProductItem = withStyles(productItemStyles)(ProductItemInner);
