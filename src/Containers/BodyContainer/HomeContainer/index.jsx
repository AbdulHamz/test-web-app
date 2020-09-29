import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 73,
    top: 64,
    width: "calc(100% - (73px + 30px))",
    height: "calc(100% - (64px + 30px + 50px))",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    padding: 15,
    position: "absolute",
  },
  root2: {
    marginLeft: 240,
    width: "calc(100% - (240px + 30px))",
  },
  htmlContainer: {
    height: "100%",
    width: "100%",
    border: "none",
    display: "block",
  },
}));

const Home = ({ isDrawerOpened }) => {
  const classes = useStyles();

  return (
    <div
      className={classNames(classes.root, { [classes.root2]: isDrawerOpened })}
    >
      <Grid className={classes.htmlContainer}>
        <iframe
          className={classes.htmlContainer}
          title="sample-content"
          src={"https://www.example.com/"}
        />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isDrawerOpened: state.mainState.isDrawerOpened,
  };
};
export default connect(mapStateToProps, null)(Home);
