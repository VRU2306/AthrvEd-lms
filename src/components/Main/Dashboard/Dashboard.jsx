import React, { useState, useEffect, createContext, useContext } from "react";
import { Grid, Collapse, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box } from "@material-ui/core";
import AddActivity from "./AddActivity/AddActivity";
import { useStoreState, useStoreActions } from "easy-peasy";
import useStyles from "./dashboardStyles";
import Copyright from "../../UI/Copyrights";
import ActivityList from "../ActivityList/ActivityList";
import AddLeaveNote from "./AddLeaveNote/AddLeaveNote";
import LeaveNotes from "./LeaveNotes/LeaveNotes";
import RevokeNote from "./LeaveNotes/revoke";
import DashBoardNews from "./DashBoardNews/DashboardNews"
import Paper from "@material-ui/core/Paper";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import TextareaAutosize from 'react-textarea-autosize';
import Close from "@material-ui/icons/Close";
import SendIcon from '@material-ui/icons/Send';
import { SocketContext } from "../../../App";
import "./style.css"


import io from "socket.io-client";


import styles from "../../../assets/jss/material-dashboard-react/views/dashboardStyle";
import Viewtt from "./View_transfertask/View_Task";
import Extenddate from "./Extend_Deadline/Extend_Deadline";
import Datamonitor from "../../../Icons/datamonitor.svg"


import Leavecount from "./LeaveNotes/Leavecount";
import Slider from "./AddActivity/sliders/slidesnew";
import Slidertask from "./AddActivity/sliders/slidestask";
import Graphweekly from "./topfivegraphs/topfivegraph";
import Graphmonthly from "./topfivegraphmonthly/topfivemonthly";
// icons
import Add from "@material-ui/icons/AddSharp";
import Admin from "../../../Icons/Admin Star.svg"
import Superuser from "../../../Icons/Supervisor Logo.svg";
import Usericon from "../../../Icons/Waving.svg";
import Viewallfalse from "../../../Icons/Closed Eyes.svg"
import Viewall from "../../../Icons/Eye Open.svg"
// 
import { color } from "d3";

import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  MenuItem
} from "@material-ui/core";

import {
  TextValidator,
  ValidatorForm,
  SelectValidator
} from "react-material-ui-form-validator";
import ReactFileReader from 'react-file-reader';
import Picker from 'emoji-picker-react';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
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

// imrovement needed


