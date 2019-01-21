import * as React from "react";
import { MainContent } from "../main";
import { ShopAppBar } from "../shop-app-bar";
import { FAB } from "../floating-action-button";
import { CssBaseline } from "@material-ui/core";
import { Order } from "../../models";

interface AppProps {}
interface AppState {
  wishList: number[];
  order: Order;
  productCount: number;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      wishList: [],
      order: { orderBy: "price", asc: true },
      productCount: 0
    };
  }

  handleAddToWishList = (productId: number) => {
    const { wishList } = this.state;
    this.setState({
      wishList:
        wishList.indexOf(productId) >= 0
          ? wishList.filter(item => item !== productId)
          : [...wishList, productId]
    });
  };

  handleSetOrder = (order: Order) => {
    this.setState({ order });
  };

  handleProductCount = (productCount: number) => {
    this.setState({ productCount });
  };

  render() {
    const { wishList, order } = this.state;

    return (
      <div>
        <CssBaseline />
        <ShopAppBar
          order={order}
          setOrder={this.handleSetOrder}
          productCount={this.state.productCount}
        />
        <MainContent
          addToWishList={this.handleAddToWishList}
          wishList={this.state.wishList}
          order={order}
          setProductCount={this.handleProductCount}
        />
        <FAB />
      </div>
    );
  }
}
