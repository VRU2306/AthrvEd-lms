import React, { useState, useEffect, useContext, useCallback } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Avatar } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import Copyright from "../../UI/Copyrights";
import useStyles from "./activityStyles";
import { useParams } from "react-router";
import EditingLoadingScreen from "../../UI/EditingLoadingScreen";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LoadingContainer from "../../UI/LoadingContainer";
import { useStoreState, useStoreActions } from "easy-peasy";
import AddTask from "./AddTask/AddTask";
import TaskFilterActions from "./TaskList/TaskFilterActions/TaskFilterActions";
import Add from "@material-ui/icons/AddSharp";
import activity from "../../../models/activity";
import View_tasknotes from "../Dashboard/View_transfertask/View_TaskNotes"
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { green } from "@material-ui/core/colors";
import DateFnsUtils from "@date-io/date-fns";
import { red } from "@material-ui/core/colors";
import Close from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Sliding from "./Slidings";
import Viewallfalse from "../../../Icons/Closed Eyes.svg"
import Viewall from "../../../Icons/Eye Open.svg"
import { Link } from "react-router-dom";
import { SocketContext } from "../../../App";
import Kanban from './kanban/Kanban'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Table from 'react-bootstrap/Table'
import {
  Dialog,
  Paper,
  ListItem,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  MenuItem,
} from "@material-ui/core";
import {
  TextValidator,
  ValidatorForm,
  SelectValidator
} from "react-material-ui-form-validator";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import { Sort } from "@material-ui/icons";
import { sort } from "d3-array";
// import Techadmin from "./Techadmin";
// import "./Nontech.css";
import "./activitynewui.css";
// import Techuser from "./Techuser";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
import SendIcon from '@material-ui/icons/Send';
import Picker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';

import { authorization } from "../../Auth/authorization";
import { queryByRole } from "@testing-library/react";
import { color } from "d3";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      // Purple and green play nicely together.

      backgroundColor: "#202328 !important",
      light: "#ffffff",
      main: "#67737A"
    }
  }
});

const themechangetheme = createMuiTheme({
  palette: {
    type: 'dark'
  }
})
const useStyles1 = makeStyles(theme => ({
  formControl: {
    minWidth: 200,
    marginTop: "20px"
  },

  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  dsbx: {
    [theme.breakpoints.up('sm')]: {
      width: "550px",
      flexShrink: 0,
    },

    backgroundColor: "#202328 !important"
  }
}));



