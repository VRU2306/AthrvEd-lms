// to new ui
import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Title from "../../UI/Title";
import ActivityItem from "./ActivityListItem/ActivityListItem";
// import ActivityHead from "./ActivityHead/ActivityHead";
import LoadingContainer from "../../UI/LoadingContainer";
import { authorization } from "../../Auth/authorization";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";
import "./style.css";
import { Grid } from "@material-ui/core";
import Noactivities from "../../../Icons/No Assigned Task.svg";
export default function ActivityList() {
  // let { isFetching: isProfileLoading } = useStoreState(
  //   state => state.profileMod
  // );
  // let { isAdminAuthAttempt: isAdmin, isAuth } = useStoreState(
  //   state => state.authMod
  // );
  // let { type: isRegularUserAuth } = useStoreState(
  //   state => state.profileMod.profile
  // );
  // let checkAdmin = useStoreActions(action => action.authMod.FETCH_ALL_USERS);
  // let setAuth = useStoreActions(action => action.authMod.SET_REGULAR_AUTH);
  // let checkRegularUser = useStoreActions(
  //   action => action.profileMod.FETCH_PROFILE_START
  // ); let { type } = useStoreState(state => state.profileMod.profile);
  // let { type: alterType } = useStoreState(state => state.authMod);
  // let fetchActivities = useStoreActions(
  //   action => action.activities.FETCH_ACTIVITIES_START
  // );

  // let { isFetching: isActivitiesLoading, activities } = useStoreState(
  //   state => state.activities
  // );

  // // let isAuth = useStoreState(state => state.authMod.isAuth);

  // // console.log(activities)
  // // console.log(isProfileLoading)
  // // console.log(isActivitiesLoading)
  // // console.log(isAuth)
  // useEffect(() => {
  //   if (!isAuth) {
  //     authorization(
  //       isAdmin,
  //       checkAdmin,
  //       checkRegularUser,
  //       isRegularUserAuth,
  //       setAuth,

  //     );
  //   }
  //   if (!isProfileLoading && isActivitiesLoading && isAuth)
  //     fetchActivities({ type: type || alterType });
  // }, [
  //   isProfileLoading,
  //   type,
  //   alterType,
  //   isActivitiesLoading,
  //   fetchActivities,
  //   isAuth,

  // ]);
  let { type } = useStoreState(state => state.profileMod.profile);
  let {user_id}  = useStoreState(state => state.profileMod.profile);

  const [activities, setActivities] = useState([])
  function fetchActivities() {
    if(type=='A')
    {
      fetch(`/activity/fetch`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      }).then((response) => {
        console.log("pfegt", response)
        response.json().then((result) => {
          console.log(result)
          setActivities(result)
        })
      })
    }
    else
    {
      fetch(`/activity/fetch?user_id=${user_id}`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      }).then((response) => {
        console.log("pfegt", response)
        response.json().then((result) => {
          console.log(result)
          setActivities(result)
        })
      })
    }
    
  }

  useEffect(() => {
    fetchActivities();
  }, [])



  return (
    <div id="actiheight">
      {activities.length ? (
        <div>
          {activities.map(row => (
            <ActivityItem row={row} key={row.activityid} />
          ))}
        </div>
      ) : (
        <Grid container xs={12} md={9} className="noactivity">
          <img src={Noactivities} className="imagenoactivity" /> <p className="noactivitytext"> Oops....No activities are assigned. Ask your superviser <br></br>to assign new activities and lets start working!</p>
        </Grid>
      )}
    </div >
  );
}
