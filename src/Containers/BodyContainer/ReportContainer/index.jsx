import React from "react";
import {
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import classNames from "classnames";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: 73,
    top: 64,
    width: "calc(100% - (73px + 30px))",
    height: "calc(100% - (64px + 30px + 50px))",
    padding: 15,
    position: "absolute",
  },
  root2: {
    marginLeft: 240,
    width: "calc(100% - (240px + 30px))",
  },
  gridContainer: {
    padding: 15,
    height: "auto",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    display: "flex",
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: theme.palette.primary.main,
    color: "#FFF",
    fontWeight: 600
  },
  buttonRoot: {
    textTransform: "capitalize",
  },
}));

const Report = ({ isDrawerOpened, defaultDetails: rows, history }) => {
  const classes = useStyles();
  const headerLabels = ["Name", "City", "State", "Country", "Email-Id"];
  const dataFields = ["name", "city", "state", "country", "mail"];

  return (
    <div
      className={classNames(classes.root, { [classes.root2]: isDrawerOpened })}
    >
      {rows.length ? (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHead}>
              <TableRow>
                {headerLabels.map((header) => (
                  <TableCell key={header.toLowerCase()}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  {dataFields.map((field) => (
                    <TableCell component="th" scope="row">
                      {row[field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Grid className={classes.gridContainer}>No Records</Grid>
      )}
      <Grid className={classes.gridContainer}>
        <Button
          className={classes.buttonRoot}
          variant="contained"
          color="primary"
          onClick={() => history.push("/Form")}
        >
          Add Record
        </Button>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isDrawerOpened: state.mainState.isDrawerOpened,
    defaultDetails: state.reportState.defaultDetails,
  };
};

export default withRouter(connect(mapStateToProps, null)(Report));
