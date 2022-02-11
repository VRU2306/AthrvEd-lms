import React, { useState } from "react";
import { Grid, TextField } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { FormControl } from "@material-ui/core";
import '../taskfilters.css';
const themechangetheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})

function FilterByDate({ filterByDate, tasks, classes }) {
  let now = new Date();
  var defaultDate = now;
  const [date, setDate] = useState(new Date(defaultDate));
  const handleDateChange = (date) => {
    setDate(date);
    filterByDate(tasks, date, true);
  }
  return (
    // <Grid item xs={12} md={6} lg={3}>
    <ThemeProvider theme={themechangetheme}>
      <div className="datefilter">
        <FormControl >
          <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <br />
            <KeyboardDatePicker
              margin="normal"
              size="small"

              id="date-picker-dialog"
              label="Search by date"
              inputVariant="filled"
              format="dd/MM/yyyy"
              value={date}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
              // fullWidth={true}
              style={{
                color: "white",
                backgroundColor: "black"
              }}
            />
          </MuiPickersUtilsProvider>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}

export default FilterByDate;