const Activity = (row) => {
  let socket = useContext(SocketContext);

  console.log(localStorage.getItem("activityid"));

  const { activityid } = useParams();
  localStorage.setItem("activityid", activityid);
  //console.log(activityid)
  let { user_id } = useStoreState(state => state.profileMod.profile);
  let isTasksLoading = useStoreState(state => state.activity.isFetching);
  const { tasks } = useStoreState(state => state.activity);
  const alter_user_id = useStoreState(state => state.authMod.user_id);
  const [tasksBuffer, setTasksBuffer] = useState([""]);
  const [name, setName] = useState([""]);
  const [date, setDate] = useState(new Date());
  const [StartDate, setStartDate] = useState(new Date(row.start_date));
  const [EndDate, setEndDate] = useState(new Date(row.end_date));
  const [StartDateRange, setStartDateRange] = useState(new Date());
  const [EndDateRange, setEndDateRange] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);


  // let activities = useStoreState(state => state.activities.activities);
  // let fetchactivites = useStoreActions((action) => action.activities.FETCH_ACTIVITIES_START)
  // useEffect(() => {
  //   if (isTasksLoading) {
  //     fetchactivites("A");
  //   }
  // }, [isTasksLoading, fetchactivites, activities]);



  let { isFetching: isProfileLoading } = useStoreState(
    state => state.profileMod
  );
  let { isAdminAuthAttempt: isAdmin, isAuth } = useStoreState(
    state => state.authMod
  );
  let { type: isRegularUserAuth } = useStoreState(
    state => state.profileMod.profile
  );
  let checkAdmin = useStoreActions(action => action.authMod.FETCH_ALL_USERS);
  let setAuth = useStoreActions(action => action.authMod.SET_REGULAR_AUTH);
  let checkRegularUser = useStoreActions(
    action => action.profileMod.FETCH_PROFILE_START
  ); let { type } = useStoreState(state => state.profileMod.profile);
  let { type: alterType } = useStoreState(state => state.authMod);
  let fetchActivities = useStoreActions(
    action => action.activities.FETCH_ACTIVITIES_START
  );

  let { isFetching: isActivitiesLoading, activities } = useStoreState(
    state => state.activities
  );
  const [emojiopen, setEmojiOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [message, setmessage] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    // setChosenEmoji(emojiObject);
    // console.log(chosenEmoji.emoji)
    emojiObject ? (
      setmessage(message + emojiObject.emoji)) : setmessage(message);
  };


  // let isAuth = useStoreState(state => state.authMod.isAuth);

  // console.log(activities)
  // console.log(isProfileLoading)
  // console.log(isActivitiesLoading)
  // console.log(isAuth)
  useEffect(() => {
    if (!isAuth) {
      authorization(
        isAdmin,
        checkAdmin,
        checkRegularUser,
        isRegularUserAuth,
        setAuth,

      );
    }
    if (!isProfileLoading && isActivitiesLoading && isAuth)
      fetchActivities({ type: type || alterType });
  }, [
    isProfileLoading,
    type,
    alterType,
    isActivitiesLoading,
    fetchActivities,
    isAuth,

  ]);



  // let { isFetching: isActivitiesLoading, activities } = useStoreState(
  //   state => state.activities
  // );

  //console.log(activities)
  const classes = useStyles();
  const classes1 = useStyles1();
  let isRemoveLoading = useStoreState(state => state.activity.isRemovememberinserting);

  let isAddmemberInserting = useStoreState((state) => state.activity.isAddmemberinserting);
  let successful = useStoreState((state) => state.activity.successful);
  let failure = useStoreState((state) => state.activity.failure);

  let Successful = () => (successful ? "Added Succesfully" : "");
  let Failure = () => (failure ? "Failed to Add" : "");

  const [openAddModal, setAddModalOpen] = useState(false);
  const [openAdd, setAddopen] = useState(false);
  const [Sortopen, setSortopen] = useState(false);

  const [openRemoveModal, setRemoveModalOpen] = useState(false);
  const [openRemove, setRemoveopen] = useState(false);
  const [view, setView] = useState(true);
  const [assignedView, setassignedView] = useState(true);
  const [transferredView, settransferredView] = useState(true);
  const [ticketView, setTicketView] = useState(true);
  const [addTicket, setAddTicket] = useState(false);

  const handleOpenAddTicket = () => {
    setAddTicket(true);
  }
  const handleCloseAddTicket = () => {
    setAddTicket(false);
  }
  const toggleView = () => {
    setView(true)
  }
  const assignedtoggleView = () => {
    setassignedView(true)
    document.getElementById("showtasklist").style.display = "none"
  }
  const assignedtoggleViewfalse = () => {
    setassignedView(false)
    document.getElementById("showtasklist").style.display = "block"
  }
  const transferredtoggleView = () => {
    settransferredView(true)
  }
  const [selectedTeam, setTeam] = useState([]);
  let userss = useStoreState(state => state.authMod.users);
  let isunblockedusersfetching = useStoreState((state) => state.authMod.isunblockedusersfetching)
  let getunBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_UNBLOCKEDSERS)
  let clearunBlockedUsers = useStoreActions((action) => action.authMod.CLEAR_UNBLOCKED)


  useEffect(() => {
    if (isunblockedusersfetching) getunBlockedusers(userss);
    return () => clearunBlockedUsers();
  }, []);
  // let users = useStoreState(state => state.authMod.unblocked);
  let users = useStoreState(state => state.authMod.unblocked);

  console.log(users)



  useEffect(() => {
    if (!isTasksLoading) {
      setTasksBuffer(tasks);

    }
  }, [isTasksLoading, tasks, setTasksBuffer, activityid]);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  function filterByNames(tasks, names, isTransaction) {
    // side effect!! be careful in these cases
    // console.log(names)
    let updatedTasks = names.length
      ? tasks.filter(task =>
        names.some(name => task.fname + " " + task.lname === name)
      )
      : tasks;
    setTasksBuffer(updatedTasks);
    if (isTransaction) filterByNames(updatedTasks, date, false);
  }
  let isnamesFetching = useStoreState(state => state.activity.isNameFetching);
  let fetchPeopletasks = useStoreActions(action => action.activity.FETCH_USER_NAME_START);
  let clearTaskss = useStoreActions(action => action.activity.CLEAR_TASKS);

  useEffect(() => {
    if (isnamesFetching) fetchPeopletasks({ activityid });
    return () => clearTaskss();
  }, [fetchPeopletasks, clearTaskss, activityid, user_id]);

  let activitynames = useStoreState(state => state.activity.names);
  // console.log(activitynames)
  let fillers = users.map(obj => ({ user_id: obj.user_id, fname: obj.fname, lname: obj.lname }))
  // console.log(fillers)
  let filler = activitynames.map(obj => ({ user_id: obj.user_id, fname: obj.fname, lname: obj.lname }))
  //console.log(filler)


  fillers = fillers.filter(function (cv) {
    return !filler.find(function (e) {
      return e.user_id == cv.user_id
    });

  });
  //console.log(fillers)



  //console.log(tasks)


  // const filterByInterval = tasks.filter(a => {
  //   var date = new Date(a.date);
  //   return (date >= StartDate && date <= EndDate);
  // })
  // console.log(filterByInterval)

  function handleSortopen() {
    setSortopen(true)
  }
  function handleSortClose() {
    setSortopen(false)
  }
  const handleStartDateChange = (StartDate) => {
    setStartDate(StartDate);
  };
  const handleEndDateChange = (EndDate) => {
    setEndDate(EndDate);
  };
  const handleAddModalOpen = () => {
    setAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setAddModalOpen(false);
  };

  const handleAddopen = () => {
    setAddopen(true)
  };

  const handleAddclose = () => {
    setAddopen(false)
  };

  const handleRemoveModalOpen = () => {
    setRemoveModalOpen(true);
  };

  const handleRemoveModalClose = () => {
    setRemoveModalOpen(false);
  };

  const handleRemoveopen = () => {
    setRemoveopen(true)
  };

  const handleRemoveclose = () => {
    setRemoveopen(false)
  };

  function isTodaysTaskUpdated(tasks, user_id) {

    return tasks.some(task => {
      // console.log(
      //   new Date(task.date).toLocaleDateString(),
      //   new Date().toLocaleDateString()
      // );
      return (
        new Date(task.date).toLocaleDateString() ===
        new Date().toLocaleDateString() && user_id === task.user_id
      );
    });
  }

  function getAllUtil(tasks, field) {

    let uniqueTasks = [];
    tasks = tasks.map(task => ({
      name: task.fname + " " + task.lname
    }));

    tasks.forEach(task => {
      if (!uniqueTasks.some(uniqueTask => uniqueTask[field] === task[field])) {
        uniqueTasks.push({ [field]: task[field] });
      }
    });

    return uniqueTasks;
  }

  function filterByDate(tasks, date, isTransaction) {
    // side effect!! be careful in these cases
    // let date1 = new Date(date).toLocaleDateString()
    // console.log(date1.lenght)
    // console.log(tasks)
    let updatedTasks =
      tasks.filter(
        task =>
          new Date(task.start_date).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
      )
    setTasksBuffer(updatedTasks);
    if (isTransaction) filterByNames(updatedTasks, [], false);
  }

  function filterByDateRange(tasks, StartDateRange, EndDateRange, isTransaction) {
    // side effect!! be careful in these cases
    // console.log(StartDateRange.length)
    let updatedTasks = []
    for (let i = 0; i < tasks.length; i++) {
      let start = new Date(tasks[i].start_date).toLocaleDateString()
      let startDate = new Date(StartDateRange).toLocaleDateString()
      let EndDate = new Date(EndDateRange).toLocaleDateString()
      if ((Date.parse(start) >=
        Date.parse(startDate)) &&
        (Date.parse(start) <=
          Date.parse(EndDate))) {
        updatedTasks.push(tasks[i])
        // console.log(i,tasks[i])
      }


    }

    // let updatedTasks =
    //   tasks.filter(
    //     task =>
    //     ((Date.parse(new Date(task.start_date).toLocaleDateString()) >=
    //      Date.parse(new Date(StartDateRange).toLocaleDateString())) &&
    //       Date.parse((new Date(task.start_date).toLocaleDateString()) <=
    //        Date.parse(new Date(EndDateRange).toLocaleDateString())))
    //   )
    setTasksBuffer(updatedTasks);
    if (isTransaction) filterByNames(updatedTasks, [], false);
  }



  let addmember = useStoreActions(
    (state) => state.activity.POST_ADD_MEMBER_START
  )

  let removemember = useStoreActions(
    (state) => state.activity.REMOVE_MEMBER_START
  )


  /*Project Information */
  const activityfilter = activities.filter(activities => activities.activityid == activityid)
  //console.log(activities)
  // console.log(activityfilter);
  const atitle = activityfilter.map(x => x.activity_title)
  //console.log(atitle)
  const aadomain = activityfilter.map(x => x.work)
  const adomain = activityfilter.map(x => x.title)
  const atype = activityfilter.map(x => x.activity_type)
  const supervisor_id = activityfilter.map(x => x.suid)
  // console.log(supervisor_id[0]);
  // console.log(fillers)
  const supervisor = users.filter(users => users.user_id === supervisor_id[0])
  const supervisor_name = supervisor.map(x => x.fname + ' ' + x.lname)
  // console.log(supervisor_name);

  function getImage(image) {
    const userinfo = users.filter(users => users.user_id == image)
    console.log(userinfo)
    const images = userinfo.map(x => x.image)
    return images;
  }
  let unblocked = useStoreState(state => state.authMod.unblocked);


  function getname(id) {
    if (id != undefined) {
      const filteredUser = unblocked.filter(users => users.user_id == id[0])
      const name = filteredUser.length ?
        `${filteredUser[0].fname} ${filteredUser[0].lname}` : ""
      return name;
    }

  }


  // Ticket raising states and functions
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const [queryTitle, setQueryTitle] = useState("");
  const [queries, setQueries] = useState([]);
  const [raisedby, setRaisedby] = useState("");
  const [openchatticket, setopenchatticket] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [comments, setComments] = useState([]);
  const [ticketTitle, setticketTitle] = useState("");
  const [uniqueIds, setUniqueIds] = useState([]);
  var colors = ['#ff0000', '#00ff00', '#0000ff'];
  const randomColorPicker = (id) => {
    // return colors[Math.floor(Math.random() * colors.length)];
    return colors[uniqueIds.indexOf(id) % colors.length];
  }
  const handleClosechatticket = () => {
    setopenchatticket(false)
    setmessage("");
  }

  const handleopenchatticket = (id) => {
    fetchComments(id);
    setopenchatticket(true);
  }
  const queryFetch = () => {
    type == 'A' || (type == 'S' && supervisor_id == user_id) ? (
      socket?.emit("ticket:fetch",
        { activityid: activityid, querytype: "T" },
        response => {
          setQueries(response.data);
          console.log(queries);
        })) : (
      socket?.emit("ticket:fetch",
        { activityid: activityid, user_id: user_id, querytype: "T" },
        response => {
          setQueries(response.data);
          console.log(queries);
        }))
  }
  const addQuery = () => {
    console.log("hoga bega madu sari")
    console.log(socket)
    socket?.emit("ticket:raise",
      { user_id: user_id, query: queryTitle, activityid: activityid, querytype: "T" },
      response => {
        console.log("illi idene")
        console.log(response);
        handleCloseAddTicket();
        setQueryTitle("");
      })
    queryFetch();
  }

  const endQuery = (id, e) => {
    e.stopPropagation();
    socket?.emit("ticket:endtechnical", id, activityid,
      response => {
        queryFetch();
        console.log(response);
      })
  }
  const fetchComments = (id) => {
    socket?.emit("ticket:fetchspecific",
      id,
      response => {
        console.log(response);
        setTicketId(response.data._id);
        setComments(response.data.comments);
        setticketTitle(response.data.query);
        setUniqueIds(response.data.comments.map((comment) => { return (comment.user_id) }))
        var elementscrollto = document?.getElementById("messageEnd");
        elementscrollto?.scrollIntoView({ block: "center", behavior: "auto" });
      })
  }

  const sendChat = () => {
    console.log(ticketId)
    console.log(user_id)
    console.log(message)
    message != "" && socket?.emit("ticket:createcomment",
      ticketId, { user_id: user_id, comment: message },
      response => {
        setmessage("");
        console.log(response)
        fetchComments(ticketId);
      })
  }
  function getName(id) {
    const filteredUser = users.filter(users => users.user_id == id)
    const name = filteredUser.length ?
      `${filteredUser[0].fname} ${filteredUser[0].lname}` : ""
    return name;
  }

  useEffect(() => {
    socket?.emit('join', { user_id: user_id }, b => {
      console.log("BBB", b)
    })
    socket?.on('ticket:receive', b => {
      console.log("back", b)
      setQueries(b)
    })
    socket?.on('comment:receive', b => {
      console.log("Chat", b);
      setComments(b.comments)
      setUniqueIds(b.comments.map((comment) => { return (comment.user_id) }))
    })
  }, [])



  const handleOpenTicketView = () => {
    queryFetch();
    setTicketView(true);

  }
  const handleCloseTicketView = () => {
    setTicketView(false);
    queryFetch();
  }

  // const [viewkanban, setviewkanban] = useState(false)
  const [activitiessingle, setActivitiessingle] = useState([])

  function fetchActivitiessingle() {

    fetch(`/activity/fetch?activityid=${activityid}`, {
      credentials: 'include',
      method: 'GET',
      headers: {
        "x-auth-token": localStorage.getItem("token")
      }
    }).then((response) => {
      console.log("pfegt", response)
      response.json().then((result) => {
        console.log("result", result)
        setActivitiessingle(result)
      })
    })


  }
  useEffect(() => {
    fetchActivitiessingle();
  }, [])

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <div className="wholeContainer">

        <Grid container>
          {/*Project Info */}
          <Grid item xs={12} className={classes.gridcoloring}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ display: "flex", flexDirection: "column", flex: "80%" }}>

                <div className="title1">{activitiessingle.title || "NA"}</div>

                <div>
                  <div >
                    <p className="para">Type : </p>
                    <p className="para1" style={{ marginRight: "11%" }}>{activitiessingle.activity_type || 'NA'}</p>
                  </div>


                  <div>
                    <p className="para3">Domain : </p>
                    <p className="para7">{activitiessingle.domaintitle || "NA"}</p>
                  </div>


                </div>

                <div>
                  {/* <div className="para2" style={{ fontWeight: "bold" }}><p className="para2">Supervised by </p>{supervisor_name || 'AthrV-Ed'}</div> */}
                  <span className="para2">

                    {getImage(activitiessingle?.suid) ? (
                      < img height="32" width="32" style={{ borderRadius: 50, marginBottom: -10, marginRight: 10 }} src={getImage(activitiessingle?.suid)} alt="aa" />) :
                      <Avatar style={{ width: 32, height: 32, marginBottom: -25, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
                    Supervised by</span>
                  <span className="para2">{getname(activitiessingle?.suid) || 'AthrV-Ed'}</span>
                </div>

              </div>



              <div style={{ display: "flex", flexDirection: "column", flex: "20%" }}>
                {/*Add member button */}
                {type === "A" ? (
                  <button
                    href="#text-buttons"
                    onClick={handleAddModalOpen}
                    variant="contained"
                    className="button12"
                  >
                    Add Member
                  </button>) : null}

                {/*Add member dialogue */}
                <ThemeProvider theme={themechangetheme}>
                  <Dialog
                    open={openAddModal}
                    onClose={handleAddModalClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <ValidatorForm
                      id="this-form"
                      onSubmit={e => {

                        addmember({
                          activityid: activityid,
                          user_id: selectedTeam.map(member => member.user_id),

                        });



                        // console.log({
                        //   activityid: activityid,
                        //   user_id: selectedTeam.map(member => member.user_id),
                        // });
                      }}
                    >
                      <div className={classes.msx}>
                        <DialogTitle id="form-dialog-title" id="spacs">Add New Member
                          <a className="canc" onClick={handleAddModalClose}>
                            <Close style={{ color: "white", float: "right", marginLeft: "500px", marginTop: "-40px" }} />
                          </a>
                        </DialogTitle>

                        <DialogContent>
                          <Autocomplete
                            id="tags-standard"
                            validators={["required"]}
                            multiple
                            options={fillers.filter(
                              member =>
                                !selectedTeam.some(
                                  selectedMember => selectedMember.user_id === member.user_id
                                )
                            )}
                            getOptionLabel={option => option.fname + " " + option.lname}
                            onChange={(e, value) => {
                              setTeam(value);
                              // console.log(value);
                            }}
                            renderInput={params => (
                              <TextValidator
                                type=""
                                validators={["required"]}
                                value={selectedTeam[0] || ""}
                                errorMessages={["This field is required"]}
                                {...params}
                                variant="standard"
                                label="Name"
                                placeholder="Select Name"

                                onChange={e => setName(e.target.value)}
                                style={{ color: "white" }}

                                fullWidth
                              />
                            )}
                          />
                        </DialogContent>

                        <DialogActions>
                          <div>
                            <p id="green">{Successful()}</p>
                            <p id="red">{Failure()}</p>
                          </div>


                          <Button

                            type="submit" className="blubtn"
                            style={{
                              backgroundImage: "linear-gradient(to right, #259E3F,  #249566) ",
                              color: "white",
                              textTransform: "none"
                            }}

                          >
                            Submit{isAddmemberInserting && <EditingLoadingScreen />}
                          </Button>

                        </DialogActions>
                      </div>
                    </ValidatorForm>
                  </Dialog>
                </ThemeProvider>


                {/*Remove member button */}

                {type === "A" ? (
                  <ThemeProvider theme={themechangetheme}>
                    <button
                      variant='outlined'
                      onClick={event => {
                        handleRemoveModalOpen();
                        // console.log(activitynames)
                        // console.log(isRemoveLoading)
                        // console.log(fillers)
                      }}
                      className="button21"
                    >
                      Remove Member
                    </button>
                  </ThemeProvider>
                ) : null}


                <ThemeProvider theme={themechangetheme}>
                  <Dialog
                    open={openRemoveModal}
                    onClose={handleRemoveModalOpen}
                    aria-labelledby="form-dialog-title"
                  >
                    {/* remove member form */}
                    <div className={classes.msx}>
                      <DialogTitle id="form-dialog-title" id="spacs">Remove Existing Member
                        <a className="cance" onClick={handleRemoveModalClose}>
                          <Close style={{ color: "white", float: "right" }} />
                        </a>
                      </DialogTitle>
                      <DialogContent>


                        <List className={classes.list}>

                          <Paper >
                            <div className={classes.msx}>
                              {activitynames.length ? (
                                activitynames.map(item => (
                                  <ListItem
                                    dense
                                    key={item.user_id}
                                  >
                                    <ListItemText className="papers"
                                      primary={item.fname + " " + item.lname}

                                    />
                                    <div>
                                      <RemoveCircleIcon style={{ color: red[500], fontSize: 20, cursor: "pointer", marginLeft: 7, fontWeight: 400 }}
                                        onClick={event => {
                                          removemember({
                                            activityid: activityid,
                                            user_id: item.user_id
                                          });

                                          // console.log({
                                          //   activityid: activityid,
                                          //   user_id: item.user_id
                                          // });

                                        }}
                                      />
                                    </div>


                                    {/* <p className={classes.success}>{Success(item.email)}</p>
<p className={classes.fail}>{Fail(item.email)}</p> */}
                                  </ListItem>
                                ))
                              ) : null}

                            </div>
                          </Paper>

                        </List>


                      </DialogContent>
                    </div>
                  </Dialog>
                </ThemeProvider>
              </div>
            </div>
          </Grid>
        </Grid>

        {/*Activity */}

        {type === "A" ? (
          <div>
            <br></br>
            <Sliding countmembers={activitiessingle?.user_id?.length} />
          </div>
        ) : null}


        {/*Add new task */}



        {/* kanban */}


        <div>
          <Grid container xs={12}>
            {/* {!viewkanban ? */}
            {/* <div className="headersc">Kanban<img src={Viewallfalse} style={{ cursor: "pointer", size: "small", marginLeft: 5, marginTop: 10, marginBottom: -5 }} onClick={() => (setviewkanban(true))} /> </div> : */}
            <div className="headerss">Kanban
              {/* <img src={Viewall} style={{ cursor: "pointer", size: "small", marginLeft: 5, marginTop: 10, marginBottom: -5 }} onClick={() => [setviewkanban(false)]} /> */}
            </div>
            {/* } */}
          </Grid>

          {/* {viewkanban && (
            <div> */}

          <Kanban />

          {/* </div>
          )} */}
        </div>

        {/* Technical Ticket raising */}
        {ticketView ?
          <div className="ticketRaisingc">Ticket Raising<img src={Viewallfalse} style={{ cursor: "pointer", size: "small", marginLeft: 5, marginTop: 10, marginBottom: -5 }} onClick={() => (handleCloseTicketView())} /></div> :
          <div className="ticketRaising">Ticket Raising<img src={Viewall} style={{ cursor: "pointer", size: "small", marginLeft: 5, marginTop: 10, marginBottom: -5 }} onClick={() => (handleOpenTicketView())} /></div>
        }

        {ticketView === false ?
          <div>
            {type === 'U' || type === 'S' ? (
              <Grid container xs={12} className="addtask">
                <Add style={{ fontSize: "100px" }} className="addicon" onClick={handleOpenAddTicket} />
              </Grid>
            ) : null}
          </div>
          : null}

        {/* Add Technical Ticket Raising Dialog box */}
        <Dialog
          open={addTicket}
          onClose={handleCloseAddTicket}
          style={{
            background: "rgba(15,16,18,0.8)",
            backdropFilter: "blur(8px)"
          }}
          aria-labelledby="form-dialog-title"
        >
          <div classname={classes1.dsbx} style={{ backgroundColor: "#202328" }}>
            <ValidatorForm
              onSubmit={e => {
                addQuery();

              }}
            >
              <p className="addactivitytitless">Add Query Title</p>
              <DialogContent>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <TextValidator
                    type=""
                    className={classes1.formControl}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                    autoFocus
                    size="small"
                    variant="outlined"
                    style={{
                      background: "#373B3D", width: 500
                    }}
                    margin="dense"
                    value={queryTitle}
                    onChange={e => setQueryTitle(e.target.value)}
                    id="query_title"
                    label="Query title"

                    fullWidth
                  />
                </ThemeProvider>
              </DialogContent>
              <DialogActions>

                <div className="addactivityy" style={{ marginTop: "40px", marginBottom: "10px" }}>
                  <Button type="submit" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                    className="addactivityyes">
                    Apply
                  </Button>
                </div>
                <div className="addactivitycancelss" style={{ marginTop: "40px", marginBottom: "10px" }}>
                  <Button onClick={handleCloseAddTicket} style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}
                    className="addactivitycancels">
                    Cancel
                  </Button>
                </div>
              </DialogActions>

            </ValidatorForm>
          </div>

        </Dialog>
        {
          !ticketView && queries.length ? queries.map((queryy) => {
            return (<>
              <Grid container xs={12} md={12} className="ticketcontainer" onClick={() => handleopenchatticket(queryy._id)}>
                <Grid item md={"1.5"}><div className="activitylistbox"><p className="raisedDate"> {new Date(queryy.createdAt).getDate()} </p><br></br>
                  <p className="members">{monthNames[new Date(queryy.createdAt).getMonth()]}</p></div>
                </Grid>
                <Grid item md={10}><h1 className="headinglist">
                  <p className="head">{queryy.query}</p></h1>
                  <p className="raisedBy"> < img height="32" width="32" style={{ borderRadius: 50, marginBottom: -5 }} src={getImage(queryy.user_id)} alt="aa" />Raised by <img /> {getName(queryy.user_id)}</p>
                  <Button style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", marginLeft: "87px", marginBottom: "20px" }}
                    className="endQueryButton"
                    onClick={e => { endQuery(queryy._id, e) }}
                  >
                    End Query
                  </Button>
                  {/* <p className="assignedby">

                {getImage(row.assigned_by) ? (
                  < img height="32" width="32" style={{ borderRadius: 50, marginBottom: -5 }} src={getImage(row.assigned_by)} alt="aa" />) :
                  <Avatar style={{ width: 32, height: 32, marginBottom: -25, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
                Assigned by {first}{second}</p> */}
                </Grid>
              </Grid>
            </>)
          }) : null
        }
        <Dialog
          open={openchatticket}
          onClose={handleClosechatticket}
          aria-labelledby="form-dialog-title"
        >
          <div className={classes1.dsbx}>

            <DialogTitle id="queryHead">{ticketTitle}
              <a className="canc" onClick={handleClosechatticket}>
                <Close style={{ color: "white", float: "right", cursor: "pointer" }} />
              </a></DialogTitle>
            <DialogContent style={{ padding: "0px" }}>
              <div className="chatBox">
                <br />
                {comments.map != undefined && comments.map((row) => {
                  return (
                    <>{row.user_id == user_id ? (
                      <>
                        <div className="chatRight">
                          {row.comment} </div>
                        <div className="clear"></div>
                        <br />
                      </>) :
                      (
                        <>
                          <div style={{ display: "flex" }}>
                            < img className="chatprofileimg" src={getImage(row.user_id)} />
                            <div className="chatLeft">
                              <p style={{ fontSize: "12px", color: randomColorPicker(row.user_id), marginBottom: "-14px" }}>{getName(row.user_id)}</p>
                              <br />
                              {row.comment} </div>
                            <div className="clear"></div>
                          </div>
                          <br />
                        </>
                      )
                    }
                    </>
                  )
                })}
                <div id="messageEnd"></div>
                <br />

              </div>
            </DialogContent>
            <div style={{ borderRadius: "50px", backgroundColor: "#67737A", color: "black", margin: "10px", display: "flex", alignItems: "center" }}>
              {/* <input className="sendtext"/> */}
              <span>
                <EmojiEmotionsIcon onClick={() => { setEmojiOpen(true) }} />
                <Dialog
                  open={emojiopen}
                  onClose={() => { setEmojiOpen(false) }}
                >
                  <div style={{ color: "black" }}>
                    <Picker onEmojiClick={onEmojiClick} />
                  </div>
                </Dialog>
              </span>
              <span>
                <TextareaAutosize
                  minRows={1}
                  maxRows={3}
                  placeholder="Type your queries"
                  className="Chatinput"
                  value={message}
                  onChange={(e) => setmessage(e.target.value)}
                />
              </span>
              <span><SendIcon className="sendmsg" onClick={sendChat} /></span>

            </div>
          </div>
        </Dialog>




      </div >
      <Grid item xs={7} md={10} lg={12} style={{ marginLeft: "10%" }}>
        <Box pt={4}>
          <br></br>
          <br></br>
          <Copyright />
          <br />
        </Box>
      </Grid>
    </main >
  );
};

export default Activity;
