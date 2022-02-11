import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, FormControl } from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";

import {
    Dialog,
    Paper,

    ListItem,

    DialogContent,
    DialogActions,

}
    from "@material-ui/core";

import { useStoreActions, useStoreState } from "easy-peasy";
import "./notfilled.css";

import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const themechangetheme = createMuiTheme({
    palette: {
        type: 'dark'
    }
})

const useStyles = makeStyles(theme => ({
    dateBox: {
        margin: 10
    },
    failures: {
        color: "red",
    },
    Sucessfullsubmit: {
        color: "green",
    },

    success: {
        color: "green",
    },
    fail: {
        color: "red",
    },
    msx: {
        backgroundColor: "#202328",
        overflow: "auto",
        color: "#d4dce1"
    }
}));
const Notfilled = ({ open, handleClose }) => {

    let Successfullsubmits = useStoreState((state) => state.dailyformMod.Successulslsubmit);
    let failuress = useStoreState((state) => state.dailyformMod.ffailures);
    let now = new Date();
    var defaultDate = now - 1000 * 60 * 60 * 24 * 1;
    const [date, setSelectedDate] = useState(new Date(defaultDate));

    const notfilled = useStoreState(state => state.dailyformMod.notfilled)
    // let isNotified = useStoreState((state) => state.dailyformMod.isNotifyInserting);
    let success = useStoreState((state) => state.dailyformMod.success);
    let fail = useStoreState((state) => state.dailyformMod.fail);

    const postNotfilled = useStoreActions(
        action => action.dailyformMod.FETCH_NOTFILLED_FORMS_START
    );
    let notify = useStoreActions(action => action.dailyformMod.POST_NOTIFY_START);
    const classes = useStyles();


    let Success = () => (success ? "Notified" : "");
    let Fail = () => (fail ? "Failed To Notify" : "");

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const [value, setValue] = useState("submit");
    let successs = value;
    // const filt = notfilled.map(x => x.user_id)
    // console.log(filt);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
        >
            <div className={classes.msx}>
                <div className="notfilledtitle">Pending Submissions</div >
                <DialogContent>

                    <ThemeProvider theme={themechangetheme}>
                        <FormControl className={classes.dateBox}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    disabled
                                    variant="outlined"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date"
                                    label="Date"
                                    type=""
                                    value={date}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        "aria-label": "change date",
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </FormControl>
                    </ThemeProvider>
                    <div className="checknow">
                        <Button
                            style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                            className="addactivityyes"
                            onClick={e => {
                                postNotfilled({
                                    date,
                                });
                            }}>
                            Check
              </Button>
                    </div>

                    {notfilled.length ? (
                        notfilled.map(item => (
                            <ListItem
                                className={classes.msx}
                                dense

                                key={item.user_id}

                            >

                                <div style={{ fontSize: '18px', overflow: "auto", width: 200 }}>{item.name}</div>
                                <div>
                                    <p style={{ fontSize: '18px', overflow: "auto", marginLeft: 100 }} className={classes.success}>{Success()}</p>
                                    <p style={{ fontSize: '18px', overflow: "auto", marginLeft: 100 }} className={classes.fail}>{Fail()}</p>
                                </div>

                            </ListItem>
                        ))
                    ) : null}



                </DialogContent>
                <DialogActions>
                    {notfilled.length ?
                        <div className="notifies">
                            <Button
                                style={{
                                    color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish",
                                    fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px",
                                    background: "#F4483D"
                                }}
                                className="notify"
                                onClick={e => {
                                    // console.log(date);
                                    notify({ "email": (notfilled) });

                                }}

                            >
                                Notify To All

          </Button>
                        </div>
                        : null}
                    <div className="cancelles">
                        <Button onClick={handleClose} style={{
                            color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1",

                        }}
                            className="addactivitycancels">
                            Cancel
          </Button>
                    </div>

                </DialogActions>
            </div>
        </Dialog >
    );
};

export default Notfilled;