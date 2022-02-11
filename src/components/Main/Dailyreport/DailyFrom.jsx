import React, { useState } from "react";
import { makeStyles, Button, Paper } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStoreState, useStoreActions } from "easy-peasy";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import Copyright from "../../UI/Copyrights";
import { MenuItem } from "@material-ui/core";
import EditingLoadingScreen from "../../UI/EditingLoadingScreen";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import "./form.css";
import Notfilled from "./Formnotfilled/notfilled"
import { useHistory } from 'react-router-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  ValidatorForm,
  SelectValidator
} from "react-material-ui-form-validator";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  palette: {
    type: "white",
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
  formElementWidth: {
    width: 180,
  },
  formElementsWidth: {
    width: 269,
    height: 57
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  paperStyling: {

    marginTop: "4%",
    marginRight: "4%",
    backgroundColor: "#202328",
    paddingTop: "5%",
    padding: "8%"
  },
  paperStyling1: {
    color: "#67737A",
    backgroundColor: "#202328",
    boxShadow: "none"
  },
  radio: {
    color: "#d4dce1",
    '&$checked': {
      color: '#2D9CDB',
    }
  },
  checked: {}
}));

const themechangetheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

function DailyFrom() {
  let now = new Date();
  var defaultDate = now - 1000 * 60 * 60 * 24 * 1;
  let alter_user_id = useStoreState((state) => state.authMod.user_id);
  let { type: alterType } = useStoreState((state) => state.authMod);
  const [date, setSelectedDate] = useState(new Date(defaultDate));
  let { type } = useStoreState((state) => state.profileMod.profile);
  let isInserting = useStoreState((state) => state.dailyformMod.isInserting);
  let submit = useStoreState((state) => state.dailyformMod.submit);
  let updateform1 = useStoreActions(
    (state) => state.dailyformMod.POST_FORM1_START
  );
  let [sem, setSem] = useState("");
  const [value, setValue] = useState("management");
  let [management] = useState("");
  let [software] = useState("");
  let [productdesign] = useState("");
  let [prefinalyears] = useState("");
  let history = useHistory();
  const [openLeaveModal, setLeaveModalOpen] = useState(false);
  if (value == "management") {
    management = value;
  } else if (value == "software") {
    software = value;
  }
  if (value == "productdesign") {
    productdesign = value;
  } else if (value == "prefinalyears") {
    prefinalyears = value;
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleLeaveModalOpen = () => {
    setLeaveModalOpen(true);
  };

  const handleLeaveModalClose = () => {
    setLeaveModalOpen(false);
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  let success = value;
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />

      {/* <Paper className={classes.paperStyling}> */}

      <Grid container xs={12} md={8} lg={9} xl={10} sm={10} className="dailyform">
        <Grid container spacing={4}>
          <Grid item md={6} lg={6} style={{ marginBottom: "3%" }}>
            <div className="dailyhead">Athrv-Ed Daily Report</div>
            <br />
            <div className="dailytitle">Fill out the report given below everyday,
              for<br></br> tracking your productivity and performance</div>
          </Grid>
        </Grid>
        <Notfilled
          open={openLeaveModal}
          handleClose={handleLeaveModalClose}
        />

        <ValidatorForm
          onSubmit={(e) => {
            e.preventDefault();
            updateform1({
              date,
              sem: sem,
              management,
              software,
              productdesign,
              prefinalyears,
            });
          }}
        >
          <Grid className="dailyreportpending">
            <div >
              {type === "A" ? (
                <Button
                  href="#text-buttons"
                  style={{
                    color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                    fontWeight: "bold", fontSize: 20, lineHeight: "25px"
                  }}
                  onClick={handleLeaveModalOpen}
                  className="addactivityyes"
                >
                  Pending List
                </Button>
              ) : null}
            </div>
          </Grid>
          <div className="dailyforms">
            <Grid container spacing={5}>
              <Grid item xs={9} md={4} lg={3}>
                <ThemeProvider theme={themechangetheme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={themechangetheme}>
                      <KeyboardDatePicker
                        disabled
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date"
                        type=""
                        value={date}
                        inputVariant="filled"
                        InputProps={{
                          disableUnderline: true,
                        }}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                        className="date-picker"
                        fullWidth={true}
                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
              </Grid>

              <Grid container spacing={6}>
                <Grid item xs={11} md={4} lg={4}>
                  <div className="space">
                    <p className="grey">Semester</p>
                    <FormControl fullWidth={true}>
                      <ThemeProvider theme={themechangetheme}>
                        <SelectValidator
                          placeholder="Choose your Semester"
                          size="small"
                          variant="outlined"
                          validators={["required"]}
                          errorMessages={["This field is required"]}
                          id="demo-simple-select"
                          value={sem}
                          style={{ backgroundColor: "#202328" }}
                          onChange={(e) => {
                            setSem(e.target.value);
                          }}
                          id="ter"
                        >
                          <MenuItem value={1} >1</MenuItem>
                          <MenuItem value={2} >2</MenuItem>
                          <MenuItem value={3} >3</MenuItem>
                          <MenuItem value={4} >4</MenuItem>
                          <MenuItem value={5} >5</MenuItem>
                          <MenuItem value={6} >6</MenuItem>
                          <MenuItem value={7} >7</MenuItem>
                          <MenuItem value={8} >8</MenuItem>
                          {type === "A" ? (
                            <MenuItem value={0}>Other</MenuItem>) : null}
                        </SelectValidator>
                      </ThemeProvider>
                    </FormControl>
                  </div>
                </Grid>
              </Grid>

              <Grid item xs={12}>

                <FormControl component="fieldset">
                  <p className="grey">Domain</p>
                  <RadioGroup
                    aria-label="Domain"
                    name="Domain"
                    value={value}
                    onChange={handleChange}
                    style={{ color: "#D4DCE1" }}
                  >
                    <FormControlLabel
                      value="management"
                      control={<Radio color="#2D9CDB" classes={{ root: classes.radio, checked: classes.checked, color: "#D4DCE1" }} />}
                      label="Management"
                    />
                    <FormControlLabel
                      value="software"
                      control={<Radio color="#2D9CDB" classes={{ root: classes.radio, checked: classes.checked, color: "#D4DCE1" }} />}
                      label="Software"
                    />
                    <FormControlLabel
                      value="productdesign"
                      control={<Radio color="#2D9CDB" classes={{ root: classes.radio, checked: classes.checked, color: "#D4DCE1" }} />}
                      label="Product Design"
                    />
                    <FormControlLabel
                      value="prefinalyears"
                      control={<Radio color="#2D9CDB" classes={{ root: classes.radio, checked: classes.checked, color: "#D4DCE1" }} />}
                      label="Placement Preparation"
                    />
                  </RadioGroup>
                </FormControl>

              </Grid>

              <Grid item xs={8} md={4} lg={2}>
                <Button
                  type="submit"
                  value="Submit"
                  variant="contained"
                  style={{
                    color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                    fontWeight: "bold", fontSize: 20, lineHeight: "25px"
                  }}
                  className="addactivityyes"
                  fullWidth={true}
                >
                  Next
                  {isInserting && <EditingLoadingScreen />}
                </Button>
              </Grid>

              {submit ? (
                history.push(`/main/dailyreport-${success}`)
              ) : null}
            </Grid>
          </div>
        </ValidatorForm>
      </Grid>

      {/* </Paper> */}

      <Grid item xs={7} md={10} lg={12} style={{ marginLeft: "10%", }}>
        <br></br><br></br>
        <Box pt={4}>

          <Copyright />
          <br />
        </Box>
      </Grid>
    </main >

  );
}

export default DailyFrom;
