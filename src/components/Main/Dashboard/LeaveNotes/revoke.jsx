import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import CancelIcon from "@material-ui/icons/Cancel";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import LoadingContainer from "../../../UI/LoadingContainer";
import Revokeitems from "./revokeitems";


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
    padding: 5,
    marginBottom: 2
  },
  listIcon: {
    marginRight: 10
  }
}));
export default function RevokeNote({ user_id }) {
  const classes = useStyles();
  let fetchLeaveNotess = useStoreActions(
    action => action.attendence.FETCH_REVOKE_NOTES_START
  );

  let isLeaveNoteLoading = useStoreState(
    state => state.attendence.isLeavessFetching
  );

  let RevokeNotes = useStoreState(state => state.attendence.RevokeNote);
  useEffect(() => {
    console.log(isLeaveNoteLoading)
    if (isLeaveNoteLoading) fetchLeaveNotess({ user_id });
  }, [isLeaveNoteLoading, fetchLeaveNotess, user_id]);
  // console.log(RevokeNotes)
  return (
    <LoadingContainer isLoading={isLeaveNoteLoading}>
      {RevokeNotes.length ? (
        <div id="actiheight">
          {RevokeNotes.map(item => (
            <Revokeitems item={item} key={user_id} />
          ))}
        </div>

      ) : null}

    </LoadingContainer>
  );
}
