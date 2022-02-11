import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import CheckIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import Grid from "@material-ui/core/Grid";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import LoadingContainer from "../../../UI/LoadingContainer";
import { useState } from "react";
import "./style.css";
import Leaveitems from "./Leaveitems";
import Noactivities from "../../../../Icons/No Assigned Task.svg";


// import "../../Dashboard/style.css"

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
    maxWidth: 400
  },
  listItem: {
    padding: 10,
    marginBottom: 2
  },
  listIcon: {
    marginRight: 10
  }
}));

export default function LeaveNotes({ user_id }) {
  const classes = useStyles();

  let { type } = useStoreState(state => state.profileMod.profile);
  // let { type: alterType } = useStoreState(state => state.authMod);
  let fetchLeaveNotes = useStoreActions(
    action => action.attendence.FETCH_LEAVE_NOTES_START
  );

  let isLeaveNotesLoading = useStoreState(
    state => state.attendence.isLeaveFetching
  );
  let leaveNotes = useStoreState(state => state.attendence.leaveNotes);
  // let [admindescription, setAdmindescription] = useState("")

  // console.log(leaveNotes)
  useEffect(() => {
    console.log(isLeaveNotesLoading)
    if (isLeaveNotesLoading) fetchLeaveNotes({ user_id });
  }, [isLeaveNotesLoading, fetchLeaveNotes, user_id]);


  return (
    <LoadingContainer isLoading={isLeaveNotesLoading}>
      {leaveNotes.length ? (

        <div id="actiheight">
          {leaveNotes.map(item => (
            <Leaveitems item={item} key={user_id} />

          ))}
        </div>

      ) : (
        <Grid container xs={12} md={9} className="noleave">
          <img src={Noactivities} className="imagenoactivity" />
          <p className="noleavetext"> No Leaves Present</p>
        </Grid>
      )}
    </LoadingContainer >
  );
}