import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Divider, Grid, makeStyles, Avatar, FormControl } from "@material-ui/core";

import "./members.css"
import {
    Dialog,


} from "@material-ui/core";

import moment from "moment";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useStoreActions, useStoreState } from "easy-peasy";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Autocomplete from "@material-ui/lab/Autocomplete";

import Block from "./Blockunblockswitch";
import Role from "./Changeroleswitch";

import Avghours from "../../../../Icons/Avg Working Hours.svg"
import {
    MuiPickersUtilsProvider,

    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import LoadingContainer from "../../../UI/Memberscardcontainer";

const defaultMaterialTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            // Purple and green play nicely together.

            backgroundColor: "#202328",
            light: "#ffffff",
            main: "#67737A"
        }
    }
});
const useStyles = makeStyles({
    dividers: {
        backgroundColor: "#67737A",
        // marginLeft: "-20px",
        // marginRight: "10px",
    },
    dividerss: {
        backgroundColor: "#67737A",
        marginLeft: "-60%",
        marginRight: "-90%",
    },
    Failure: {
        color: "red",
    },
    Successfullsubmit: {
        color: "green"
    },
    msx: {
        overflow: "auto",
        width: "600.0px",
        height: "1300px",
        backgroundColor: "#202328 !important"
    },
    purple: {
        background: "#0F1012",
        color: "#67737A"
    },


});


