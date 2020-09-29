import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import { connect } from "react-redux";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  footerBar: {
    height: 50,
    marginLeft: 73,
    bottom: 0,
    width: "calc(100% - (73px + 30px))",
    zIndex: theme.zIndex.drawer + 1,
    position: "absolute",
    backgroundColor: "#EBEBEB",
    color: theme.palette.secondary.dark,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 15px",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  footerBarShift: {
    marginLeft: 240,
    width: "calc(100% - (240px + 30px))",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Footer = ({ isDrawerOpened }) => {
  const classes = useStyles();

  useEffect(() => {
    const updateTime = () => {
      let currentTime = moment().format("DD/MM/YYYY HH:mm:ss");
      document.getElementById("time_div").innerHTML = currentTime;
    };

    setInterval(updateTime, 1000);
  }, []);

  return (
    <div
      className={classNames(classes.footerBar, {
        [classes.footerBarShift]: isDrawerOpened,
      })}
    >
      <div>Footer Content</div>
      <div id="time_div"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isDrawerOpened: state.mainState.isDrawerOpened,
  };
};

export default connect(mapStateToProps)(Footer);
