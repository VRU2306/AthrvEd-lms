import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, FormControl } from "@material-ui/core";
import {
    ValidatorForm,
} from "react-material-ui-form-validator";

import { Dialog, DialogActions } from "@material-ui/core";
import moment from "moment"
import { useStoreState, useStoreActions } from "easy-peasy";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


import {
    MuiPickersUtilsProvider,

    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
const defaultMaterialTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            // Purple and green play nicely together.

            backgroundColor: "#202328",
            light: "#ffffff",
            main: "#67737A"
        }
    }
});
const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 200
    },

    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    Failure: {
        color: "red",
    },
    Successfullsubmit: {
        color: "green"
    },
    FormControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    dsx: {
        width: "600px",
        height: "300px",
        overflow: "auto",
        backgroundColor: "#202328 !important"
    }
}));

const Leavecount = ({ open, handleClose, }) => {
    const classes = useStyles();
    let user_id = useStoreState(state => state.profileMod.profile.user_id);
    ////console.log(user_id);


    let leavecountuser = useStoreActions(
        (state) => state.dailyformMod.LEAVECOUNT_USER_START)


    let lcountuser = useStoreState((state) => state.dailyformMod.leavecountuser.count)
    // console.log(lcountuser)
    ////console.log(lcountuser)
    let Successfullsubmit = useStoreState((state) => state.dailyformMod.successs)
    const [value, setValue] = useState("submit");
    let success = value;
    let now = new Date();
    var defaultDate = now;
    var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    var enddate = tomorrow;
    const [StartDate, setStartDate] = useState(new Date(defaultDate));
    const [EndDate, setEndDate] = useState(new Date(enddate));
    const handleStartDateChange = (StartDate) => {
        setStartDate(StartDate)
    }
    const handleEndateChange = (EndDate) => {
        setEndDate(EndDate);
    };
    let isunblockedusersfetching = useStoreState((state) => state.authMod.isunblockedusersfetching)
    let getunBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_UNBLOCKEDSERS)
    let clearunBlockedUsers = useStoreActions((action) => action.authMod.CLEAR_UNBLOCKED)

    useEffect(() => {
        if (isunblockedusersfetching) getunBlockedusers();
        return () => clearunBlockedUsers();
    }, [getunBlockedusers, clearunBlockedUsers]);


    let unblocked = useStoreState(state => state.authMod.unblocked);
    ////console.log(unblocked)

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            style={{
                background: "rgba(15, 16, 18, 0.8)",
                backdropFilter: "blur(8px)",
            }}
            aria-labelledby="form-dialog-title"
        >
            <div className={classes.dsx}>
                <ValidatorForm
                    onSubmit={e => {
                        // console.log(user_id, StartDate, EndDate)
                        leavecountuser({
                            start_date: moment(StartDate).format('YYYY-MM-DD'),
                            end_date: moment(EndDate).format('YYYY-MM-DD'),
                        });
                    }
                    }

                >
                    <p className="addactivitytitless">  Leave Count</p>

                    <div className="datess">
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <FormControl className={classes.dateBox}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <div className="startdate">
                                        <KeyboardDatePicker
                                            margin="normal"
                                            size="small"

                                            id="date-picker-dialog"
                                            label=" Start Date"
                                            format="dd/MM/yyyy"
                                            style={{ backgroundColor: "#67737A", width: 180, marginLeft: 10 }}
                                            inputVariant="filled"
                                            value={StartDate}

                                            onChange={handleStartDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                        />
                                    </div>
                                </MuiPickersUtilsProvider>
                            </FormControl>


                            <FormControl className={classes.dateBox}>

                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                    <div className="enddate">
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            size="small"
                                            label=" End Date"
                                            format="dd/MM/yyyy"
                                            style={{ backgroundColor: "#67737A", width: 180, marginLeft: 5, marginTop: 14 }}
                                            inputVariant="filled"
                                            minDate={StartDate}
                                            value={EndDate}

                                            onChange={handleEndateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                        />
                                    </div>
                                </MuiPickersUtilsProvider>

                            </FormControl>

                        </ThemeProvider>

                    </div>
                    {Successfullsubmit && success === "submit" ?
                        <p style={{ marginLeft: '25%', fontFamily: 'Mulish', fontSize: 20, fontWeight: "Semibold", color: "#D4DCE1" }}>Total number of leaves taken : {lcountuser}</p>
                        : null}
                    <DialogActions>
                        <div className="addactivityy">
                            <Button type="submit" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                                className="addactivityyes">
                                Check
                            </Button>
                        </div>

                        <div className="addactivitycancelss">
                            <Button onClick={handleClose} style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}
                                className="addactivitycancels">
                                Cancel
                            </Button>
                        </div>


                    </DialogActions>
                </ValidatorForm>
            </div>
        </Dialog >
    );
};

export default Leavecount;
