// REACT code of sideand topnv styling with css and material ui code 
import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useTheme } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import logout from "../../../Icons/Log Out.svg"
// import Athrved from "../../UI/Athrv-ed.pdf"
import { Avatar, Button, MenuItem, MenuList, Typography } from "@material-ui/core";
import logo from "./../../../Icons/Vector.svg";
import "./app.css"
import useStyles from "./sidenavstyles";
import { Link } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Software from "../Dailyreport/Software"
import Prefinalyear from "../Dailyreport/Prefinalyear";
import Management from "../Dailyreport/management";
import Product from "../Dailyreport/productdesign";
// import Report from "../PdfGeneration/download_pdf"
import { useStoreState, useStoreActions } from "easy-peasy";
// import Allprofile from "../Profile/MyInfo/AllProfile/Allprofile"
import { Route } from "react-router-dom";
import Activity from "../Activity/Activity";
import AddEvents from "../Eventsf/AddEvents";
import Productivity_Tracker from '../ProTrack_User/Productivityuser';
import ProductivityTracker from '../ProTrack_Admin/Productivityadmin';
import Calendar from '../Calendar/Calendar'
import MyInfo from "../Profile/Profile/Profile.jsx";
// import useStyles from "./mainStyles";
import DailyFrom from "../Dailyreport/DailyFrom";
import Generate_pdf from '../Generate_pdf/Generate.page'
import UploadCSV from "../Upload CSV/uploadcsv";
import Eventsf from "../Eventsf/Events";
import Teams from "../Teams/Teams.jsx";
import Singlekanban from "../Activity/kanban/Singlekanban";
import moment from 'moment'
import Clock from 'react-live-clock';

