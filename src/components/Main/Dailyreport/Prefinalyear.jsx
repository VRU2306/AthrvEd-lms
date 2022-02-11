import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Paper, FormControl, Box } from "@material-ui/core";
import { useStoreState, useStoreActions } from "easy-peasy";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom'
import Copyright from "../../UI/Copyrights";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import EditingLoadingScreen from "../../UI/EditingLoadingScreen";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import "./form.css"
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
  formElementWidth2: {
    width: 315,
    height: 57,
    marginLeft: 50
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
const Prefinalyear = () => {
  let isPrefinalyearsinserting = useStoreState(state => state.dailyformMod.isPrefinalyearsinserting);
  let data = useStoreState(state => state.dailyformMod.data)
  let prefinalsubmit = useStoreState(state => state.dailyformMod.prefinalsubmit)
  let updatePrefinal = useStoreActions(
    action => action.dailyformMod.POST_PREFINAL_START
  );
  let [date] = useState("");
  let [category_1_f, setCategory1] = useState("");
  let [category_2_f, setCategory2] = useState("");
  let [workdescription_f, setWorkdescription] = useState("");
  let [tutorial_f, setTutorial] = useState("00:00");
  let [codingtest_online_f, setOnline] = useState("00:00");
  let [codingtest_offline_f, setOffline] = useState("00:00");
  let [implementation_f, setImplement] = useState("00:00");
  let [apti_f, setAptitude] = useState("00:00");
  let [discussion_f, setDiscuss] = useState("00:00");
  let [revision_f, setRevise] = useState("00:00");
  let [errordebugging_f, setErrordebug] = useState("00:00");
  let [open, setOpen] = React.useState(false);
  date = data.date;

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Grid container xs={12} md={8} lg={9} xl={10} sm={10} className="dailyformpre">
        <ValidatorForm
          onSubmit={event => {
            event.preventDefault();
            updatePrefinal({
              date,
              category_1_f,
              category_2_f,
              workdescription_f,
              tutorial_f,
              implementation_f,
              errordebugging_f,
              codingtest_online_f,
              codingtest_offline_f,
              apti_f,
              revision_f,
              discussion_f

            });
          }}
        >

          <Grid container spacing={4}>
            <Grid item md={6} lg={5}>
              <h3 className="Subdomain">Sub Domain</h3>
            </Grid>
          </Grid>

          <Grid container spacing={5}>
            <Grid item xs={12} md={4} lg={4}>
              <ThemeProvider theme={themechangetheme}>
                <FormControl fullWidth={true}>
                  <ThemeProvider theme={themechangetheme}>
                    <Autocomplete
                      defaultValue={category_1_f}
                      id="profile-branch"
                      className="subdomainfield"
                      onChange={(event, value) => {
                        setCategory1(value);
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
                          value={category_1_f}
                          {...params}
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          variant="outlined"
                          type=""
                          placeholder="Choose your Domain 1"
                          fullWidth
                        />
                      )}
                    />
                  </ThemeProvider>
                </FormControl>
              </ThemeProvider>
            </Grid>

            <Grid item xs={12} md={4} lg={4}>
              <ThemeProvider theme={themechangetheme}>
                <FormControl fullWidth={true}>
                  <ThemeProvider theme={themechangetheme}>
                    <Autocomplete
                      defaultValue={category_2_f}
                      id="profile-branch"
                      className="subdomainfield"
                      onChange={(event, value) => {
                        setCategory2(value);
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
                          value={category_2_f}
                          {...params}
                          variant="outlined"
                          placeholder="Choose your Domain 2"
                          type=""
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
                        value={workdescription_f}
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

            <Grid item xs={12} lg={3}>
              <ThemeProvider theme={themechangetheme}>
                <div className="phonefield">
                  <FormControl>
                    <ThemeProvider theme={themechangetheme}>
                      <label style={{ color: "#67737A" }}>Tutorial*</label><br></br>
                      <TextValidator
                        id="learning"
                        value={tutorial_f}
                        type=""
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setTutorial(e.target.value);
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
                        value={implementation_f}
                        type=""
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
                      <label style={{ color: "#67737A" }}>Error Debugging*</label><br></br>
                      <TextValidator
                        id="planning"
                        value={errordebugging_f}
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
                      <label style={{ color: "#67737A" }}>Coding Test Online*</label><br></br>
                      <TextValidator
                        id="planning"
                        value={codingtest_online_f}
                        type=""
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setOnline(e.target.value);
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
                      <label style={{ color: "#67737A" }}>Coding Test Offline*</label><br></br>
                      <TextValidator
                        id="planning"
                        value={codingtest_offline_f}
                        type=""
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setOffline(e.target.value);
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
                      <label style={{ color: "#67737A" }}>Aptitude*</label><br></br>
                      <TextValidator
                        id="discussion"
                        value={apti_f}
                        type=""
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setAptitude(e.target.value);
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
                      <label style={{ color: "#67737A" }}>Revision*</label><br></br>
                      <TextValidator
                        id="discussion"
                        value={revision_f}
                        type=""
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setRevise(e.target.value);
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
                        value={discussion_f}
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

                >Submit{isPrefinalyearsinserting && <EditingLoadingScreen />}</Button>
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
      {/* submits */}

      { prefinalsubmit ? open = true : open = false}
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
    </main >
  );
};

export default Prefinalyear;
