import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  IconButton,
  WithStyles,
  Theme,
  createStyles,
  withStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from "@material-ui/core";
import AddWishListIcon from "@material-ui/icons/Favorite";

const getProductsQuery = gql`
  {
    allProducts {
      vendorId
      imageUrl
      price
      description
    }
  }
`;

const productListingStyles = (theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 345,
      display: "iniline-block",
      float: "left",
      margin: theme.spacing.unit
    },
    media: {
      height: 340
    }
  });

interface ProductListingProps extends WithStyles<typeof productListingStyles> {}

class ProductListingInner extends React.Component<ProductListingProps> {
  actionIcon = (classes: any) =>
    <IconButton className={classes.icon}>
      <AddWishListIcon />
    </IconButton>;

  render() {
    const { classes } = this.props;
    return (
      <Query query={getProductsQuery}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (error) {
            return (
              <div>
                Error! {error.message}
              </div>
            );
          }
          return data.allProducts.map(product =>
            <Card className={classes.card} key={product.vendorId}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={product.imageUrl}
                  title={product.description}
                />
                <CardContent>
                  <Typography gutterBottom={true} variant="h5" component="h2">
                    {product.description}
                  </Typography>
                  <Typography variant="display2" color="secondary">
                    {product.price}€
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="secondary">
                  Add To Wishlist
                </Button>
                <Button size="small" color="primary">
                  View Product
                </Button>
              </CardActions>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export const ProductListing = withStyles(productListingStyles)(
  ProductListingInner
);
