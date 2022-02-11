import React, { useState } from "react";
import { Grid, TextField, FormControl } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import '../taskfilters.css';
const themechangetheme = createMuiTheme({
    palette: {
        type: 'dark'
    }
})

function FilterByDateRange({ filterByDateRange, tasks, classes }) {
    // const [start, setStart] = useState(' ');
    // const [end, setEnd] = useState(' ');
    let now = new Date();
    var defaultDate = now;
    var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    var enddate = tomorrow;
    const [StartDateRange, setStartDateRange] = useState(new Date(defaultDate));
    const [EndDateRange, setEndDateRange] = useState(new Date(enddate));
    const handleStartDateChange = (StartDateRange) => {
        setStartDateRange(StartDateRange)
    }
    const handleEndDateChange = (EndDateRange) => {
        setEndDateRange(EndDateRange);
        filterByDateRange(tasks, StartDateRange, EndDateRange, true);
    };
    return (
        // <Grid item xs={12} md={6} lg={3}>
        <div className="daterange">
            {/*Start date */}
            <ThemeProvider theme={themechangetheme}>
                <div className="startdaterange">
                    <FormControl>
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <br />
                            <KeyboardDatePicker
                                margin="normal"
                                size="small"
                                id="date-picker-dialog"
                                label="Start date"
                                inputVariant="filled"
                                format="dd/MM/yyyy"
                                value={StartDateRange}
                                onChange={handleStartDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                                style={{
                                    color: "white",
                                    backgroundColor: "black"
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </FormControl>
                </div>

                <div className="enddaterange">
                    <FormControl >
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <br />
                            <KeyboardDatePicker
                                margin="normal"
                                size="small"
                                minDate={StartDateRange}

                                id="date-picker-dialog"
                                label="End date"
                                inputVariant="filled"
                                format="dd/MM/yyyy"
                                value={EndDateRange}
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                                style={{
                                    color: "white",
                                    backgroundColor: "black"
                                }}

                            />

                        </MuiPickersUtilsProvider>

                    </FormControl>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default FilterByDateRange;
