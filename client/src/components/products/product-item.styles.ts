import { createStyles, Theme } from "@material-ui/core";

export const productItemStyles = (theme: Theme) =>
  createStyles({
    card: {
      width: "100%",
      "@media (orientation: landscape)": {
        height: `30vh`
      },
      "@media (orientation: portrait)": {
        height: `40vh`
      },
      margin: theme.spacing.unit,
      cursor: "pointer",
      zIndex: 1
    },
    media: {
      width: "100%",
      height: "100%",
      backgroundSize: "contain",
      margin: theme.spacing.unit
    },
    cardContent: {
      textAlign: "center",
      width: "100%",
      height: "100%",
      position: "relative",
      top: "-105%",
      zIndex: 9,
      cursor: "default",
      background: "rgba(255,255,255,.9)"
    },
    icon: {
      fontSize: "3.5em"
    },
    actions: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      background: "#fff"
    }
  });
