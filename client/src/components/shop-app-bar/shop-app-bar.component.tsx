import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { WithStyles, withStyles, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { shopAppBarStyles } from "./shop-app-bar.styles";
import { OrderMenu } from "./order-menu.component";

interface ShopAppBarProps extends WithStyles<typeof shopAppBarStyles> {}

class ShopAppBarInner extends React.Component<ShopAppBarProps> {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap={true}
            className={classes.title}
          >
            My Favourite Appliances
          </Typography>
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <OrderMenu />
        </Toolbar>
      </AppBar>
    );
  }
}

export const ShopAppBar = withStyles(shopAppBarStyles)(ShopAppBarInner);
