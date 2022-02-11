import { action, thunk } from "easy-peasy";
import axios from "axios";
// eslint-disable-next-line
export default {
  isAuth: false,
  isChecking: true,
  isAdminAuthAttempt: true,
  token: "",
  user_id: "",
  type: "",
  errors: [],

  CLEAR_ERRORS: action((state, payload) => {
    state["errors"] = [];
  }),
  users: [],



  SET_REGULAR_AUTH: action((state, payload) => {
    state["isAuth"] = payload;
  }),
  FETCH_LOGIN_REQUEST: action((state, payload) => {
    state["isChecking"] = payload;
  }),
  FETCH_LOGIN_SUCCESS: action((state, { token, user_id, type }) => {
    state["token"] = token;
    state["user_id"] = user_id;
    state["type"] = type;
    state["isAuth"] = true;
  }),
  FETCH_LOGIN_FAIL: action((state, payload) => {
    state["isAuth"] = false;
    state["errors"] = payload;
  }),
  FETCH_LOGIN_START: thunk(async (action, payload) => {
    action.FETCH_LOGIN_REQUEST(true);
    try {
      let authData = await axios.post("/login", payload);
      console.log(authData)
      if (authData) {
        let {
          data: { token, user_id, type }
        } = authData;
        localStorage.setItem("token", token);
        sessionStorage.setItem("logged", user_id)
        localStorage.setItem("reload", false);
        console.log(type)
        if (type === "A") action.FETCH_ALL_USERS();

        else action.FETCH_LOGIN_SUCCESS({ token, user_id, type });
      }
    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_LOGIN_FAIL(error.response.data);
    }
  }),
  FETCH_REGISTER_REQUEST: action((state, payload) => {
    state["isChecking"] = payload;
  }),
  FETCH_REGISTER_SUCCESS: action((state, { token, user_id, type }) => {
    state["token"] = token;
    state["user_id"] = user_id;
    state["type"] = type;
    state["isAuth"] = true;

  }),
  FETCH_REGISTER_FAIL: action((state, payload) => {
    state["isAuth"] = false;
    state["errors"] = payload;

  }),
  FETCH_REGISTER_START: thunk(async (action, payload) => {
    action.FETCH_REGISTER_REQUEST(true);
    //console.log(payload)
    try {
      let authData = await axios.post("/signup", payload);
      if (authData) {
        let {
          data: { token, user_id, type }
        } = authData;
        localStorage.setItem("token", token);
        sessionStorage.setItem("logged", user_id)
        if (type === "A") action.FETCH_ALL_USERS();
        else action.FETCH_REGISTER_SUCCESS({ token, user_id, type });
      }
    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_REGISTER_FAIL(error.response.data);
    }
  }),

  isExtendFetching: false,

  FETCH_ALL_USERS_START: action((state, payload) => {
    state["isAdminAuthAttempt"] = true;
    state["isExtendFetching"] = true;
  }),
  FETCH_ALL_USERS_SUCCESS: action((state, { users }) => {
    state["type"] = "A";
    state["users"] = users;
    state["isAdminAttempt"] = false;
    state["isAuth"] = true;
    state["isExtendFetching"] = false;
  }),
  FETCH_ALL_USERS_FAIL: action((state, paylaod) => {
    state["isAdminAuthAttempt"] = false;
    state["isAuth"] = false;
    state["isExtendFetching"] = false;
  }),
  FETCH_ALL_USERS: thunk(async (action, payload) => {
    action.FETCH_ALL_USERS_START();
    try {
      let users = await axios.get("/admin/all", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      console.log(users);
      action.FETCH_ALL_USERS_SUCCESS({ users: users.data.allUsers });
    } catch (error) {
      //console.log(error);
      localStorage.clear();
      action.FETCH_ALL_USERS_FAIL();
    }
  }),
  // 
  POST_MAILVERIFY_REQUEST: action((state, payload) => {


  }),
  POST_MAILVERIFY_SUCCESS: action((state, payload) => {

  }),
  POST_MAILVERIFY_FAIL: action((state, payload) => {
    // state["errors"]=payload;
    // state["isPrefinalyearsinserting"]=false;
    // state["submit"]=false;
  }),
  POST_MAILVERIFY_START: thunk(async (action, payload) => {
    action.POST_MAILVERIFY_REQUEST();
    //console.log(payload)
    try {
      let verify = await axios.post("/find", payload, {
        //   headers: {
        //    "x-auth-token": localStorage.getItem("token")
        // }
      });
      if (verify) {
        action.POST_MAILVERIFY_SUCCESS();
        //console.log(verify)

      }
    } catch (error) {
      //console.log(error.response.data);
      action.POST_MAILVERIFY_FAIL({ message: "Uxpected error" });
    }
  }),

  isSubmitting: false,

  FETCH_MAILVERIFIED_REQUEST: action((state, payload) => {
    //console.log("request")
    state["isFetching"] = true;
    state["isSubmitting"] = true;
    state["Successful"] = false;


  }),
  FETCH_MAILVERIFIED_SUCCESS: action((state, payload) => {
    // state["isAuth"] = true;
    state["verify"] = {};
    state["Successful"] = true;
    state["isSubmitting"] = false;
    state["Fail"] = false;
    state["isFetching"] = false;
  }),
  FETCH_MAILVERIFIED_FAIL: action((state, payload) => {
    state["Successful"] = false;
    state["Fail"] = true;
    state["isFetching"] = false;
    state["isSubmitting"] = false;
    // state["isAuth"] = false;
  }),
  FETCH_MAILVERIFIED_START: thunk(async (action, payload) => {
    action.FETCH_MAILVERIFIED_REQUEST();
    try {
      let verifyy = await axios.post("/verify", payload,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        });
      if (verifyy) {
        action.FETCH_MAILVERIFIED_SUCCESS(verifyy);
        // let verified = verifyy
        //console.log(verified.data)
      }

    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_MAILVERIFIED_FAIL({ message: "Uxpected error" });
    }
  }),



  //user week dif
  produserweek: [],
  isproduserweekFetching: true,
  POST_PRODU_USER_REQUEST_WEEK: action((state, payload) => {
    //console.log("request")
    // state["isMailsending"] = true;
    state["successfullweek"] = false;
    state["isproduserweekFetching"] = true;
  }),
  POST_PRODU_USER_SUCCESS_WEEK: action((state, payload) => {
    //console.log("successfully sent")
    // state["isMailsending"] = false;
    // state["ressubmit"] = true;
    state["produserweek"] = payload;
    state["Successfullsweek"] = true;
    state["failsureeweek"] = false;
  }),
  POST_PRODU_USER_FAIL_WEEK: action((state, payload) => {
    //console.log("error")

    state["failsureeweek"] = true;
    state["Successfullsweek"] = false;

  }),
  POST_PRODU_USER_START_WEEK: thunk(async (action, payload) => {
    action.POST_PRODU_USER_REQUEST_WEEK();
    //console.log(payload)
    try {
      let produserweek = await axios.post("/userdif", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (produserweek) {
        action.POST_PRODU_USER_SUCCESS_WEEK(produserweek.data);
        // let week = produserweek.data
        //console.log(week)
        //console.log(payload)
      }
    }
    catch (error) {
      //console.log(error.data);
      action.POST_PRODU_USER_FAIL_WEEK({ message: "Uxpected error" });
    }
  }),
  // 



  // User diff month
  produsermonth: [],
  POST_PRODU_USER_REQUEST_MONTH: action((state, payload) => {
    //console.log("request")
    // state["isMailsending"] = true;
    state["successfullmonth"] = false;
  }),
  POST_PRODU_USER_SUCCESS_MONTH: action((state, payload) => {
    //console.log("successfully sent")
    // state["isMailsending"] = false;
    state["produsermonth"] = payload;
    state["Successfullsmonth"] = true;
    state["failsureemonth"] = false;
  }),
  POST_PRODU_USER_FAIL_MONTH: action((state, payload) => {
    //console.log("error")
    state["failsureemonth"] = true;
    state["Successfullsmonth"] = false;
    //  //console.log("Error");
  }),
  POST_PRODU_USER_START_MONTH: thunk(async (action, payload) => {
    action.POST_PRODU_USER_REQUEST_MONTH();
    //console.log(payload)
    try {
      let produsermonth = await axios.post("/userdif/monthly", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (produsermonth) {
        action.POST_PRODU_USER_SUCCESS_MONTH(produsermonth.data);
        // let Blockdata = produsermonth
        //console.log(Blockdata.data)
        //console.log(payload)
      }
    }
    catch (error) {
      //console.log(error.data);
      action.POST_PRODU_USER_FAIL_MONTH({ message: "Uxpected error" });
    }
  }),
  // 



  // User diff year
  produseryear: [],
  POST_PRODU_USER_REQUEST_YEAR: action((state, payload) => {
    //console.log("request")
    // state["isMailsending"] = true;
    state["successfullyear"] = false;
  }),
  POST_PRODU_USER_SUCCESS_YEAR: action((state, payload) => {
    //console.log("successfully sent")
    // state["isMailsending"] = false;
    state["produseryear"] = payload;
    state["Successfullsyear"] = true;
    state["failsureeyear"] = false;
  }),
  POST_PRODU_USER_FAIL_YEAR: action((state, payload) => {
    //console.log("error")
    //  state["errors"]=payload;
    // state["ressubmit"] = false;
    // state["isMailsending"] = false;
    state["failsureeyear"] = true;
    state["Successfullsyear"] = false;
    //  //console.log("Error");
  }),
  POST_PRODU_USER_START_YEAR: thunk(async (action, payload) => {
    action.POST_PRODU_USER_REQUEST_YEAR();
    //console.log(payload)
    try {
      let produseryear = await axios.post("/userdif/yearly", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (produseryear) {
        action.POST_PRODU_USER_SUCCESS_YEAR(produseryear.data);
        // let Blockdata = produseryear
        //console.log(Blockdata.data)
        //console.log(payload)
      }
    }
    catch (error) {
      //console.log(error.data);
      action.POST_PRODU_USER_FAIL_YEAR({ message: "Uxpected error" });
    }
  }),
  // 



  // Admin diff week
  proadminweek: [],
  POST_PRODU_ADMIN_REQUEST_WEEK: action((state, payload) => {
    //console.log("request")
    // state["isMailsending"] = true;
    state["successfulladmweek"] = false;
  }),
  POST_PRODU_ADMIN_SUCCESS_WEEK: action((state, payload) => {
    //console.log("successfully sent")
    // state["isMailsending"] = false;
    // state["ressubmit"] = true;
    state["proadminweek"] = payload;
    state["Successfullsadmweek"] = true;
    state["failsureeadmweek"] = false;
  }),
  POST_PRODU_ADMIN_FAIL_WEEK: action((state, payload) => {
    //console.log("error")
    //  state["errors"]=payload;
    // state["ressubmit"] = false;
    // state["isMailsending"] = false;
    state["failsureeadmweek"] = true;
    state["Successfullsadmweek"] = false;
    //  //console.log("Error");
  }),
  POST_PRODU_ADMIN_START_WEEK: thunk(async (action, payload) => {
    action.POST_PRODU_ADMIN_REQUEST_WEEK();
    //console.log(payload.data)
    try {
      let prodadminweek = await axios.post("/diff/", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (prodadminweek) {
        action.POST_PRODU_ADMIN_SUCCESS_WEEK(prodadminweek.data);
        // let Blockdata = prodadminweek
        //console.log(Blockdata.data)
        //console.log(payload)
      }
    }
    catch (error) {
      //console.log(error.response.data);
      action.POST_PRODU_ADMIN_FAIL_WEEK({ message: "Uxpected error" });
    }
  }),
  // 
  // Admin diff month
  prodadminmonth: [],
  isproadminMonthfetching: true,
  CLEAR_ADMINMONTH: action((state, payload) => {
    //console.log("request")
    state["prodadminmonth"] = [];
    state["isproadminMonthfetching"] = true;
  }),
  POST_PRODU_MONTH_REQUEST_YEAR: action((state, payload) => {
    //console.log("request")
    // state["isMailsending"] = true;
    // state["successfulladmyear"] = false;
    state[" isproadminMonthfetching"] = true;
  }),
  POST_PRODU_MONTH_SUCCESS_YEAR: action((state, payload) => {
    //console.log("successfully sent")
    // state["isMailsending"] = false;
    // state["ressubmit"] = true;
    state["prodadminmonth"] = payload;
    // state["Successfullsadmyear"] = true;
    // state["failsureeadmyear"] = false;
    state["isproadminMonthfetching"] = false;
  }),
  POST_PRODU_MONTH_FAIL_YEAR: action((state, payload) => {
    //console.log("error")
    //  state["errors"]=payload;
    // state["ressubmit"] = false;
    // state["isMailsending"] = false;
    // state["failsureeadmyear"] = true;
    state["isproadminMonthfetching"] = false;
    // state["Successfullsadmyear"] = false;
    //  //console.log("Error");
  }),
  POSTS_PRODU_MONTH_START_YEAR: thunk(async (action, payload) => {
    action.POST_PRODU_MONTH_REQUEST_YEAR();

    try {
      let prodadminmonth = await axios.get("/diff/monthly", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (prodadminmonth) {
        action.POST_PRODU_MONTH_SUCCESS_YEAR(prodadminmonth.data);
        // let Blockdatas = prodadminmonth
        //console.log(Blockdatas.data)
      }
    }
    catch (error) {
      //console.log(error.data);
      action.POST_PRODU_MONTH_FAIL_YEAR({ message: "Uxpected error" });
    }
  }),
  // 


  prodadminyear: [],
  isproadminYearFetching: true,
  CLEAR_ADMINYEAR: action((state, payload) => {
    //console.log("request")
    state["prodadminyear"] = [];
    state["isproadminYearFetching"] = true;

  }),
  // Admin diff year
  POST_PRODU_ADMIN_REQUEST_YEAR: action((state, payload) => {
    //console.log("request")
    // state["isMailsending"] = true;
    state["successfulladmyear"] = false;
    state[" isproadminYearFetching"] = true;
  }),
  POST_PRODU_ADMIN_SUCCESS_YEAR: action((state, payload) => {
    //console.log("successfully sent")
    // state["isMailsending"] = false;
    // state["ressubmit"] = true;
    state["prodadminyear"] = payload;
    state["Successfullsadmyear"] = true;
    state["failsureeadmyear"] = false;
    state["isproadminYearFetching"] = false;
  }),
  POST_PRODU_ADMIN_FAIL_YEAR: action((state, payload) => {
    //console.log("error")
    //  state["errors"]=payload;
    // state["ressubmit"] = false;
    // state["isMailsending"] = false;
    state["failsureeadmyear"] = true;
    state["isproadminYearFetching"] = false;
    state["Successfullsadmyear"] = false;
    //  //console.log("Error");
  }),
  POSTS_PRODU_ADMIN_START_YEAR: thunk(async (action, payload) => {
    action.POST_PRODU_ADMIN_REQUEST_YEAR();

    try {
      let prodadminyear = await axios.get("/diff/yearly", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (prodadminyear) {
        action.POST_PRODU_ADMIN_SUCCESS_YEAR(prodadminyear.data);
        // let Blockdata = prodadminyear
        //console.log(Blockdata.data)
      }
    }
    catch (error) {
      //console.log(error.data);
      action.POST_PRODU_ADMIN_FAIL_YEAR({ message: "Uxpected error" });
    }
  }),
  // 




  FETCH_FORGOTPASSWORD_REQUEST: action((state, payload) => {
    //console.log("request")

  }),
  FETCH_FORGOTPASSWORD_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["successfulsubmit"] = true;
    state["failure"] = false;
  }),
  FETCH_FORGOTPASSWORD_FAIL: action((state, payload) => {
    // state["errors"]=payload;
    state["successfulsubmit"] = false;
    state["failure"] = true;
    //console.log("Error")
  }),
  FETCH_FORGOTPASSWORD_START: thunk(async (action, payload) => {
    action.FETCH_FORGOTPASSWORD_REQUEST();
    //console.log(payload)
    try {
      let forgot = await axios.post("/forgotpassword", payload);
      if (forgot) {
        action.FETCH_FORGOTPASSWORD_SUCCESS(forgot);
        // let forgotsent = forgot
        //console.log(forgotsent)
        // //console.log(payload)     
      }
    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_FORGOTPASSWORD_FAIL({ message: "Uxpected error" });
    }
  }),
  FETCH_RESETTOKEN_REQUEST: action((state, payload) => {
    //console.log("request")
  }),
  FETCH_RESETTOKEN_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["successfullsubmit"] = true;
    state["failsure"] = false;
  }),
  FETCH_RESETTOKEN_FAIL: action((state, payload) => {
    //  state["errors"]=payload;
    state["successfullsubmit"] = false;
    state["failsure"] = true;
    //console.log("Error");
  }),
  FETCH_RESETTOKEN_START: thunk(async (action, payload) => {
    action.FETCH_RESETTOKEN_REQUEST();

    try {
      let reset = await axios.post("/resetpassword", payload)

      if (reset) {
        action.FETCH_RESETTOKEN_SUCCESS(reset);
        //let resetsent = reset
        //console.log(resetsent.data)
        // //console.log(payload)     
      }
    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_RESETTOKEN_FAIL({ message: "Uxpected error" });
    }
  }),
  FETCH_RESETPASSWORD_REQUEST: action((state, payload) => {
    //console.log("request")
  }),
  FETCH_RESETPASSWORD_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["passwordsubmit"] = true;
    state["fails"] = false;
  }),
  FETCH_RESETPASSWORD_FAIL: action((state, payload) => {
    //  state["errors"]=payload;
    state["passwordsubmit"] = false;
    state["fails"] = true;
    //  //console.log("Error");
  }),
  FETCH_RESETPASSWORD_START: thunk(async (action, payload) => {
    action.FETCH_RESETPASSWORD_REQUEST();
    //console.log(payload)
    try {
      let update = await axios.post("/updatepassword", payload, {
        // headers: {
        //   "x-auth-token": localStorage.getItem("token")
        // }
      });
      if (update) {
        action.FETCH_RESETPASSWORD_SUCCESS(update);
        //let resetsent = update
        //console.log(resetsent.data)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_RESETPASSWORD_FAIL({ message: "Uxpected error" });
    }
  }),
  // 
  isMailsending: false,

  RESEND_MAIL_REQUEST: action((state, payload) => {
    //console.log("request")
    state["isMailsending"] = true;
    state["successfull"] = false;
  }),
  RESEND_MAIL_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["isMailsending"] = false;
    state["ressubmit"] = true;
    state["successfull"] = true;
    state["fails"] = false;
  }),
  RESEND_MAIL_FAIL: action((state, payload) => {
    //  state["errors"]=payload;
    state["ressubmit"] = false;
    state["isMailsending"] = false;
    state["fails"] = true;
    state["successfull"] = false;
    //  //console.log("Error");
  }),
  // 
  RESEND_MAIL_START: thunk(async (action, payload) => {
    action.RESEND_MAIL_REQUEST();
    //console.log(payload)
    try {
      let res = await axios.post("/resend", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (res) {
        action.RESEND_MAIL_SUCCESS(res);
        //let resetsent = res
        //console.log(resetsent.data)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.response.data);
      action.RESEND_MAIL_FAIL({ message: "Uxpected error" });
    }
  }),
  // 
  BLOCK_USER_REQUEST: action((state, payload) => {
    //console.log("request")
    // state["isMailsending"] = true;
    state["successfull"] = false;
  }),
  BLOCK_USER_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    // state["isMailsending"] = false;
    // state["ressubmit"] = true;
    state["Successfulls"] = true;
    state["failsuree"] = false;
  }),
  BLOCK_USER_FAIL: action((state, payload) => {
    //console.log("error")
    //  state["errors"]=payload;
    // state["ressubmit"] = false;
    // state["isMailsending"] = false;
    state["failsuree"] = true;
    state["Successfulls"] = false;
    //  //console.log("Error");
  }),
  BLOCK_USER_START: thunk(async (action, payload) => {
    action.BLOCK_USER_REQUEST();
    //console.log(payload.data)
    try {
      let Block = await axios.post("/admin/blockuser", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (Block) {
        action.BLOCK_USER_SUCCESS(Block);
        // let Blockdata = Block
        //console.log(Blockdata.data)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.response.data);
      action.BLOCK_USER_FAIL({ message: "Uxpected error" });
    }
  }),
  // 
  ADD_USER_REQUEST: action((state, payload) => {
    //console.log("request")
    // state["isMailsending"] = true;

  }),
  ADD_USER_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    // state["isMailsending"] = false;
    // state["ressubmit"] = true;
    state["Successfullss"] = true;
    state["failsureee"] = false;
  }),
  ADD_USER_FAIL: action((state, payload) => {
    //console.log("error")
    //  state["errors"]=payload;
    // state["ressubmit"] = false;
    // state["isMailsending"] = false;
    state["failsureee"] = true;
    state["Successfullss"] = false;
    //  //console.log("Error");
  }),
  ADD_USER_START: thunk(async (action, payload) => {
    action.ADD_USER_REQUEST();
    //console.log(payload.data)
    try {
      let Add = await axios.post("/admin/insertmember", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (Add) {
        action.ADD_USER_SUCCESS(Add);
        // let Adddata = Add
        //console.log(Adddata.data)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.response.data);
      action.ADD_USER_FAIL({ message: "Uxpected error" });
    }
  }),
  // 
  UNBLOCK_USER_REQUEST: action((state, payload) => {
    //console.log("request")
    // state["isMailsending"] = true;
    state["successfull"] = false;
  }),
  UNBLOCK_USER_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    // state["isMailsending"] = false;
    // state["ressubmit"] = true;
    state["Successfullss"] = true;
    state["failsureee"] = false;
  }),
  UNBLOCK_USER_FAIL: action((state, payload) => {
    //console.log("error")
    //  state["errors"]=payload;
    // state["ressubmit"] = false;
    // state["isMailsending"] = false;
    state["failsuree"] = true;
    state["Successfulls"] = false;
    //  //console.log("Error");
  }),
  UNBLOCK_USER_START: thunk(async (action, payload) => {
    action.UNBLOCK_USER_REQUEST();
    //console.log(payload)
    try {
      let UnBlock = await axios.post("/admin/unblock", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (UnBlock) {
        action.UNBLOCK_USER_SUCCESS(UnBlock);
        // let UnBlockdata = UnBlock
        //console.log(UnBlockdata.data)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.response.data);
      action.UNBLOCK_USER_FAIL({ message: "Uxpected error" });
    }
  }),
  // 

  blockedusers: [],
  isblockedusersfetching: true,

  CLEAR_BLOCKEDUSERS: action((state, payload) => {
    state["blockedusers"] = [];
    state["isblockedusersfetching"] = true;
  }),

  FETCH_ALL_BLOCKEDUSERS_START: action((state, paylaod) => {
    state["isblockedusersfetching"] = true;
  }),
  FETCH_ALL_BLOCKEDUSERS_SUCCESS: action((state, payload) => {
    state["blockedusers"] = payload;
    state["isblockedusersfetching"] = false;
  }),
  FETCH_ALL_BLOCKEDUSERS_FAIL: action((state, payload) => {
    state["error"] = payload;
    state["isblockedusersfetching"] = false;
  }),
  FETCH_ALL_BLOCKEDUSERS: thunk(async (action, payload) => {
    action.FETCH_ALL_BLOCKEDUSERS_START();
    //console.log(payload)
    try {
      let blockedusers = await axios.get("/admin/allblockedmembers", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (blockedusers) {
        //console.log(blockedusers.data);
        action.FETCH_ALL_BLOCKEDUSERS_SUCCESS(blockedusers.data);
      }

    } catch (error) {
      //console.log(error);
      action.FETCH_ALL_BLOCKEDUSERS_FAIL();
    }
  }),
  // 
  unblocked: [],
  isunblockedusersfetching: true,

  CLEAR_UNBLOCKED: action((state, payload) => {
    state["unblocked"] = [];
    state["isunblockedusersfetching"] = true;
  }),
  FETCH_ALL_UNBLOCKEDSERS_START: action((state, paylaod) => {
    state["isunblockedusersfetching"] = true;
  }),
  FETCH_ALL_UNBLOCKEDSERS_SUCCESS: action((state, payload) => {
    state["unblocked"] = payload;
    state["isunblockedusersfetching"] = false;
  }),
  FETCH_ALL_UNBLOCKEDSERS_FAIL: action((state, payload) => {
    state["error"] = payload;
    state["isunblockedusersfetching"] = false;
  }),
  FETCH_ALL_UNBLOCKEDSERS: thunk(async (action, payload) => {
    action.FETCH_ALL_UNBLOCKEDSERS_START();
    try {
      let unblocked = await axios.get("/admin/allunblockedmembers", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (unblocked) {
        //console.log(unblocked.data);
        action.FETCH_ALL_UNBLOCKEDSERS_SUCCESS(unblocked.data);
      }
    } catch (error) {
      //console.log(error);
      action.FETCH_ALL_UNBLOCKEDSERS_FAIL();
    }
  }),

  // top5graph weekly
  topfiveweek: [],
  istopfivefetching: true,
  istopfiveinserting: true,

  CLEAR_TOPFIVE: action((state, payload) => {
    state["topfiveweek"] = [];
    state["istopfivefetching"] = true;
    state["istopfiveinserting"] = true;
  }),
  FETCH_TOPFIVEWEEK_START: action((state, payload,) => {
    //console.log("successfully sent")
    state["istopfivefetching"] = true;
    state["istopfiveinserting"] = true;
  }),
  FETCH_TOPFIVEWEEK_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["topfiveweek"] = payload;
    state["istopfivefetching"] = false;
    state["istopfiveinserting"] = false;
  }),
  FETCH_TOPFIVEWEEK_FAIL: action((state, payload) => {
    state["error"] = payload
    state["istopfivefetching"] = false;
    state["istopfiveinserting"] = true;
    //console.log("errioe")
  }),
  FETCH_TOPFIVEWEEK: thunk(async (action, payload) => {
    action.FETCH_TOPFIVEWEEK_START();
    //console.log(payload)
    try {
      let topfiveweek = await axios.get("/admin/topfiveweekly", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (topfiveweek) {
        action.FETCH_TOPFIVEWEEK_SUCCESS(topfiveweek.data);
        //console.log(payload)
        //console.log(topfiveweek.data)
      }
    } catch (error) {
      //console.log(error.data);
      action.FETCH_TOPFIVEWEEK_FAIL({ message: "Uxpected error" });
    }
  }),
  // top 5 monthly
  topfivemonth: [],
  istopfivemonthfetching: true,
  istopfivemonthinserting: true,
  CLEAR_TOPFIVEMONTH: action((state, payload) => {
    state["topfivemonth"] = [];
    state["istopfivemonthfetching"] = true;
    state["istopfivemonthinserting"] = true;
  }),
  FETCH_TOPFIVEMONTH_START: action((state, payload,) => {
    //console.log("successfully sent")
    state["istopfivemonthfetching"] = true;
    state["istopfivemonthinserting"] = true;
  }),
  FETCH_TOPFIVEMONTH_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["topfivemonth"] = payload;
    state["istopfivemonthfetching"] = false;
    state["istopfivemonthinserting"] = false;
  }),
  FETCH_TOPFIVEMONTH_FAIL: action((state, payload) => {
    //console.log("errioe")
    state["error"] = payload;
    state["istopfivemonthfetching"] = false;
    state["istopfivemonthinserting"] = true;
  }),
  FETCH_TOPFIVEMONTH: thunk(async (action, payload) => {
    action.FETCH_TOPFIVEMONTH_START();
    //console.log(payload)
    try {
      let topfivemonth = await axios.get("/admin/topfivemonthly", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (topfivemonth) {
        action.FETCH_TOPFIVEMONTH_SUCCESS(topfivemonth.data);
        //let resetsent = topfivemonth.data
        //console.log(resetsent.data)
        //console.log(topfivemonth)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.data);
      action.FETCH_TOPFIVEMONTH_FAIL({ message: "Uxpected error" });
    }
  }),
  // cards of Dashboard

  //Number of People Absent Today
  todayleave: [],
  istodayleavefetching: true,
  CLEAR_TODAYLEAVE: action((state, payload) => {
    state["todayleave"] = [];
    state["istodayleavefetching"] = true;
  }),
  FETCH_TODAYLEAVE_START: action((state, payload,) => {
    //console.log("successfully sent")
    state["istodayleavefetching"] = true;
  }),
  FETCH_TODAYLEAVE_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["todayleave"] = payload;
    state["istodayleavefetching"] = false;
  }),
  FETCH_TODAYLEAVE_FAIL: action((state, payload) => {
    //console.log("errioe")
    state["error"] = payload;
    state["istodayleavefetching"] = false;
  }),
  FETCH_TODAYLEAVE: thunk(async (action, payload) => {
    action.FETCH_TODAYLEAVE_START();
    //console.log(payload)
    try {
      let todayleave = await axios.get("/todayleave", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (todayleave) {
        action.FETCH_TODAYLEAVE_SUCCESS(todayleave.data);
        // //let resetsent = todayleave.data
        //console.log(resetsent.data)
        //console.log(todayleave)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.data);
      action.FETCH_TODAYLEAVE_FAIL({ message: "Uxpected error" });
    }
  }),

  // Number of People Absent Tomorrow
  tomleave: [],
  istomleavefetching: true,
  CLEAR_TOMLEAVE: action((state, payload) => {
    state["tomleave"] = [];
    state["istomleavefetching"] = true;
  }),
  FETCH_TOMLEAVE_START: action((state, payload,) => {
    //console.log("successfully sent")
    state["istomleavefetching"] = true;
  }),
  FETCH_TOMLEAVE_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["tomleave"] = payload;
    state["istomleavefetching"] = false;
  }),
  FETCH_TOMLEAVE_FAIL: action((state, payload) => {
    //console.log("errioe")
    state["error"] = payload;
    state["istomleavefetching"] = false;
  }),
  FETCH_TOMLEAVE: thunk(async (action, payload) => {
    action.FETCH_TOMLEAVE_START();
    //console.log(payload)
    try {
      let tomleave = await axios.get("/leavetomm", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (tomleave) {
        action.FETCH_TOMLEAVE_SUCCESS(tomleave.data);
        //let resetsent = tomleave.data
        //console.log(resetsent.data)
        //console.log(tomleave)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.data);
      action.FETCH_TOMLEAVE_FAIL({ message: "Uxpected error" });
    }
  }),
  // number of people absent for the week
  weekleave: [],
  isweekleavefetching: true,
  CLEAR_WEEKLEAVE: action((state, payload) => {
    state["weekleave"] = [];
    state["isweekleavefetching"] = true;
  }),
  FETCH_WEEKLEAVE_START: action((state, payload,) => {
    //console.log("successfully sent")
    state["isweekleavefetching"] = true;
  }),
  FETCH_WEEKLEAVE_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["weekleave"] = payload;
    state["isweekleavefetching"] = false;
  }),
  FETCH_WEEKLEAVE_FAIL: action((state, payload) => {
    //console.log("errioe")
    state["error"] = payload;
    state["isweekleavefetching"] = false;
  }),
  FETCH_WEEKLEAVE: thunk(async (action, payload) => {
    action.FETCH_WEEKLEAVE_START();
    //console.log(payload)
    try {
      let weekleave = await axios.get("/leaveweek", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (weekleave) {
        action.FETCH_WEEKLEAVE_SUCCESS(weekleave.data);
        //let resetsent = weekleave.data
        //console.log(resetsent.data)
        //console.log(weekleave)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.data);
      action.FETCH_WEEKLEAVE_FAIL({ message: "Uxpected error" });
    }
  }),

  //Number of Task Activites
  livetask: [],
  islivetaskfetching: true,
  CLEAR_LIVETASK: action((state, payload) => {
    state["livetask"] = [];
    state["islivetaskfetching"] = true;
  }),
  FETCH_LIVETASK_START: action((state, payload) => {
    //console.log("successfully sent")
    state["islivetaskfetching"] = true;
  }),
  FETCH_LIVETASK_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["livetask"] = payload;
    state["islivetaskfetching"] = false;
  }),
  FETCH_LIVETASK_FAIL: action((state, payload) => {
    //console.log("errioe")
    state["error"] = payload;
    state["islivetaskfetching"] = false;
  }),
  FETCH_LIVETASK: thunk(async (action, payload) => {
    action.FETCH_LIVETASK_START();
    //console.log(payload)
    try {
      let livetask = await axios.get("/counttask", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (livetask) {
        action.FETCH_LIVETASK_SUCCESS(livetask.data);
        //let resetsent = livetask.data
        //console.log(resetsent.data)
        //console.log(livetask)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.data);
      action.FETCH_LIVETASK_FAIL({ message: "Uxpected error" });
    }
  }),

  //Number of People On Task
  peopleontask: [],
  ispeopleontaskfetching: true,
  CLEAR_PEOPLEONTASK: action((state, payload) => {
    state["peopleontask"] = [];
    state["ispeopleontaskfetching"] = true;
  }),
  FETCH_PEOPLEONTASK_START: action((state, payload,) => {
    //console.log("successfully sent")
    state["ispeopleontaskfetching"] = true;
  }),
  FETCH_PEOPLEONTASK_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["peopleontask"] = payload;
    state["ispeopleonfetching"] = false;
  }),
  FETCH_PEOPLEONTASK_FAIL: action((state, payload) => {
    //console.log("errioe")
    state["error"] = payload;
    state["ispeopleontaskfetching"] = false;
  }),
  FETCH_PEOPLEONTASK: thunk(async (action, payload) => {
    action.FETCH_PEOPLEONTASK_START();
    //console.log(payload)
    try {
      let peopleontask = await axios.get("/counttaskpeople", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (peopleontask) {
        action.FETCH_PEOPLEONTASK_SUCCESS(peopleontask.data);
        //let resetsent = peopleontask.data;
        //console.log(resetsent)
        //console.log(peopleontask)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.data);
      action.FETCH_PEOPLEONTASK_FAIL({ message: "Uxpected error" });
    }
  }),


  // sort task
  postsort: [],
  ispostfetching: true,
  POST_SORT_TASK_REQUEST: action((state, payload,) => {
    //console.log("successfully sent")
    state["Submitt"] = false;
  }),
  POST_SORT_TASK_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["postsort"] = payload;
    state["Submitt"] = true;
    state["ispostfetching"] = true;
  }),
  POST_SORT_TASK_FAIL: action((state, payload) => {
    //console.log("errioe")
    state["Submitt"] = false;

  }),
  POST_SORT_TASK_START: thunk(async (action, payload) => {
    action.POST_SORT_TASK_REQUEST();
    //console.log(payload)
    // let {activityid}=payload;
    try {
      let postSort = await axios.post("/reports/date", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (postSort) {
        action.POST_SORT_TASK_SUCCESS(postSort.data);
        //let resetsent = postSort.data;
        //console.log(resetsent)
        //console.log(postSort.data)
        // //console.log(activityId)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.data);
      action.POST_SORT_TASK_FAIL({ message: "Uxpected error" });
    }
  }),
  // leavaecount dashboard
  leavecountdashboard: [],
  isleavepostfetching: true,
  CLEAR_LEAVECOUNT_DASHBOARD: action((state, payload) => {
    state["leavecountdashboard"] = [];
    state["isleavepostfetching"] = true;

  }),
  LEAVECOUNT_DASHBOARD_START: action((state, payload) => {
    //console.log("successfully sent")
    state["isleavepostfetching"] = true;
  }),
  LEAVECOUNT_DASHBOARD_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["leavecountdashboard"] = payload;
    state["isleavepostfetching"] = false;
    // state["Submitt"] = true;
    // state["ispostfetching"] = true;
  }),
  LEAVECOUNT_DASHBOARD_FAIL: action((state, payload) => {

    state["Submitt"] = false;
    state["isleavepostfetching"] = false;

  }),
  LEAVECOUNT_DASHBOARD: thunk(async (action, payload) => {
    action.LEAVECOUNT_DASHBOARD_START();

    try {
      let leavecountdashboard = await axios.get("/leavecountuser/dashmonthly",
        {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        });
      if (leavecountdashboard) {
        action.LEAVECOUNT_DASHBOARD_SUCCESS(leavecountdashboard.data);
        //let resetsent = postSort.data;
        //console.log(resetsent)
        //console.log(postSort.data)
        // //console.log(activityId)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.data);
      action.LEAVECOUNT_DASHBOARD_FAIL({ message: "Uxpected error" });
    }
  }),

  // leavecount admin
  leavecount: [],

  POST_LEAVECOUNT_REQUEST: action((state, payload,) => {
    //console.log("successfully sent")
    state["Submitts"] = false;
  }),
  POST_LEAVECOUNT_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")
    state["leavecount"] = payload;
    state["Submitts"] = true;
    // state["ispostfetching"] = true;
  }),
  POST_LEAVECOUNT_FAIL: action((state, payload) => {
    //console.log("errioe")
    state["Submitts"] = false;

  }),
  POST_LEAVECOUNT_START: thunk(async (action, payload) => {
    action.POST_LEAVECOUNT_REQUEST();
    //console.log(payload)
    // let {activityid}=payload;
    try {
      let leavecounts = await axios.post("/leavecount/admininput",
        payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (leavecounts) {
        action.POST_LEAVECOUNT_SUCCESS(leavecounts.data);
        //let resetsent = postSort.data;
        //console.log(resetsent)
        //console.log(postSort.data)
        // //console.log(activityId)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.data);
      action.POST_LEAVECOUNT_FAIL({ message: "Uxpected error" });
    }
  }),
  // change role

  isrolepostfetching: true,
  CHANGE_ROLE_REQUEST: action((state, payload,) => {
    //console.log("successfully sent")
    state["Submitt"] = false;
  }),
  CHANGE_ROLE_SUCCESS: action((state, payload,) => {
    //console.log("successfully sent")

    state["Submitt"] = true;
    state["isrolepostfetching"] = true;
  }),
  CHANGE_ROLE_FAIL: action((state, payload) => {
    //console.log("errioe")
    state["Submitt"] = false;

  }),
  CHANGE_ROLE_START: thunk(async (action, payload) => {
    action.CHANGE_ROLE_REQUEST();
    //console.log(payload)
    // let {activityid}=payload;
    try {
      let ChangeRole = await axios.post("/admin/changerole", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (ChangeRole) {
        action.CHANGE_ROLE_SUCCESS(ChangeRole.data);
        // console.log(ChangeRole)
        //console.log(resetsent)
        //console.log(postSort.data)
        // //console.log(activityId)
        //console.log(payload)
      }
    } catch (error) {
      //console.log(error.data);
      action.CHANGE_ROLE_FAIL({ message: "Uxpected error" });
    }
  }),
};