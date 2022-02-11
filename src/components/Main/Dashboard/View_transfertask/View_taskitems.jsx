import React from "react";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import EditingLoadingScreen from "../../../UI/EditingLoadingScreen";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles, FormControl, Avatar } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import {
    TextValidator,
    ValidatorForm,

} from "react-material-ui-form-validator";
import { useStoreActions, useStoreState } from "easy-peasy";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useState } from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,

} from "@material-ui/core";
import _ from "lodash";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./style.css"

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
    root: {
        zIndex: 3
    },
    listContainer: {
        padding: 5
    },
    list: {
        width: "100%",
        maxWidth: 470
    },
    listItem: {
        padding: 3,
        marginBottom: 2
    },
    listIcon: {
        marginRight: 10
    },
    dbxs: {
        width: "600px",

        backgroundColor: "#202328 !important"
    },
    purpledark: {
        background: "#0f1012",
        color: "#67737A",
        marginTop: "10",
    }

}));



function Vitetaskitem({ item }) {
    const classes = useStyles();
    let now = new Date();
    var defaultDate = now;
    var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    var enddate = tomorrow;
    let user = useStoreState(state => state.profileMod.profile.user_id);
    let { type } = useStoreState(state => state.profileMod.profile);
    let { type: alterType } = useStoreState(state => state.authMod);
    let fetchTransferTask = useStoreActions(
        action => action.activities.FETCH_TRANSFERTASK_START);

    const [endStatus, setStatus] = useState("");
    const [progress, setProgress] = useState("");
    const [domain, setDomain] = React.useState("");
    const [name, setName] = useState([]);
    const [selectedTeam, setTeam] = useState([]);
    const [StartDate, setStartDate] = useState(new Date(defaultDate));
    const [EndDate, setEndDate] = useState(new Date(enddate));
    const handleStartDateChange = (StartDate) => {
        setStartDate(StartDate)
    }
    const handleEndateChange = (EndDate) => {
        setEndDate(EndDate);
    };






    let istTransferTaskLoading = useStoreState(
        state => state.activities.isTaskFetching
    );
    let updateTransfer = useStoreActions(
        action => action.activities.UPDATE_TRANSFERTASK_START
    );
    let reason = useStoreState(state => state.activities.reason);
    const isInserting = useStoreState(state => state.activities.isInserting);
    function handleInsertionQue() {
        if (isInserting) setTimeout(() => handleInsertionQue(isInserting), 1000);
        else {
            setInserting(false);
            handleAssigntaskModalClose();
        }
    }
    let transfernotes = useStoreState(state => state.activities.tasktransferNotes);
    // console.log(transfernotes)



    let [reportid, setReportid] = useState(item.reportid)
    let [user_id, setUser_id] = useState(item.user_id)
    let [task_description, setTask_description] = useState(item.task_description)
    let [end_date, setEnd_date] = useState(item.end_date)
    let [start_date, setStart_date] = useState(item.start_date)




    const [isInsertingLocal, setInserting] = useState(false);
    useEffect(() => {
        if (istTransferTaskLoading) {
            fetchTransferTask({ user_id });
        };
    }, [istTransferTaskLoading, fetchTransferTask, user_id]);


    // need to be checked from

    let fetchusernames = useStoreActions(
        action => action.activity.FETCH_USER_NAME_START);

    let istnamesloading = useStoreState(
        state => state.activities.isnamesFetching
    );

    useEffect(() => {
        if (activityid && activityid != "undefined") {
            fetchusernames({ activityid, user_id });
        }

    }, [istnamesloading, fetchusernames, user_id]);

    //till here


    let activitynames = useStoreState(state => state.activity.names);
    // console.log(activitynames);


    const [openAssigntaskModal, setAssigntaskModalOpen] = useState(false);
    const handleAssigntaskModalOpen = (reportid,
        user_id,
        task_description,
        start_date,
        end_date,
        dependency,
        activityid
    ) => {
        setAssigntaskModalOpen(true);
        setReportid(reportid)
        setUser_id(user_id)
        setEnd_date(start_date)
        setStart_date(task_description)
        setTask_description(end_date)
    };

    var All = useStoreState(state => state.authMod.unblocked)
    const activity = reason.filter(reason => reason.reportid == reportid)
    const actid = activity.map(e => e.activityid)
    const activityid = parseInt(actid.toString())
    const depend = activity.map(e => e.dependency)
    const dependency = parseInt(depend.toString())
    function getImage(image) {
        const userinfo = All.filter(All => All.user_id === image)
        const images = userinfo.map(x => x.image)
        return images;
    }
    let names = useStoreState(state => state.activity.names);
    console.log(names)

    const handleAssigntaskModalClose = () => {
        setAssigntaskModalOpen(false);

    }


    let postTask = useStoreActions(action => action.activity.POST_TASK_START);
    return (
        <div>
            <Grid container xs={12} md={9}
                className="Tasktransferlist1"
            // className="Tasktransferlist"
            >
                <Grid item
                    xs={9}>
                    <Grid item xs={10} md={10}><h1
                        className="Tasktransferheadinglist1"
                    // className="Tasktransferheadinglist"
                    >
                        {item.task_description}</h1>
                    </Grid>
                    <Grid item xs={12} md={10} style={{ display: "flex" }}>
                        <p
                            className="Tasktransferreason1"
                        // className="Tasktransferreason"
                        >Reason:</p><p
                            className="Tasktransferreasons1"
                        // className="Tasktransferreasons"
                        > <b> {item.reason_for_transfer}  </b></p>
                    </Grid>
                    <p
                        className="Tasktransferrequestby1"
                    // className="Tasktransferrequestby"
                    > {item.image ? (
                        <img height="32" width="32" style={{ borderRadius: 50, marginBottom: -5 }} src={item.image} alt="A" />) :
                        <Avatar style={{ width: 32, height: 32, marginBottom: -25, marginLeft: -40, borderRadius: 50 }} className={classes.purpledark} />}Request by {item.fname}{item.lname}</p>
                    {/* accept Extenddeadline */}
                </Grid>
                <Grid container xs={12} md={1} >
                    <div
                        className="Tasktransferaccepted1"
                    ><Button style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", margin: "10px 20px 10px 5px", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                        className="Tasktransferaccept"
                        onClick={event => {
                            setReportid(item.reportid);
                            //need to be checked
                            if (activityid && activityid != "undefined") {
                                fetchusernames({ activityid, user_id });
                            }

                            handleAssigntaskModalOpen
                                (item.reportid,
                                    item.user_id,
                                    item.start_date,
                                    item.end_date,
                                    item.task_description);


                            // console.log(item.reportid)
                        }}>Accept</Button></div>



                    {/* reject transfertask */}

                    <div
                    // className="taskrejected"
                    >
                        <Button
                            style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", margin: "10px 20px 10px 5px", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}
                            onClick={event => {
                                event.preventDefault();
                                updateTransfer({
                                    reportid,
                                    start_date,
                                    end_date,
                                    user_id,
                                    task_description,
                                    value: "reject",
                                });
                            }}
                            className="taskreject" > Deny</Button></div>

                </Grid>
                {/* assign model */}
                {/* if approved this model ewill open */}
                <Dialog
                    open={openAssigntaskModal}
                    onClose={handleAssigntaskModalClose}
                    style={{
                        background: "rgba(15, 16, 18, 0.8)",
                        backdropFilter: "blur(8px)",
                    }}
                    aria-labelledby="form-dialog-title"
                >
                    <div className={classes.dbxs}>
                        <ValidatorForm
                            onSubmit={e => {
                                // console.log({

                                //     user_id: selectedTeam.map(member => member.user_id),

                                // });
                            }}
                        >

                            <p className="assigntaskto"> Assign Task To <Close className="assignedtoclose" onClick={handleAssigntaskModalClose} /></p>



                            <DialogContent>

                                {/* <NamesList
                                    activityId={item.activityid}
                                    user_id={item.user_id}
                                /> */}
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <div>
                                        <Autocomplete
                                            id="tags-standard"
                                            validators={["required"]}
                                            multiple
                                            options={names.filter(
                                                member =>
                                                    !selectedTeam.some(
                                                        selectedMember => selectedMember.user_id === member.user_id
                                                    )
                                            )}
                                            style={{ width: 200, marginLeft: -10 }}
                                            getOptionLabel={option => option.fname + " " + option.lname}
                                            onChange={(e, value) => {
                                                setTeam(value);
                                                // console.log(value);
                                            }}


                                            renderInput={params => (

                                                <TextValidator
                                                    type=""
                                                    variant="standard"
                                                    size="small"
                                                    validators={["required"]}
                                                    value={selectedTeam[0] || ""}
                                                    errorMessages={["This field is required"]}
                                                    {...params}

                                                    label="Name"
                                                    fullWidth
                                                    onChange={e => setName(e.target.value)}


                                                />
                                            )}
                                        />
                                    </div>

                                    <FormControl className={classes.dateBox}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                            <div className="startdate">
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    size="small"

                                                    id="date-picker-dialog"
                                                    label=" Start Date"
                                                    format="dd/MM/yyyy"
                                                    style={{ backgroundColor: "#67737A", width: 180 }}
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
                                                    style={{ backgroundColor: "#67737A", width: 180 }}
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


                            </DialogContent>
                            <DialogActions>
                                <div className="assignnow">
                                    <Button
                                        style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                                        onClick={e => {
                                            e.preventDefault();
                                            updateTransfer({
                                                reportid,
                                                start_date,
                                                end_date,
                                                user_id,
                                                task_description,
                                                value: "Accept",

                                            });
                                            // console.log({
                                            //     reportid,
                                            //     start_date,
                                            //     end_date,
                                            //     user_id,
                                            //     task_description,
                                            //     value: "Accept",

                                            // });
                                            handleAssigntaskModalClose();
                                            const sid = selectedTeam[0].user_id
                                            // console.log(user)
                                            const assignedBy = user
                                            // const task_description = item.task_description
                                            const userid = selectedTeam.map(member => member.user_id)
                                            const cutter = _.chunk(userid, 1)
                                            var data = [];
                                            var array = cutter;
                                            array.forEach((message, key) => {
                                                data.push({
                                                    user_id: Number(message),
                                                    task_description, assignedBy, dependency, domain, StartDate,
                                                    EndDate
                                                })
                                            });
                                            // console.log(data);
                                            const report = {
                                                activityid,
                                                milestone: "",
                                                user_id: data,

                                            };
                                            // console.log(report);
                                            const progressInfo = {
                                                name,
                                                endStatus,
                                                progress,
                                            };
                                            postTask({ report, progressInfo, user_id });
                                        }}
                                        className="assignaccept"
                                    // console.log()
                                    >
                                        Assign Now
                                    </Button>
                                </div>
                                <div className="assignlater">
                                    <Button
                                        style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}
                                        onClick={e => {
                                            e.preventDefault();


                                            updateTransfer({
                                                reportid,
                                                user_id,
                                                task_description,
                                                start_date,
                                                end_date,
                                                value: "accept",

                                            });

                                            handleAssigntaskModalClose();
                                        }} className="assignlatert">
                                        Assign Later
                                    </Button>
                                </div>
                            </DialogActions>

                        </ValidatorForm>
                    </div>
                </Dialog>



            </Grid>


        </div >
    );
}

export default Vitetaskitem;