import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Paper, FormControl, Box } from "@material-ui/core";
import Copyright from "../../UI/Copyrights";
import { useStoreState, useStoreActions } from "easy-peasy";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import EditingLoadingScreen from "../../UI/EditingLoadingScreen";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#0F1012"
  },
  container: {
    marginLeft: "15%"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  fixedWidth: {
    maxWidth: "70vw",
    overflow: "auto"
  },
  paperStyling: {
    paddingTop: "5%",
    padding: "8%",
    marginTop: "4%",
    marginBottom: "7%",
    marginRight: "4%",
    backgroundColor: "#202328",
    color: "#67737A",
    fontWeight: "bold"
  },
  formFullWidth: {
    width: "100%"
  }
}));
const themechangetheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

// don't worry about the size, it's just number of form fields
const SettingsDemo = () => {
  let isSoftwareInserting = useStoreState(state => state.dailyformMod.isSoftwareInserting);
  let data = useStoreState(state => state.dailyformMod.data)
  let softwaresubmit = useStoreState(state => state.dailyformMod.softwaresubmit)
  let updateSoftware = useStoreActions(
    action => action.dailyformMod.POST_SOFTWARE_START
  );
  let [date] = useState("");
  let [category_p, setCategory] = useState("");
  let [workdescription_p, setWorkdescription] = useState("");
  let [randd_p, setRandd] = useState("00:00");
  let [learning_p, setlearning] = useState("00:00");
  let [implementation_p, setImplement] = useState("00:00");
  let [planning_p, setPlanning] = useState("00:00");
  let [discussion_p, setDiscuss] = useState("00:00");
  let [documentation_p, setDocument] = useState("00:00");
  let [error_debugging_p, setErrordebug] = useState("00:00");
  let [simulation_p, setSimulate] = useState("00:00");
  let [componenet_selection_p, setComponent] = useState("00:00");
  let [open, setOpen] = React.useState(false);
  date = data.date;

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Grid container xs={12} md={8} lg={9} xl={10} sm={10} className="dailyformsoft">
        <ValidatorForm
          onSubmit={event => {
            event.preventDefault();
            // console.log("here");
            updateSoftware({
              date,
              category_p,
              workdescription_p,
              randd_p,
              learning_p,
              implementation_p,
              planning_p,
              discussion_p,
              documentation_p,
              error_debugging_p,
              simulation_p,
              componenet_selection_p
            });
          }}
        >

          <Grid container spacing={4}>
            <Grid item md={6} lg={5}>
              <h3 className="Subdomain">Sub Domain</h3>
            </Grid>
          </Grid>

          <br></br>

          <Grid container spacing={5}>
            <Grid item xs={12} md={4} lg={4}>
              <ThemeProvider theme={themechangetheme}>
                <FormControl fullWidth={true}>
                  <ThemeProvider theme={themechangetheme}>
                    <Autocomplete
                      defaultValue={category_p}
                      id="profile-branch"
                      className='subdomainfield'
                      type=""
                      onChange={(event, value) => {
                        setCategory(value);
                      }}
                      options={[
                        "Mobile App Development",
                        "IOT",
                        "Web Development",
                        "Windows App Development",
                        "Artificial Intelligence",
                        "Robotics and Automation",
                        "Machine Design and Analysis",
                        "Aerospace and UAV",
                        "Datascience",
                        "Big Data Analytics",
                        "Cloud Technology",
                        "GIS",
                        "Blockchain",
                        "Cyber Security",
                        "Image Processing",
                        "Placement Preparation",
                        "Programming Language",
                        "Augmented Reality and Virtual Reality",

                      ]}
                      filterSelectedOptions
                      renderInput={params => (
                        <TextValidator
                          value={category_p}
                          {...params}
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          variant="outlined"
                          type=""
                          placeholder="Choose your Domain"
                          fullWidth
                        />
                      )}
                    />
                  </ThemeProvider>
                </FormControl>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} md={10} lg={10}>
              <p className="description">Work Description</p>
              <div className="phonefield">
                <ThemeProvider theme={themechangetheme}>
                  <FormControl fullWidth={true} >
                    <ThemeProvider theme={themechangetheme}>

                      <TextValidator
                        multiline
                        // label="Enter the work description"
                        placeholder="Enter the work description"
                        className="descfield"
                        // id="work"
                        type=""
                        rows={5}
                        validators={["required"]}
                        errorMessages={["work description is required"]}
                        value={workdescription_p}
                        onChange={e => {
                          setWorkdescription(e.target.value);
                        }}
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                        }}

                      />
                    </ThemeProvider>
                  </FormControl>
                </ThemeProvider>
              </div>
            </Grid>

            <Grid item xs={12} >
              <ThemeProvider theme={themechangetheme}>
                <div className="phonefield">
                  <FormControl>
                    <ThemeProvider theme={themechangetheme}>
                      <label style={{ color: "#67737A" }}>Research and Development*</label><br></br>
                      <TextValidator
                        id="time"
                        type=""
                        value={randd_p}

                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setRandd(e.target.value);
                        }}
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{ width: "175px" }}
                      />
                    </ThemeProvider>
                  </FormControl>
                </div>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} lg={3}>
              <ThemeProvider theme={themechangetheme}>
                <div className="phonefield">
                  <FormControl>
                    <ThemeProvider theme={themechangetheme}>
                      <label style={{ color: "#67737A" }}>Learning*</label><br></br>
                      <TextValidator
                        id="learning"
                        type=""
                        value={learning_p}

                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setlearning(e.target.value);
                        }}
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{ width: "60%" }}
                      />
                    </ThemeProvider>
                  </FormControl>
                </div>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} >
              <ThemeProvider theme={themechangetheme}>
                <div className="phonefield">
                  <FormControl>
                    <ThemeProvider theme={themechangetheme}>
                      <label style={{ color: "#67737A" }}>Implementation*</label><br></br>
                      <TextValidator
                        id="Implementation"
                        type=""
                        value={implementation_p}

                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setImplement(e.target.value);
                        }}
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{ width: "60%" }}
                      />
                    </ThemeProvider>
                  </FormControl>
                </div>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} >
              <ThemeProvider theme={themechangetheme}>
                <div className="phonefield">
                  <FormControl>
                    <ThemeProvider theme={themechangetheme}>
                      <label style={{ color: "#67737A" }}>Planning*</label><br></br>
                      <TextValidator
                        id="planning"
                        type=""
                        value={planning_p}
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setPlanning(e.target.value);
                        }}
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{ width: "60%" }}
                      />
                    </ThemeProvider>
                  </FormControl>
                </div>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} >
              <ThemeProvider theme={themechangetheme}>
                <div className="phonefield">
                  <FormControl>
                    <ThemeProvider theme={themechangetheme}>
                      <label style={{ color: "#67737A" }}>Discussion*</label><br></br>
                      <TextValidator
                        id="discussion"
                        value={discussion_p}

                        type=""
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setDiscuss(e.target.value);
                        }}
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{ width: "60%" }}
                      />
                    </ThemeProvider>
                  </FormControl>
                </div>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} >
              <ThemeProvider theme={themechangetheme}>
                <div className="phonefield">
                  <FormControl>
                    <ThemeProvider theme={themechangetheme}>
                      <label style={{ color: "#67737A" }}>Documentation*</label><br></br>
                      <TextValidator
                        id="documentation"
                        value={documentation_p}
                        type=""
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setDocument(e.target.value);
                        }}
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{ width: "60%" }}
                      />
                    </ThemeProvider>
                  </FormControl>
                </div>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} >
              <ThemeProvider theme={themechangetheme}>
                <div className="phonefield">
                  <FormControl>
                    <ThemeProvider theme={themechangetheme}>
                      <label style={{ color: "#67737A" }}>Error Debugging*</label><br></br>
                      <TextValidator
                        id="errordebug"
                        value={error_debugging_p}
                        type=""
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setErrordebug(e.target.value);
                        }}
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{ width: "60%" }}
                      />
                    </ThemeProvider>
                  </FormControl>
                </div>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} >
              <ThemeProvider theme={themechangetheme}>
                <div className="phonefield">
                  <FormControl>
                    <ThemeProvider theme={themechangetheme}>
                      <label style={{ color: "#67737A" }}>Simulation*</label><br></br>
                      <TextValidator
                        id="simulation"
                        value={simulation_p}
                        type=""
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setSimulate(e.target.value);
                        }}
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{ width: "60%" }}
                      />
                    </ThemeProvider>
                  </FormControl>
                </div>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} >
              <ThemeProvider theme={themechangetheme}>
                <div className="phonefield">
                  <FormControl>
                    <ThemeProvider theme={themechangetheme}>
                      <label style={{ color: "#67737A" }}>Component Selection*</label><br></br>
                      <TextValidator
                        id="component"
                        value={componenet_selection_p}
                        type=""
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setComponent(e.target.value);
                        }}
                        variant="filled"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        style={{ width: "60%" }}
                      />
                    </ThemeProvider>
                  </FormControl>
                </div>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12}>

              <h4 className="phonefields">*enter the field which is relevant for you</h4>
            </Grid>


            <Grid item xs={8} md={4} lg={2}>
              <div className="buttonsubnit">
                <Button
                  type="submit"
                  style={{
                    color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                    fontWeight: "bold", fontSize: 20, lineHeight: "25px"
                  }}
                  className="addactivityyes"

                >Submit{isSoftwareInserting && <EditingLoadingScreen />}</Button>
              </div>
            </Grid>
          </Grid>

        </ValidatorForm>
      </Grid>
      <Grid item xs={7} md={10} lg={12} style={{ marginLeft: "10%" }}>
        <Box pt={4}>
          <br></br>
          <br></br>
          <Copyright />
          <br />
        </Box>
      </Grid>
      {softwaresubmit ? open = true : open = false}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{

          backdropFilter: "blur(8px)",
        }}
      >
        <div style={{ backgroundColor: "#202328", color: "white", width: 500 }}>
          <DialogTitle style={{ marginLeft: '30%', fontSize: 100, fontWeight: "bold", color: "#67737a" }}>Successful!</DialogTitle>
          <ThemeProvider theme={themechangetheme}>
            <DialogContent>
              <ThemeProvider theme={themechangetheme}>
                <DialogContentText id="alert-dialog-description">
                  <p style={{ marginLeft: '16%', fontSize: 20, color: "#d4dce1" }}>Report Submitted Thank You!</p>
                </DialogContentText>
              </ThemeProvider>
            </DialogContent>
          </ThemeProvider>
          <DialogActions>
            <Link style={{ textDecoration: "none" }} to="/main/dailyreport">

              <Button className="addactivityyes"
                style={{
                  color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish",
                  fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", width: 300, marginRight: 100
                }}>
                Go to DailyReport
              </Button>
            </Link>
          </DialogActions>
        </div>
      </Dialog>
    </main>
  );
};

export default SettingsDemo;
