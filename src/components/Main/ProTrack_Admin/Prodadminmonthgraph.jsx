import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Pie } from "react-chartjs-2";
import "./Productivityadmin.css";
import { useStoreActions, useStoreState } from "easy-peasy";
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
    paperStyling: {
        padding: 20,
    },
    formElementWidth: {
        width: 250,
    },
    formFullWidth: {
        width: "100%",
    },
}));

function Prodadminmonthgraph() {

    let isunblockedusersfetching = useStoreState((state) => state.authMod.isunblockedusersfetching)
    let getunBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_UNBLOCKEDSERS)

    useEffect(() => {
        if (isunblockedusersfetching) getunBlockedusers();
    }, [getunBlockedusers]);
    let unblocked = useStoreState(state => state.authMod.unblocked);
    function getname(name) {
        const userinfo = unblocked.filter(users => users.user_id == name)
        const fname = userinfo.map(x => x.fname)
        const lname = userinfo.map(x => x.lname)
        return fname + lname;
    }


    let isproadminfetching = useStoreState((state) => state.authMod.isproadminMonthfetching)
    let pordadmin = useStoreActions((action) => action.authMod.POSTS_PRODU_MONTH_START_YEAR)
    let cleartodayleave = useStoreActions((action) => action.authMod.CLEAR_ADMINMONTH)

    useEffect(() => {
        if (isproadminfetching) pordadmin();
        return () => cleartodayleave();
    }, [pordadmin, cleartodayleave]);
    const prodadminmonthss = useStoreState(state => state.authMod.prodadminmonth);
    //console.log(prodadminmonthss)
    const firs = prodadminmonthss.slice(0, 9).reverse()
    //console.log(firs)

    const first = firs.map(row => (
        getname(row.user_id)
    ))
    //console.log(first)

    let diff = firs.map(row => (parseFloat(Math.abs(row.dif.hours)) + (parseFloat(Math.abs((row.dif.minutes) * (1 / 60)))) + (parseFloat(Math.abs((row.dif.seconds) * (1 / 3600))))))
    //console.log(diff)

    const data1 = {

        labels: first,
        datasets: [
            {
                label: "Difference in time",
                data: diff,
                backgroundColor: ["#FF5555", "#FF852D", "#A8C256", "#8C9CE3", "#8E6352"]

            },


        ]


    }

    const options1a = {

        segmentShowStroke: false,
        maintainAspectRatio: false,

        title: {
            display: true,
            text: 'Bottom 5 Users',
            textAlign: "left",
            fontSize: 20,
            fontColor: "#D4DCE1",

        },
        legend: {
            position: 'bottom',
            display: true,
            labels: {
                fontColor: '#A3AAAE',
                fontSize: 15,
                fontStyle: "bold",
                fontFamily: "Mulish",
            },

        }

    }

    const classes = useStyles();



    return (

        <div>
            <div className="adminmonthgraph">
                <Pie data={data1} options={options1a} />
            </div>
        </div>
    )

};

export default Prodadminmonthgraph;


