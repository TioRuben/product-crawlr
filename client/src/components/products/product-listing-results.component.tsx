import * as React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, LinearProgress, Typography, Button } from "@material-ui/core";
import { ProductItem } from "./product-item.component";
import { Product } from "../../models";

interface ProductListingResultsProps {
  loading: boolean;
  error: any;
  data: any;
  wishList: Product[];
  fetchMore: any;
  addToWishList: (product: Product) => void;
}

export class ProductListingResults extends React.Component<
  ProductListingResultsProps,
  { hasMore: boolean }
> {
  constructor(props: ProductListingResultsProps) {
    super(props);
    this.state = { hasMore: true };
  }

  scrollMore = (page: number) => {
    this.props.fetchMore({
      variables: {
        offset: this.props.data.filteredProducts.length
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          this.setState({ hasMore: false });
          return prev;
        }
        return Object.assign({}, prev, {
          filteredProducts: [
            ...prev.filteredProducts,
            ...fetchMoreResult.filteredProducts
          ]
        });
      }
    });
  };

  render() {
    const { loading, error, data, wishList, addToWishList } = this.props;
    if (loading) {
      return (
        <div style={{ width: "100%", height: "100%" }} key={1}>
          <LinearProgress />
        </div>
      );
    }
    if (error) {
      return <div>Error! {error.message}</div>;
    }
    return data.filteredProducts.length > 0 ? (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.scrollMore}
        hasMore={this.state.hasMore}
        loader={<LinearProgress key={0} />}
      >
        <Grid
          container={true}
          direction="row"
          justify="space-evenly"
          alignItems="center"
          spacing={8}
        >
          {data.filteredProducts.map((product, index) => (
            <Grid item={true} xs={12} sm={6} md={2} key={index}>
              <ProductItem
                key={index}
                product={product}
                inWishList={
                  !!wishList.find(p => p.vendorId === product.vendorId)
                }
                addToWishList={addToWishList}
              />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    ) : (
      <Typography variant="display2">No results Found</Typography>
    );
  }
}
