// assigned activities ,live task,members assigned card details
import React, { useState, useEffect } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import "./styles.css";


import TaskIcon from "../../../../../Icons/taskicon.svg"



function SlidesnewTask() {


    //Number of Live Task

    let islivetaskfetching = useStoreState((state) => state.authMod.islivetaskfetching);
    let livetask = useStoreActions((action) => action.authMod.FETCH_LIVETASK);
    let clearlivetask = useStoreActions((action) => action.authMod.CLEAR_LIVETASK);

    useEffect(() => {
        if (islivetaskfetching) livetask();
        return () => clearlivetask();
    }, [livetask, clearlivetask]);
    let livetasks = useStoreState(state => state.authMod.livetask.count);
    //console.loglivetasks);


    //Number of People On Task

    let ispeopleontaskfetching = useStoreState((state) => state.authMod.ispeopleontaskfetching);
    let peopleontask = useStoreActions((action) => action.authMod.FETCH_PEOPLEONTASK);
    let clearpeopleontask = useStoreActions((action) => action.authMod.CLEAR_PEOPLEONTASK);

    useEffect(() => {
        if (ispeopleontaskfetching) peopleontask();
        return () => clearpeopleontask();
    }, [peopleontask, clearpeopleontask]);
    let peopleontasks = useStoreState(state => state.authMod.peopleontask.count);
    //console.logpeopleontasks);
    let isProfileLoading = useStoreState(state => state.profileMod.isFetching);

    let getProfile = useStoreActions(
        action => action.profileMod.FETCH_PROFILE_START
    );
    let fetchAttendanceReset = useStoreActions(
        action => action.attendence.FETCH_ATTENDENCE_REQUEST
    );
    // live activities
    let fetchActivities = useStoreActions(
        action => action.activities.FETCH_ACTIVITIES_START
    );
    let { isFetching: isActivitiesLoading, activities } = useStoreState(
        state => state.activities
    );
    let { type } = useStoreState(state => state.profileMod.profile);
    let { type: alterType } = useStoreState(state => state.authMod);
    // let isAuth = useStoreState(state => state.authMod.isAuth);
    //console.log(activities)
    useEffect(() => {

        if (isActivitiesLoading)
            fetchActivities({ type: type || alterType });

        // if(isLeavesetching)
        // Revokelist();
        if (isProfileLoading) getProfile();
        return () => fetchAttendanceReset();
    }, []);
    // let act = useStoreState(state => state.activities.activities.length);
    // console.log(act)
    const [act, setact] = useState(0)
    function fetchActivitiess() {
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
                setact(result.length)
            })
        })
    }
    useEffect(() => {
        fetchActivitiess();
    }, [])
    //   
    return (
        <div style={{ padding: "32px 10px 32px 40px" }}>
            <div className="taskhead">Assigned Activities <img src={TaskIcon} className="imagescardtasks" /></div>
            <div className="taskcount">{act}</div>
            <div>
                <span className="livetasks">Live Tasks</span>
                <span className="membersassigned" style={{ marginLeft: "61px" }}>Members Assigned</span>
            </div>
            <div>
                <span className="livetaskcount">{livetasks}</span>
                <span className="membersassignedcount" style={{ marginLeft: "120px" }}>{peopleontasks}</span>
            </div>
        </div>
    );
}
export default SlidesnewTask;