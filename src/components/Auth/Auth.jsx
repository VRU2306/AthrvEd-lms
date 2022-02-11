import React, { useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Redirect } from "react-router-dom";
import Login from "./Login/Login";
import "./auth.css";
import { authorization } from "./authorization";
function Auth() {

  let { isAdminAuthAttempt: isAdmin, isAuth } = useStoreState(
    state => state.authMod
  );
  let { type: isRegularUserAuth } = useStoreState(
    state => state.profileMod.profile
  );
  console.log(isRegularUserAuth)
  let checkAdmin = useStoreActions(action => action.authMod.FETCH_ALL_USERS);
  let setAuth = useStoreActions(action => action.authMod.SET_REGULAR_AUTH);
  let checkRegularUser = useStoreActions(
    action => action.profileMod.FETCH_PROFILE_START
  );
  // let { isFetching: isActivitiesLoading } = useStoreState(
  //   state => state.activities
  // );



  // console.log(window.location.pathname)
  useEffect(() => {
    if (!isAuth) {
      authorization(
        isAdmin,
        checkAdmin,
        // blockadmin,
        checkRegularUser,
        isRegularUserAuth,
        setAuth,


      );
    }
  }, [isAuth, isAdmin, isRegularUserAuth]);
  // console.log(isAuth)
  console.log('uyfyguhjkn')
  if (!isAuth && !sessionStorage.getItem("logged"))
    return (
      <Login />
    );
  else
    return (
      <Redirect
        to={
          window.location.pathname === "/"
            ? "/main/overview"
            : "/main/overview"
        }
      />
    );
}
export default Auth;

