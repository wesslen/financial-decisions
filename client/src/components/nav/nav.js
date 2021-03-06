import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "black",
  },
  offset: theme.mixins.toolbar,
  navBar: {
    height: "120%",
    backgroundColor: "#d7d7d7",
  },
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ height: props.height }}>
      <AppBar position="sticky" className={classes.navBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Financial Decision-Making for Retirement Study
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
