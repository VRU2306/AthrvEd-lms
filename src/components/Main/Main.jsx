import React, { useContext } from "react";
import { Route, BrowserRouter, Redirect, useHistory, useParams, Link } from "react-router-dom";
import { useStoreState, useStoreActions, action } from "easy-peasy";
import Dashboard from "./Dashboard/Dashboard";

import Auth from "../Auth/Auth";
import EventApply from "./Eventsf/EventApply"
import EventUser from "./Eventsf/EventUser"

// import ProtectedMainSection from "./ProtectedMainSection/ProtectedMainSection";
import Sidenav from "./Sideandtopnav/Sidenav"
import resetpassword from "../Auth/Login/Resetpassword";
import token from "../Auth/Login/Token";
import Register from "../Auth/Register/Register"
import { routerActions } from "react-router-redux";
import { LocalSeeOutlined } from "@material-ui/icons";
import { SocketContext } from "../../App";


function Main() {


  let setAuth = useStoreActions(action => action.authMod.SET_REGULAR_AUTH);
  let clearProfile = useStoreActions(action => action.profileMod.CLEAR_PROFILE);
  // let claerActvity = useStoreActions(action => action.activity.CLEAR_TASKS);
  let socket = useContext(SocketContext);
  let user_id = useStoreState(state => state.profileMod.profile.user_id);
  // clears the token, sets the auth boolean to false and clears the profile

  function logoutTransaction() {

    localStorage.clear();
    sessionStorage.clear();
    window.localStorage.clear();
    window.sessionStorage.clear();


    setAuth(false);
    clearProfile();
    // claerActvity(true);

    socket.emit('leave', user_id)
    // socket.disconnect()
    return <Redirect to="/" />;
  }
  console.log(localStorage.getItem("Notlogged"));
  // console.log("isAuth", window.location.pathname)
  function ProtectedRoute({ component: Component, ...rest }) {
    let isAuth = useStoreState(state => state.authMod.isAuth);
    console.log(localStorage.getItem("reload"))
    if (isAuth || sessionStorage.getItem("logged")) {
      return <Route {...rest} component={Component} />;
    }


    else {
      console.log("shshhs", window.location.pathname);
      var url = window.location.href.split(':')[window.location.href.split(':').length - 1]
      console.log("shshshcjsgdhs", url);

      if (window.location.pathname == "/eventuser" || window.location.pathname == `/event/singleeventfetch/:${url}`) {

        return <Route {...rest} component={Component} />;

      }
      else {
        return <Redirect to="/" />;
      }
    }

  }
  return (
    <section id="dashboard" className="disp-flex">
      <BrowserRouter>
        <Route path="/updatepassword" component={resetpassword} />
        <Route exact path="/reset" component={token} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Auth} />
        <Route path="/logout" render={() => logoutTransaction()} />
        <Route exact path="/eventuser" component={EventUser} />
        <Route exact path="/event/singleeventfetch/:eventid" component={EventApply} />
        <ProtectedRoute path="/main" component={Sidenav} />
      </BrowserRouter>
    </section>
  );
}

export default Main;