import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useStoreState, useStoreActions } from "easy-peasy";
import Prodadminweek from "./Prodadminweek";
import Prodadminmonthlytable from "./Prodadminmonthlytable";
import Prodadminyearlytable from "./Prodadminyearlytable";
import Prodadminmonthgraph from "./Prodadminmonthgraph";
import Prodadminyeargraph from "./Prodadminyeargraph";
import "./Productivityadmin.css";
import Productivityadmintable from "./Prodadminyearlytable";
// import 'date-fns';
import DateFnsUtils from "@date-io/date-fns";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Copyright from "../../UI/Copyrights";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    backgroundColor: "#0F1012"

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

  // paperStyling1: {
  //   marginTop: 54,
  //   marginLeft: 300,
  //   marginRight: 54,
  //   marginBottom: 16,
  //   paddingBottom: 300,
  //   backgroundColor: "#202328"

  // },

  // paperStyling2: {
  //   marginLeft: 300,
  //   marginRight: 54,
  //   marginBottom: 16,
  //   backgroundColor: "#202328",
  //   paddingBottom: 50

  // },

  // paperStyling3: {
  //   marginLeft: 300,
  //   marginRight: 54,
  //   marginBottom: 20,
  //   paddingBottom: 15,
  //   backgroundColor: "#202328"

  // },


  formElementWidth: {
    width: 250,
  },

  formFullWidth: {
    width: "100%",
  },
}));

const useStyletable = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});


const Productivityadmin = ({ row }) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  function createData(userid, name, whlms, whprotrack, diff) {
    return { userid, name, whlms, whprotrack, diff };
  }

  const rows = [
    createData(),

  ];
  const d = new Date();
  let isproadminYearfetching = useStoreState((state) => state.authMod.isproadminYearFetching)
  let pordadminyear = useStoreActions((action) => action.authMod.POSTS_PRODU_ADMIN_START_YEAR)
  let clearadminyear = useStoreActions((action) => action.authMod.CLEAR_ADMINMONTH)

  useEffect(() => {
    if (isproadminYearfetching) pordadminyear();
    return () => clearadminyear();
  }, [pordadminyear, clearadminyear]);
  let prodadminyear = useStoreState(state => state.authMod.prodadminyear);
  //console.log(prodadminyear)
  // 
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className="bacs">
        <div className={classes.appBarSpacer} />

        {/* <Container maxWidth="lg" className={classes.container}> */}
        <Paper style={{ backgroundColor: "#202328" }} className="paperStyling1">

          <div>
            <div id="heading1">
              <p style={{ color: "#D4DCE1" }}>
                Weekly Report
              </p>
            </div>
            <Prodadminweek />
          </div>

        </Paper>


        <Paper style={{ backgroundColor: "#202328" }} className="paperStyling2">

          <div>
            <div id="heading2">
              <p style={{ color: "#D4DCE1" }}>
                Monthly Report : ({(monthNames[d.getMonth() - 1])}{new Date().getFullYear()})
              </p>

            </div>
            <Prodadminmonthlytable />
            <Prodadminmonthgraph />
          </div>

        </Paper>



        <Paper style={{ backgroundColor: "#202328" }} className="paperStyling2">

          <div>
            <div id="heading3">
              <p style={{ color: "#D4DCE1" }}>Yearly Report : {new Date().getFullYear()}</p>
            </div>

            <Prodadminyearlytable />
            <Prodadminyeargraph />
          </div>
        </Paper>

        {/* </Container> */}

      </div>
      <Grid item xs={7} md={10} lg={12} style={{ marginLeft: "10%" }}>
        <Box pt={4}>
          <br></br>
          <br></br>
          <Copyright />
          <br />
        </Box>
      </Grid>
    </main>
  )

};

export default Productivityadmin;


