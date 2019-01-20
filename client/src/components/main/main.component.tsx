import * as React from "react";
import Typography from "@material-ui/core/Typography";
import { Theme, createStyles, WithStyles, withStyles } from "@material-ui/core";
import { ProductListing } from "../products/product-listing.component";

const mainContentStyles = (theme: Theme) =>
  createStyles({
    main: {
      padding: ".5em"
    }
  });

interface MainContentProps extends WithStyles<typeof mainContentStyles> {}

class MainContentInner extends React.Component<MainContentProps> {
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <ProductListing />
      </main>
    );
  }
}

export const MainContent = withStyles(mainContentStyles)(MainContentInner);