const Members = () => {
    const classes = useStyles();

    // date
    let now = new Date();

    var defaultDate = now;
    var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    var enddate = tomorrow;
    const [StartDate, setStartDate] = useState(new Date(defaultDate));
    const [EndDate, setEndDate] = useState(new Date(enddate));
    const handleStartDateChange = (StartDate) => {
        setStartDate(StartDate)
    }
    const handleEndateChange = (EndDate) => {
        setEndDate(EndDate);
    };

    // 

    // eslint-disable-next-line
    // let { isFetching: isActivitiesLoading, activities } = useStoreState(
    //     state => state.activities
    // );

    const [activities, setActivities] = useState([])
    function fetchActivities() {
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

    useEffect(() => {
        fetchActivities();
    }, [])

    const [teams, setTeams] = useState([])
    async function fetchteam(id) {
        const requestOptions = {
            Credential: 'include',
            method: 'GET',
            headers: { "x-auth-token": localStorage.getItem("token") }
        }
        const response = await fetch(`/team/fetch?activityid=${id}`, requestOptions);
        console.log(response)
        const res = await response.json()
        setTeams(res)
        console.log(res)
    }

    // console.log(activities)
    const activits = activities.map((val) => {
        return val;
    });
    console.log(activits)

    const [activity, setActivity] = useState([{}]);
    const datafetch = activities.filter(item => item.activityid === activity);
    // console.log(activity)
    console.log(datafetch);
    // memberspage related
    const [openMemberspage, setMemberspageOpen] = useState(false);
    let [user_id, setUser_id] = useState("")


    // profilemod
    const handleMemberspageClose = () => { setMemberspageOpen(false); };
    var All = useStoreState(state => state.authMod.unblocked);
    let getAll = useStoreActions(action => action.authMod.FETCH_ALL_UNBLOCKEDSERS);
    console.log(All)

    // let fetchunblockedmembers = useStoreActions(state => state.authMod.FETCH_ALL_UNBLOCKEDSERS);
    console.log(All)


    let Allprofile = useStoreState(state => state.profileMod.allprofile);
    const [getuser_id, setgetUser_id] = useState([])
    let isAllProfileFetching = useStoreState(state => state.profileMod.isAllprofileFetching);
    let getAllProfile = useStoreActions(action => action.profileMod.FETCH_ALLPROFILE_START);
    let clearProfile = useStoreActions(action => action.profileMod.CLEAR_ALLPROFILE);
    // functuion

    // useEffect(() => {
    //     // if (isAllProfileFetching) {
    //     //     console.log("inside")

    //     //     getAllProfile({ user_id });
    //     // }
    //     getAllProfile({ user_id });
    //     return () => clearProfile();
    //     // eslint-disable-next-line
    // }, [getAllProfile, clearProfile, user_id]);
    // let Allprofile = useStoreState(state => state.profileMod.allprofile);

    // console.log([Allprofile])

    // All profile priorites
    console.log(Allprofile[0])
    let avg = [Allprofile[0]];
    let Super = [Allprofile[2]];
    let Supertask = [Allprofile[3]];
    let Superactivity = Allprofile[4];
    

    // activity assigned name
    function getname(name) {
        const userinfo = All.filter(users => users.user_id === name)
        const fname = userinfo.map(x => x.fname)
        const lname = userinfo.map(x => x.lname)
        return fname + lname;
    }
    // assignedbyimage
    function getImage(image) {
        const userinfo = All.filter(users => users.user_id === image)
        const images = userinfo.map(x => x.image)
        return images;
    }

    // to open members card
    const handleMemberspageOpen = (user_id) => {
        console.log(user_id);
        setUser_id(user_id)
        setMemberspageOpen(true);
    };

    function Useridmap(user_id) {
        console.log(user_id);
        handleMemberspageOpen(user_id);
        getAllProfile({user_id})
        // fetchunblockedmembers();
        const First = All.filter(All => All.user_id === user_id)
        setgetUser_id(First)
        console.log(First)
        console.log(All)
    }

    // console.log(getuser_id)

    // leavecount
    let leavecount = useStoreActions(action => action.authMod.POST_LEAVECOUNT_START)
    let leavecountans = useStoreState(state => state.authMod.leavecount.count)

    let Submit = useStoreState(state => state.authMod.Submitts)
    const [value] = useState("submit");
    let success = value;
    // teamcount
    let isTeamcountFetching = useStoreState(state => state.activities.isTeamcountfetching);
    let getTeamcount = useStoreActions(action => action.activities.FETCH_TEAMCOUNT);
    let Clearcount = useStoreActions(action => action.activities.CLEAR_TEAMCOUNT);
    useEffect(() => {
        // eslint-disable-next-line
        if (isTeamcountFetching) getTeamcount();
        return () => Clearcount();
        // eslint-disable-next-line
    }, [getTeamcount, Clearcount]);
    let Count = useStoreState(state => state.activities.teamcount);
    // console.log(Count)

    // 
    function Teamcount(Superactivity) {
        // if (Superactivity === Count.activityid) {
        //     return Count.teamcount
        //     console.log(Count.teamcount)
        // }
        // console.log(Superactivity, Count)
        const Memcount = Count?.filter(item => item.activityid === Superactivity)
        // console.log(Memcount)
        // console.log(Memcount[0].teamcount)
        return Memcount[0].teamcount;
        // console.log(Memcount.teamcount)

    }
    console.log(getuser_id)
    return (
        <div>

            <div>
                <Grid container direction="row" xs={8} md={2} className="memberslist">
                    <ValidatorForm>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <Autocomplete
                                id="tags-standard"
                                onChange={(event, value) => { if (value) { setActivity(value.activityid) }; fetchteam(value.activityid); getAll(); }}
                                options={activits}

                                validators={["required"]}
                                getOptionLabel={option => option.title}

                                renderInput={params => (
                                    <TextValidator
                                        type=""

                                        style={{ width: 300, background: "#202328" }}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        {...params}
                                        variant="outlined"

                                        placeholder="Select Activity"


                                    />

                                )}
                            />
                        </ThemeProvider>
                    </ValidatorForm>
                </Grid>
            </div>
            <div>

                <div>
                    <Grid
                        container
                        direction="row" >
                        {teams.map(item =>
                            <Grid
                                container
                                direction="row"
                                xs={8} lg={2} md={3} sm={3}
                                className="viewactivemembers"
                            >
                                <Grid item xs={12}>
                                    <div style={{ display: "flex", justifyContent: "center", cursor: "pointer" }} >
                                        {item.image ? (
                                            <img src={item.image}
                                                style={{

                                                    // marginLeft: "28%",
                                                    //  marginTop: 20, 
                                                    //  marginBottom: -20, 
                                                    width: 125, height: 125, borderRadius: 60
                                                }}
                                                alt="mainprofile" onClick={() => { Useridmap(item.user_id); }} />
                                        ) : <Avatar style={{
                                            // marginLeft: "28%",
                                            width: 125, height: 125, fontSize: 50, alignSelf: 'center',
                                        }} className={classes.purple} onClick={() => { Useridmap(item.user_id); }} />}
                                    </div>
                                </Grid>
                                {/* <div 
                                    // className="fnames"
                                    > */}
                                <Grid item xs={12} className="fnames1" style={{ display: "flex", justifyContent: "center", }} >
                                    {item.fname} {item.lname}
                                </Grid>
                                {/* <div 
                                        // className="profileusers"
                                        > */}
                                <Grid item xs={12} className="profileusers1" style={{ display: "flex", justifyContent: "center", }} >
                                    Profile Type:
                                    {item.category === "U" ? (<p
                                    // className="profileuser"
                                    >User</p>) : null}
                                    {item.category === "S" ? (<p
                                    // className="profileuser"
                                    >Supervisior</p>) : null}
                                    {item.category === "A" ? (<p
                                    // className="profileuser"
                                    >Admin</p>) : null}
                                    {/* </div> */}
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider light
                                        className={classes.dividers}
                                    />
                                </Grid>
                                {/* </div > */}
                                <Grid item xs={12} style={{ display: "flex", justifyContent: "center", }}>
                                    <Block key={item.user_id} item={item} />
                                </Grid>

                            </Grid>)
                        }</Grid>
                </div>
            </div>
            {/* members popup */}
            {getuser_id.map !== undefined && getuser_id.map(item =>
                <Dialog
                    open={openMemberspage}
                    onClose={handleMemberspageClose}
                    aria-labelledby="form-dialog-title"
                    style={{
                        background: "rgba(15, 16, 18, 0.8)",
                        backdropFilter: "blur(8px)",
                    }}
                    key={item.user_id}
                >
                    <div className={classes.msx}>
                        {/* image */}
                        {item.image ? (
                            <Avatar src={item.image} style={{ width: 100, height: 100, fontSize: 50, marginLeft: "40px", marginRight: "-20px", marginBottom: "-140px ", marginTop: 20 }} alt="mainprofile" />) :
                            <Avatar style={{ width: 100, height: 100, fontSize: 50, marginLeft: "40px", marginTop: 10, marginRight: "-20px", marginBottom: "-140px " }} className={classes.purple} />}
                        {/* fname */}
                        <div className="dialogprofile" key={item.user_id}>    {item.fname}{item.lname}
                            {item.category !== "A" ? (<div className="changerole"><Role item={item} key={item.user_id} /></div>) : null}
                            <div className="profileuserss">  Profile Type:
                                {item.category === "U" ? (<p className="profileusea"><b> User</b></p>) : null}
                                {item.category === "S" ? (<p className="profileusea"><b>Supervisior</b></p>) : null}
                                {item.category === "A" ? (<p className="profileusea"><b>Admin</b></p>) : null}
                            </div>
                            <br></br>
                            <Divider light className={classes.dividerss} />
                            {/* user stats */}
                            {isAllProfileFetching ? (<LoadingContainer isLoading={isAllProfileFetching} />) :
                                (<div>
                                    <p className="userstats">User Statistics</p>

                                    <div>
                                        <div className="userliststats">
                                            <p className="avghead">Avg. Working Hours (per Month) </p><img src={Avghours} style={{ paddingTop: 0.1 }} alt="AVG" className="carddimg" />
                                            {avg.map(item => <div className="avgcount">{item.avg_wrk_hrs}</div>)}
                                            <div className="avgactassign">Activities Assigned</div>

                                            <div className="avgtaskassign">Tasks Assigned</div>
                                            {Super.map(item => <div className="actassigncount">{item.activity_assigned}</div>)}
                                            {Supertask.map(item => <div className="taskassigncount">{item.task_assigned}</div>)}
                                        </div>
                                    </div>

                                    < div >

                                        < p className="useractivitiess" > Activities Assigned</p>
                                        <div style={{ overflow: "auto" }} id="actisheight">
                                            {Superactivity.map !== undefined && Superactivity.map !== null && Superactivity?.map((r,i) =>

                                                <div className="userstates" >

                                                    <Grid container xs={12} md={12}  >

                                                        <Grid item xs={12}><div className="activitylistboxs"><p className="activitymemberss">{activits[i].user_id.length}</p><br></br>
                                                            <p className="members">Members</p></div>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <h1 className="headinglistss" >
                                                                {r.activity_title}</h1>

                                                            <div style={{ marginLeft: "40px" }}>
                                                                <span className="typeofworke"> Type:</span>
                                                                <span className="typeofworkinge">{r.activity_type}</span>
                                                            </div>
                                                            <div style={{ marginLeft: "40px" }}>
                                                                <span className="domainnamese">Domain:</span>
                                                                <span className="domaintitlees">{r.work}</span>
                                                            </div>
                                                        </Grid>
                                                        <p className="assignedbyes">{getImage(r.assignedby) !== null ? <img width='32' height='32' style={{ borderRadius: 50, marginBottom: -10 }} src={getImage(r.assignedby)} alt="AVG" />
                                                            : <Avatar style={{ width: 32, height: 32, marginBottom: -25, marginLeft: -40, borderRadius: 50 }} className={classes.purple} />}
                                                            Assigned by  {getname(r.assignedby)}</p>
                                                    </Grid>
                                                </div>

                                            )}
                                        </div>
                                    </div>
                                </div>
                                )}
                            {/* Leavecount */}
                            <p className="useractivitiess">Leave Count</p>
                            <ValidatorForm
                                onSubmit={e => {

                                    leavecount({
                                        start_end: moment(StartDate).format('YYYY-MM-DD'),

                                        end_date: moment(EndDate).format('YYYY-MM-DD'),
                                        user_id: item.user_id
                                    })


                                }} >
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <FormControl className={classes.dateBox}>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                            <div className="startdatess">
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    size="small"

                                                    id="date-picker-dialog"
                                                    label=" Start Date"
                                                    format="dd/MM/yyyy"
                                                    style={{ backgroundColor: "#67737A", width: 180 }}
                                                    inputVariant="filled"
                                                    value={StartDate}

                                                    onChange={handleStartDateChange}
                                                    KeyboardButtonProps={{
                                                        "aria-label": "change date"
                                                    }}
                                                />
                                            </div>
                                        </MuiPickersUtilsProvider>
                                    </FormControl>


                                    <FormControl className={classes.dateBox}>

                                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                            <div className="enddatess">
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog"
                                                    size="small"
                                                    label=" End Date"
                                                    format="dd/MM/yyyy"
                                                    style={{ backgroundColor: "#67737A", width: 180 }}
                                                    inputVariant="filled"
                                                    minDate={StartDate}
                                                    value={EndDate}

                                                    onChange={handleEndateChange}
                                                    KeyboardButtonProps={{
                                                        "aria-label": "change date"
                                                    }}
                                                />
                                            </div>
                                        </MuiPickersUtilsProvider>

                                    </FormControl>

                                </ThemeProvider>

                                <div className="addactivityys">
                                    <Button type="submit" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 18, lineHeight: "25px" }}
                                        className="addactivityyess">
                                        Count
                                    </Button>

                                </div>
                            </ValidatorForm>
                            {Submit && success === "submit" ?
                                <p className="leavecountss">Total number of leaves: {leavecountans}</p> : null}
                        </div>

                    </div>
                </Dialog>
            )
            }
        </div >
    );
};

export default Members;