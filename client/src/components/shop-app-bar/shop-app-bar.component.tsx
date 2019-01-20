import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

export class ShopAppBar extends React.Component {
  render() {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap={true}>
            My Favourite Appliances
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
