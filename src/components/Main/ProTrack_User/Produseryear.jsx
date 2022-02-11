import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "./Productivityuser.css";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useStoreActions, useStoreState } from "easy-peasy";
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

    },
    formElementWidth: {
        width: 250,
    },
    formFullWidth: {
        width: "100%",
    },
    // formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
    // marginTop: 3
    // },
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


const themechangeyear = createMuiTheme({
    palette: {
        type: "dark"
    }
})

const Productivityyearuser = () => {

    const [year, setSingleYear] = useState('');
    let produseryear = useStoreActions(action => action.authMod.POST_PRODU_USER_START_YEAR)

    let porduseryear = useStoreState(state => state.authMod.produseryear)
    //console.log(porduseryear)
    let submit = useStoreState(state => state.authMod.Successfullsyear)
    let failure = useStoreState((state) => state.authMod.failsureeyear);
    let Failure = () => (failure ? "Oops! No Data Present" : "");
    const [value, setValue] = useState("submit");
    let success = value;

    let daily = porduseryear.map(row => parseFloat(row.productivity_total.hours) + (parseFloat(row.productivity_total.minutes) * (1 / 60)) + (parseFloat(row.productivity_total.seconds) * (1 / 3600)))
    //console.log(daily)

    const c1 = daily[0];
    const c2 = daily[1];
    const c3 = daily[2];
    const c4 = daily[3];
    const c5 = daily[4];
    const c6 = daily[5];
    const c7 = daily[6];
    const c8 = daily[7];
    const c9 = daily[8];
    const c10 = daily[9];
    const c11 = daily[10];
    const c12 = daily[11];

    // statrt of week
    let dailyss = porduseryear.map(row => row.start_of_month)
    //console.log(dailyss)

    const d1 = dailyss[0];
    //console.log(d1)
    const d2 = dailyss[1];
    const d3 = dailyss[2];
    const d4 = dailyss[3];
    const d5 = dailyss[4];
    const d6 = dailyss[5];
    const d7 = dailyss[6];
    const d8 = dailyss[7];
    const d9 = dailyss[8];
    const d10 = dailyss[9];
    const d11 = dailyss[10];
    const d12 = dailyss[11];
    //  
    const m1 = moment(d1).format("MMM Do YY");
    const m2 = moment(d2).format("MMM Do YY");
    const m3 = moment(d3).format("MMM Do YY")
    const m4 = moment(d4).format("MMM Do YY")
    const m5 = moment(d5).format("MMM Do YY")
    const m6 = moment(d6).format("MMM Do YY")
    const m7 = moment(d7).format("MMM Do YY")
    const m8 = moment(d8).format("MMM Do YY")
    const m9 = moment(d9).format("MMM Do YY")
    const m10 = moment(d10).format("MMM Do YY")
    const m11 = moment(d11).format("MMM Do YY")
    const m12 = moment(d12).format("MMM Do YY")
    //const dailyreprot
    const dailly = porduseryear.map(row => parseFloat(row.dailyreport_total.hours) + (parseFloat(row.dailyreport_total.minutes) * (1 / 60)) + (parseFloat(row.dailyreport_total.seconds) * (1 / 3600)))
    //console.log(dailly)
    const b1 = dailly[0];
    const b2 = dailly[1];
    const b3 = dailly[2];
    const b4 = dailly[3];
    const b5 = dailly[4];
    const b6 = dailly[5];
    const b7 = dailly[6];
    const b8 = dailly[7];
    const b9 = dailly[8];
    const b10 = dailly[9];
    const b11 = dailly[10];
    const b12 = dailly[11];
    // diff
    const diff = porduseryear.map(row => (parseFloat(Math.abs(row.dif.hours)) + (parseFloat(Math.abs((row.dif.minutes) * (1 / 60)))) + (parseFloat(Math.abs((row.dif.seconds) * (1 / 3600))))))
    ////console.log(diff)
    const a1 = diff[0];
    const a2 = diff[1];
    const a3 = diff[2];
    const a4 = diff[3];
    const a5 = diff[4];
    const a6 = diff[5];
    const a7 = diff[6];
    const a8 = diff[7];
    const a9 = diff[8];
    const a10 = diff[9];
    const a11 = diff[10];
    const a12 = diff[11];

    const handleSingleYearChange = (event) => {
        setSingleYear(event.target.value);
    }

    const classes = useStyles();

    const data3 = {

        labels: [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12],
        datasets: [

            {
                label: "Difference in time",
                type: 'bubble',
                data: [a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11],
                borderWidth: "4",
                borderColor: "#0C0B12"

            },

            {
                label: "Working hours in LMS Portal",
                data: [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11],
                backgroundColor: ['rgba(255, 85, 85, 0.3)'],
                pointBackgroundColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8"],
                borderColor: ["#FF5555"],
                pointBorderColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8"]

            },

            {
                label: "Working hours in Productivity Tracker",
                data: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11],
                backgroundColor: ['rgba(253, 145, 35, 0.2)'],
                pointBackgroundColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8"],
                borderColor: ['#FF852D'],
                pointBorderColor: ["#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8", "#F0EDE8"]
            }


        ]


    }

    const options3 = {

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
                        fontSize: 10,
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
                        fontColor: "#898F92"
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
                <p style={{ color: "#D4DCE1" }}>Yearly Report</p>
            </div>

            {/* <br></br> */}
            <div className="buttonsadmin">
                <div id="startdater">


                    <ThemeProvider theme={themechangeyear}>

                        <FormControl >
                            <ThemeProvider theme={themechangeyear}>
                                <InputLabel id="demo-simple-select-labele">Select Year</InputLabel>
                            </ThemeProvider>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={year}
                                style={{ width: 200 }}
                                onChange={handleSingleYearChange}
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
                <div className="submitbutton">
                    <Button
                        // type="button"
                        style={{
                            color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                            fontWeight: "bold", fontSize: 20, lineHeight: "25px"
                        }}
                        className="addactivityyes"
                        onClick={e => {
                            e.preventDefault();
                            produseryear({ year })
                        }}>
                        Submit

                    </Button>
                </div>
            </div>
            <div >{Failure()} </div>
            {/* {submit && success == "submit" ? ( */}
            <div id="year">
                <Line data={data3} options={options3} />
            </div>
            {/* ) : null} */}

        </div>

    )

}

export default Productivityyearuser;