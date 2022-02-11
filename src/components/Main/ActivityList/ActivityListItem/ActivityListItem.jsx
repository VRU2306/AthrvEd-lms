// to new ui
import React, { useEffect } from "react";


import { Link } from "react-router-dom";
import { Grid, makeStyles, Avatar } from "@material-ui/core";
import { useStoreActions, useStoreState } from "easy-peasy";

const useStyles = makeStyles({
  orange: {
    background: "#0F1012",
    color: "#67737A",
    marginTop: "10",
  }
})

function ActivityItem({ row }) {
  const classes = useStyles();
  let isunblockedusersfetching = useStoreState((state) => state.authMod.isunblockedusersfetching)
  let getunBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_UNBLOCKEDSERS)
  let clearunBlockedUsers = useStoreActions((action) => action.authMod.CLEAR_UNBLOCKED)

  useEffect(() => {
    if (isunblockedusersfetching) getunBlockedusers();
    return () => clearunBlockedUsers();
  }, []);
  var All = useStoreState(state => state.authMod.unblocked);
  const First = All.filter(All => All.user_id == row.assignedby)
  const first = First.map(x => x.fname)
  const second = First.map(x => x.lname)
  // console.log(All)
  function getImage(image) {
    const userinfo = All.filter(All => All.user_id === image)
    // console.log(userinfo)
    const images = userinfo.map(x => x.image)
    return images;
  }

  localStorage.setItem("activityid", row.activityid);
  console.log(row.activityid)
  let linkToActivity = `/main/activity/${localStorage.getItem("activityid")}`;
  return (

    <div>
      <Link to={linkToActivity} className="linktoactivity">
        <Grid container xs={12} md={9} className="Activitylist" >
          <Grid item md={"1.5"}><div className="activitylistbox"><p className="activitymembers"> {row.user_id.length}</p><br></br>
            <p className="members">Members</p></div>
          </Grid>
          <Grid item md={10}><h1 className="headinglist">
            <p className="head">{row.title}</p></h1>
            <div classname="cardContents" style={{ marginTop: "16px" }}>
              <span className="typeofwork"> Type :</span>
              <span className="typeofworking">{row.activity_type}</span>
              <span className="domainname">Domain :</span>
              <span className="domaintitle"> {row.domaintitle}</span>
            </div>
            <p className="assignedby">

              {getImage(row.assignedby) ? (
                < img height="32" width="32" style={{ borderRadius: 50, marginBottom: -5 }} src={getImage(row.assignedby)} alt="aa" />) :
                <Avatar style={{ width: 32, height: 32, marginBottom: -25, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
              Assigned by {first}{second}</p>
          </Grid>
        </Grid>
      </Link>
    </div >

  );
}

export default ActivityItem;
