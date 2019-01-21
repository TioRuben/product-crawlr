import * as React from "react";
import { MainContent } from "../main";
import { ShopAppBar } from "../shop-app-bar";
import { FAB } from "../floating-action-button";
import { CssBaseline } from "@material-ui/core";
import { Order } from "../../models";

interface AppProps {}

export class App extends React.Component<
  AppProps,
  { wishList: number[]; order: Order }
> {
  constructor(props: AppProps) {
    super(props);
    this.state = { wishList: [], order: { orderBy: "price", asc: true } };
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

  render() {
    const { wishList, order } = this.state;
    return (
      <div>
        <CssBaseline />
        <ShopAppBar />
        <MainContent
          addToWishList={this.handleAddToWishList}
          wishList={this.state.wishList}
          order={order}
        />
        <FAB />
      </div>
    );
  }
}
