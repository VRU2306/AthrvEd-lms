import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useStoreState, useStoreActions } from "easy-peasy";
import '../taskfilters.css';
const themechangetheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})


function FilterByName({ tasks, getAllUtil, filterByNames, setName, classes }) {
  let names = useStoreState(state => state.activity.names);
  const [selectedTeam, setTeam] = useState([]);
  return (
    // <Grid item xs={12} md={6} lg={3}>
    <ThemeProvider theme={themechangetheme}>
      <Autocomplete
        multiple
        id="name-filter"
        type=""
        // options={getAllUtil(tasks, "name")}
        // getOptionLabel={option => option.name}
        options={names.filter(
          member =>
            !selectedTeam.some(
              selectedMember => selectedMember.user_id === member.user_id
            )
        )}
        getOptionLabel={option => option.fname + " " + option.lname}
        onChange={(event, values) => {
          setName(values.map(value => value.fname + " " + value.lname));
          filterByNames(
            tasks,
            values.map(value => value.fname + " " + value.lname),
            true
          );
        }}
        filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params}
            type=""
            size="small"
            variant="filled"
            label="Search By Name"
            style={{
              backgroundColor: "black",
              color: "white"
            }}

          />
        )}

        className="namefilter"
      />
    </ThemeProvider>

    // </Grid>
  );
}

export default FilterByName;