function Navbar(props,) {
  //active buttons
  let curPage = window.location.href.split("/")

  let {
    fname,
    lname,
    user_id,
    image

  } = useStoreState(state => state.profileMod.profile);
  // console.log(image)
  // const p= fname.slice(0,1)
  //active buttons
  const [open1, setOpen1] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/overview")
  const [open2, setOpen2] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/dailyreport")
  const [open3, setOpen3] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/teams")
  const [open4, setOpen4] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/Productivity_Tracker")
  const [open5, setOpen5] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/ProductivityTraker")
  const [open6, setOpen6] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/Generate_pdf")
  const [open7, setOpen7] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/userprofile")
  const [open8, setOpen8] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/uploadcsv")
  const [open9, setOpen9] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/Eventsf")
  const [open10, setOpen10] = useState('/' + curPage[curPage.length - 2] + '/' + curPage[curPage.length - 1] === "/main/Calendar")

  const [date, setdate] = useState(new Date())

  console.log(date);

  // profile loading
  let isProfileLoading = useStoreState(state => state.profileMod.isFetching);

  let getProfile = useStoreActions(
    action => action.profileMod.FETCH_PROFILE_START
  );
  let fetchAttendanceReset = useStoreActions(
    action => action.attendence.FETCH_ATTENDENCE_REQUEST
  );
  let isProfileFetching = useStoreState(state => state.profileMod.isFetching);
  useEffect(() => {
    if (isProfileLoading) getProfile();
    return () => fetchAttendanceReset();
  }, []);

  useEffect(() => {
    if (isProfileFetching) getProfile();

  }, [isProfileFetching]);
  // blur backgrond
  const [blur, setBlur] = React.useState(true);
  const handleToggle = () => {
    setBlur(!blur)
  }
  // logout
  let setAuth = useStoreActions(action => action.authMod.SET_REGULAR_AUTH);
  let clearProfile = useStoreActions(action => action.profileMod.CLEAR_PROFILE);

  // clears the token, sets the auth boolean to false and clears the profile


  let { type } = useStoreState(state => state.profileMod.profile);
  console.log(type)
  // button functions conditions
  const handleActive1 = () => {
    setOpen1(true)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
    setOpen6(false)
    setOpen7(false)
    setOpen8(false)
    setOpen9(false)
    setOpen10(false)
  }
  const handleActive2 = () => {
    setOpen1(false)
    setOpen2(true)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
    setOpen6(false)
    setOpen7(false)
    setOpen8(false)
    setOpen9(false)
    setOpen10(false)
  }
  const handleActive3 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(true)
    setOpen4(false)
    setOpen5(false)
    setOpen6(false)
    setOpen7(false)
    setOpen8(false)
    setOpen9(false)
    setOpen10(false)
  }
  const handleActive4 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(true)
    setOpen5(false)
    setOpen6(false)
    setOpen7(false)
    setOpen8(false)
    setOpen9(false)
    setOpen10(false)
  }
  const handleActive5 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(true)
    setOpen6(false)
    setOpen7(false)
    setOpen8(false)
    setOpen9(false)
    setOpen10(false)
  }
  const handleActive6 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
    setOpen6(true)
    setOpen7(false)
    setOpen8(false)
    setOpen9(false)
    setOpen10(false)
  }
  const handleActive7 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
    setOpen6(false)
    setOpen7(true)
    setOpen8(false)
    setOpen9(false)
    setOpen10(false)
  }
  const handleActive8 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
    setOpen6(false)
    setOpen7(false)
    setOpen8(true)
    setOpen9(false)
    setOpen10(false)
  }
  const handleActive9 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
    setOpen6(false)
    setOpen7(false)
    setOpen8(false)
    setOpen9(true)
    setOpen10(false)
  }

  const handleActive10 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
    setOpen6(false)
    setOpen7(false)
    setOpen8(false)
    setOpen9(false)
    setOpen10(true)
  }
  // container functions and mobile view functions
  const { windows } = props;
  const classes = useStyles();
  const theme = useTheme();
  // const [anchorEl, setAnchorEl] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const open = Boolean(anchorEl);


  const container =
    windows !== undefined ? () => windows().document.body : undefined;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // GETNAME


  function refreshPage() {
    window.location.reload();
  }


  return (
    // here written for both mobile and normal view
    <div className={classes.root} >

      <AppBar position="fixed" className={classes.appBar}>
        {/* normal view part of code */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap className={classes.title}>

            <img src={logo} className={classes.top} alt="topnav logo" onClick={refreshPage} />
            {/* + */}
            {/* <div style={{ color: "white", textAlign: 'center' }}><p>{moment().format('DD-MM-YYYY HH:MM')}</p></div> */}
            {/* <Clock format={'DD-MM-YYYY HH:mm:ss'} ticking={true} timezone={'	Asia/Calcutta'} /> */}
            {/* </p> */}
          </Typography>
          {/* sideprofile icon */}
          <Button onClick={handleToggle}>
            {image !== '0' || image !== undefined || image !== null ? (
              <img height="32" width="32" style={{ borderRadius: 50 }} src={image} alt="ATHRVED" />) :
              <Avatar style={{ width: 32, height: 32 }} className={classes.purple} />}
          </Button>

          
          {blur === false ? (
            <div className="blur" onClick={() => (setBlur(true))}>
              <div className="card">
                <br></br>
                <div className={classes.imgs} >
                  {image !== '0' ? (
                    <img height="125" width="125" style={{ borderRadius: 60 }} src={image} alt="ATHRVED" />) :
                    <Avatar style={{ width: 125, height: 125, fontSize: 50, alignSelf: 'center', }} className={classes.purple} />}
                </div>



                <div className={classes.texting}>{(fname + " " + lname) || "Not available"} </div>
                {type === "A" ? (<div style={{ marginLeft: 20, color: "#A3AAAE", display: "flex", fontFamily: "Mulish", marginTop: 10 }}>Profile: Administrator </div>) : null}
                {type === "S" ? (<div style={{ marginLeft: 20, color: "#A3AAAE", display: "flex", fontFamily: "Mulish", marginTop: 10 }}>Profile: Supervisior </div>) : null}
                {type === "U" ? (<div style={{ marginLeft: 20, color: "#A3AAAE", display: "flex", fontFamily: "Mulish", marginTop: 10 }}>Profile: User </div>) : null}
                <br />
                <div style={{ marginLeft: 20, color: "#A3AAAE", marginTop: "-20px", fontFamily: "Mulish" }}>   ID:{user_id} </div>

                <Divider light className={classes.dividerprofile} />

                <div className={classes.logoutbutton}>
                  <Link to="/logout" style={{ textDecoration: "none" }}>
                    <Button className="button" style={{ color: "#D4DCE1", textTransform: "capitalize", fontFamily: "Mulish", textDecoration: "none" }} >Logout
                      <Link to="/logout" style={{ textDecoration: "none" }}>
                        <img src={logout}
                          className={classes.logout} alt="logout" />
                      </Link>
                    </Button>
                  </Link>
                </div>

              </div>
            </div>
          ) : null}
          {/* sidebuton popup end */}
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* mobile view part of code */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}

            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >

            <div className={classes.sidebar} >

              <div className={classes.toolbar} ><img src={logo} className={classes.topnav} alt="topnav drawer logo" /></div>
              {/* overview */}
              <MenuList>
                <div>
                  <MenuItem>
                    <div className="active"><Link to="/main/overview" className={open1 ? "sidebarselected dashboards icons" : "sidebar dashboard icon"} style={{ textDecoration: "none", color: open1 ? "  #2D9CDB" : " #67737A" }} onClick={handleActive1}>Overview</Link></div>
                  </MenuItem>

                  {/* dailyreport */}
                  <MenuItem>
                    <div className="active"><Link to="/main/dailyreport" className={open2 ? " sidebarselected dailyreports icons " : "sidebar dailyreport icon"} style={{ textDecoration: 'none', color: open2 ? "#2D9CDB" : "#67737A" }} onClick={handleActive2} >Daily Report</Link></div>
                  </MenuItem>
                  {/* teams */}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/teams" className={open3 ? "sidebarselected teams icons" : "sidebar team icon"} style={{ textDecoration: 'none', color: open3 ? "#2D9CDB" : "#67737A" }} onClick={handleActive3} >Teams</Link></div>
                    </MenuItem>
                  ) : null}
                  {/* protrac */}
                  {type !== "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/Productivity_Tracker" className={open4 ? "sidebarselected protracs icons" : "sidebar protrac icon"} style={{ textDecoration: 'none', color: open4 ? "#2D9CDB" : "#67737A" }} onClick={handleActive4} >Pro trac</Link></div>
                    </MenuItem>
                  ) : null}
                  {/* protracadmin */}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/ProductivityTracker" className={open5 ? "sidebarselected protracs icons" : "sidebar protrac icon"} style={{ textDecoration: 'none', color: open5 ? "#2D9CDB" : "#67737A" }} onClick={handleActive5} >Pro trac</Link></div>
                    </MenuItem>
                  ) : null}
                  {/* generatepdf */}
                  <MenuItem>
                    <div className="active"><Link to="/main/Generate_pdf" className={open6 ? "sidebarselected generatepdfs icons" : "sidebar generatepdf icon"} style={{ textDecoration: 'none', color: open6 ? "#2D9CDB" : "#67737A" }} onClick={handleActive6} >Generate PDF</Link></div>
                  </MenuItem>
                  {/* User profile */}
                  <MenuItem>
                    <div className="active"><Link to="/main/userprofile" className={open7 ? "sidebarselected userprofiles icons" : "sidebar userprofile icon"} style={{ textDecoration: 'none', color: open7 ? "#2D9CDB" : "#67737A" }} onClick={handleActive7} >User Profile</Link></div>
                  </MenuItem>
                  {/* Upload CSV */}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/uploadcsv" className={open8 ? "sidebarselected csvs icons" : "sidebar csv icon"} style={{ textDecoration: 'none', color: open8 ? "#2D9CDB" : "#67737A" }} onClick={handleActive8} >Upload CSV</Link></div>
                    </MenuItem>
                  ) : null}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/Eventsf" className={open9 ? "sidebarselected events icons" : "sidebar event icon"} style={{ textDecoration: 'none', color: open9 ? "#2D9CDB" : "#67737A" }} onClick={handleActive9} >Events</Link></div>
                    </MenuItem>
                  ) : null}
                  <MenuItem>
                      <div className="active"><Link to="/main/Calendar" className={open10 ? "sidebarselected calenders icons" : "sidebar calender icon"} style={{ textDecoration: 'none', color: open10 ? "#2D9CDB" : "#67737A" }} onClick={handleActive10} >Calendar</Link></div>
                    </MenuItem>
                </div>

              </MenuList>
              {/* <Divider light className={classes.divider} /> */}
              {/* RELEASE NOTES */}
              <br></br>
              {/* <MenuItem>
                <div ><a href={"Athrved"} download style={{ textDecoration: "none", color: "#67737A", fontFamily: "Mulish" }} className="icon">Release Notes    <i class="arrow right" /></a></div></MenuItem> */}


            </div >

          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >

            <div className={classes.sidebar} >

              <div className={classes.toolbar} ><img src={logo} className={classes.topnav} alt="topnav drawer logo" /></div>
              {/* overview */}
              <MenuList>
                <div>
                  <MenuItem>
                    <div className="active"><Link to="/main/overview" className={open1 ? "sidebarselected dashboards icons" : "sidebar dashboard icon"} style={{ textDecoration: "none", color: open1 ? "  #2D9CDB" : " #67737A" }} onClick={handleActive1}>Overview</Link></div>
                  </MenuItem>

                  {/* dailyreport */}
                  <MenuItem>
                    <div className="active"><Link to="/main/dailyreport" className={open2 ? " sidebarselected dailyreports icons " : "sidebar dailyreport icon"} style={{ textDecoration: 'none', color: open2 ? "#2D9CDB" : "#67737A" }} onClick={handleActive2} >Daily Report</Link></div>
                  </MenuItem>
                  {/* teams */}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/teams" className={open3 ? "sidebarselected teams icons" : "sidebar team icon"} style={{ textDecoration: 'none', color: open3 ? "#2D9CDB" : "#67737A" }} onClick={handleActive3} >Teams</Link></div>
                    </MenuItem>
                  ) : null}
                  {/* protrac */}
                  {type !== "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/Productivity_Tracker" className={open4 ? "sidebarselected protracs icons" : "sidebar protrac icon"} style={{ textDecoration: 'none', color: open4 ? "#2D9CDB" : "#67737A" }} onClick={handleActive4} >Pro trac</Link></div>
                    </MenuItem>
                  ) : null}
                  {/* protracadmin */}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/ProductivityTracker" className={open5 ? "sidebarselected protracs icons" : "sidebar protrac icon"} style={{ textDecoration: 'none', color: open5 ? "#2D9CDB" : "#67737A" }} onClick={handleActive5} >Pro trac</Link></div>
                    </MenuItem>
                  ) : null}
                  {/* generatepdf */}
                  <MenuItem>
                    <div className="active"><Link to="/main/Generate_pdf" className={open6 ? "sidebarselected generatepdfs icons" : "sidebar generatepdf icon"} style={{ textDecoration: 'none', color: open6 ? "#2D9CDB" : "#67737A" }} onClick={handleActive6} >Generate PDF</Link></div>
                  </MenuItem>
                  {/* User profile */}
                  <MenuItem>
                    <div className="active"><Link to="/main/userprofile" className={open7 ? "sidebarselected userprofiles icons" : "sidebar userprofile icon"} style={{ textDecoration: 'none', color: open7 ? "#2D9CDB" : "#67737A" }} onClick={handleActive7} >User Profile</Link></div>
                  </MenuItem>
                  {/* Upload CSV */}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/uploadcsv" className={open8 ? "sidebarselected csvs icons" : "sidebar csv icon"} style={{ textDecoration: 'none', color: open8 ? "#2D9CDB" : "#67737A" }} onClick={handleActive8} >Upload CSV</Link></div>
                    </MenuItem>
                  ) : null}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/Eventsf" className={open9 ? "sidebarselected events icons" : "sidebar event icon"} style={{ textDecoration: 'none', color: open9 ? "#2D9CDB" : "#67737A" }} onClick={handleActive9} >Events</Link></div>
                    </MenuItem>
                  ) : null}
                  <MenuItem>
                      <div className="active"><Link to="/main/Calendar" className={open10 ? "sidebarselected calender icons" : "sidebar calender icon"} style={{ textDecoration: 'none', color: open10 ? "#2D9CDB" : "#67737A" }} onClick={handleActive10} >Calendar</Link></div>
                    </MenuItem>
                </div>

              </MenuList>
              {/* <Divider light className={classes.divider} /> */}
              <br></br>
              {/* RELEASE NOTES */}
              {/* <MenuItem>
                <div ><a href={"Athrved"} download style={{ textDecoration: "none", color: "#67737A", fontFamily: "Mulish" }} className="icon">Release Notes    <i class="arrow right" /></a></div></MenuItem> */}


            </div >

          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}

            variant="permanent"
            open
          >

            <div className={classes.sidebar} >

              <div className={classes.toolbar} ><img src={logo} className={classes.topnav} alt="topnav drawer logo" /></div>
              {/* overview */}
              <MenuList>
                <div>
                  <MenuItem>
                    <div className="active"><Link to="/main/overview" className={open1 ? "sidebarselected dashboards icons" : "sidebar dashboard icon"} style={{ textDecoration: "none", color: open1 ? "  #2D9CDB" : " #67737A" }} onClick={handleActive1}>Overview</Link></div>
                  </MenuItem>

                  {/* dailyreport */}
                  <MenuItem>
                    <div className="active"><Link to="/main/dailyreport" className={open2 ? " sidebarselected dailyreports icons " : "sidebar dailyreport icon"} style={{ textDecoration: 'none', color: open2 ? "#2D9CDB" : "#67737A" }} onClick={handleActive2} >Daily Report</Link></div>
                  </MenuItem>
                  {/* teams */}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/teams" className={open3 ? "sidebarselected teams icons" : "sidebar team icon"} style={{ textDecoration: 'none', color: open3 ? "#2D9CDB" : "#67737A" }} onClick={handleActive3} >Teams</Link></div>
                    </MenuItem>
                  ) : null}
                  {/* protrac */}
                  {type !== "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/Productivity_Tracker" className={open4 ? "sidebarselected protracs icons" : "sidebar protrac icon"} style={{ textDecoration: 'none', color: open4 ? "#2D9CDB" : "#67737A" }} onClick={handleActive4} >Pro trac</Link></div>
                    </MenuItem>
                  ) : null}
                  {/* protracadmin */}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/ProductivityTracker" className={open5 ? "sidebarselected protracs icons" : "sidebar protrac icon"} style={{ textDecoration: 'none', color: open5 ? "#2D9CDB" : "#67737A" }} onClick={handleActive5} >Pro trac</Link></div>
                    </MenuItem>
                  ) : null}
                  {/* generatepdf */}
                  <MenuItem>
                    <div className="active"><Link to="/main/Generate_pdf" className={open6 ? "sidebarselected generatepdfs icons" : "sidebar generatepdf icon"} style={{ textDecoration: 'none', color: open6 ? "#2D9CDB" : "#67737A" }} onClick={handleActive6} >Generate PDF</Link></div>
                  </MenuItem>
                  {/* User profile */}
                  <MenuItem>
                    <div className="active"><Link to="/main/userprofile" className={open7 ? "sidebarselected userprofiles icons" : "sidebar userprofile icon"} style={{ textDecoration: 'none', color: open7 ? "#2D9CDB" : "#67737A" }} onClick={handleActive7} >User Profile</Link></div>
                  </MenuItem>
                  {/* Upload CSV */}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/uploadcsv" className={open8 ? "sidebarselected csvs icons" : "sidebar csv icon"} style={{ textDecoration: 'none', color: open8 ? "#2D9CDB" : "#67737A" }} onClick={handleActive8} >Upload CSV</Link></div>
                    </MenuItem>
                  ) : null}
                  {type === "A" ? (
                    <MenuItem>
                      <div className="active"><Link to="/main/Eventsf" className={open9 ? "sidebarselected events icons" : "sidebar event icon"} style={{ textDecoration: 'none', color: open9 ? "#2D9CDB" : "#67737A" }} onClick={handleActive9} >Events</Link></div>
                    </MenuItem>
                  ) : null}
                  <MenuItem>
                      <div className="active"><Link to="/main/Calendar" className={open10 ? "sidebarselected calenders icons" : "sidebar calender icon"} style={{ textDecoration: 'none', color: open10 ? "#2D9CDB" : "#67737A" }} onClick={handleActive10} >Calendar</Link></div>
                    </MenuItem>
                </div>

              </MenuList>
              {/* <Divider light className={classes.divider} /> */}
              <br></br>
              {/* RELEASE NOTES */}
              {/* <MenuItem>
                <div style={{ fontSize: 20 }} ><a href={"Athrved"} download style={{ textDecoration: "none", color: "#67737A", fontFamily: "Mulish" }} className="icon" >Release Notes    <i class="arrow right" /></a></div></MenuItem> */}


            </div >

          </Drawer>
        </Hidden>

      </nav>

      <Route exact path="/main/overview" component={Dashboard} />
      <Route exact path="/main/activity/:activityid" component={Activity} />
      <Route exact path="/main/activity/:activityid/single" component={Singlekanban} />
      <Route exact path="/main/teams" component={Teams} />
      <Route exact path="/main/dailyreport" component={DailyFrom} />
      <Route exact path="/main/dailyreport-Software" component={Software} />
      <Route exact path="/main/dailyreport-PrefinalYears" component={Prefinalyear} />
      <Route exact path="/main/dailyreport-Management" component={Management} />
      <Route exact path="/main/dailyreport-ProductDesign" component={Product} />
      <Route exact path="/main/userprofile" component={MyInfo} />
      <Route exact path="/main/Productivity_Tracker" component={Productivity_Tracker} />
      <Route exact path="/main/ProductivityTracker" component={ProductivityTracker} />
      <Route exact path="/main/Generate_pdf" component={Generate_pdf} />
      <Route exact path="/main/uploadcsv" component={UploadCSV} />
      <Route exact path="/main/Eventsf" component={Eventsf} />
      <Route exact path="/main/Eventsf/AddEvents" component={AddEvents} />
      <Route exact path="/main/Calendar" component={Calendar}/>
    </div >

  );
}
export default Navbar;