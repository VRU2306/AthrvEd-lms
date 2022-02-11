import React from "react";

import Moment from "react-moment";
import { useStoreState, useStoreActions } from "easy-peasy";
import EditingLoadingScreen from "../../../UI/EditingLoadingScreen";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, FormControl } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import { TextValidator, ValidatorForm, } from "react-material-ui-form-validator";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar
} from "@material-ui/core";
import _ from "lodash";
import './TaskNotesListItem.css'
import { Grid } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,

  KeyboardDatePicker,
} from "@material-ui/pickers";
const themechangetheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})
const useStyles = makeStyles({
  msx: {
    background: "#202328",

  }
})

function ActivityItem({ row }) {
  const startDate = new Date(row.start_date);
  const endDate = new Date(row.end_date);
  let current_date = new Date();
  const formatted_date = current_date.getDate() + "-" + (current_date.getMonth() + 1) + "-" + current_date.getFullYear()
  let users = useStoreState(state => state.authMod.users);
  const [endStatus, setStatus] = useState("");
  const [progress, setProgress] = useState("");
  let user = useStoreState(state => state.profileMod.profile.user_id);
  const classes = useStyles();
  const [domain, setDomain] = React.useState("");
  const [name, setName] = useState([]);
  const [selectedTeam, setTeam] = useState([]);
  const [StartDate, setStartDate] = useState(startDate);
  const [EndDate, setEndDate] = useState(endDate);

  let activitynames = useStoreState(state => state.activity.names);
  // console.log(activitynames);

  // console.log(row)
  const handleStartDateChange = (StartDate) => {
    setStartDate(StartDate)
  }
  const handleEndDateChange = (EndDate) => {
    setEndDate(EndDate);
  };


  const userinfo = users.filter(users => users.user_id == row.user_id)
  // console.log(userinfo)
  const fname = userinfo.map(x => x.fname)

  const assigned = users.filter(users => users.user_id == row.assignedby)
  // console.log(assigned)
  const assignedby = assigned.map(x => x.fname)

  const [openAssigntaskModal, setAssigntaskModalOpen] = useState(false);
  const [openAssigntask, setAssigntaskopen] = useState(false);
  let user_id = useStoreState(state => state.profileMod.profile.user_id);


  const handleAssigntaskModalOpen = () => {
    setAssigntaskModalOpen(true);
  };

  const handleAssigntaskModalClose = () => {
    setAssigntaskModalOpen(false);
  };

  const handleAssigntaskopen = () => {
    setAssigntaskopen(true)
  };

  const handleAssigntaskclose = () => {
    setAssigntaskopen(false)
  };

  const [isInsertingLocal, setInserting] = useState(false);
  const isInserting = useStoreState(state => state.activities.isInserting);

  function handleInsertionQue() {
    if (isInserting) setTimeout(() => handleInsertionQue(isInserting), 1000);
    else {
      setInserting(false);
      handleAssigntaskModalClose();
    }
  }
  let updateTransfer = useStoreActions(
    action => action.activities.UPDATE_TRANSFERTASK_START
  );

  let postTask = useStoreActions(action => action.activity.POST_TASK_START);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#46CB18'
      },
      secondary: {
        main: '#FE8116'
      }
    }
  })

  const taskStartDate = new Date(row.start_date);
  const taskEndDate = new Date(row.end_date);
  let userss = useStoreState(state => state.authMod.unblocked);
  let fillers = userss.map(obj => ({ user_id: obj.user_id, fname: obj.fname, lname: obj.lname }))
  const assignedby_id = row.assignedby
  // console.log(assignedby_id)
  const supervisor = users.filter(users => users.user_id == assignedby_id)
  const supervisor_name = supervisor.map(x => x.fname + ' ' + x.lname)
  // console.log(supervisor_name)

  function getImage(image) {
    const userinfo = users.filter(users => users.user_id === image)
    // console.log(userinfo)
    const images = userinfo.map(x => x.image)
    return images;
  }

  return (
    <Grid container xs={12} md={12} className="tasklist" >
      <Grid item lg={2} md={12} sm={12}><div className="taskbox"><p className="taskdate"><Moment format="Do MMM" date={taskEndDate} /></p><br></br>
      </div>
      </Grid>
      <Grid item lg={9} md={12} sm={12}>
        <p className="head">{row.task_description}</p>
        <div style={{ marginTop: "2%" }} className="assignedinfo">

          <span className="assignedOn"> Assigned on:</span>
          <span className="assignedContent"><Moment format="Do MMM" date={taskStartDate} /></span>

          <span className="assignedBy"> Assigned by:</span>
          <span className="assignedContent">{supervisor_name || 'NA'}</span>

        </div>

        <div style={{ marginTop: "2%" }}>
          {/* <span className="assignedto"><img />Assigned to </span>
          <span className="assignedbyperson">{row.fname + " " + row.lname}</span> */}
          <span className="assignedto">

            {getImage(row.user_id) ? (
              < img height="32" width="32" style={{ borderRadius: 50, marginBottom: -10, marginRight: 10 }} src={getImage(row.user_id)} alt="aa" />) :
              <Avatar style={{ width: 32, height: 32, marginBottom: -25, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
            Assigned to </span>
          <span className="assignedbyperson">{row.fname + " " + row.lname}</span>
        </div>
      </Grid>
      <Grid item md={12} style={{ paddingRight: "50px" }}>
        <div>
          <button

            type="submit"
            onClick={event => {
              handleAssigntaskModalOpen();
            }}
            className="transfertask"
            style={{
              borderRadius: "8px"
            }}
          >
            Transfer
            {/* {isAddmemberInserting && <EditingLoadingScreen />} */}
          </button>
        </div>
      </Grid>

      <ThemeProvider theme={themechangetheme}>
        <Dialog
          open={openAssigntaskModal}
          onClose={handleAssigntaskModalOpen}
          aria-labelledby="form-dialog-title"
        >
          <div className={classes.msx}>
            <ValidatorForm
              onSubmit={e => {
                // console.log({

                //   user_id: selectedTeam.map(member => member.user_id),

                // });

                setInserting(true);
                setTimeout(() => handleInsertionQue(), 1000);
              }}
            >


              <DialogTitle id="form-dialog-title" id="spacs">Assign Task To
                <a className="canc" onClick={handleAssigntaskModalClose}>
                  <Close style={{ color: "white", float: "right" }} />
                </a></DialogTitle>
              <DialogContent>
                <Autocomplete
                  id="tags-standard"
                  validators={["required"]}
                  multiple
                  options={activitynames.filter(
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
                <br></br>
                {/* <FormControl id="spacers">
                  <br></br>
                  <TextValidator
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    id="date"
                    label="Start date"
                    type="date"
                    value={StartDate}
                    onChange={e => setStartDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />

                </FormControl>


                <FormControl>

                  <br></br>
                  <TextValidator
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    id="date"
                    label="End date"
                    value={EndDate}
                    onChange={e => setEndDate(e.target.value)}
                    type="date"
                    InputLabelProps={{
                      shrink: true
                    }}
                  />

                </FormControl> */}
                <FormControl className={classes.dateBox}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} >

                    <KeyboardDatePicker
                      // validators={["required"]}
                      // errorMessages={["This field is required"]}
                      margin="normal"

                      id="date-picker-dialog"
                      label="Start date"
                      inputVariant="filled"
                      format="dd/MM/yyyy"
                      value={StartDate}
                      onChange={handleStartDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date"
                      }}

                    />

                  </MuiPickersUtilsProvider>
                </FormControl>


                <FormControl className={classes.dateBox}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils} >

                    <KeyboardDatePicker
                      // validators={["required"]}
                      // errorMessages={["This field is required"]}
                      margin="normal"
                      minDate={StartDate}

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

                  </MuiPickersUtilsProvider>

                </FormControl>
                <br></br>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => {
                    let {
                      reportid,
                      user_id,
                      task_description,
                      start_date,
                      end_date
                    } = row;
                    updateTransfer({
                      reportid,
                      start_date,
                      end_date,
                      user_id,
                      task_description,
                      value: "Accept",

                    });

                    handleAssigntaskModalClose();
                    const sid = selectedTeam[0].user_id
                    // console.log(user)
                    const assignedBy = user
                    // const task_description = item.task_description
                    const dependency = row.dependency
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


                    const report = {
                      activityid: row.activityid,
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

                  }}
                  style={{
                    backgroundImage: "linear-gradient(to right, #259E3F,  #249566) ",
                    color: "white",
                    width: "100%",
                    height: "100%",
                    fontWeight: "bold",
                    fontSize: "90%",
                  }}
                // console.log()
                >
                  Assign{isInsertingLocal && <EditingLoadingScreen />}
                </Button>
              </DialogActions>
            </ValidatorForm>
          </div>
        </Dialog>
      </ThemeProvider>

      <Grid item xs={12}>
        <MuiThemeProvider theme={theme}>
          {(row.status_sod != "Paused") && (<a><span
            className="progressbar"
          >
            Progress:{row.progress != null && row.progress + "%"}{row.progress == null && "NA"}</span>
            <LinearProgress style={{ borderRadius: 10 }} color="primary" variant="determinate" value={row.progress} /></a>
          )}

          {(row.status_sod == "Paused") && (<a><span id="std-mobile-font" className="fontsize-paused" className="progressbar">
            Progress:{row.progress != null && row.progress + "%"}{row.progress == null && "NA"}</span>
            <LinearProgress color="secondary" variant="determinate" value={row.progress} /></a>
          )}
        </MuiThemeProvider>
      </Grid>
    </Grid>
  );
}

export default ActivityItem;
