import { action, thunk } from "easy-peasy";
import axios from "axios";
// eslint-disable-next-line
export default {
  isFetching: true,
  isInserting: false,
  submit: false,
  managementsubmit: false,
  productsubmit: false,
  softwaresubmit: false,
  prefinalsubmit: false,
  isManagementInserting: false,
  isSoftwareInserting: false,
  isProductInserting: false,
  isPrefinalyearsinserting: false,
  errors: [],
  data: [],



  POST_FORM1_REQUEST: action((state, payload) => {
    state["isInserting"] = true;

  }),
  POST_FORM1_SUCCESS: action((state, payload) => {
    state["isInserting"] = false;
    state["isFetching"] = true;
    state["submit"] = true;
    state["data"] = payload
  }),
  POST_FORM1_FAIL: action((state, payload) => {
    state["errors"] = payload;
    state["isInserting"] = false;
  }),
  POST_FORM1_START: thunk(async (action, payload) => {
    action.POST_FORM1_REQUEST();
    //////console.log(payload)
    try {
      let form1 = await axios.post("/form/page1", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      console.log(form1)
      if (form1) {
        action.POST_FORM1_SUCCESS(payload);
        console.log(form1)
      }
    } catch (error) {
      //////console.log(error.response.data);
      action.POST_FORM1_FAIL({ message: "Uxpected error" });
    }
  }),

  POST_MANAGEMENT_REQUEST: action((state, payload) => {
    state["isManagementInserting"] = true;

  }),
  POST_MANAGEMENT_SUCCESS: action((state, payload) => {
    state["isManagementInserting"] = false;
    state["isFetching"] = true;
    state["managementsubmit"] = true;
    state["submit"] = false;
  }),
  POST_MANAGEMENT_FAIL: action((state, payload) => {
    state["errors"] = payload;
    state["isManagementInserting"] = false;
    state["submit"] = false;
  }),
  POST_MANAGEMENT_START: thunk(async (action, payload) => {
    action.POST_MANAGEMENT_REQUEST();
    //////console.log(payload)
    try {
      let product = await axios.post("/form/page2management", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (product) {
        action.POST_MANAGEMENT_SUCCESS();
      }
    } catch (error) {
      //////console.log(error.response.data);
      action.POST_MANAGEMENT_FAIL({ message: "Uxpected error" });
    }
  }),

  POST_SOFTWARE_REQUEST: action((state, payload) => {
    state["isSoftwareInserting"] = true;

  }),
  POST_SOFTWARE_SUCCESS: action((state, payload) => {
    state["isSoftwareInserting"] = false;
    state["isFetching"] = true;
    state["softwaresubmit"] = true;
    state["submit"] = false;
  }),
  POST_SOFTWARE_FAIL: action((state, payload) => {
    state["errors"] = payload;
    state["isSoftwareInserting"] = false;
    state["submit"] = false;
  }),
  POST_SOFTWARE_START: thunk(async (action, payload) => {
    action.POST_SOFTWARE_REQUEST();
    //////console.log(payload)
    try {
      let product = await axios.post("/form/page3software", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (product) {
        action.POST_SOFTWARE_SUCCESS();
      }
    } catch (error) {
      //////console.log(error.response.data);
      action.POST_SOFTWARE_FAIL({ message: "Uxpected error" });
    }
  }),

  POST_PRODUCT_REQUEST: action((state, payload) => {
    state["isProductInserting"] = true;

  }),
  POST_PRODUCT_SUCCESS: action((state, payload) => {
    state["isProductInserting"] = false;
    state["isFetching"] = true;
    state["productsubmit"] = true;
    state["submit"] = false;
  }),
  POST_PRODUCT_FAIL: action((state, payload) => {
    state["errors"] = payload;
    state["isProductInserting"] = false;
  }),
  POST_PRODUCT_START: thunk(async (action, payload) => {
    action.POST_PRODUCT_REQUEST();
    //////console.log(payload)
    try {
      let product = await axios.post("/form/page4", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (product) {
        action.POST_PRODUCT_SUCCESS();
      }
    } catch (error) {
      //////console.log(error.response.data);
      action.POST_PRODUCT_FAIL({ message: "Uxpected error" });
    }
  }),


  POST_PREFINAL_REQUEST: action((state, payload) => {
    state["isPrefinalyearsinserting"] = true;

  }),
  POST_PREFINAL_SUCCESS: action((state, payload) => {
    state["isPrefinalyearsinserting"] = false;
    state["isFetching"] = true;
    state["prefinalsubmit"] = true;
    state["submit"] = false;
  }),
  POST_PREFINAL_FAIL: action((state, payload) => {
    state["errors"] = payload;
    state["isPrefinalyearsinserting"] = false;
    state["submit"] = false;
  }),
  POST_PREFINAL_START: thunk(async (action, payload) => {
    action.POST_PREFINAL_REQUEST();
    try {
      let product = await axios.post("/form/page5prefinalyears", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (product) {
        action.POST_PREFINAL_SUCCESS();
      }
    } catch (error) {
      //////console.log(error.response.data);
      action.POST_PREFINAL_FAIL({ message: "Uxpected error" });
    }
  }),

  notfilled: [],
  isNotfilledFetching: true,

  INSERT_NOTFILLED_FORMS: action((state, payload) => {
    state["isNotfilledFetching"] = false;
    state["notfilled"] = payload;
  }),

  FETCH_NOTFILLED_FORMS_REQUEST: action((state, payload) => {
    state["isNotfilledFetching"] = true;
  }),
  FETCH_NOTFILLED_FORMS_SUCCESS: action((state, payload) => {
    state["ffailures"] = false;
    state["Successulslsubmit"] = true;
  }),
  FETCH_NOTFILLED_FORMS_ERROR: action((state, payload) => {
    state["isNotfilledFetching"] = false;
    state["ffailures"] = true;
    state["Successulslsubmit"] = false;
  }),
  FETCH_NOTFILLED_FORMS_START: thunk(async (action, payload) => {
    action.FETCH_NOTFILLED_FORMS_REQUEST();
    //////console.log(payload)
    try {
      let notfilled = await axios.post("/notfilled", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });

      if (notfilled) {
        ////console.log(notfilled.data);
        action.INSERT_NOTFILLED_FORMS(notfilled.data);
      }
    } catch (error) {
      ////console.log(error.response.data);
      action.FETCH_NOTFILLED_FORMS_ERROR({ message: "Unexpected server error" });
    }
  }),

  workhours: [],
  isWorkHoursFetching: true,

  INSERT_WORKHOURS: action((state, payload) => {
    state["isWorkHoursFetching"] = false;
    state["workhours"] = payload;
    ////console.log(payload)
  }),

  FETCH_WORKHOURS_REQUEST: action((state, payload) => {
    state["isWorkHoursFetching"] = true;
  }),
  FETCH_WORKHOURS_ERROR: action((state, payload) => {
    state["isWorkHoursFetching"] = false;
  }),
  FETCH_WORKHOURS_START: thunk(async (action, payload) => {
    action.FETCH_WORKHOURS_REQUEST();
    ////console.log(payload)
    try {
      let workhours = await axios.post("/works", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });

      if (workhours) {
        ////console.log(workhours.data);
        action.INSERT_WORKHOURS(workhours.data);
      }
    } catch (error) {
      action.FETCH_WORKHOURS_ERROR({ message: "Unexpected server error" });
    }
  }),

  isNotifyInserting: false,

  POST_NOTIFY_REQUEST: action((state, payload) => {
    state["isNotifyInserting"] = true;
    state["success"] = false;
  }),
  POST_NOTIFY_SUCCESS: action((state, payload) => {
    state["isFetching"] = true;
    state["isNotifyInserting"] = false;
    state["success"] = true;
    state["fail"] = false;
  }),
  POST_NOTIFY_FAIL: action((state, payload) => {
    state["errors"] = payload;
    state["isNotifyInserting"] = false;
    state["success"] = false;
    state["fail"] = true;
  }),
  POST_NOTIFY_START: thunk(async (action, payload) => {
    action.POST_NOTIFY_REQUEST();
    ////console.log(payload)
    try {
      let product = await axios.post("/sendmail", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (product) {
        ////console.log(product);
        action.POST_NOTIFY_SUCCESS();
      }
    } catch (error) {
      ////console.log(error.response.data);
      action.POST_NOTIFY_FAIL({ message: "Uxpected error" });
    }
  }),
  // USER LEAVE COUNT
  leavecountuser: [],

  LEAVECOUNT_USER: action((state, payload) => {
    state["leavecountuser"] = payload;
    state["successs"] = true;
    state["fails"] = false;
  }),


  LEAVECOUNT_USER_FAIL: action((state, payload) => {
    ////console.log("error")
    state["successs"] = false;
    state["fails"] = true;
  }),

  LEAVECOUNT_USER_START: thunk(async (action, payload) => {
    ////console.log(payload);
    try {
      let lcountuser = await axios.post("/leavecountuser/countperiod", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      if (lcountuser) {
        ////console.log(lcountyr);
        action.LEAVECOUNT_USER(lcountuser.data);
        // console.log(lcountuser)
      }
    } catch (error) {
      ////console.log(error);
      action.LEAVECOUNT_USER_FAIL({ message: "Uxpected error" });
    }

  }),


};