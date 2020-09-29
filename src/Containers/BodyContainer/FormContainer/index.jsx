/* eslint-disable no-useless-escape */
import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { connect } from "react-redux";
import classNames from "classnames";
import { COUNTRIES } from "./CountryData";
import * as reportActions from "../ReportContainer/reportAction";
import { bindActionCreators } from "redux";
import { Close } from "@material-ui/icons";

const DEFAULT_FIELDS = [
  {
    type: "textField",
    label: "Name",
    value: "",
    fieldName: "name",
    req: true,
    error: false,
    helperText: "",
    autoFocus: true,
    maxLength: 50,
  },
  {
    type: "textField",
    label: "City",
    value: "",
    fieldName: "city",
    req: true,
    error: false,
    helperText: "",
    autoFocus: false,
    maxLength: 100,
  },
  {
    type: "textField",
    label: "State",
    value: "",
    fieldName: "state",
    req: true,
    error: false,
    helperText: "",
    autoFocus: false,
    maxLength: 100,
  },
  {
    type: "selectField",
    label: "Country",
    value: "",
    fieldName: "country",
    req: true,
    error: false,
    helperText: "",
    dataProvider: COUNTRIES,
  },
  {
    type: "textField",
    label: "Email-Id",
    value: "",
    fieldName: "mail",
    req: true,
    error: false,
    helperText: "",
    autoFocus: false,
    maxLength: 150,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    left: 73,
    top: 64,
    width: "calc(100% - (73px + 30px))",
    height: "calc(100% - (64px + 30px))",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    padding: 15,
    position: "absolute",
  },
  root2: {
    left: 240,
    width: "calc(100% - (240px + 30px))",
  },
  fieldContainer: {
    maxWidth: 400,
    padding: 15,
  },
  textFieldRoot: {
    margin: "20px 0",
  },
  formControl: {
    margin: "20px 0",
    minWidth: 120,
    width: "100%",
  },
  comboBoxPaper: {
    maxHeight: 300,
  },
  closeIcon: {
    color: "#FFF",
  },
}));

const validateEmail = (value = "") => {
  const errorObject = {
    isError: false,
    errorMessage: "",
  };

  if (value) {
    if (value.replace(/[^@]/g, "").length > 1) {
      errorObject.isError = true;
      errorObject.errorMessage =
        "Your e-mail address Contains too many @ characters";
    } else if (value.match(/[~!#$^&*\s(=[}{)\]<>,\/:;'\"|\\`]/gim)) {
      errorObject.isError = true;
      errorObject.errorMessage =
        "Your e-mail address contains invalid characters";
    } else if (!value.match(/[A-Z0-9._%+-]+@/gim)) {
      errorObject.isError = true;
      errorObject.errorMessage =
        "An at (@) sign is missing in your Email Address";
    } else if (!value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\./gim)) {
      errorObject.isError = true;
      errorObject.errorMessage =
        "The Domain in your e-mail address is missing a period";
    } else if (
      value.match(
        /(([A-Z0-9._%+-]+@[A-Z0-9-]\.[.]+\.[.])|([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[.]))/gim
      )
    ) {
      errorObject.isError = true;
      errorObject.errorMessage =
        "The Domain in your e-mail address has consecutive periods";
    } else if (!value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/gim)) {
      errorObject.isError = true;
      errorObject.errorMessage =
        "The Domain in your e-mail address is missing a top level domain";
    }
  }

  return errorObject;
};

const Form = ({ isDrawerOpened, defaultDetails, setDetails }) => {
  const classes = useStyles();
  const [defaultData, setDefaultData] = useState(
    JSON.stringify(DEFAULT_FIELDS)
  );
  const [isSaved, setSaveStatus] = useState(false);

  const handleChange = (event, data) => {
    const defaultFields = JSON.parse(defaultData).map((field) => {
      if (field.fieldName === data.fieldName) {
        field.value = event.target.value;

        if (field.fieldName === "mail") {
          const errorObj = validateEmail(field.value);

          field.error = errorObj.isError;
          field.helperText = errorObj.errorMessage;
        }
      }

      return field;
    });

    setDefaultData(JSON.stringify(defaultFields));
  };

  const handleSave = () => {
    let tempData = JSON.parse(defaultData);
    const isRequiredFieldsFilled = JSON.parse(defaultData).every(
      (data, index) => {
        if (!data.value && !data.error) {
          data.error = true;
          data.helperText = "*Required";
          tempData.splice(index, 1, data);
        }

        return !!data.value;
      }
    );

    if (!isRequiredFieldsFilled) {
      setDefaultData(JSON.stringify(tempData));

      return;
    }

    let fieldData = {};

    tempData.forEach(({ fieldName, value }) => (fieldData[fieldName] = value));
    defaultDetails.push(fieldData);
    setSaveStatus(true);
    setDetails(defaultDetails);
    setDefaultData(JSON.stringify(DEFAULT_FIELDS));
  };

  const handleCloseSaveStatus = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSaveStatus(false);
  };

  return (
    <div
      className={classNames(classes.root, { [classes.root2]: isDrawerOpened })}
    >
      <Grid className={classes.fieldContainer}>
        {JSON.parse(defaultData).map((field) => {
          if (field.type === "textField") {
            return (
              <TextField
                id={`${field.type}-${field.fieldName}`}
                key={`${field.type}-${field.fieldName}`}
                fullWidth
                className={classes.textFieldRoot}
                label={field.label}
                autoFocus={field.autoFocus}
                helperText={field.helperText}
                inputProps={{
                  maxLength: field.maxLength,
                }}
                error={field.error}
                value={field.value}
                required={field.req}
                variant="outlined"
                onChange={(event) => handleChange(event, field)}
              />
            );
          } else {
            return (
              <FormControl
                key={`${field.type}-${field.fieldName}`}
                id={`${field.type}-${field.fieldName}`}
                variant="outlined"
                className={classes.formControl}
                error={field.error}
                helperText={field.helperText}
              >
                <InputLabel error={field.error} required={field.req}>
                  {field.label}
                </InputLabel>
                <Select
                  value={field.value}
                  onChange={(event) => handleChange(event, field)}
                  label={field.label}
                  MenuProps={{
                    PopoverClasses: {
                      paper: classes.comboBoxPaper,
                    },
                  }}
                >
                  {field.dataProvider.map((data, index) => (
                    <MenuItem key={index} value={data.value}>
                      {data.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
          }
        })}
        <Grid container justify="center">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={isSaved}
            autoHideDuration={5000}
            onClose={handleCloseSaveStatus}
            message="Your information has been saved."
            action={
              <React.Fragment>
                <IconButton
                  className={classes.closeIcon}
                  size="small"
                  onClick={handleCloseSaveStatus}
                >
                  <Close fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isDrawerOpened: state.mainState.isDrawerOpened || false,
    defaultDetails: state.reportState.defaultDetails || [],
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(reportActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form);
