import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import Button from "@material-ui/core/Button";
import { makeStyles, FormControl, TextField } from "@material-ui/core";

import {
  TextValidator,
  ValidatorForm,
  SelectValidator
} from "react-material-ui-form-validator";
import { Grid, GridContainer } from "@material-ui/core"
import "./set.css"
import _ from "lodash";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  MenuItem
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStoreState, useStoreActions } from "easy-peasy";
import EditingLoadingScreen from "./../../../UI/EditingLoadingScreen";
import axios from "axios";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const themechangetheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})


const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 200
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  msx: {
    backgroundColor: "#202328"
  }
}));

const AddTask = ({ open, handleClose, user_id, activityId }) => {
  const classes = useStyles();
  const { activityid } = useParams();
  const activityTypes = ["On going", "In Progress", "Completed"];
  let postTask = useStoreActions(action => action.activity.POST_TASK_START);
  let users = useStoreState(state => state.authMod.users);
  const [domain, setDomain] = React.useState("");
  const [task_description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [endStatus, setStatus] = useState("");
  const [progress, setProgress] = useState("");
  const [newskill, setNewskill] = useState("");
  const [knowledege_gained, setKnowledge] = useState("");
  let now = new Date();
  var defaultDate = now;
  const [StartDate, setStartDate] = useState(new Date(defaultDate));
  const [EndDate, setEndDate] = useState(new Date(defaultDate));
  const [selectedTeam, setTeam] = useState([]);
  const [supervisor, setSuperVisor] = useState({});
  const [dependency, setDependency] = useState("");
  // var All = useStoreState((state) => state.authMod.users);

  const [activityTitle, setTitle] = useState("");
  const [activity_type, setType] = useState(activityTypes[0]);
  const [isInsertingLocal, setInserting] = useState(false);
  const postActivity = useStoreActions(
    action => action.activities.POST_ACTIVITY_START
  );
  let names = useStoreState(state => state.activity.names);
  // console.log(names)


  const isInserting = useStoreState(state => state.activities.isInserting);

  const handleChange = event => {
    setDomain(event.target.value);
  };

  const handleTypeChange = event => {
    setType(event.target.value);
  };

  function handleInsertionQue() {
    if (isInserting) setTimeout(() => handleInsertionQue(isInserting), 1000);
    else {
      setInserting(false);
      handleClose();
    }
  }
  let transfernotes = useStoreState(state => state.activities.tasktransferNotes);
  // console.log(transfernotes)

  // const getname = transfernotes.filter(transfernotes => transfernotes.activityid == activityId)
  // console.log(getname)

  const handleStartDateChange = (StartDate) => {
    setStartDate(StartDate)
  }
  const handleEndDateChange = (EndDate) => {
    setEndDate(EndDate);
  };



  return (
    <ThemeProvider theme={themechangetheme}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <div className={classes.msx}>
          <ValidatorForm
            onSubmit={e => {
              // console.log({
              //   // work: domain,
              //   user_id: selectedTeam.map(member => member.user_id),
              //   title: activityTitle
              // });

              setInserting(true);
              setTimeout(() => handleInsertionQue(), 1000);
            }}
          >
            <DialogTitle id="form-dialog-title" className="taskTitle"><b>Add Task</b></DialogTitle>
            <DialogContent>
              <DialogContentText id="id">Please enter the below details.</DialogContentText>
              <Autocomplete
                id="tags-standard"
                validators={["required"]}
                multiple
                options={names.filter(
                  member =>
                    !selectedTeam.some(
                      selectedMember => selectedMember.user_id === member.user_id
                    )
                )}
                getOptionLabel={option => option.fname + " " + option.lname}
                onChange={(e, value) => {
                  setTeam(value);
                  // console.log(value);
                }}
                renderInput={params => (
                  <TextValidator
                    type=""
                    validators={["required"]}
                    value={selectedTeam[0] || ""}
                    errorMessages={["This field is required"]}
                    {...params}
                    variant="standard"
                    label="Name"
                    placeholder="Select Name"

                    onChange={e => setName(e.target.value)}

                    fullWidth
                  />
                )}
              />
              <br />
              <TextField

                id="task_description"
                label="Task description"
                type=""
                fullWidth
                value={task_description}
                inputProps={{ maxLength: 30 }}
                onChange={e => setDescription(e.target.value)}
              />
              <br></br>
              <FormControl id="spacers" className={classes.dateBox}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                  <div className="startdateers">
                    <br></br>
                    <KeyboardDatePicker
                      // validators={["required"]}
                      // errorMessages={["This field is required"]}
                      margin="normal"
                      size="small"
                      id="date-picker-dialog"
                      label="Start date"
                      inputVariant="filled"
                      style={{ width: 275 }}
                      format="dd/MM/yyyy"
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
                  <div className="enddateers">
                    <br></br>
                    <KeyboardDatePicker
                      // validators={["required"]}
                      // errorMessages={["This field is required"]}
                      minDate={StartDate}
                      margin="normal"
                      size="small"
                      id="date-picker-dialog"
                      label="End date"
                      inputVariant="filled"
                      format="dd/MM/yyyy"
                      value={EndDate}
                      onChange={handleEndDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}
                    />
                  </div>
                </MuiPickersUtilsProvider>

              </FormControl>
              <br></br>

              {/* <p className="online"> */}
              <FormControl className={classes.formControl}>

              </FormControl>
              <br></br>
              <br></br>


              <TextField
                id="task_dependency"
                label="Task dependency"
                validators={["required matchRegexp:[0-9]{100}"]}
                errorMessages={["This field is required"]}
                type="number"
                fullWidth
                value={dependency}
                onChange={e => setDependency(e.target.value)}
              />
              <br></br>


              <br />
            </DialogContent>

            <DialogActions>
              <ThemeProvider theme={themechangetheme}>
                <Button onClick={handleClose} variant='outlined'
                  style={{
                    color: 'white',
                    width: "60%",
                    height: "100%",
                    fontWeight: "bold",
                    fontSize: "90%",
                    textTransform: "none",
                  }}>
                  Cancel
                </Button>
              </ThemeProvider>
              <Button
                onClick={() => {
                  // const sid = selectedTeam[0].user_id
                  const assignedBy = user_id
                  const userid = selectedTeam.map(member => member.user_id)
                  const cutter = _.chunk(userid, 1)

                  var data = [];
                  var array = cutter;
                  array.forEach((message, key) => {
                    data.push({
                      user_id: Number(message),
                      task_description, assignedBy, dependency, domain, StartDate,
                      EndDate
                    })
                  });
                  // console.log(data);
                  // const task = [{
                  //   user_id: task_description, assignedBy, dependency, domain, userid, StartDate,
                  //   EndDate
                  // }];

                  const report = {
                    activityid: activityId,
                    milestone: "",
                    user_id: data,

                  };
                  // console.log(report);
                  const progressInfo = {

                    name,
                    endStatus,
                    progress,
                  };

                  postTask({ report, progressInfo, user_id });
                  handleClose();
                }}
                style={{
                  backgroundImage: "linear-gradient(to right, #259E3F,  #249566) ",
                  color: "white",
                  width: "60%",
                  height: "100%",
                  fontWeight: "bold",
                  fontSize: "90%",
                  textTransform: "none",
                }}
              // console.log()
              >
                Assign Task
              </Button>
            </DialogActions>
          </ValidatorForm>
        </div>
      </Dialog>
    </ThemeProvider>
  );
};

export default AddTask;





