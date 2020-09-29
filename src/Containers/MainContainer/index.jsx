import React, { useState } from "react";
import {
  Grid,
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  Menu,
  ChevronLeft,
  Home as HomeIcon,
  Description,
  Assessment,
} from "@material-ui/icons";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as mainActions from "./mainAction";
import { bindActionCreators } from "redux";

const drawerWidth = 240;

const NAV_MENU = [
  {
    label: "Home",
    pathName: "/Home",
    icon: <HomeIcon />,
  },
  {
    label: "Form",
    pathName: "/Form",
    icon: <Description />,
  },
  {
    label: "Report",
    pathName: "/Report",
    icon: <Assessment />,
  },
];

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: `${theme.palette.primary.main}`,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    margin: "0 12px",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
  },
  icon: {
    margin: 0,
    color: "#000",
    padding: "0 10px",
  },
}));

const Main = ({ history, setDrawerStatus }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const getSelectedMenu = () =>
    NAV_MENU.findIndex((menu) => history.location.pathname === menu.pathName);
  const [navIndex, setNavIndex] = useState(
    history.location.pathname === "/" ? 0 : getSelectedMenu()
  );

  const onRouteChange = ({ pathname }) => {
    setNavIndex(NAV_MENU.findIndex((menu) => menu.pathName === pathname));
  };

  history.listen(onRouteChange);

  const handleDrawerOpen = () => {
    setOpen(true);
    setDrawerStatus(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    setDrawerStatus(false);
  };

  const handleListItemClicked = (selectedIndex) => {
    history.push(
      NAV_MENU[selectedIndex] ? `${NAV_MENU[selectedIndex].pathName}` : "/"
    );
    setNavIndex(selectedIndex);
  };

  const renderListItem = (data, index, pathName) => {
    const { label, icon } = data;

    return (
      <ListItem
        key={label}
        button
        selected={navIndex === index}
        onClick={(event) => handleListItemClicked(index)}
      >
        <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
        <ListItemText
          classes={{ primary: classes.primaryText }}
          primary={label}
        />
      </ListItem>
    );
  };

  return (
    <div className={classes.rootContainer}>
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        position="fixed"
      >
        <Toolbar disableGutters={!open}>
          {!open && (
            <IconButton
              color="inherit"
              customClass={classes.menuButton}
              onClick={handleDrawerOpen}
            >
              <Menu />
            </IconButton>
          )}
          <Grid style={{ width: "auto" }}>
            <Typography
              color="inherit"
              style={{ display: "flex" }}
              variant="h6"
            >
              <span className={classes.headerlabel}>
                {NAV_MENU[navIndex].label}
              </span>
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{
          paper: classNames({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        className={classNames(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        open={open}
        variant="permanent"
      >
        <div className={classes.toolbar}>
          <img
            alt=""
            src={""}
            style={{ height: "auto", width: "50%", padding: 5 }}
          />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>{NAV_MENU.map(renderListItem)}</List>
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isDrawerOpened: state.mainState.isDrawerOpened,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(mainActions, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
