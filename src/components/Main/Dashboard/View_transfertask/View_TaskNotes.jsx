import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

import ActivityItem from "./TaskNotesListItem";

import { useEffect } from "react";

import { useStoreActions, useStoreState } from "easy-peasy";
import LoadingContainer from "../../../UI/LoadingContainer";
import { useState } from "react";
import Noactivities from "../../../../Icons/No Assigned Task.svg";
import { useParams } from "react-router";

// to be seperated
const useStyles = makeStyles(theme => ({
    root: {
        zIndex: 3
    },
    listContainer: {
        padding: 5
    },
    list: {
        width: "100%",
        maxWidth: 100
    },
    listItem: {
        padding: 10,
        marginBottom: 2
    },
    listIcon: {
        marginRight: 10
    }
}));

export default function View_TaskNotes({ user_id, row, supervisorid }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    let [value, setValue] = useState("")
    const { activityid } = useParams();
    // console.log(activityid)
    // console.log(supervisorid, user_id)
    let [CurrentDate, setCurrentdate] = useState("")
    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };
    let { type } = useStoreState(state => state.profileMod.profile);
    let { type: alterType } = useStoreState(state => state.authMod);
    let fetchTransferTask = useStoreActions(
        action => action.activities.FETCH_TRANSFER_NOTES_START);
    const handleClose = () => {
        setOpen(false);
    };
    let istTransferTaskLoading = useStoreState(
        state => state.activities.isTasknotesFetching
    );
    let updateTransfer = useStoreActions(
        action => action.activities.UPDATE_TRANSFERTASK_START
    );
    let transfernotes = useStoreState(state => state.activities.tasktransferNotes);
    // console.log(transfernotes)

    let isTasknotesLoading = useStoreState(state => state.activity.isTasknotesLoading);
    useEffect(() => {
        if (istTransferTaskLoading) fetchTransferTask({ user_id });
    }, [istTransferTaskLoading, fetchTransferTask, user_id]);

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    // console.log(activityid);
    const viewonly = transfernotes.filter(transfernotes => transfernotes.activityid == activityid);
    // console.log(viewonly);
    // const viewnotes = viewonly.map( x => x.activityid);


    return (
        <React.Fragment>
            <br></br>
            {/* <div>
        {activity_title||"not"}
      </div>
<div>{domain_title||"not"}</div> */}
            {/* <Button variant="outlined" onClick={() => changeCounter('decrement')}>Hide All</Button> */}
            <LoadingContainer isLoading={istTransferTaskLoading}>
                {viewonly.length ? (
                    viewonly.map(row => (
                        <ActivityItem
                            row={row}
                            key={row.reportid}
                        />
                    ))
                ) : (
                    <div style={{ marginTop: 50, marginRight: 150 }}>
                        <br></br>
                        <Grid container xs={12} md={9} className="noleave">
                            <img src={Noactivities} className="imagenoactivity" />
                            <p className="noleavetext"> No Pending Transferred Tasks available under this activity</p>
                        </Grid>
                    </div>
                )}
            </LoadingContainer>
        </React.Fragment >
    );
}