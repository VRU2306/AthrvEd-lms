import React, { useState, useEffect } from "react";


import {
    Button,
    Grid,
    Dialog,

    DialogContent,
    DialogActions,

} from "@material-ui/core";
import { useStoreActions, useStoreState } from "easy-peasy";
import Approved from "../../../../Icons/Approved Leave.svg"
import Rejected from "../../../../Icons/Rejected Leave.svg"
import Pending from "../../../../Icons/Pending Leave.svg"
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { makeStyles, Avatar } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import moment from "moment";
// import classes from "*.module.css";
const defaultMaterialTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            // Purple and green play nicely together.
            light: "#ffffff",
            main: "#67737A"
        }
    }
});
const useStyles = makeStyles(theme => ({

    dsx: {
        width: "500px",

        backgroundColor: "#202328 !important"
    },
    purpledark: {
        background: "#0f1012",
        color: "#67737A",
        marginTop: "10",
    }

}));
function LeaveItem({ item, user_id }) {
    const classes = useStyles();
    let [uuid, setUuid] = useState("")
    let [CurrentDate, setCurrentdate] = useState("")
    let [EndDate, setEndDate] = useState("")
    let [StartDate, setStartDate] = useState("")
    let [status, setStatus] = useState("")
    let [adminmail, setAdminmail] = useState("")
    const [openLeaveModal, setLeaveModalOpen] = useState(false);
    const [openRevokeModal, setRevokeModalOpen] = useState(false);
    let [admindescription, setAdmindescription] = useState("")
    let [revokedreason, setRevokedreason] = useState("")
    let [revoke] = ("yes")
    let { type } = useStoreState(state => state.profileMod.profile);
    let revokedleave = useStoreActions(
        action => action.attendence.REVOKE_LEAVE_NOTE_START
    );
    let updateLeaveNotes = useStoreActions(
        action => action.attendence.UPDATE_LEAVE_NOTE_START
    );

    const handleRevokeModalOpen = (uuid,
        StartDate,
        EndDate,
        revokedreason
    ) => {
        setRevokeModalOpen(true);
        setUuid(uuid)
        setStartDate(StartDate)
        setEndDate(EndDate)
        setRevokedreason(revokedreason)
    };
    let fetchLeaveNotes = useStoreActions(
        action => action.attendence.FETCH_LEAVE_NOTES_START
    );
    let isLeaveNotesLoading = useStoreState(
        state => state.attendence.isLeavesFetching
    );
    useEffect(() => {
        if (isLeaveNotesLoading) fetchLeaveNotes({ user_id });
    }, [isLeaveNotesLoading, fetchLeaveNotes, user_id]);

    const handleRevokeModalClose = () => {
        setRevokeModalOpen(false);
        setRevokedreason(null)
    }
    var All = useStoreState(state => state.authMod.unblocked);
    function getImage(image) {
        const userinfo = All.filter(All => All.user_id === image)
        // console.log(userinfo)
        const images = userinfo.map(x => x.image)
        return images;
    }
    let imageid = item.uuid
    // console.log(imageid)

    const handleLeaveModalOpen = (uuid,
        CurrentDate,
        StartDate,
        EndDate,
        adminmail,
        status,
        admindescription) => {
        setLeaveModalOpen(true);
        setUuid(uuid)
        setCurrentdate(CurrentDate)
        setStartDate(StartDate)
        setEndDate(EndDate)
        setAdminmail(adminmail)
        setStatus(status)
        setAdmindescription(admindescription)

    };

    const handleLeaveModalClose = () => {
        setLeaveModalOpen(false);
        setAdmindescription(null)
    }
    var All = useStoreState(state => state.authMod.unblocked)
    function getImage(imageid) {
        const userinfo = All.filter(All => All.user_id === item.uuid)

        const images = userinfo.map(x => x.image)
        // console.log(images)
        return images;
    }
    console.log(item.revoke)
    return (
        <div isLoading={isLeaveNotesLoading}>
            <Grid container xs={12} md={9} className="Leavelist" >
                {item.status === "accepted" ? (<Grid item xs={12} md={1}><img src={Approved} className="leaveicon" /></Grid>) : null}
                {item.status === "rejected" ? (<Grid item xs={12} md={1}><img src={Rejected} className="leaveicon" /></Grid>) : null}
                {item.status === "Pending" ? (<Grid item xs={12} md={1}><img src={Pending} className="leaveicon" /></Grid>) : null}
                <Grid item md={8}><h1 className="Leaveheadinglist">{
                    moment(item.StartDate).format("MMM Do YY") +
                    " to " +
                    moment(item.EndDate).format("MMM Do YY")
                }<br></br><br /><p className="leavereason"> {item.reason}  </p></h1>
                    <br />


                    {type !== "A" ? (
                        <span className="requestbystatus">Status :
                            {item.status === "accepted" ? (<span className="requestbystatusaccepted">Approved</span>) : null}
                            {item.status === "rejected" ? (<span className="requestbystatusrejected">Rejected</span>) : null}
                            {item.status === "Pending" ? (<span className="requestbystatuspending">Pending</span>) : null}
                        </span>) : null}

                    {type === "A" ? (<p className="requestby">
                        {item.image ? (
                            <img height="32" width="32" style={{ borderRadius: 50, marginBottom: -5 }} src={item.image} alt="A" />) :
                            <Avatar style={{ width: 32, height: 32, marginBottom: -25, marginLeft: -40, borderRadius: 50 }} className={classes.purpledark} />}
                        Request by {item.name}</p>) : null}
                </Grid>
                {/* accept leave */}
                <Grid item md={3}>
                    {type === "A" && item.status !== "accepted" ?
                        (<div className="leaveaccepted"><Button style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }} className="leaveaccept"
                            onClick={event => {
                                let {
                                    uuid,
                                    name,
                                    CurrentDate,
                                    adminmail,
                                    EndDate,
                                    StartDate
                                } = item;
                                updateLeaveNotes({
                                    uuid,
                                    CurrentDate,
                                    name,
                                    adminmail,
                                    EndDate,
                                    StartDate,
                                    status: "accepted"
                                });
                            }}>Accept</Button></div>
                        ) : null}
                    {/* reject leave */}
                    {type === "A" && item.status !== "accepted" ?
                        (<div className="leaverejected">
                            <Button
                                style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}
                                onClick={event => {
                                    handleLeaveModalOpen(item.uuid,
                                        item.CurrentDate, item.StartDate, item.EndDate,
                                        item.adminmail, status = "rejected");
                                }}
                                className="leavereject" > Deny</Button></div>
                        ) : null}
                    {/* revoke */}
                    {type !== "A" && item.status === "accepted" && item.revoke == "no" ? (
                        <div className="leaveacceptedrevoke"><Button style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                            onClick={event => {
                                handleRevokeModalOpen
                                    (
                                        item.uuid,
                                        item.StartDate,
                                        item.EndDate);
                                // console.log(item.status, type)
                            }}
                            className="leaveaccept"
                        >Revoke</Button>
                        </div>
                    ) : null}
                </Grid>
                {/* revoke end */}
                <Dialog
                    open={openLeaveModal}
                    onClose={handleLeaveModalClose}
                    style={{
                        background: "rgba(15, 16, 18, 0.8)",
                        backdropFilter: "blur(8px)",
                    }}
                    aria-labelledby="form-dialog-title"
                >
                    <div className={classes.dsx}>
                        <ValidatorForm
                            onSubmit={event => {
                                updateLeaveNotes({
                                    uuid,
                                    CurrentDate,
                                    StartDate,
                                    EndDate,
                                    adminmail,
                                    status,
                                    admindescription
                                });
                                handleLeaveModalClose();
                            }}
                        >
                            {/* cancel a leave note */}
                            <p className="Cancelleavehead">Cancel Leave </p>
                            <DialogContent>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <TextValidator
                                        validators={['required']}
                                        variant="filled"
                                        multiline
                                        rows={4}
                                        margin="dense"
                                        type=""
                                        id="leave_reason"
                                        value={admindescription}
                                        onChange={e => setAdmindescription(e.target.value)}
                                        label="Reason for the canceling leave"
                                        fullWidth
                                    />
                                </ThemeProvider>
                            </DialogContent>
                            <DialogActions>
                                <div className="applyingnow">
                                    <Button
                                        style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                                        type="Submit"
                                        className="applynow"
                                    >
                                        Submit
                                    </Button>
                                </div>
                                <div className="applylater">
                                    <Button
                                        style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}
                                        onClick={handleLeaveModalClose} className="applyinglater">
                                        Cancel
                                    </Button>
                                </div>
                            </DialogActions>
                        </ValidatorForm>
                    </div>
                </Dialog>
                {/* rejected leave reason end */}
                {/* revoke leave start */}
                <Dialog
                    open={openRevokeModal}
                    onClose={handleRevokeModalClose}
                    style={{
                        background: "rgba(15, 16, 18, 0.8)",
                        backdropFilter: "blur(8px)",
                    }}
                    aria-labelledby="form-dialog-title"
                >

                    <div className={classes.dsx}>
                        <ValidatorForm
                            onSubmit={e => {
                                e.preventDefault();
                                revokedleave({
                                    uuid,
                                    StartDate,
                                    EndDate,
                                    revokedreason,
                                    revoke,
                                });
                                handleRevokeModalClose();

                                // console.log(uuid,
                                //     StartDate,
                                //     EndDate,
                                //     revokedreason,
                                //     revoke)


                            }}
                        >
                            <p className="revokenoteheadings"> Revoke The Leave </p>
                            <DialogContent>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <TextValidator
                                        validators={['required']}
                                        variant="filled"
                                        multiline
                                        autoFocus
                                        margin="dense"
                                        id="leave_reason"
                                        style={{ backgroundColor: "#373B3D" }}
                                        value={revokedreason}
                                        onChange={e => setRevokedreason(e.target.value)}
                                        label="Reason for the  revoke of leave"
                                        type="text"
                                        multiline
                                        rows={4}
                                        fullWidth
                                    />
                                </ThemeProvider>
                            </DialogContent>
                            <DialogActions>
                                <div className="requestnow">
                                    <Button
                                        type="Submit"
                                        className="revokerequest"
                                        style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                                    >
                                        Request
                                    </Button>
                                </div>
                                <div className="requestcancels">
                                    <Button onClick={handleRevokeModalClose}
                                        style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}
                                        className="requestcancel">
                                        Cancel
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

export default LeaveItem;