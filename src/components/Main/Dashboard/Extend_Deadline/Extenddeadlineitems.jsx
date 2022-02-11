import React from "react";
import { makeStyles, FormControl } from "@material-ui/core";
import { Grid, Avatar } from "@material-ui/core";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from "react";
import Moment from "react-moment";
import "./style.css"
import {
    MuiPickersUtilsProvider,

    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
} from "@material-ui/core";
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
    listContainer: {
        // padding: 5
        backgroundColor: "#202328"
    },
    list: {
        width: "100%",
        maxWidth: 470,
        backgroundColor: "#202328"
    },
    listItem: {
        padding: 3,
        marginBottom: 2
    },
    dbx: {

        width: "600px",
        backgroundColor: "#202328 !important"
    },
    purpledark: {
        background: "#0f1012",
        color: "#67737A",
        marginTop: "10",
    }
}));
const theme = createMuiTheme({

    input: {
        main: '#67737A'
    },


})
function Extenddeadlineitem({ item }) {
    let now = new Date();
    var defaultDate = now;
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    let { type } = useStoreState(state => state.profileMod.profile);
    let { type: alterType } = useStoreState(state => state.authMod);
    const [openExtdateModal, setExtdateModalOpen] = useState(false);

    let [user_id, setUser_id] = useState("")
    let [reportid, setReportid] = useState("")
    let [end_date, setEnd_date] = useState("")
    let [start_date, setStart_date] = useState("")





    let fetchExtendDeadline = useStoreActions(
        action => action.activities.FETCH_EXTENDDEADLINE_START);
    const [extended_date, setExtendeddate] = useState(item.end_date);
    let updatedate = useStoreActions(
        (state) => state.activities.POST_EXTENDDATE_START
    )
    const handleDateChange = (extended_date) => {
        setExtendeddate(extended_date);
    };


    let isExtendLoading = useStoreState(
        state => state.activities.isExtendFetching
    );
    let deadline = useStoreState(state => state.activities.deadlineReason);
    //console.log(deadline)

    useEffect(() => {
        if (isExtendLoading) fetchExtendDeadline({ user_id });
    }, [isExtendLoading, fetchExtendDeadline, user_id]);


    const handleExtdateModalOpen = (user_id,
        reportid,
        start_date,
        end_date

    ) => {
        setExtdateModalOpen(true);
        setUser_id(reportid)
        setReportid(user_id)
        setStart_date(start_date)
        setEnd_date(end_date)
    };

    const handleExtdateModalClose = () => {
        setExtdateModalOpen(false);

    }
    const description = deadline.filter(deadline => deadline.reportid == reportid);
    const task_description = description.map(e => e.task_description)
    return (
        <div>
            <Grid container
                xs={12}
                md={9}
                // className="Extendlist" 
                className="Extendlist1"
            >
                <Grid item
                    xs={9}>
                    <Grid item xs={10} md={10}><h1
                        // className="Extendheadinglist"
                        className="Extendheadinglist1"
                    >

                        {item.task_description}</h1>
                    </Grid>
                    <Grid item xs={12} md={10} style={{ display: "flex" }}>
                        <p
                            className="extendreason1"
                        // className="extendreason"
                        >Reason:</p><p
                            //  className="extendreasonss"
                            className="extendreasonss1"
                        > <b> {item.reason_for_extension} </b></p>
                    </Grid>
                    {type === "A" ? (<p
                        // className="extendrequestby"
                        className="extendrequestby1"
                    > {item.image ? (
                        <img height="32" width="32" style={{ borderRadius: 50, marginBottom: -5 }} src={item.image} alt="aa" />) :
                        <Avatar style={{ width: 32, height: 32, marginBottom: -25, marginLeft: -40, borderRadius: 50 }} className={classes.purpledark} />}Request by {item.fname}{item.lname}</p>) : null}
                    {/* accept Extenddeadline */}
                </Grid>
                <Grid item xs={12} md={3} style={{ display: "flex", alignItems: "center" }}>
                    {type === "A" ?
                        (<div
                            // className="extleaveaccepted"
                            className="extleaveaccepted1"
                        ><Button style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", margin: "10px 20px 10px 5px", fontSize: 20, lineHeight: "25px" }}
                            className="extleaveaccept"
                            onClick={event => {
                                handleExtdateModalOpen
                                    (item.reportid,
                                        item.user_id,
                                        item.start_date,
                                        item.end_date);
                                ////console.log(item.reportid)
                            }}>Extend</Button></div>



                        ) : null}
                </Grid>
                {/* reject extenddeadline */}
                <Dialog
                    open={openExtdateModal}
                    onClose={handleExtdateModalClose}
                    style={{
                        background: "rgba(15, 16, 18, 0.8)",
                        backdropFilter: "blur(8px)",
                    }}

                >

                    <div className={classes.dbx}>

                        <Grid item xs={6}>
                            <p
                                className="extendtitles1"
                            // className="extendtitles"
                            >Extend Deadline</p>
                        </Grid>
                        <DialogContent>
                            <Grid container xs={12}>
                                <Grid xs={6}>
                                    <p
                                        className="extenddescs1"
                                    // className="extenddescs"
                                    > Task Description:</p>
                                </Grid>
                                <Grid xs={6}>
                                    <p
                                        className="extenddescrs1"
                                    //  className="extenddescrs"
                                    >{task_description}</p>
                                </Grid>
                                <Grid xs={6}>
                                    <p
                                        //  className="extendues"
                                        className="extendues1"
                                    >Due On:</p>
                                </Grid>
                                <Grid xs={6}>
                                    <p
                                        className="extendduedates1"
                                    // className="extendduedates"
                                    ><Moment format="DD-MM-YYYY" date={end_date} /></p>
                                </Grid>
                                <Grid xs={6}>
                                    <p
                                        className="extenassigns1"
                                    // className="extenassigns"
                                    >Assigned On:</p>
                                </Grid>
                                <Grid xs={6}>
                                    <p
                                        className="extendassigndates1"
                                    //  className="extendassigndates"
                                    ><Moment format="DD-MM-YYYY" date={start_date} /></p>
                                </Grid>
                                <Grid xs={6}>
                                    <p
                                        // className="extendreasonboxs"
                                        className="extendreasonboxs1"
                                    >Reason:</p>
                                </Grid>
                                <Grid xs={6}>
                                    <p
                                        // className="extendreasonsss"
                                        className="extendreasonsss1"
                                    >{item.reason_for_extension}</p>
                                </Grid>
                                <Grid xs={6}>
                                    <br></br>
                                    <FormControl className={classes.dateBox}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                            <ThemeProvider theme={defaultMaterialTheme}>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    label="Date"
                                                    format="dd/MM/yyyy"
                                                    style={{ backgroundColor: "#67737A", }}
                                                    inputVariant="filled"
                                                    minDate={end_date}
                                                    value={extended_date}
                                                    onChange={handleDateChange}
                                                    KeyboardButtonProps={{
                                                        "aria-label": "change date"
                                                    }}
                                                />
                                            </ThemeProvider>
                                        </MuiPickersUtilsProvider>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </DialogContent>
                        <DialogActions>

                            <div className="extaccepted"><Button style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }} className="extleaveaccept"
                                onClick={e => {
                                    e.preventDefault();


                                    updatedate({
                                        reportid,
                                        user_id,
                                        start_date,
                                        end_date,
                                        extended_date,
                                    });
                                    //console.log({
                                    //     reportid,
                                    //     user_id,
                                    //     start_date,
                                    //     end_date,
                                    //     extended_date,
                                    // });
                                    handleExtdateModalClose();
                                }}
                                color="primary"
                            >
                                Extend
                            </Button>
                            </div>
                            <div className="extrejected">
                                <Button
                                    style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }} onClick={handleExtdateModalClose}
                                    className="extreject">
                                    Cancel
                                </Button>
                            </div>
                        </DialogActions>

                    </div>

                </Dialog>

            </Grid>


        </div >
    );
}

export default Extenddeadlineitem;