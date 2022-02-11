import React from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import LoadingContainer from "../../../UI/LoadingContainer";
import { useState } from "react";
import Extenddeadlineitem from "./Extenddeadlineitems";
import Noactivities from "../../../../Icons/No Assigned Task.svg";

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
    maxWidth: 470
  },
  listItem: {
    padding: 3,
    marginBottom: 2
  },
  dbx: {
    margin: 10
  },

}));


export default function View_Task({ activityid }) {
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
  const [extended_date, setExtendeddate] = useState(new Date(defaultDate));
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


  // const handleExtdateModalOpen = () => {
  //   setExtdateModalOpen(true);

  // };
  const handleExtdateModalOpen = (user_id,
    reportid,
    start_date,
    end_date,
    extended_date

  ) => {
    setExtdateModalOpen(true);
    setUser_id(reportid)
    setReportid(user_id)
    setStart_date(start_date)
    setEnd_date(end_date)
    setExtendeddate(extended_date)
  };

  const description = deadline.filter(deadline => deadline.reportid == reportid);
  const task_description = description.map(e => e.task_description)


  const handleExtdateModalClose = () => {
    setExtdateModalOpen(false);

  }
  return (
    <LoadingContainer isLoading={isExtendLoading}>

      {deadline.length ? (
        <div >
          {deadline.map(item => (

            <Extenddeadlineitem item={item} key={item.reportid} />


          ))}
        </div>
      ) : (
        <Grid container xs={12} md={9} className="noleave">
          <img src={Noactivities} className="imagenoactivity" />
          <p className="noleavetext"> No Extenddeadline Present</p>
        </Grid>
      )}

    </LoadingContainer >

  );
}