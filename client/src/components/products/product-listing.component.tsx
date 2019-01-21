import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Grid, LinearProgress } from "@material-ui/core";
import { ProductItem } from "./product-item.component";
import { Order } from "../../models";
import { orderMethod, filterMethod } from "./product-listing.business";

const getProductsQuery = gql`
  {
    allProducts {
      vendorId
      imageUrl
      link
      price
      description
    }
  }
`;

interface ProductListingProps {
  addToWishList: (productId: number) => void;
  wishList: number[];
  order: Order;
}

export class ProductListing extends React.Component<ProductListingProps> {
  render() {
    const { addToWishList, wishList, order } = this.props;
    return (
      <Grid
        container={true}
        direction="row"
        justify="space-evenly"
        alignItems="center"
        spacing={8}
      >
        <Query query={getProductsQuery}>
          {({ loading, error, data }) => {
            if (loading) {
              return <LinearProgress />;
            }
            if (error) {
              return <div>Error! {error.message}</div>;
            }
            return data.allProducts
              .filter(filterMethod(""))
              .sort(orderMethod(order))
              .map(product => (
                <Grid item={true} xs={12} sm={6} md={2} key={product.vendorId}>
                  <ProductItem
                    product={product}
                    inWishList={wishList.indexOf(product.vendorId) > -1}
                    addToWishList={addToWishList}
                  />
                </Grid>
              ));
          }}
        </Query>
      </Grid>
    );
  }
}
