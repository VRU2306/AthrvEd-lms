import React, { useState, useEffect } from "react";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useStoreActions, useStoreState } from "easy-peasy";

import "./activitynewui.css";



import { useParams } from "react-router";

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import membericon from "../../../Icons/peopleicon.svg";
import tasksicon from "../../../Icons/taskicon.svg";
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#46CB18'
        },
        secondary: {
            main: '#FE8116'
        }
    }
})

function Cardds({ user_id, countmembers }) {
    const { activityid } = useParams();
    // console.log(activityid)
    // let users = useStoreState(state => state.authMod.unblocked);
    // console.log(users)


    // fetch people task 
    let ispepontaskFetching = useStoreState(state => state.activity.isFetching);
    let fetchPeopletask = useStoreActions(action => action.activity.FETCH_PEOPLEONTASK_START);
    let clearTasks = useStoreActions(action => action.activity.CLEAR_TASKS);

    useEffect(() => {
        if (ispepontaskFetching) fetchPeopletask({ activityid });
        return () => clearTasks();
    }, [fetchPeopletask, clearTasks, activityid, user_id]);

    let pepontask = useStoreState(state => state.activity.pepontask);
    // console.log(pepontask)


    // Total task
    const tasks = useStoreState(state => state.activity.tasks.length);
    // console.log(tasks)
    //no of people in activity
    let istasknamesFetching = useStoreState(state => state.activity.isFetching);
    let fetchPeopletasks = useStoreActions(action => action.activity.FETCH_TASKNAMES_START);
    let clearTaskss = useStoreActions(action => action.activity.CLEAR_TASKS);

    useEffect(() => {
        if (istasknamesFetching) fetchPeopletasks({ activityid });
        return () => clearTaskss();
    }, [fetchPeopletasks, clearTaskss, activityid, user_id]);
    let names = useStoreState(state => state.activity.tasknames.length);
    // console.log(names)

    // TODAY LEAVE TASK
    let istodleavetaskFetching = useStoreState((state) => state.activity.isFetching);
    let fetchTodleavetask = useStoreActions((action) => action.activity.FETCH_TASKTODAYLEAVE_START);


    useEffect(() => {
        if (istodleavetaskFetching) fetchTodleavetask({ activityid });
        return () => clearTasks();
    }, [fetchTodleavetask, clearTasks, activityid, user_id]);
    let todayleavetask = useStoreState(state => state.activity.todayleavetask);
    // console.log(todayleavetask);
    //tomtaskleave

    let istommleavetaskFetching = useStoreState((state) => state.activity.isFetching);
    let fetchTomleavetask = useStoreActions((action) => action.activity.FETCH_TASKTOMORROWLEAVE_START);


    useEffect(() => {
        if (istommleavetaskFetching) fetchTomleavetask({ activityid });
        return () => clearTasks();
    }, [fetchTomleavetask, clearTasks, activityid, user_id]);
    let tomorrowleavetask = useStoreState(state => state.activity.tomorrowleavetask);
    // console.log(tomorrowleavetask);

    // console.log(row)
    //Number Of Ongoing Task 

    let isongoingFetching = useStoreState((state) => state.activity.isFetching);
    let fetchOngoingtask = useStoreActions((action) => action.activity.FETCH_ONGOINGTASK_START);


    useEffect(() => {
        if (isongoingFetching) fetchOngoingtask({ activityid });
        return () => clearTasks();
    }, [fetchOngoingtask, clearTasks, activityid, user_id]);
    let ontask = useStoreState(state => state.activity.ongoing);
    // console.log(ontask);
    // No of completed task
    let iscompletedFetching = useStoreState((state) => state.activity.isFetching);
    let fetchCompletedtask = useStoreActions((action) => action.activity.FETCH_COMPLETEDTASK_START);


    useEffect(() => {
        if (iscompletedFetching) fetchCompletedtask({ activityid });
        return () => clearTasks();
    }, [fetchCompletedtask, clearTasks, activityid, user_id]);
    let completedtask = useStoreState(state => state.activity.Completed);
    // console.log(completedtask);
    // 
    // no of paused task
    let ispausedFetching = useStoreState((state) => state.activity.isFetching);
    let fetchPausedtask = useStoreActions((action) => action.activity.FETCH_PAUSEDTASK_START);



    const [taskcount, settaskcount] = useState(0)

    // let activityidd = localStorage.getItem("activityid")
    function fetchActivitiessingle() {

        fetch(`/counttaskinactivity?activityid=${activityid}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            },
        }).then((response) => {
            console.log("pfegt", response)
            response.json().then((result) => {
                console.log("result", result)
                settaskcount(result.count)
            })
        })
    }

    useEffect(() => {
        fetchActivitiessingle()
    }, [])


    useEffect(() => {
        if (ispausedFetching) fetchPausedtask({ activityid });
        return () => clearTasks();
    }, [fetchPausedtask, clearTasks, activityid, user_id]);
    let paused = useStoreState(state => state.activity.paused);
    // console.log(paused);

    return (
        <Grid container>
            <Grid item xs={12}>
                <p className="headerss">Activity Status</p>
            </Grid>
            <div className="activitymember">
                <div style={{ display: "flex", flexDirection: "column", flex: "90%" }}>

                    <div className="para6">Assigned Members</div>
                    <div style={{ fontWeight: "bold", fontSize: "54px", color: "#FF395D" }}>{countmembers}</div>

                    <div className="taskdetails">
                        <div>
                            <p className="para4">On Leave</p>
                            <br /><br />
                            <p className="para5">{todayleavetask}</p>
                        </div>
                        <div className="spacess">
                            <p className="para4">Tomorrow On Leave</p>
                            <br /><br />
                            <p className="para5">{tomorrowleavetask}</p>
                        </div>
                    </div>
                </div>

                <div style={{ flex: "10%", marginTop: "-2%" }}>
                    <img src={membericon}></img>
                </div>
            </div>

            <div className="activitytasks">
                <div style={{ display: "flex", flexDirection: "column", flex: "90%" }}>
                    <div className="para6">Assigned Tasks</div>
                    <div style={{ fontWeight: "bold", fontSize: "54px", color: "#38EF77" }}>{taskcount}</div>

                    <div className="taskdetails">
                        <div>
                            <p className="para4">People On Task</p>
                            <br /><br />
                            <p className="para5">{pepontask}</p>
                        </div>
                    </div>
                </div>

                <div style={{ flex: "10%", marginTop: "-2%" }}>
                    <img src={tasksicon}></img>
                </div>
            </div>

        </Grid>
    );
}
export default Cardds;