import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { Button, Paper, FormControl, Box } from "@material-ui/core";
import Copyright from "../../UI/Copyrights";
import { useStoreState, useStoreActions, useStore } from "easy-peasy";
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
    display: "flex",
    marginLeft: "5vh"
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
const Product = () => {
  let isProductInserting = useStoreState(state => state.dailyformMod.isProductInserting);
  let data = useStoreState(state => state.dailyformMod.data)
  let productsubmit = useStoreState(state => state.dailyformMod.productsubmit)
  let updateProduct = useStoreActions(
    action => action.dailyformMod.POST_PRODUCT_START
  );
  let [date] = useState("");
  let [category_g, setCategory] = useState("");
  let [randd_g, setRandd] = useState("00:00");
  let [learning_g, setlearning] = useState("00:00");
  let [implementation_g, setImplement] = useState("00:00");
  let [discussion_g, setDiscuss] = useState("00:00");
  let [planning_g, setPlanning] = useState("00:00");
  let [workdescription_g, setWork] = useState("")
  let [open, setOpen] = React.useState(false);

  date = data.date;

  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Grid container xs={12} md={8} lg={9} xl={10} sm={10} className="productdes">
        <ValidatorForm
          onSubmit={event => {
            event.preventDefault();
            updateProduct({
              date,
              category_g,
              workdescription_g,
              randd_g,
              learning_g,
              implementation_g,
              planning_g,
              discussion_g
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
                      defaultValue={category_g}
                      id="profile-branch"
                      type=""
                      className="subdomainfield"
                      onChange={(event, value) => {
                        setCategory(value);
                      }}
                      options={[
                        "Product Design",
                        "Graphic Design",
                        "3D Printing",
                        "Digital Marketing and Analytics",

                      ]}
                      filterSelectedOptions
                      renderInput={params => (
                        <TextValidator
                          value={category_g}
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
                        value={workdescription_g}
                        onChange={e => {
                          setWork(e.target.value);
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
                      <label style={{ color: "#67737A" }}>Reasearch and Development*</label><br></br>
                      <TextValidator
                        id="time"
                        value={randd_g}
                        type=""
                        validators={["matchRegexp:^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"]}
                        errorMessages={["Enter in HH:MM"]}
                        onChange={e => {
                          setRandd(e.target.value);
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

            <br></br>

            <Grid item xs={12} lg={3}>
              <ThemeProvider theme={themechangetheme}>
                <div className="phonefield">
                  <FormControl>
                    <ThemeProvider theme={themechangetheme}>
                      <label style={{ color: "#67737A" }}>Learning*</label><br></br>
                      <TextValidator
                        id="learning"
                        value={learning_g}
                        type=""
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
                        value={implementation_g}
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
                      <label style={{ color: "#67737A" }}>Planning*</label><br></br>
                      <TextValidator
                        id="planning"
                        value={planning_g}
                        type=""
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
                        value={discussion_g}
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

                >Submit{isProductInserting && <EditingLoadingScreen />}</Button>
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
      {/* submit */}
      {productsubmit ? open = true : open = false}
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

export default Product;
