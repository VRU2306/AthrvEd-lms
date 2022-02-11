import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, FormControl } from "@material-ui/core";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useStoreActions, useStoreState } from "easy-peasy";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import "./style.css"
const defaultMaterialTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      // Purple and green play nicely together.

      backgroundColor: "#202328",
      light: "#ffffff",
      main: "#67737A"
    }
  }
});
const useStyles = makeStyles(theme => ({
  dateBox: {
    margin: 10
  },
  dsx: {
    width: "550px",

    backgroundColor: "#202328 !important"
  }
}));
const AddLeaveNote = ({ open, handleClose }) => {
  const [reason, setReason] = useState("");
  let now = new Date();
  var defaultDate = now;
  var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  var enddate = tomorrow;
  const [StartDate, setStartDate] = useState(new Date(defaultDate));
  const [EndDate, setEndDate] = useState(new Date(enddate));
  const handleStartDateChange = (StartDate) => {
    setStartDate(StartDate)
  }
  const handleEndateChange = (EndDate) => {
    setEndDate(EndDate);
  };
  const [adminmail, setAdminmail] = useState("");
  const type = useStoreState(state => state.profileMod.profile.type);
  let { alterType } = useStoreState(state => state.authMod);
  let user_id = useStoreState(state => state.profileMod.profile.user_id);
  let alter_user_id = useStoreState(state => state.authMod.user_id);

  const postLeaveNote = useStoreActions(
    action => action.attendence.POST_LEAVE_NOTE_START
  );
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={{
        background: "rgba(15, 16, 18, 0.8)",
        backdropFilter: "blur(8px)",
      }}
      aria-labelledby="form-dialog-title"
    >
      <div className={classes.dsx}>
        <ValidatorForm
          onSubmit={e => {
            handleClose();
            let user_id_final = user_id || alter_user_id;
            postLeaveNote({
              reason,
              StartDate,
              EndDate,
              adminmail,
              type: type || alterType,
              user_id: user_id_final
            });
          }}>
          <p className="Leavenotehead">Make a leave note</p>
          <DialogContent>
            <ThemeProvider theme={defaultMaterialTheme}>
              <TextValidator
                multiline
                rows={2}
                variant="filled"
                margin="dense"
                id="leave_reason"
                type=""
                validators={["required"]}
                value={reason}
                style={{ backgroundColor: "#373B3D" }}
                onChange={e => setReason(e.target.value)}
                label="Reason for the leave"

                fullWidth
              />

              <FormControl className={classes.dateBox}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <div >
                    <KeyboardDatePicker
                      margin="normal"
                      size="small"

                      id="date-picker-dialog"
                      label=" Start Date"
                      format="dd/MM/yyyy"
                      style={{ backgroundColor: "#67737A", width: 180 }}
                      inputVariant="filled"
                      minDate={new Date(defaultDate)}
                      value={StartDate}

                      onChange={handleStartDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </div>
                </MuiPickersUtilsProvider>
              </FormControl>
              <FormControl className={classes.dateBox}>

                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <div >
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      size="small"
                      label=" End Date"
                      format="dd/MM/yyyy"
                      style={{ backgroundColor: "#67737A", width: 180 }}
                      inputVariant="filled"
                      minDate={StartDate}
                      value={EndDate}

                      onChange={handleEndateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </div>
                </MuiPickersUtilsProvider>

              </FormControl>

            </ThemeProvider>
          </DialogContent>
          <DialogActions>
            <div className="applyingnow">
              <Button
                type="Submit"
                style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                className="applynow"
              >
                Apply
              </Button>
            </div>
            <div className="applylater">
              <Button onClick={handleClose}
                style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}
                className="applyinglater">
                Cancel
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </div>
    </Dialog >
  );
};

export default AddLeaveNote;
