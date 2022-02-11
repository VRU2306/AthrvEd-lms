import React, { useState } from "react";
import "./Productivityuser.css";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useStoreActions, useStoreState } from "easy-peasy";
import Productivityweekuser from "./Produserweek";
import Productivitymonthuser from "./Produsermonth";
import Productivityyearuser from "./Produseryear";
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
        // paddingTop: theme.spacing(2),
        // paddingBottom: theme.spacing(2),
    },
    Paper: {
        paddingTop: theme.spacing(2),
        // padding: theme.spacing(2),
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
    //     paddingBottom: 80,
    //     // marginBottom: 16,
    //     marginTop: 60,
    //     marginRight: 54,
    //     marginLeft: 300,
    //     backgroundColor: "#202328"

    // },

    // paperStyling2: {
    //     paddingBottom: 80,
    //     marginBottom: 16,
    //     marginRight: 54,
    //     marginLeft: 300,
    //     backgroundColor: "#202328"

    // },

    // paperStyling3: {
    //     paddingBottom: 80,
    //     marginRight: 54,
    //     marginLeft: 300,
    //     marginBottom: 20,
    //     backgroundColor: "#202328"

    // },
    formElementWidth: {
        width: 250,
    },
    formFullWidth: {
        width: "100%",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginTop: 3
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }

}));


const Productivityuser = () => {

    const classes = useStyles();

    return (
        //<div className = "grid-container">
        <main className={classes.content}>
            <div className="back">
                <div className={classes.appBarSpacer} />
                {/* 
                <Container maxWidth="lg" className={classes.container}> */}
                <Paper className="paperStyling1" style={{ backgroundColor: "#202328" }}>

                    <Productivityweekuser />
                </Paper>


                <Paper className="paperStyling2" style={{ backgroundColor: "#202328" }}>
                    <Productivitymonthuser />


                </Paper>


                <Paper className="paperStyling2" style={{ backgroundColor: "#202328" }}>
                    <Productivityyearuser />

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
        </main >


    );
};

export default Productivityuser;