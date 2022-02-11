import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "./Productivityuser.css";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import moment from "moment"
import { Divider } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"


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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginTop: 3
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    }

}));


const themechangedate = createMuiTheme({
    palette: {
        type: "dark"
    }
})

function Productivityweekuser({ row }) {

    const [start_date, setStartDate] = useState(new Date() || new Date("2000-01-01"));
    const [end_date, setEndDate] = useState(new Date() || new Date("2000-01-01"));
    let isproduserweekFetching = useStoreState(state => state.authMod.isproduserweekFetching)
    let produserweek = useStoreActions(action => action.authMod.POST_PRODU_USER_START_WEEK);
    ////console.log(produserweek)
    let submit = useStoreState(state => state.authMod.Successfullsweek)
    const [value, setValue] = useState("submit");
    let success = value;
    let porduserweeks = useStoreState(state => state.authMod.produserweek)
    ////console.log(porduserweeks)
    // let produserweek = useStoreActions(
    //     (state) => state.dailyformMod.LEAVECOUNT_YEARLY_USER_START)

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    //diff

    let diff = porduserweeks.map(row => (parseFloat(Math.abs(row.dif.hours)) + (parseFloat(Math.abs((row.dif.minutes) * (1 / 60)))) + (parseFloat(Math.abs((row.dif.seconds) * (1 / 3600))))))
    //console.log(diff)
    let c1 = Math.abs(diff[0]);
    let c2 = Math.abs(diff[1]);
    let c3 = Math.abs(diff[2]);
    let c4 = Math.abs(diff[3]);
    let c5 = Math.abs(diff[4]);
    let c6 = Math.abs(diff[5]);
    let c7 = Math.abs(diff[6]);
    //console.log(c1, c2, c3, c4, c5, c6, c7)


    //dailyrepoert total
    let daily = porduserweeks.map(row => (parseFloat(row.dailyreport_total.slice(0, -6)) + (parseFloat(row.dailyreport_total.slice(3, -3) * (1 / 60))) + (parseFloat(row.dailyreport_total.slice(6) * (1 / 3600)))))
    //console.log(daily)
    const a1 = daily[0]
    const a2 = daily[1]
    const a3 = daily[2]
    const a4 = daily[3]
    const a5 = daily[4]
    const a6 = daily[5]
    const a7 = daily[6]


    //productivity totoal
    let top = porduserweeks.map(row => (parseFloat(row.productivity_total.slice(0, -6)) + (parseFloat(row.productivity_total.slice(3, -3) * (1 / 60))) + (parseFloat(row.productivity_total.slice(6) * (1 / 3600)))))
    //console.log(top)
    const x1 = top[0]
    ////console.log(x1)
    const x2 = top[1]
    ////console.log(x2)
    const x3 = top[2]
    ////console.log(x3)
    const x4 = top[3]
    const x5 = top[4]
    const x6 = top[5]
    const x7 = top[6]

    // weeks day
    const weeks = porduserweeks.map(row => row.currentdate)
    ////console.log(weeks)
    const sun = weeks[0];
    const mon = weeks[1];
    const tue = weeks[2];
    const wed = weeks[3];
    const thu = weeks[4];
    const fri = weeks[5];
    const sat = weeks[6];


    //filtered
    const sunday = moment(sun).format("MMM Do");
    const monday = moment(mon).format("MMM Do");
    const tuesday = moment(tue).format("MMM Do");
    const wednesday = moment(wed).format("MMM Do");
    const thursday = moment(thu).format("MMM Do");
    const friday = moment(fri).format("MMM Do");
    const saturday = moment(sat).format("MMM Do");

    const classes = useStyles();




    const data1 = {
        labels: [sunday, monday, tuesday, wednesday, thursday, friday, saturday],
        datasets: [
            {
                label: "Working hours in LMS Portal",
                data: [a1, a2, a3, a4, a5, a6, a7],
                type: 'line',
                backgroundColor: ['rgba(255, 85, 85, 0.3)'],
                pointBackgroundColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8",],
                borderColor: ["#FF5555"],
                pointBorderColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8",],
                lineTension: "0"

            },

            {
                label: "Difference in time",
                data: [c1, c2, c3, c4, c5, c6, c7],
                type: 'line',
                backgroundColor: ['rgba(253, 145, 35, 0.2)'],
                pointBackgroundColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8",],
                borderColor: ['#FF852D'],
                pointBorderColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8",]



            },

            {
                label: "Working hours in Productivity Tracker",
                data: [x1, x2, x3, x4, x5, x6, x7],
                backgroundColor: ["#3A97AB", "#3A97AB", "#3A97AB", "#3A97AB", "#3A97AB", "#3A97AB", "#3A97AB"],

            },


        ]


    }

    const options1a = {
        maintainAspectRatio: false,
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
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,

                        fontColor: "#898F92",
                        fontSize: 12
                    },
                    gridLines: {
                        color: "#898F92",
                        lineWidth: 2
                    }
                },

            ],

            xAxes: [
                {
                    ticks: {
                        fontColor: "#898F92",
                        fontSize: 20,
                    },
                    gridLines: {
                        color: "#898F92",
                        lineWidth: 2
                    }
                }
            ]

        }
    }


    return (
        <div>
            <div id="heading2">
                <p style={{ color: "#D4DCE1" }}>Weekly Report</p>
            </div>

            <div id="alldropdownweek">

                <div id="startdateweek">
                    <ThemeProvider theme={themechangedate}>
                        {/* <button type="button" style={{ backgroundColor: "red", color: "white" }}>Start Date</button> */}
                        {/* <label className="wid">Date of birth</label> */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <ThemeProvider theme={themechangedate}>
                                <KeyboardDatePicker

                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Start Date"
                                    type=""
                                    value={start_date}
                                    onChange={handleStartDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </ThemeProvider>

                        </MuiPickersUtilsProvider>
                    </ThemeProvider>
                </div>

                <div id="enddateweek">
                    <ThemeProvider theme={themechangedate}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <ThemeProvider theme={themechangedate}>
                                <KeyboardDatePicker
                                    minDate={start_date}
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="End Date"
                                    type=""
                                    value={end_date}
                                    onChange={handleEndDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </ThemeProvider>
                        </MuiPickersUtilsProvider>
                    </ThemeProvider>
                </div>


                {/* <div id="dropweek2">
                    <button type="button" style={{ backgroundColor: "red", color: "white" }}>End Date</button>
                </div> */}

                <div className="submitbuttonweek">
                    <Button
                        // type="button"
                        style={{
                            color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                            fontWeight: "bold", fontSize: 20, lineHeight: "25px"
                        }}
                        className="addactivityyes"
                        onClick={e => {
                            e.preventDefault();
                            produserweek({
                                start_date: moment(start_date).format('YYYY-MM-DD'),
                                end_date: moment(end_date).format('YYYY-MM-DD'),
                            });
                            // console.log({
                            //     start_date: moment(start_date).format('YYYY-MM-DD'),
                            //     end_date: moment(end_date).format('YYYY-MM-DD'),
                            // });
                        }}
                    >
                        Submit</Button>
                </div>

            </div>
            {/* {submit && success == "submit" ? ( */}
            <div id="week" >
                <Bar data={data1} options={options1a} ></Bar>
            </div>
            {/* ) : null} */}

        </div>
    )
}

export default Productivityweekuser