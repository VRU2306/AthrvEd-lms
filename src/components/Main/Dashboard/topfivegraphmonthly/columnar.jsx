import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";

import "./column.css";

// import Heading from "./Heading.png";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import { useStoreActions, useStoreState } from "easy-peasy";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        overflow: "auto",
        backgroundColor: "#202328",
        borderRadius: "8px",
        // marginLeft: 20,

    },
    container: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),

    },
    paper: {
        paddingTop: theme.spacing(1),
        padding: theme.spacing(1),
        display: "flex",
        backgroundColor: "#A3AAAE",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedWidth: {
        maxWidth: "40vw",
        overflow: "auto",
    },
    paperStyling: {
        padding: 20,
        backgroundColor: "#202328",
        borderRadius: "8px",
    },
    formElementWidth: {
        width: 250,
        backgroundColor: "#A3AAAE",
    },
    formFullWidth: {
        width: "100%",
    },
}));


const Columnar = () => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const d = new Date();

    let istopfivemonthfetching = useStoreState((state) => state.authMod.istopfivemonthfetching)
    let istopfivemonthinserting = useStoreState(state => state.authMod.istopfivemonthinserting);
    let topfivemonth = useStoreActions((action) => action.authMod.FETCH_TOPFIVEMONTH)
    let cleartopfivemonth = useStoreActions((action) => action.authMod.CLEAR_TOPFIVEMONTH)

    useEffect(() => {
        if (istopfivemonthfetching) topfivemonth();
        return () => cleartopfivemonth();
    }, [topfivemonth, cleartopfivemonth]);

    const topfivemonths = useStoreState(state => state.authMod.topfivemonth);




    // 
    let users = useStoreState(state => state.authMod.users);

    let isunblockedusersfetching = useStoreState((state) => state.authMod.isunblockedusersfetching)
    let getunBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_UNBLOCKEDSERS)
    let clearunBlockedUsers = useStoreActions((action) => action.authMod.CLEAR_UNBLOCKED)

    useEffect(() => {
        if (isunblockedusersfetching) getunBlockedusers(users);
        return () => clearunBlockedUsers();
    }, []);
    let unblocked = useStoreState(state => state.authMod.unblocked);
    // profileloading
    let isProfileLoading = useStoreState(state => state.profileMod.isFetching);

    let getProfile = useStoreActions(
        action => action.profileMod.FETCH_PROFILE_START
    );
    let fetchAttendanceReset = useStoreActions(
        action => action.attendence.FETCH_ATTENDENCE_REQUEST
    );

    useEffect(() => {


        // if(isLeavesetching)
        // Revokelist();
        if (isProfileLoading) getProfile();
        return () => fetchAttendanceReset();
    }, []);


    function getname(name) {
        const userinfo = unblocked.filter(users => users.user_id === name)
        const fname = userinfo.map(x => x.fname)

        return fname;
    }
    const firsat = topfivemonths.map(row => (
        getname(row.user_id)
    ))


    // data
    let diff = topfivemonths.map(row => row.dailyreport_total.hours)




    const data1 = {
        labels: firsat,
        datasets: [

            {
                label: "Total Working Hours",
                borderColor: "#A3AAAE",
                data: diff,
                backgroundColor: ["#B36BC5", "#B36BC5", "#B36BC5", "#B36BC5", "#B36BC5"],
                hoverBackgroundColor: '#B36BC5'
            },


        ]

    }

    const options1a = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            position: 'bottom',
            display: true,
            labels: {
                fontColor: '#A3AAAE',
                fontSize: 15,
                fontStyle: "bold",
                fontFamily: "Mulish",
            },

        },


        title: {
            display: true,
            fontSize: 15,
            fontColor: "#A3AAAE",

        },

        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        fontColor: "#A3AAAE"

                    },
                    gridLines: {
                        display: true,
                        color: "#67737A",
                        lineWidth: 2
                    },
                }
            ],

            xAxes: [
                {
                    ticks: {
                        fontColor: "#A3AAAE"
                    },
                    gridLines: {
                        display: true,
                        color: "#67737A",
                        lineWidth: 2
                    },

                }
            ],

        }


    }


    const classes = useStyles();
    return (

        <main className={classes.content} >


            <Paper className={classes.paperStyling}>


                {/* <div id="headingweeks" style={{ textAlign: 'center', color: "#D4DCE1" }}><h4>TOP FIVE MONTHLY REPORT <br></br>({(monthNames[d.getMonth() - 1])}  {new Date().getFullYear()})</h4></div> */}
                <div id="headingweeks" style={{ textAlign: 'center', color: "#D4DCE1" }}><h4>TOP FIVE MONTHLY REPORT <br></br>(For past one month)</h4></div>
                <div>
                    <Bar width="200" height="300" data={data1} options={options1a}></Bar>
                </div>

            </Paper>
        </main >


    );
};

export default Columnar;