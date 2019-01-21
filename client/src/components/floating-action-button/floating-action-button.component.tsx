import * as React from "react";
import {
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Tooltip,
  Fab
} from "@material-ui/core";
import HeartIcon from "@material-ui/icons/Favorite";

const floatingActionButtonStyles = (theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing.unit * 4,
      right: theme.spacing.unit * 4,
      zIndex: 99
    }
  });

interface FloatingActionButtonProps
  extends WithStyles<typeof floatingActionButtonStyles> {}

class FABInner extends React.Component<FloatingActionButtonProps> {
  render() {
    const { classes } = this.props;
    return (
      <Tooltip title="Open my wishlist">
        <Fab color="secondary" className={classes.fab}>
          <HeartIcon fontSize="large" />
        </Fab>
      </Tooltip>
    );
  }
}

export const FAB = withStyles(floatingActionButtonStyles)(FABInner);
