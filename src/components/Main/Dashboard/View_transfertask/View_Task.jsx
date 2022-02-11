import React from "react";

import { useEffect } from "react";

import { useStoreActions, useStoreState } from "easy-peasy";
import LoadingContainer from "../../../UI/LoadingContainer";
import { useState } from "react";


import _ from "lodash";
import Taskitems from "./View_taskitems";
import { Grid } from "@material-ui/core";
import Noactivities from "../../../../Icons/No Assigned Task.svg";
// to be seperated

export default function View_Task() {

  let fetchTransferTask = useStoreActions(
    action => action.activities.FETCH_TRANSFERTASK_START);

  let names = useStoreState(state => state.activity.names);
  // console.log(names)




  let istTransferTaskLoading = useStoreState(
    state => state.activities.isTaskFetching
  );
  let updateTransfer = useStoreActions(
    action => action.activities.UPDATE_TRANSFERTASK_START
  );
  let reason = useStoreState(state => state.activities.reason);
  // console.log(reason)
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



  let [reportid, setReportid] = useState("")
  let [user_id, setUser_id] = useState("")
  let [task_description, setTask_description] = useState("")
  let [end_date, setEnd_date] = useState("")
  let [start_date, setStart_date] = useState("")



  const [isInsertingLocal, setInserting] = useState(false);
  useEffect(() => {
    if (istTransferTaskLoading) fetchTransferTask({ user_id });
  }, [istTransferTaskLoading, fetchTransferTask, user_id]);

  let activitynames = useStoreState(state => state.activity.names);
  // console.log(activitynames);
  let users = useStoreState(state => state.authMod.users);
  // const remove = users.filter(users => users.user_id == user_id)
  // console.log(remove)

  const [openAssigntaskModal, setAssigntaskModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

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


  const activity = reason.filter(reason => reason.reportid == reportid)
  const actid = activity.map(e => e.activityid)
  const activityid = parseInt(actid.toString())
  const depend = activity.map(e => e.dependency)
  const dependency = parseInt(depend.toString())


  const handleAssigntaskModalClose = () => {
    setAssigntaskModalOpen(false);

  }


  let postTask = useStoreActions(action => action.activity.POST_TASK_START);
  return (
    <LoadingContainer isLoading={istTransferTaskLoading}>

      {reason.length ? (
        <div>
          {reason.map(item => (
            <Taskitems item={item} key={item.reportid} />
          ))}
        </div>
      ) : (
        <Grid container xs={12} md={9} className="noleave">
          <img src={Noactivities} className="imagenoactivity" />
          <p className="noleavetext"> No TransferTask Present</p>
        </Grid>
      )}

    </LoadingContainer>

  );
}
