import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {
  WithStyles,
  withStyles,
  InputBase,
  IconButton
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import UserIcon from "@material-ui/icons/Person";
import { shopAppBarStyles } from "./shop-app-bar.styles";
import { OrderMenu } from "./order-menu.component";
import { Order } from "../../models";

interface TopAppBarProps extends WithStyles<typeof shopAppBarStyles> {}

class TopBarInner extends React.Component<TopAppBarProps> {
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
          <IconButton>
            <UserIcon classes={{ root: classes.userIcon }} />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export const TopBar = withStyles(shopAppBarStyles)(TopBarInner);