const Dashboard = () => {
  let socket = useContext(SocketContext);

  let user_id = useStoreState(state => state.profileMod.profile.user_id);
  let alter_user_id = useStoreState(state => state.authMod.user_id);

  let { type } = useStoreState(state => state.profileMod.profile);
  let { type: alterType } = useStoreState(state => state.authMod);
  let isCalenderLoading = useStoreState(state => state.attendence.isFetching);
  let isLeavesetching = useStoreState(state => state.attendence.isLeavesFetching);
  let fetchAttendance = useStoreActions(
    action => action.attendence.FETCH_ATTENDENCE_START
  );
  let Revokelist = useStoreActions(action => action.attendence.FETCH_REVOKE_NOTES_START);
  let fetchAttendanceReset = useStoreActions(
    action => action.attendence.FETCH_ATTENDENCE_REQUEST
  );
  let attendance = useStoreState(state => state.attendence.attendence);

  let getProfile = useStoreActions(
    action => action.profileMod.FETCH_PROFILE_START
  );
  let isProfileLoading = useStoreState(state => state.profileMod.isFetching);
  let isProfileFetching = useStoreState(state => state.profileMod.isFetching);
  let workhours = useStoreState(state => state.dailyformMod.workhours)
  let postWorkhours = useStoreActions(action => action.dailyformMod.FETCH_WORKHOURS_START)
  let profile = useStoreState(state => state.profileMod.profile.fname);
  const [emojiopen, setEmojiOpen] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [message, setmessage] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    // setChosenEmoji(emojiObject);
    // console.log(chosenEmoji.emoji)
    console.log(emojiObject.emoji)
    emojiObject ? (
      setmessage(message + emojiObject.emoji)) : setmessage(message);
  };

  useEffect(() => {

    if (isCalenderLoading)
      fetchAttendance({ user_id: user_id || alter_user_id });

    // if(isLeavesetching)
    // Revokelist();
    if (isProfileLoading) getProfile();
    return () => fetchAttendanceReset();

    if (isProfileFetching) getProfile();
    return () => getProfile();
  }, []);
  let users = useStoreState(state => state.authMod.unblocked)


  toast.configure()
  const Successfils = () => {
    toast.warning('Fill your profile for  active data monitoring .Go to User Profile', { position: toast.POSITION.TOP_CENTER, limit: 1 })

  }
  const MAX_TOAST = 1;
  function Toast() {
    if (MAX_TOAST === 1) {
      Successfils()
    }
  }
  const classes = useStyles();
  const classes1 = useStyles1();
  const UseStyles = makeStyles(styles);
  const [openActivityModal, setActivityModalOpen] = useState(false);
  const [openLeaveModal, setLeaveModalOpen] = useState(false);
  const [openLeaveCount, setOpenLeaveCount] = useState(false);
  const [view, setView] = useState(true);

  
  const toggleView = () => {
    setView(true)
  }
  // view leaves
  const [viewleave, setViewLeave] = useState(true);
  const toggleViewleave = () => {
    setViewLeave(true)
  }


  let {
    fname,
    lname,
  } = useStoreState(state => state.profileMod.profile);
  function checkForNull(name) {
    if (name.includes("null") || name.includes("undefined"))
      return "Not available";
    else return name;
  }


  const handleActivityModalOpen = () => {
    setActivityModalOpen(true);
  };
  const [open, setOpen] = useState(true)
  const handleActivityModalClose = () => {
    setActivityModalOpen(false);
  };

  const handleLeaveModalOpen = () => {
    setLeaveModalOpen(true);
  };

  const handleLeaveModalClose = () => {
    setLeaveModalOpen(false);
  };
  const handleLeaveCountModalOpen = () => {
    setOpenLeaveCount(true)
  };
  const handleLeaveCountModalClose = () => {
    setOpenLeaveCount(false)
  };
  let isleavepostfetching = useStoreState((state) => state.authMod.isleavepostfetching);
  let leavecounts = useStoreActions((action) => action.authMod.LEAVECOUNT_DASHBOARD);
  let clearcountdashboard = useStoreActions((action) => action.authMod.CLEAR_LEAVECOUNT_DASHBOARD);

  useEffect(() => {
    if (isleavepostfetching) leavecounts();
    return () => clearcountdashboard();
  }, [leavecounts, clearcountdashboard,]);
  let leavecountdashboard = useStoreState(state => state.authMod.leavecountdashboard.count);
  // console.log(leavecountdashboard)

  const [title, setTitle] = useState("");
  const [description, setDes] = useState("");
  const [image, setImage] = useState({})
  function dataURLtoFile(dataurl, filename) {
    console.log(dataurl)
    if (dataurl.length) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

    }
    return new File([u8arr], filename, { type: mime });
  }
  function ImageAsUrl(e) {
    var file = e.target.files[0];
    if (typeof file !== 'undefined') {
      var reader = new FileReader();
      reader.onloadend = function () {
        setImage(reader.result);
      }
      reader.readAsDataURL(file)
    }


  }
  async function submitData(e) {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("title", title)
    formdata.append("description", description)
    formdata.append("image", dataURLtoFile(image, 'image.jpg'))
    console.log(formdata)

    const request = {
      Credentials: 'include',
      method: 'POST',
      headers: {
        "x-auth-token": localStorage.getItem("token")
      },
      body: formdata
    }

    const result = await fetch('/news', request)
    if (result.status == 200) {
      handelCloseNews();
      window.location.reload();

    }
    console.log(result)
  }
  const [openNews, setopenNews] = useState(false)
  const handleNewsAdd = () => {
    setopenNews(true)
  }
  const handelCloseNews = () => {
    setopenNews(false)
  }

  const [viewTicket, setViewTicket] = useState(true);
  const [openTicket, setopenTicket] = useState(false);
  const handleCloseTicket = () => {
    setopenTicket(false)
  }
  const [openchatticket, setopenchatticket] = useState();
  const handleClosechatticket = () => {
    setopenchatticket()

  }
  console.log("a", openchatticket)
  const [querytitle, setquerytitle] = useState('')
  const [comments, setcomments] = useState([])
  const openchatbox = (id) => {
    socket.emit('ticket:fetchspecific', id, b => {
      console.log("Chatmsg", b.data.comments);
      setcomments(b.data.comments)
      setquerytitle(b.data.query)
      setUniqueIds(b.data.comments.map((comment) => { return (comment.user_id) }))
      var elementscrollto = document?.getElementById("messageEnd");
      elementscrollto?.scrollIntoView({ block: "center", behavior: "auto" });
    })
  }
  const handleopenchatticket = (q) => {
    setopenchatticket(q._id)
    openchatbox(q._id);

  }

  const [querydetails, setquerydetails] = useState('')

  const Applyticketraise = () => {
    //  console.log(querydetails)
    socket?.emit('ticket:raise', { user_id: user_id, query: querydetails, querytype: "N" }, b => {
      console.log("backendresponse", b);
      handleCloseTicket()
      setquerydetails('')

    })

    openallticketraise()
    // console.log('ticket:receive')

  }
  const [queryall, setqueryall] = useState([])
  const [queryallname, setqueryallname] = useState([])

  const openallticketraise = () => {
    if (type == 'S' || type == 'U') {
      socket?.emit('ticket:fetch', { user_id: user_id, querytype: "N" }, b => {
        // setqueryall(b.data.reverse())
        setqueryall(b.data)
        console.log("fetchall", b.data)
        let ele = [];

        for (var i = 0; i < b.data.length; i++) {
          let idofuser = b.data[i].user_id;
          for (var j = 0; j < users.length; j++) {
            if (idofuser == users[j].user_id) {
              ele[i] = users[j];
              break;
            }
          }
        }
        setqueryallname(ele)

      })
    }
    else {
      socket?.emit('ticket:fetch', { querytype: "N" }, b => {
        setqueryall(b.data)
        // setqueryall(b.data.reverse())
        // console.log(b.data)
        let ele = [];

        for (var i = 0; i < b.data.length; i++) {
          let idofuser = b.data[i].user_id;
          for (var j = 0; j < users.length; j++) {
            if (idofuser == users[j].user_id) {
              ele[i] = users[j];
              break;
            }
          }
        }
        // console.log(ele)
        setqueryallname(ele)
      })
    }
  }
  const endquery = (id, e) => {
    e.stopPropagation();
    // console.log(id)
    socket?.emit('ticket:end', id, b => {
      // console.log("backendresponse",b)
      openallticketraise()
    })
  }

  const sendchatdata = () => {
    // console.log(openchatticket,useridchat,message)
    socket?.emit('ticket:createcomment', openchatticket, { user_id: user_id, comment: message }, b => {
      console.log("Message", b)
      setmessage('')
      openchatbox(openchatticket);
    })
  }

  function getImage(image) {
    const userinfo = users.filter(users => users.user_id === image)
    // console.log(userinfo)
    const images = userinfo.map(x => x.image)
    return images;
  }
  const [uniqueIds, setUniqueIds] = useState([]);
  var colors = ['#ff0000', '#00ff00', '#0000ff'];

  const randomColorPicker = (id) => {
    // return colors[Math.floor(Math.random() * colors.length)];

    // console.log("uniqueIds",id,uniqueIds.indexOf(id) % colors.length)
    return colors[uniqueIds.indexOf(id) % colors.length];

  }

  // console.log("uniqueIds",uniqueIds)

  function getName(id) {
    const filteredUser = users.filter(users => users.user_id == id)
    const name = filteredUser.length ?
      `${filteredUser[0].fname} ${filteredUser[0].lname}` : ""
    return name;
  }

  useEffect(() => {
    socket?.emit('leave', user_id);
    socket?.emit('join', { user_id: user_id }, b => {
      console.log("BBB", b)
    })
    socket?.on('ticket:receive', b => {
      // console.log("back",b)
      setqueryall(b)
      let ele = [];

      for (var i = 0; i < b.length; i++) {
        let idofuser = b[i].user_id;
        for (var j = 0; j < users.length; j++) {
          if (idofuser == users[j].user_id) {
            ele[i] = users[j];
            break;
          }
        }
      }
      setqueryallname(ele)
    })
    socket?.on('comment:receive', b => {
      console.log("Chat", b);
      setcomments(b.comments)
      setUniqueIds(b.comments.map((comment) => { return (comment.user_id) }))

    })
  }, [])

  return (

    <main className={classes.content}>
      <div >
        <div className={classes.appBarSpacer} />
        
        {profile === "anonymous" || profile === "Not available" ? (
          <Grid container xs={12} md={9} className="gridbox">

            <Grid item xs={9} md={10}><h1 className="cardheading">   Hello, Member</h1>

              <p className="carddata">  Fill your profile for  active data monitoring! Head Over to User Profile Page </p>
            </Grid>
            <Grid item md={1}>
              <img src={Datamonitor} className={classes.imgaess} />

            </Grid>
          </Grid>
        ) :
          // ADMIN WELCOME
          <Grid container xs={12} md={9} className="gridbox">

            <Grid item xs={9} md={10}><h1 className="cardheading">   Hello, {checkForNull(fname + " " + lname)}</h1>
              {type !== "A" ? (<p className="carddata">
                Welcome back! Take a look at your performance, tasks assigned and much more
              </p>
              ) : null}
              {type === "A" ? (
                <p className="carddata">  All hail the admin. A very warmest welcome to you sir, hope you have a pleasant day! </p>) : null}
            </Grid>
            <Grid item md={1}>
              {type === 'A' ? (<img src={Admin} className={classes.img} />) : null}
              {type === 'S' ? (<img src={Superuser} className={classes.img} />) : null}
              {type === 'U' ? (<img src={Usericon} className={classes.img} />) : null}
            </Grid>
          </Grid>

        }
        {/*DASHBOARD  CARD */}
        {type === "A" ? (
          <div className="totalstats">   Total Statistics   </div>) : null}
        <Grid container xs={12} md={9} className="stats">
          {type === "A" ? (<Grid item xs={12} lg={5} className="activitiesbox" style={{ marginLeft: "1%", marginRight: "2%", marginBottom: "2%" }}><Slider /></Grid>) : null}
          {type === "A" ? (<Grid item xs={12} lg={5} className="activitiesboxtasks" style={{ marginLeft: "1%", marginBottom: "2%" }}><Slidertask /></Grid>) : null}
        </Grid>
        {/* GRAPH */}
        <br></br>
        <div className="topperformstats">Top Performer's Statistics</div>
        <Grid container xs={12} md={9} className="topstats">
          <Grid item xs={12} lg={5} style={{ marginLeft: "1%", marginRight: "2%", marginBottom: "2%" }} id="slider">
            {/* weekly */}
            <Graphweekly />
          </Grid>
          <Grid item xs={12} lg={5} style={{ marginLeft: "1%", marginBottom: "2%" }} id="sliderr" >
            {/* monthly */}
            <Graphmonthly />
          </Grid>
        </Grid>
        {/* style={{ marginTop: "-16%", marginLeft: "40%" }} */}


        {/* NON Technical Ticket Raising */}
        {viewTicket ?
          <div className="Assignedc" onClick={openallticketraise}>Ticket Raising<img src={Viewallfalse} style={{ cursor: "pointer", size: "small", marginLeft: 5, marginTop: 10, marginBottom: -5 }} onClick={() => (setViewTicket(false))} /> </div> :
          <div className="Assigned" >Ticket Raising<img src={Viewall} style={{ cursor: "pointer", size: "small", marginLeft: 5, marginTop: 10, marginBottom: -5 }} onClick={() => (setViewTicket(true))} /></div>}
        {viewTicket === false ? (
          <div>
            {type === "U" || type === 'S' ? (
              <Grid container xs={12} md={9} className="addactivity">
                <Add style={{ fontSize: "100px" }} className="addicon" onClick={() => { setopenTicket(true) }} />
              </Grid>
            ) : null}

          </div>
        ) : null}

        <Dialog
          open={openTicket}
          onClose={handleCloseTicket}
          style={{
            background: "rgba(15, 16, 18, 0.8)",
            backdropFilter: "blur(8px)",
          }}
          aria-labelledby="form-dialog-title"
        >
          <div className={classes1.dsbx}>
            <ValidatorForm
              onSubmit={Applyticketraise}
            >
              <p className="addactivitytitless"> Add Query Title</p>
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
                    value={querydetails}
                    onChange={e => setquerydetails(e.target.value)}
                    id="query_title"
                    label="Query title"

                    fullWidth
                  />
                </ThemeProvider>
              </DialogContent>
              <DialogActions>

                <div className="addactivityy" style={{ marginTop: "40px", marginBottom: "10px" }}>
                  <Button type="submit" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                    className="addactivityyes" >
                    Apply
                  </Button>
                </div>
                <div className="addactivitycancelss" style={{ marginTop: "40px", marginBottom: "10px" }}>
                  <Button onClick={handleCloseTicket} style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}
                    className="addactivitycancels">
                    Cancel
                  </Button>
                </div>
              </DialogActions>
            </ValidatorForm>
          </div>
        </Dialog>

        {
          !viewTicket && <>
            {
              queryall?.map((q, i) => {
                return (
                  <>
                    <Grid container xs={12} md={9} className="Activitylist" onClick={() => { handleopenchatticket(q) }}>
                      <Grid item md={"1.5"}><div className="activitylistbox">
                        <p className="raisedDate"> {q?.createdAt.slice(8, 10)}th  </p><br></br>
                        <p className="members">{new Date(q?.createdAt.slice(0, 10).split("-").join(" ")).toLocaleString('en-us', { month: 'long' })}</p></div>
                      </Grid>
                      <Grid item md={10}><h1 className="headinglist">
                        <p className="head">{q.query}</p></h1>
                        {/* <div style={{display:"flex"}}> */}

                        <p className="raisedBy">  < img height="32" width="32" style={{ borderRadius: 50, marginBottom: -5 }} src={getImage(q.user_id)} alt="aa" />  Raised by <img /> {queryallname[i]?.fname} {queryallname[i]?.lname}</p>
                        {/* </div> */}
                        <Button style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", marginLeft: "87px", marginBottom: "20px" }}
                          className="endQueryButton"
                          onClick={(e) => { endquery(q._id, e) }}
                        >
                          End Query
                        </Button>



                      </Grid>
                    </Grid>
                  </>
                )
              })
            }

          </>
        }

        <Dialog
          open={openchatticket}
          onClose={handleClosechatticket}
          aria-labelledby="form-dialog-title"
        >
          <div className={classes1.dsbx}>

            <DialogTitle id="queryHead">{querytitle}
              <a className="canc" onClick={handleClosechatticket}>
                <Close style={{ color: "white", float: "right", cursor: "pointer" }} />
              </a></DialogTitle>
            <DialogContent style={{ padding: "0px" }}>
              <div className="chatBox">
                <br />
                {
                  comments.map((m) => {

                    if (m.user_id == user_id)
                      return (<>
                        <div >
                          <div className="chatRight">{m.comment}</div>
                          <div className="clear"></div><br />
                        </div>
                      </>)
                    else
                      return (<>
                        <div style={{ display: "flex" }}>
                          < img className="chatprofileimg" src={getImage(m.user_id)} />
                          <div className="chatLeft">
                            <p style={{ fontSize: "12px", color: randomColorPicker(m.user_id), marginBottom: "-14px" }}>{getName(m.user_id)}</p>
                            <br />
                            {m.comment}</div>
                        </div>
                        <div className="clear"></div><br />
                      </>)

                  })
                }
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
              <span><SendIcon className="sendmsg" onClick={sendchatdata} /></span>

            </div>
          </div>
        </Dialog>




        {/* ACTIVITIES */}
        {view ?
          <div className="Assignedc">Assigned Activities<img src={Viewallfalse} style={{ cursor: "pointer", size: "small", marginLeft: 5, marginTop: 10, marginBottom: -5 }} onClick={() => (setView(false))} /> </div> :
          <div className="Assigned">Assigned Activities<img src={Viewall} style={{ cursor: "pointer", size: "small", marginLeft: 5, marginTop: 10, marginBottom: -5 }} onClick={toggleView} /></div>}

        {view === false ? (
          <div>
            {type === "A" ? (
              <Grid container xs={12} md={9} className="addactivity">
                <Add style={{ fontSize: "100px" }} className="addicon" onClick={handleActivityModalOpen} />
              </Grid>
            ) : null}

          </div>
        ) : null}

        {view === false ? (
          <div >
            <Grid style={{ overflow: "auto" }} >
              <ActivityList />
            </Grid>
          </div>
        ) : null}
        <AddActivity
          open={openActivityModal}
          handleClose={handleActivityModalClose} />

        <Grid>

          {/* leave thiings */}
          <AddLeaveNote
            open={openLeaveModal}
            handleClose={handleLeaveModalClose}
          />
          {viewleave ?
            <div className="Assignedc">Leave Applications<img src={Viewallfalse} style={{ cursor: "pointer", size: "small", marginLeft: 5, marginTop: 10, marginBottom: -5 }} onClick={() => (setViewLeave(false))} /> </div> :
            <div className="Assigned">Leave Applications<img src={Viewall} style={{ cursor: "pointer", size: "small", marginLeft: 5, marginTop: 10, marginBottom: -5 }} onClick={toggleViewleave} /></div>}
          {viewleave === false ? (
            <Grid style={{ overflow: "auto" }}>

              {type === "A" ? (
                <RevokeNote user_id={user_id || alter_user_id} />
              ) : null}

              <LeaveNotes user_id={user_id || alter_user_id} />

            </Grid>
          ) : null}
          {viewleave === false ? (

            <div>
              {type != "A" ?
                <Grid container xs={12} md={9} className="addleave">

                  <div className="addleaveicon">
                    <Button
                      href="#text-buttons"
                      className="leaveapply"
                      style={{ background: "linear-gradient(90deg, #2B7CAA 0%, #2B4BAA 100%)", color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                      onClick={handleLeaveModalOpen}>Apply leave
                    </Button>

                  </div>

                  <div className="leavetext">
                    You were on leave for {leavecountdashboard}  days in this month
                    <br></br><p className="leavetextp"> To check your Leave Count  <Button onClick={handleLeaveCountModalOpen}
                      style={{ marginLeft: 2, textDecorationLine: "underline", color: "#67737A", textTransform: "capitalize", fontWeight: 900, fontFamily: "Mulish", fontSize: 20, }} >
                      Click here</Button> </p></div>

                </Grid>
                : null}
            </div>
          ) : null}


          <Leavecount
            open={openLeaveCount}
            handleClose={handleLeaveCountModalClose} />


          <paper className={classes.paper}>
            <DashBoardNews />

          </paper>
          {type == 'A' && <Grid container xs={12} md={9} className="addactivity">
            <Add style={{ fontSize: "100px" }} className="addicon"
              onClick={handleNewsAdd}
            />
          </Grid>
          }




          <Dialog
            open={openNews}
            onClose={handelCloseNews}
            aria-labelledby="form-dialog-title"



          >

            <div className="dialognews" >
              {/* <DialogContent > */}
              <Grid container xs={12} >
                {/* <Paper className={classes.paperStyling}> */}

                <Grid item xs={12}>
                  <h2 className='addNews' >Add News</h2>
                </Grid>
                <ValidatorForm enctype="multipart/form-data"
                  onSubmit={submitData}
                >
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <Grid item xs={12}>

                      <TextValidator className="namenews"
                        label="Title"
                        validators={['required']}

                        errorMessages={['this field is required']}

                        name="Name"
                        value={title}
                        margin="dense"
                        variant="standard"

                        onChange={e => setTitle(e.target.value)

                        }


                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator className="namenews"
                        label="Description"
                        name="NewsDes"
                        value={description}
                        variant="standard"
                        validators={['required']}
                        errorMessages={['this field is required']}
                        onChange={e =>
                          setDes(e.target.value)


                        }


                      />
                    </Grid>
                  </ThemeProvider>
                  <div className="FileUploadForm">
                    <input style={{ display: "flex", color: "white", padding: "0px 5px 0px -5px", marginLeft: "-13px" }} type='file' id="upload-photo" name="Choose-File"

                      onChange={ImageAsUrl}
                    >

                    </input>

                  </div>

                  <Button type="submit" className="btnnews"
                    color="primary"
                    variant="contained">Submit</Button>

                </ValidatorForm>



                {/* </Paper> */}
              </Grid>

              {/* </DialogContent> */}
              <DialogActions>
                <Button onClick={handelCloseNews} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </div>


          </Dialog>
          <Grid item xs={7} md={10} lg={12} style={{ marginLeft: "10%" }}>
            <Box pt={4}>
              <br></br>
              <br></br>
              <Copyright />
              <br />
            </Box>
          </Grid>
        </Grid>

      </div>
    </main >
  );
};

export default Dashboard;
