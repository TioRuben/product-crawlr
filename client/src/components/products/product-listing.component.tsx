import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Order, Product } from "../../models";
import { ProductListingResults } from "./product-listing-results.component";

interface ProductListingProps {
  wishList: Product[];
  order: Order;
  textFilter: string;
  addToWishList: (product: Product) => void;
}

const getProductsQuery = gql`
  query Products(
    $filter: String
    $orderBy: String
    $asc: Boolean
    $offset: Int
    $limit: Int
  ) {
    filteredProducts(
      filter: $filter
      orderBy: $orderBy
      asc: $asc
      offset: $offset
      limit: $limit
    ) {
      vendorId
      imageUrl
      link
      price
      description
    }
  }
`;

export class ProductListing extends React.Component<ProductListingProps> {
  render() {
    const { addToWishList, wishList, order, textFilter } = this.props;

    return (
      <Query
        query={getProductsQuery}
        variables={{
          filter: textFilter,
          ...order,
          offset: 0,
          limit: 50
        }}
      >
        {({ loading, error, data, fetchMore }) => (
          <ProductListingResults
            addToWishList={addToWishList}
            data={data}
            error={error}
            fetchMore={fetchMore}
            loading={loading}
            wishList={wishList}
          />
        )}
      </Query>
    );
  }
}
