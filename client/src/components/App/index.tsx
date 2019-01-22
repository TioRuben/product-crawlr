import * as React from "react";
import { MainContent } from "../main";
import { ShopAppBar } from "../shop-app-bar";
import { FAB } from "../wish-list";
import { CssBaseline } from "@material-ui/core";
import { Order, Product } from "../../models";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

interface AppProps {
  data: any;
}
interface AppState {
  wishList: Product[];
  order: Order;
  textFilter: string;
}

const getWishListQuery = gql`
  {
    userWishList {
      vendorId
      imageUrl
      link
      price
      description
    }
  }
`;

class AppInner extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      wishList: [],
      order: { orderBy: "price", asc: true },
      textFilter: ""
    };
  }

  handleAddToWishList = (product: Product) => {
    const { wishList } = this.state;
    this.setState({
      wishList: wishList.find(p => p.vendorId === product.vendorId)
        ? wishList.filter(item => item.vendorId !== product.vendorId)
        : [...wishList, product]
    });
  };

  handleRemoveFromWishList = (product: Product) => {
    this.setState({
      wishList: [
        ...this.state.wishList.filter(el => el.vendorId !== product.vendorId)
      ]
    });
  };

  componentWillReceiveProps(newProps: AppProps) {
    if (newProps.data !== this.props.data) {
      const { data } = newProps;
      this.setState({
        wishList: data.userWishList
          ? data.userWishList.map(product => ({
              vendorId: product.vendorId,
              description: product.description,
              link: product.link,
              price: product.price,
              imageUrl: product.imageUrl
            }))
          : []
      });
    }
  }

  handleSetOrder = (order: Order) => {
    this.setState({ order });
  };

  filterTextHandler = (textFilter: string) => {
    this.setState({ textFilter });
  };

  render() {
    const { wishList, order, textFilter } = this.state;
    return (
      <div>
        <CssBaseline />
        <ShopAppBar
          order={order}
          setOrder={this.handleSetOrder}
          setTextFilter={this.filterTextHandler}
        />
        <MainContent
          addToWishList={this.handleAddToWishList}
          wishList={wishList}
          order={order}
          textFilter={textFilter}
        />
        <FAB
          wishList={wishList}
          removeFromWishList={this.handleRemoveFromWishList}
        />
      </div>
    );
  }
}

export const App = graphql(getWishListQuery)(AppInner);
