import * as React from "react";
import { MainContent } from "../main";
import { ShopAppBar } from "../shop-app-bar";
import { FAB } from "../floating-action-button";
import { CssBaseline } from "@material-ui/core";

export class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <ShopAppBar />
        <MainContent />
        <FAB />
      </div>
    );
  }
}
