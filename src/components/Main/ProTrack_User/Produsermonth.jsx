import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "./Productivityuser.css";
// import Heading from "./Heading.png";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { action, useStoreActions, useStoreState } from "easy-peasy";
import moment from "moment";
import Button from "@material-ui/core/Button";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';



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
        backgroundColor: "#202328",
    },
    formElementWidth: {
        width: 250,
    },
    formFullWidth: {
        width: "100%",
    },
    formControl: {
        marginLeft: theme.spacing(6),

    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    failure: {
        color: "red",
    },
    successfulsubmit: {
        color: "green",
    },



}));

const themechangemonthyear = createMuiTheme({
    palette: {
        type: "dark"
    }
})


const Productivitymonthuser = () => {

    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    let produsermonth = useStoreActions(action => action.authMod.POST_PRODU_USER_START_MONTH)
    let pordusermonth = useStoreState(state => state.authMod.produsermonth)
    // console.log(pordusermonth)
    let failure = useStoreState((state) => state.authMod.failsureemonth);
    let Failure = () => (failure ? "Oops! No Data Present" : "");
    let submit = useStoreState(state => state.authMod.Successfullsmonth)
    const [value, setValue] = useState("submit");
    let success = value;
    // productivity total 
    // hours
    let daily = pordusermonth.map(row => parseFloat(row.productivity_total.hours) + (parseFloat(row.productivity_total.minutes) * (1 / 60)) + (parseFloat(row.productivity_total.seconds) * (1 / 3600)))
    // console.log(daily)

    const c1 = daily[0];
    const c2 = daily[1];
    const c3 = daily[2];
    const c4 = daily[3];
    // statrt of week
    let start = pordusermonth.map(row => row.start_of_week)
    // console.log(start)
    const sun = start[0];
    const mon = start[1];
    const tue = start[2];
    const wed = start[3];
    // filtererd

    const sunday = moment(sun).format("MMM Do YY");
    const monday = moment(mon).format("MMM Do YY");
    const tuesday = moment(tue).format("MMM Do YY");
    const wednesday = moment(wed).format("MMM Do YY");
    //  

    //const dailyreprot
    const dailly = pordusermonth.map(row => parseFloat(row.dailyreport_total.hours) + (parseFloat(row.dailyreport_total.minutes) * (1 / 60)) + (parseFloat(row.dailyreport_total.seconds) * (1 / 3600)))
    // console.log(dailly)
    const b1 = dailly[0];
    const b2 = dailly[1];
    const b3 = dailly[2];
    const b4 = dailly[3];
    // diff
    const diff = pordusermonth.map(row => (parseFloat(Math.abs(row.dif.hours)) + (parseFloat(Math.abs((row.dif.minutes) * (1 / 60)))) + (parseFloat(Math.abs((row.dif.seconds) * (1 / 3600))))))
    // console.log(diff)
    const a1 = diff[0];
    const a2 = diff[1];
    const a3 = diff[2];
    const a4 = diff[3];

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setYear(event.target.value);
    };

    const classes = useStyles();

    const data2 = {

        labels: [sunday, monday, tuesday, wednesday],
        datasets: [

            {
                label: "Working hours in LMS Portal",
                data: [b1, b2, b3, b4],
                type: 'line',
                backgroundColor: ['rgba(255, 85, 85, 0.3)'],
                pointBackgroundColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8",],
                borderColor: ["#FF5555"],
                pointBorderColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8",],
                lineTension: "0"

            },

            {
                label: "Difference in time",
                type: "line",
                data: [a1, a2, a3, a4],
                type: 'line',
                backgroundColor: ['rgba(253, 145, 35, 0.2)'],
                pointBackgroundColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8",],
                borderColor: ['#FF852D'],
                pointBorderColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8",]

            },


            {
                label: "Working hours in Productivity Tracker",
                data: [c1, c2, c3, c4],
                backgroundColor: ["#3A97AB", "#3A97AB", "#3A97AB", "#3A97AB"],



            }
        ]

    }

    const options2 = {

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
                        max: 18,
                        stepSize: 1,
                        fontColor: "#898F92",
                        fontSize: 12,
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
            {/* <div id="allaboutmonth"> */}
            <div id="heading2">
                <p style={{ color: "#D4DCE1" }}>Monthly Report</p>
            </div>

            <div className="buttonsadmin">
                <div id="startdater">

                    <ThemeProvider theme={themechangemonthyear}>
                        <FormControl >
                            <ThemeProvider theme={themechangemonthyear}>
                                <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
                            </ThemeProvider>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={month}
                                style={{ width: 180 }}
                                onChange={handleMonthChange}
                            >
                                <MenuItem value={0}>January</MenuItem>
                                <MenuItem value={1}>February</MenuItem>
                                <MenuItem value={2}>March</MenuItem>
                                <MenuItem value={3}>April</MenuItem>
                                <MenuItem value={4}>May</MenuItem>
                                <MenuItem value={5}>June</MenuItem>
                                <MenuItem value={6}>July</MenuItem>
                                <MenuItem value={7}>August</MenuItem>
                                <MenuItem value={8}>September</MenuItem>
                                <MenuItem value={9}>October</MenuItem>
                                <MenuItem value={10}>November</MenuItem>
                                <MenuItem value={11}>December</MenuItem>
                            </Select>
                        </FormControl>
                    </ThemeProvider>
                </div>


                <div id="enddater">

                    <ThemeProvider theme={themechangemonthyear}>
                        <FormControl >
                            <ThemeProvider theme={themechangemonthyear}>
                                <InputLabel id="demo-simple-select-label">Select Year</InputLabel>
                            </ThemeProvider>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                style={{ width: 180 }}
                                onChange={handleYearChange}
                            >
                                <MenuItem value={2019}>2019</MenuItem>
                                <MenuItem value={2020}>2020</MenuItem>
                                <MenuItem value={2021}>2021</MenuItem>
                                <MenuItem value={2022}>2022</MenuItem>
                                <MenuItem value={2023}>2023</MenuItem>
                                <MenuItem value={2024}>2024</MenuItem>
                                <MenuItem value={2025}>2025</MenuItem>

                            </Select>
                        </FormControl>
                    </ThemeProvider>
                </div>

                <div className="submitbuttonmonth" >
                    <Button
                        // type="button"
                        style={{
                            color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                            fontWeight: "bold", fontSize: 20, lineHeight: "25px"
                        }}
                        className="addactivityyes"
                        onClick={e => {
                            e.preventDefault();
                            produsermonth({ month, year })
                            // console.log(month, year)
                        }}>
                        Submit
                    </Button>

                </div>

            </div>


            {/* {submit && success == "submit" ? ( */}
            <div id="month">
                <Bar data={data2} options={options2} />

            </div>
            {/* ) : null} */}



        </div >

    )

}

export default Productivitymonthuser