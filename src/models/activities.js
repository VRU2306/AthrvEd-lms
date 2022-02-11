import { thunk, action } from "easy-peasy";
import axios from "axios";
// eslint-disable-next-line
export default {
  isInserting: false,
  isFetching: true,
  isEditing: false,
  activities: [],
  errors: [],

  POST_ACTIVITY_REQUEST: action((state, payload) => {
    state["isInserting"] = payload;
  }),
  EDIT_ACTIVITY_REQUEST: action((state, payload) => {
    state["isEditing"] = payload;
  }),
  FETCH_ACTIVITIES_REQUEST: action((state, payload) => {
    state["isFetching"] = true;
  }),
  POST_ACTIVITY_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["isInserting"] = false;
  }),
  EDIT_ACTIVITY_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["isEditing"] = false;
  }),
  FETCH_ACTIVITIES_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["isFetching"] = false;
  }),
  INSERT_ACTIVITIES: action((state, payload) => {
    state["activities"] = payload;
    state["isInserting"] = false;
    state["isFetching"] = false;
  }),
  POST_ACTIVITY_START: thunk(async (action, payload) => {
    try {
      action.POST_ACTIVITY_REQUEST(true);
      let activities = await axios.post("/admin/activity", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      if (activities) {
        //console.log(activities);
        action.FETCH_ACTIVITIES_START({ type: "A" });
      }
    } catch (error) {
      //console.log(error.response.data);
      action.POST_ACTIVITY_ERROR({
        message: "Unexpected failure, check your network or contact the server",
      });
    }
  }),
  FETCH_ACTIVITIES_START: thunk(async (action, payload) => {
    try {
      let { type } = payload;
      action.FETCH_ACTIVITIES_REQUEST(true);
      //console.log(localStorage.getItem("token"));
      let activities;
      if (type !== "A")
        activities = await axios.get("/reports/activity/", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
      else {
        activities = await axios.get("/admin/activity/incomplete", {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        });
        activities.data = activities.data.incompleteActivity;
      }

      console.log(activities);
      console.log(type);
      action.INSERT_ACTIVITIES(activities.data);
    } catch (error) {
      //console.log(error);
      action.FETCH_ACTIVITIES_ERROR({
        message: "Unexpected failure, check your network or contact the server",
      });
    }
  }),
  EDIT_ACTIVITY_START: thunk(async (action, payload) => {
    try {
      action.EDIT_ACTIVITY_REQUEST(true);
      let activities = await axios.put("/api/activity", payload, {
        headers: { "x-auth-token": localStorage.getItem("token") },
      });
      action.INSERT_ACTIVITIES(activities);
    } catch (error) {
      //console.log(error.response.data);
      action.EDIT_ACTIVITY_ERROR({
        message: "Unexpected failure, check your network or contact the server",
      });
    }
  }),

  isTaskFetching: true,
  isTaskEditing: false,
  reason: [],

  INSERT_TRANSFERTASK: action((state, payload) => {
    state["isTaskFetching"] = false;
    state["reason"] = payload;
  }),


  FETCH_TRANSFERTASK_REQUEST: action((state, payload) => {
    state["isTaskFetching"] = true;
  }),

  FETCH_TRANSFERTASK_ERROR: action((state, payload) => {
    state["isTaskFetching"] = false;
    state["isTaskEditing"] = false;
    // state["success"] = false;
    // state["fail"] = true;
  }),
  FETCH_TRANSFERTASK_SUCCESS: action((state, payload) => {
    state["isTaskEditing"] = false;
    state["success"] = true;
    state["fail"] = false;
  }),

  FETCH_TRANSFERTASK_START: thunk(async (action, payload) => {
    action.FETCH_TRANSFERTASK_REQUEST();

    try {

      let transfer = await axios.get("/task/viewtransfer", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      if (transfer) {
        //console.log(transfer);
        action.INSERT_TRANSFERTASK(transfer.data);

      }
    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_TRANSFERTASK_ERROR({ message: "Unexpected server error" });
    }
  }),
  POST_TRANSFERTASK_REQUEST: action((state, payload) => {
    state["isTaskEditing"] = payload;
    state["isTaskFetching"] = true;
    state["isTaskEditing"] = true;
    state["success"] = false;

  }),
  POST_TRANSFERTASK_SUCCESS: action((state, payload) => {
    state["isTaskFetching"] = false;
    state["isTaskEditing"] = false;
    state["success"] = true;
    state["fail"] = false;
  }),
  POST_TRANSFERTASK_ERROR: action((state, payload) => {
    state["isTaskEditing"] = false;
    state["isTaskFetching"] = false;
    state["fail"] = true;
    state["success"] = false;

  }),
  POST_TRANSFERTASK_START: thunk(async (action, payload) => {
    action.POST_TRANSFERTASK_REQUEST();
    let { activityid, user_id } = payload;

    //console.log(payload);
    try {
      let transfer = await axios.post("/task/transfertask", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      if (transfer) {
        //console.log(transfer);
        action.FETCH_TRANSFERTASK_START({ activityid, user_id });
        action.POST_TRANSFERTASK_SUCCESS();

      }
    } catch (error) {
      //console.log(error);
      action.POST_TRANSFERTASK_ERROR({ message: "Uxpected error" });
    }
  }),
  UPDATE_TRANSFERTASK_REQUEST: action((state, payload) => {
    state["isTaskEditing"] = true;
    state["isTaskFetching"] = true;
  }),
  UPDATE_TRANSFERTASK_SUCCESS: action((state, payload) => {
    state["isTaskEditing"] = false;
    state["isTaskFetching"] = false;
  }),
  UPDATE_TRANSFERTASK_FAIL: action((state, payload) => {
    state["isTaskEditing"] = false;
  }),
  UPDATE_TRANSFERTASK_START: thunk(async (action, payload) => {
    action.UPDATE_TRANSFERTASK_REQUEST();
    try {

      console.log(payload)

      let reason = await axios.post("/task/accepttransfer", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      console.log(reason);
      if (reason) {
        action.FETCH_TRANSFERTASK_START();
        action.FETCH_TRANSFER_NOTES_START();
      }

    } catch (error) {
      //console.log(error);
      action.POST_TRANSFERTASK_ERROR({ message: "Unexpected server error" });
    }
  }),

  isTasknotesLoading: false,
  isTasknotesFetching: true,
  isTasknotesEditing: false,
  tasktransferNotes: [],

  INSERT_TRANSFER_NOTES: action((state, payload) => {
    state["isTasknotesFetching"] = false;
    state["tasktransferNotes"] = payload;
  }),


  FETCH_TRANSFER_NOTES_REQUEST: action((state, payload) => {
    state["isTasknotesFetching"] = true;
    state["isTasknotesLoading"] = true;
  }),

  FETCH_TRANSFER_NOTES_ERROR: action((state, payload) => {
    state["isTasknotesFetching"] = false;
    state["isTasknotesEditing"] = false;
    state["isTasknotesLoading"] = false;

  }),
  FETCH_TRANSFER_NOTES_SUCCESS: action((state, payload) => {
    state["isTasknotesEditing"] = false;
    state["success"] = true;
    state["isTasknotesLoading"] = false;
    state["fail"] = false;
  }),

  FETCH_TRANSFER_NOTES_START: thunk(async (action, payload) => {
    action.FETCH_TRANSFER_NOTES_REQUEST();
    try {

      let notes = await axios.get("/task/transfernotes", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      if (notes) {
        //console.log(notes);
        action.INSERT_TRANSFER_NOTES(notes.data);

      }
    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_TRANSFER_NOTES_ERROR({ message: "Unexpected server error" });
    }
  }),


  isExtendFetching: true,
  isExtendEditing: false,
  deadlineReason: [],

  INSERT_EXTENDDEADLINE: action((state, payload) => {
    state["isExtendFetching"] = false;
    state["deadlineReason"] = payload;
  }),


  FETCH_EXTENDDEADLINE_REQUEST: action((state, payload) => {

  }),

  FETCH_EXTENDDEADLINE_ERROR: action((state, payload) => {


  }),



  FETCH_EXTENDDEADLINE_START: thunk(async (action, payload) => {
    action.FETCH_EXTENDDEADLINE_REQUEST();

    try {

      let transfer = await axios.get("/viewdeadline", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      if (transfer) {
        //console.log(transfer);
        action.INSERT_EXTENDDEADLINE(transfer.data);

      }
    } catch (error) {
      //console.log(error.data);
      action.FETCH_EXTENDDEADLINE_ERROR({ message: "Unexpected server error" });
    }
  }),
  POST_EXTENDDEADLINE_REQUEST: action((state, payload) => {
    state["isExtendFetching"] = true;
    state["isExtendEditing"] = true;
    state["successful"] = false;
  }),

  POST_EXTENDDEADLINE_SUCCESS: action((state, payload) => {
    state["isExtendEditing"] = false;
    state["successful"] = true;
    state["failure"] = false;

  }),

  POST_EXTENDDEADLINE_ERROR: action((state, payload) => {
    state["isExtendEditing"] = false;
    state["successful"] = false;
    state["failure"] = true;

  }),

  POST_EXTENDDEADLINE_START: thunk(async (action, payload) => {

    action.POST_EXTENDDEADLINE_REQUEST();
    //console.log(payload);
    try {
      let transfer = await axios.post("/userdeadlinerequest", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      if (transfer) {
        //console.log(transfer);
        action.FETCH_EXTENDDEADLINE_START();
        action.POST_EXTENDDEADLINE_SUCCESS();

      }
    } catch (error) {
      //console.log(error);
      action.POST_EXTENDDEADLINE_ERROR({ message: "Uxpected error" });
    }
  }),

  POST_EXTENDDATE_REQUEST: action((state, payload) => {
    //console.log("request")
    state["isExtendFetching"] = true;
  }),
  POST_EXTENDDATE_SUCCESS: action((state, payload) => {
    state["isExtendFetching"] = false;
    //console.log("successsss")
  }),
  POST_EXTENDDATE_FAIL: action((state, payload) => {
    state["isExtendFetching"] = false;
    //console.log("error")
  }),

  POST_EXTENDDATE_START: thunk(async (action, payload) => {
    action.POST_EXTENDDATE_REQUEST();
    //console.log(payload);
    try {
      let extdate = await axios.post("/deadline_extend", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      if (extdate) {
        //console.log(extdate);
        action.FETCH_EXTENDDEADLINE_START();
        action.POST_EXTENDDATE_SUCCESS();


      }
    } catch (error) {
      //console.log(error);
      action.POST_EXTENDDATE_FAIL({ message: "Uxpected error" });
    }
  }),
  // fetch team counts
  isTeamcountfetching: true,
  teamcount: [],
  CLEAR_TEAMCOUNT: action((state, payload) => {
    state["isTeamcountfetching"] = true;
    state["teamcount"] = [];
  }),
  FETCH_TEAMCOUNT_START: action((state, payload) => {
    state["isTeamcountfetching"] = true;
  }),

  FETCH_TEAMCOUNT_SUCCESS: action((state, payload) => {
    state["isTeamcountfetching"] = false;
    state["teamcount"] = payload;
  }),
  FETCH_TEAMCOUNT_ERROR: action((state, payload) => {
    state["isTeamcountfetching"] = false;
    state['error'] = payload;

  }),


  FETCH_TEAMCOUNT: thunk(async (action, payload) => {
    action.FETCH_TEAMCOUNT_START(true);
    try {
      let teamcount = await axios.get("/admin/activity/teamcount", {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      if (teamcount) {
        //console.log(teamcount);
        action.FETCH_TEAMCOUNT_SUCCESS(teamcount.data);

      }
    } catch (error) {
      //console.log(error.data);
      action.FETCH_TEAMCOUNT_ERROR({ message: "Unexpected server error" });
    }
  }),
};
