// Add activity here activity title, domain, type,members code is written here

import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, FormControl } from "@material-ui/core";
import {
  TextValidator,
  ValidatorForm,
  SelectValidator
} from "react-material-ui-form-validator";
import {
  Dialog,
  DialogContent,
  DialogActions,
  MenuItem
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStoreState, useStoreActions } from "easy-peasy";
import EditingLoadingScreen from "./../../../UI/EditingLoadingScreen";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import "./style.css";
// this  theme is for dark mode of dialog box
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
  formControl: {
    minWidth: 200
  },

  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  dsbx: {

    width: "550px",
    backgroundColor: "#202328 !important"
  }
}));

const AddActivity = ({ open, handleClose }) => {
  const classes = useStyles();
  const activityTypes = ["Project", "Training", "Workshop"];
  let users = useStoreState(state => state.authMod.users);
  console.log(users)
  const [domain, setDomain] = React.useState("");
  const [name, setName] = useState("");
  const [selectedTeam, setTeam] = useState([]);
  const [supervisor, setSuperVisor] = useState({});
  const [activityTitle, setTitle] = useState("");
  const [activity_type, setType] = useState(activityTypes[0]);
  const [isInsertingLocal, setInserting] = useState(false);
  // const postActivity = useStoreActions(
  //   action => action.activities.POST_ACTIVITY_START
  // );

  // const isInserting = useStoreState(state => state.activities.isInserting);

  const handleChange = event => {
    setDomain(event.target.value);
  };

  const handleTypeChange = event => {
    setType(event.target.value);
  };
  const submitTodoHandler = event => {
    event.preventDefault();
  };


  // function handleInsertionQue() {
  //   if (isInserting) setTimeout(() => handleInsertionQue(isInserting), 1000);
  //   else {
  //     setInserting(false);
  //     handleClose();
  //   }
  // }
  async function addActivity() {



    const requestOptions = {
      Credential: 'include',
      method: 'POST',
      headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
      body: JSON.stringify({ domain: domain, title: activityTitle, activity_type: activity_type, user_id: selectedTeam.map(member => member.user_id), super_id: [supervisor.user_id] })
    }

    const response = await fetch(`/activity/create`, requestOptions);
    console.log(response)
    if (response.status == 201) {
      handleClose()
      window.location.reload()
    }

  }

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
      <div className={classes.dsbx}>
        <ValidatorForm
          onSubmit={e => {
            // //console.log{
            //   work: domain,
            //   user_id: selectedTeam.map(member => member.user_id),
            //   super_id: supervisor.user_id,
            //   activity_type,
            //   title: activityTitle
            // });
            // e.preventDefault();
            // postActivity({
            //   work: domain,
            //   user_id: selectedTeam.map(member => member.user_id),
            //   super_id: supervisor.user_id,
            //   activity_type,
            //   title: activityTitle
            // });
            // setInserting(true);
            // setTimeout(() => handleInsertionQue(), 2000);
            e.preventDefault();
            addActivity();
          }}
        >
          <p className="addactivitytitless"> Add Activity </p>
          <DialogContent>
            <ThemeProvider theme={defaultMaterialTheme}>
              <TextValidator
                type=""
                className={classes.formControl}
                validators={["required"]}
                errorMessages={["This field is required"]}
                autoFocus
                size="small"
                variant="outlined"
                style={{
                  background: "#373B3D", width: 500
                }}
                margin="dense"
                value={activityTitle}
                onChange={e => setTitle(e.target.value)}
                id="activity_title"
                label="Activity title"

                fullWidth
              />
              <br></br>
              <br></br>
              <Autocomplete
                id="tags-standard"
                validators={["required"]}

                multiple
                options={users.filter(
                  member =>
                    !selectedTeam.some(
                      selectedMember => selectedMember.user_id === member.user_id
                    )
                )}
                getOptionLabel={option => option.fname + " " + option.lname}
                onChange={(e, value) => {
                  setTeam(value);
                  //console.logvalue);
                }}
                renderInput={params => (
                  <TextValidator
                    type=""
                    validators={["required"]}
                    variant="outlined"

                    value={selectedTeam[0] || ""}
                    errorMessages={["This field is required"]}
                    {...params}
                    size="small"

                    label="Name"
                    placeholder="Select Name"
                    style={{
                      background: "#373B3D", width: 500
                    }}
                    onChange={e => setName(e.target.value)}

                    fullWidth
                  />
                )}
              />
              <br></br>
              <br></br>
              <FormControl className={classes.formControl} >
                <SelectValidator
                  type=""
                  label="Domain"
                  size="small"
                  variant="outlined"
                  validators={["required"]}
                  style={{ width: 200 }}
                  errorMessages={["This field is required"]}
                  id="demo-simple-select"
                  value={domain}
                  onChange={handleChange}
                >
                  <MenuItem value={"Mobile App Development"}>Mobile App Development</MenuItem>
                  <MenuItem value={"IOT"}>IOT</MenuItem>
                  <MenuItem value={"Web Development"}>Web Development</MenuItem>
                  <MenuItem value={"Windows App Development"}>Windows App Development</MenuItem>
                  <MenuItem value={"Artificial Intelligence"}>Artificial Intelligence</MenuItem>
                  <MenuItem value={"Robotics and Automation"}>Robotics and Automation</MenuItem>
                  <MenuItem value={"Machine Design and Analysis"}>Machine Design and Analysis</MenuItem>
                  <MenuItem value={"Business and Management"}>Business and Management</MenuItem>
                  <MenuItem value={"Product Design"}>Product Design</MenuItem>
                  <MenuItem value={"Graphic Design"}>Graphic Design</MenuItem>
                  <MenuItem value={"Aerospace and UAV"}>Aerospace and UAV</MenuItem>
                  <MenuItem value={"Datascience"}>Datascience</MenuItem>
                  <MenuItem value={"Big Data Analytics"}>Big Data Analytics</MenuItem>
                  <MenuItem value={"Cloud Technology"}>Cloud Technology</MenuItem>
                  <MenuItem value={"GIS"}>GIS</MenuItem>
                  <MenuItem value={"Blockchain"}>Blockchain</MenuItem>
                  <MenuItem value={"Cyber Security"}>Cyber Security</MenuItem>
                  <MenuItem value={"Image Processing"}>Image Processing</MenuItem>
                  <MenuItem value={"3D Printing"}>3D Printing</MenuItem>
                  <MenuItem value={"Placement Preparation"}>Placement Preparation</MenuItem>
                  <MenuItem value={"Programming Language"}>Programming Language</MenuItem>
                  <MenuItem value={"Digital Marketing and Analytics"}>Digital Marketing and Analytics</MenuItem>
                  <MenuItem value={"Augmented Reality and Virtual Reality"}>Augmented Reality and virtual Reality</MenuItem>
                </SelectValidator>
              </FormControl>


              <FormControl className={classes.formControl}>
                <SelectValidator
                  label="Activity type"
                  size="small"
                  variant="outlined"
                  validators={["required"]}
                  errorMessages={["This field is required"]}
                  id="demo-simple-select"
                  value={activity_type}
                  style={{ marginLeft: 50, width: 200 }}
                  onChange={handleTypeChange}
                >
                  <MenuItem value={"Project"}>Project</MenuItem>
                  <MenuItem value={"Workshop"}>Workshop</MenuItem>
                  <MenuItem value={"Training"}>Training</MenuItem>
                </SelectValidator>
              </FormControl>

              <br></br>
              <br></br>
              <Autocomplete
                id="tags-standard"

                options={selectedTeam}
                getOptionLabel={option => option.fname + " " + option.lname}
                onChange={(e, value) => {
                  setSuperVisor(value);
                  //console.logvalue);
                }}
                renderInput={params => (
                  <TextValidator
                    type=""
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    value={supervisor}
                    {...params}
                    variant="outlined"
                    size="small"
                    style={{
                      background: "#373B3D", width: 500
                    }}
                    label="Supervisor"
                    placeholder="Project supervisor"

                    fullWidth
                  />
                )}
              />
            </ThemeProvider>
          </DialogContent>

          <DialogActions>

            <div className="addactivityy">
              <Button type="submit" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                className="addactivityyes">
                Add activity {isInsertingLocal && <EditingLoadingScreen />}
              </Button>
            </div>
            <div className="addactivitycancelss">
              <Button onClick={handleClose} style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}
                className="addactivitycancels">
                Cancel
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </div>
    </Dialog >
  );
};

export default AddActivity;
