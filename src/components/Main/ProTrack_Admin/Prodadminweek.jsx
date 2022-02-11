import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Bar } from "react-chartjs-2";
import Button from '@material-ui/core/Button';
import "./Productivityadmin.css";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import 'date-fns';
import { TextField } from '@material-ui/core';
import moment from "moment";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";

import {
    TextValidator,
    ValidatorForm,
} from "react-material-ui-form-validator";
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useStoreState, useStoreActions } from "easy-peasy";


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

const useStyletable = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const themeadminchange = createMuiTheme({
    palette: {
        type: "dark"
    }
})


const Prodadminweek = () => {

    const [start_date, setStartDate] = useState(new Date() || new Date("2000-01-01"));
    const [end_date, setEndDate] = useState(new Date() || new Date("2000-01-01"));
    const [user_id, setUser_Id] = useState("")
    let users = useStoreState(state => state.authMod.users);
    let isunblockedusersfetching = useStoreState((state) => state.authMod.isunblockedusersfetching)
    let getunBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_UNBLOCKEDSERS)
    let clearunBlockedUsers = useStoreActions((action) => action.authMod.CLEAR_UNBLOCKED)
    const [blockmember, setBlockmember] = useState({});
    useEffect(() => {
        if (isunblockedusersfetching) getunBlockedusers(users);
        return () => clearunBlockedUsers();
    }, []);

    let submit = useStoreState(state => state.authMod.Successfullsadmweek)
    const [value, setValue] = useState("submit");
    let success = value;
    let unblocked = useStoreState(state => state.authMod.unblocked);

    //console.log(unblocked)
    const handleStartDateChange = (start_date) => {
        setStartDate(start_date);

    };

    const handleEndDateChange = (end_date) => {
        setEndDate(end_date);
    };

    const handleUserIdChange = (event) => {
        setUser_Id(event.target.value);
    }


    let prodadminweek = useStoreActions(action => action.authMod.POST_PRODU_ADMIN_START_WEEK)
    let pordadminweek = useStoreState(state => state.authMod.proadminweek)
    //console.log(pordadminweek)
    let diff = pordadminweek.map(row => (parseFloat(Math.abs(row.dif.hours)) + (parseFloat(Math.abs((row.dif.minutes) * (1 / 60)))) + (parseFloat(Math.abs((row.dif.seconds) * (1 / 3600))))))
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
    let daily = pordadminweek.map(row => (parseFloat(row.dailyreport_total.slice(0, -6)) + (parseFloat(row.dailyreport_total.slice(3, -3) * (1 / 60))) + (parseFloat(row.dailyreport_total.slice(6) * (1 / 3600)))))
    //console.log(daily)
    const a1 = daily[0]
    const a2 = daily[1]
    const a3 = daily[2]
    const a4 = daily[3]
    const a5 = daily[4]
    const a6 = daily[5]
    const a7 = daily[6]
    //productivity totoal
    let top = pordadminweek.map(row => (parseFloat(row.productivity_total.slice(0, -6)) + (parseFloat(row.productivity_total.slice(3, -3) * (1 / 60))) + (parseFloat(row.productivity_total.slice(6) * (1 / 3600)))))
    //console.log(top)
    const x1 = top[0]
    //console.log(x1)
    const x2 = top[1]
    //console.log(x2)
    const x3 = top[2]
    //console.log(x3)
    const x4 = top[3]
    const x5 = top[4]
    const x6 = top[5]
    const x7 = top[6]

    // weeks day
    const weeks = pordadminweek.map(row => row.currentdate)
    //console.log(weeks)
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
                        fontSize: 8,
                    },
                    gridLines: {
                        color: "#898F92",
                        lineWidth: 2
                    }
                }
            ],

            xAxes: [
                {
                    ticks: {
                        fontColor: "#898F92",
                    },
                    gridLines: {
                        color: "#898F92",
                        lineWidth: 2
                    }
                }
            ]

        }

    }

    const classes = useStyles();

    return (
        <ValidatorForm
            onSubmit={e => {
                // console.log({
                //     user_id: blockmember.user_id, start_date: moment(start_date).format('YYYY-MM-DD'),

                //     end_date: moment(end_date).format('YYYY-MM-DD'),
                // });
                prodadminweek({
                    start_date: moment(start_date).format('YYYY-MM-DD'),

                    end_date: moment(end_date).format('YYYY-MM-DD'),
                    user_id: blockmember.user_id
                })


            }}
        >
            <div>

                <div className="buttonsadmin">

                    <div id="startdate">
                        <ThemeProvider theme={themeadminchange}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <ThemeProvider theme={themeadminchange}>
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


                    <div id="enddate">
                        <ThemeProvider theme={themeadminchange}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <ThemeProvider theme={themeadminchange}>
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


                    <div id="selectuser">
                        <ThemeProvider theme={themeadminchange}>
                            <InputLabel>Select User</InputLabel>
                        </ThemeProvider>
                        <ThemeProvider theme={themeadminchange}>
                            <Autocomplete
                                id="tags-standard"
                                // isLoading={isunblockedusersfetching}
                                options={unblocked}
                                validators={["required"]}
                                getOptionLabel={option => option.fname + " " + option.lname}
                                onChange={(e, value) => {
                                    setBlockmember(value);
                                    //console.log(value);
                                }}
                                renderInput={params => (
                                    <TextValidator
                                        type=""
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        value={blockmember}
                                        {...params}
                                        variant="standard"
                                        fullWidth
                                        placeholder="Select Name"


                                    />
                                )}
                            />
                        </ThemeProvider>

                    </div>

                </div>


                <div className="submitbuttonadmin">
                    <Button
                        type="submit"
                        style={{
                            color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                            fontWeight: "bold", fontSize: 20, lineHeight: "25px"
                        }}
                        className="addactivityyes">
                        Submit</Button>
                </div>



                {/* {submit && success == "submit" ? ( */}
                <div id="weekly">
                    <Bar data={data1} options={options1a} />
                </div>
                {/* ) : null} */}


            </div>

        </ValidatorForm>
    )

};

export default Prodadminweek;


