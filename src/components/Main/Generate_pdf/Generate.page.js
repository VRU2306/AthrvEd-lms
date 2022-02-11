import React, { useState, useEffect } from "react";
import "./Generate.style.css";
import axios from "axios";
import { saveAs } from "file-saver";
import { useStoreState, useStoreActions } from "easy-peasy";
import Box from "@material-ui/core/Box";
import Copyright from "../../UI/Copyrights";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Button, FormControl, } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import LoadingContainerPdf from "../../UI/Pdfloadingcontainer";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    paddingTop: theme.spacing(4),
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 300,
  },
  fixedWidth: {
    maxWidth: "40vw",
    overflow: "auto",
  },

  formElementWidth: {
    width: 250,
  },
  formFullWidth: {
    width: "100%",
  },
}));

// Set the time out accoriding to your wish , i have made the axios calls
/*
  Task Left
  1.Set the user-id's according to the username - Admin Type 
  2.Set The user-type and id - For User Only 

  Write a component did mouth and set the User-type and Id for the user view
  For the info of the users in Admin view - Use the use the generate pdf and map all the users to the given user name or make an input that selects all user , according to your wish 
  
*/

const Generatepdf = () => {

  let user_id = useStoreState((state) => state.profileMod.profile.user_id);
  let alter_user_id = useStoreState((state) => state.authMod.user_id);
  let { type } = useStoreState((state) => state.profileMod.profile);
  let { type: alterType } = useStoreState((state) => state.authMod);
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
  const [loading, setloading] = useState(false);
  let users = useStoreState(state => state.authMod.users);

  let isunblockedusersfetching = useStoreState((state) => state.authMod.isunblockedusersfetching)
  let getunBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_UNBLOCKEDSERS)
  let clearunBlockedUsers = useStoreActions((action) => action.authMod.CLEAR_UNBLOCKED)

  useEffect(() => {
    if (isunblockedusersfetching) getunBlockedusers(users);
    return () => clearunBlockedUsers();
  }, []);

  var All = useStoreState((state) => state.authMod.unblocked);
  const [user_Id, SetuserId] = useState(user_id)
  // console.log(All)
  const select = All.filter(All => All.user_id == user_Id)
  // console.log(select)
  const faname = select.map(x => x.fname)
  // console.log(faname)

  if (type == "A" || alterType == "A") {
    All = All.map(({ user_id, lname, fname }) => ({
      user_id: user_id,
      value: fname + " " + lname,
    }));
  }

  const createDownloadPdf = () => {
    const res = {
      user_wise: "No", //Add the user id's in here ,
      startdate: StartDate,
      enddate: EndDate,
    };
    // console.log(userId);
    if (type == "U") {
      res.info = [{ user_id: user_id }];
    } else if (type == "A") {
      res.info = [{ user_id: user_Id }];
    }

    setloading(true);
    // setInterval(() => {
    //   setloading(false);
    // }, 10000 * 1);

    const token = localStorage.getItem("token");
    axios.defaults.headers["x-auth-token"] = token;
    axios
      .post("/create_pdf", res)
      .then(console.log("PDF generated"))
      .catch((res) => {
        // console.log(res);
      })
      .then(() => {
        axios.get("/fetch-pdf", { responseType: "blob" }).then((res) => {
          const pdfBlob = new Blob([res.data], { type: "application/pdf" });
          saveAs(pdfBlob, "Performance Report.pdf");
          setloading(false);
        });
      })
  };

  const generatePDF = () => {
    setloading(true);
    setInterval(() => {
      setloading(false);
    }, 1000 * 1);

    const token = localStorage.getItem("token");
    axios.defaults.headers["x-auth-token"] = token;

    const res = {
      user_wise: "Yes",
      info: [],
      startdate: StartDate,
      enddate: EndDate,
    };

    axios
      .post("/create_pdf", res)
      .then(console.log("PDF generated"))
      .then(() => {
        const value = prompt(
          "Do you want to send the mail to all the users (Yes / No ) "
        );
        if (value === "yes" || value === "Yes" || value === "YES") {
          const token = localStorage.getItem("token");
          axios.defaults.headers["x-auth-token"] = token;
          axios.post("/mail_pdf", { mail: "Yes" }).then(() => {
            setloading(false);
          });
        }
      });
  };

  const classes = useStyles();
  // console.log(All);
  return (
    <main className={classes.content}>
      <div className="bacs">
        <div className={classes.appBarSpacer} />

        <Grid container xs={10} md={8} lg={9} xl={10} sm={10} className="generate">
          <Grid item xs={7} md={10} lg={10}>
            <Box pt={4}>
              {loading ? (
                <LoadingContainerPdf isLoading={loading} />
              ) : (
                <div>
                  <div className="Generatepdf">Generate PDF</div>
                  <p className="Generatetext">Generates an activity report between the time intervals that you specify</p>
                  <ValidatorForm onSubmit={createDownloadPdf}>
                    <ThemeProvider theme={defaultMaterialTheme}>

                      <FormControl className={classes.dateBox}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                          <div className="startdateer">
                            <br></br>
                            <br></br>
                            <p className="startdateers"> StartDate</p>
                            <KeyboardDatePicker
                              margin="normal"
                              size="small"

                              id="date-picker-dialog"
                              label=" Start Date"
                              format="dd/MM/yyyy"
                              style={{ backgroundColor: "#67737A", width: 200 }}
                              inputVariant="filled"
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
                          <div className="enddateer">
                            <br></br>
                            <br></br>
                            <p className="enddateers">EndDate</p>
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              size="small"
                              label=" End Date"
                              format="dd/MM/yyyy"
                              style={{ backgroundColor: "#67737A", width: 200 }}
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
                        <div className="nameselector">

                          {type === "A" ? (
                            <div>
                              <ThemeProvider theme={defaultMaterialTheme}>
                                <p className="namevalue">Name</p>
                                <br></br>
                                <select
                                  style={{
                                    backgroundColor: "#67737A",
                                    cursor: "pointer",
                                    color: "#D4DCE1", width: 250, fontFamily: 'Mulish', fontSize: 18, padding: 10
                                  }}
                                  label="Select Name"
                                  // type="text"
                                  value={user_Id}
                                  onChange={(e) => SetuserId(e.target.value)}

                                >
                                  {All.map((ele) => (
                                    <option value={ele.user_id}>{ele.value}</option>
                                  ))}

                                </select>
                              </ThemeProvider>
                            </div>
                          ) : null}
                        </div>
                      </FormControl>

                      <div className="genertae">
                        <h5 className="suggest">P.S : Please wait Until the PDF Generates</h5>
                        <br></br>
                        <Button type="submit" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                          className="Generator" >
                          Generate
                        </Button>
                      </div>
                    </ThemeProvider>
                  </ValidatorForm>
                </div>
              )}

            </Box>
          </Grid>

        </Grid>

        <Grid item xs={7} md={10} lg={12} style={{ marginLeft: "10%" }}>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Grid>
      </div>
    </main >
  );
};

export default Generatepdf;
