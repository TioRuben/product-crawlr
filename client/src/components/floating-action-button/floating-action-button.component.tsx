import * as React from "react";
import {
  Button,
  createStyles,
  Theme,
  WithStyles,
  withStyles,
  Tooltip
} from "@material-ui/core";
import HeartIcon from "@material-ui/icons/Favorite";

const floatingActionButtonStyles = (theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing.unit * 2,
      right: theme.spacing.unit * 2
    }
  });

interface FloatingActionButtonProps
  extends WithStyles<typeof floatingActionButtonStyles> {}

class FABInner extends React.Component<FloatingActionButtonProps> {
  render() {
    const { classes } = this.props;
    return (
      <Tooltip title="Open my wishlist">
        <Button variant="fab" className={classes.fab} color="secondary">
          <HeartIcon fontSize="large" />
        </Button>
      </Tooltip>
    );
  }
}

export const FAB = withStyles(floatingActionButtonStyles)(FABInner);
