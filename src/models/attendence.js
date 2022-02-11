import { thunk, action } from "easy-peasy";
import axios from "axios";
// eslint-disable-next-line
export default {
  isFetching: true,
  attendence: [],
  errors: [],

  INSERT_ATTENDENCE: action((state, payload) => {
    payload = payload.map(item => {
      let correctDate = new Date(item.date);
      //console.log(correctDate.toLocaleDateString());
      item.date = correctDate.toLocaleDateString();
      item.details = [];
      item.total = 3 * 60 * 60;
      return item;
    });
    state["attendence"] = payload;
    state["isFetching"] = false;
    state["isLeavesFetching"] = false;
  }),
  FETCH_ATTENDENCE_REQUEST: action((state, payload) => {
    state["isFetching"] = true;
  }),
  FETCH_ATTENDENCE_ERROR: action((state, payload) => {
    state["errors"] = payload;
    state["isFetching"] = false;
  }),
  FETCH_ATTENDENCE_START: thunk(async (action, payload) => {
    try {
      action.FETCH_ATTENDENCE_REQUEST();

      let attendence = await axios.get("/calender/info", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(attendence);
      action.INSERT_ATTENDENCE(attendence.data);
    } catch (error) {
      //console.log(error);
      action.FETCH_ATTENDENCE_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),
  isLeaveEditing: false,
  isLeaveFetching: true,
  leaveNotes: [],

  INSERT_LEAVE_NOTES: action((state, payload) => {
    state["isLeaveFetching"] = false;
    state["leaveNotes"] = payload;

  }),
  POST_LEAVE_NOTE_REQUEST: action((state, payload) => {
    state["isLeaveEditing"] = true;
  }),
  POST_LEAVE_NOTE_ERROR: action((state, payload) => {
    state["isLeaveEditing"] = false;
  }),
  FETCH_LEAVE_NOTES_REQUEST: action((state, payload) => {
    state["isLeaveFetching"] = true;
  }),
  FETCH_LEAVE_NOTES_ERROR: action((state, payload) => {
    state["isLeaveFetching"] = false;
  }),
  FETCH_LEAVE_NOTES_START: thunk(async (action, payload) => {
    action.FETCH_LEAVE_NOTES_REQUEST();
    try {
      let leave = await axios.get("/leaves/view", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });

      if (leave) {
        //console.log(leave);
        action.INSERT_LEAVE_NOTES(leave.data);
      }
    } catch (error) {
      //console.log(error.data);
      action.FETCH_LEAVE_NOTES_ERROR({ message: "Unexpected server error" });
    }
  }),

  POST_LEAVE_NOTE_START: thunk(async (action, payload) => {
    let { user_id, type } = payload;
    delete payload.type;
    action.POST_LEAVE_NOTE_REQUEST();
    //console.log(payload);
    try {
      let leave = await axios.post("/leaves/insert", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (leave) {
        //console.log(leave);
        action.FETCH_LEAVE_NOTES_START({ user_id, type });
      }
      // setTimeout(() => action.FETCH_LEAVE_NOTES_START({ user_id, type }), 3000);
    } catch (err) {
      //console.log(err);
      action.POST_LEAVE_NOTE_ERROR({ message: "Unexpected server error" });
    }
  }),
  isLeavessFetching: true,
  isLeavesEditing: false,
  RevokeNote: [],
  CLEAR_REVOKE: action((state, payload) => {
    state["isLeavessFetching"] = true;
    state["RevokeNote"] = [];
  }),
  INSERT_REVOKE_NOTES: action((state, payload) => {
    state["isLeavessFetching"] = false;
    state["RevokeNote"] = payload;
  }),

  POST_REVOKE_LEAVE_ERROR: action((state, payload) => {
    state["isLeavesEditing"] = false;
  }),
  POST_REVOKE_LEAVE_REQUEST: action((state, payload) => {
    state["isLeavesEditing"] = true;
    // state["isLeavessFetching"] = true;
  }),
  FETCH_REVOKE_NOTES_REQUEST: action((state, payload) => {
    state["isLeavessFetching"] = true;
  }),
  FETCH_REVOKE_NOTES_ERROR: action((state, payload) => {
    state["isLeavessFetching"] = false;
  }),
  FETCH_REVOKE_NOTES_START: thunk(async (action, payload) => {
    action.FETCH_REVOKE_NOTES_REQUEST();
    //console.log("hioi")
    try {
      let leavess = await axios.get("/leaves/viewrevokedleaves", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      console.log(leavess)

      if (leavess) {
        // console.log(leavess);
        //console.log("hellooo")
        action.INSERT_REVOKE_NOTES(leavess.data);
      }
    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_REVOKE_NOTES_ERROR({ message: "Unexpected server error" });
    }
  }),
  UPDATE_LEAVE_NOTE_REQUEST: action((state, payload) => {
    state["isLeaveEditing"] = true;
  }),
  UPDATE_LEAVE_NOTE_SUCCESS: action((state, payload) => {
    state["isLeaveEditing"] = false;
    state["isLeaveFetching"] = true;
  }),
  UPDATE_LEAVE_NOTE_FAIL: action((state, payload) => {
    state["isLeaveEditing"] = false;
  }),
  UPDATE_LEAVE_NOTE_START: thunk(async (action, payload) => {
    try {
      action.UPDATE_LEAVE_NOTE_REQUEST();
      //console.log(payload)

      let leaveNotes = await axios.post("/leaves/adminupdate", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(leaveNotes);
      if (leaveNotes) action.FETCH_LEAVE_NOTES_START();
    } catch (error) {
      //console.log(error);
      action.POST_LEAVE_NOTE_ERROR({ message: "Unexpected server error" });
    }
  }),
  // upload csv extra if the code written in jsx page dosent work this can be used 
  isUploading: false,

  UPLOAD_FILE_REQUEST: action((state, payload) => {
    state["isUploading"] = true;
    state["success"] = false;
  }),

  UPLOAD_FILE_SUCCESS: action((state, payload) => {
    state["isUploading"] = false;
    state["isFetching"] = true;
    state["success"] = true;
    state["fail"] = false;
  }),
  UPLOAD_FILE_FAIL: action((state, payload) => {
    state["isUploading"] = false;
    state["errors"] = payload;
    state["success"] = false;
    state["fail"] = true;
  }),



  UPLOAD_FILE_START: thunk(async (action, payload) => {
    action.UPLOAD_FILE_REQUEST();
    try {
      let formData = new FormData();
      //console.log(payload);
      formData.append("myFile", payload);
      let activity = await axios.post("/uploadfile", formData, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (activity) {
        // console.log(activity);
        action.FETCH_ATTENDENCE_START();
        action.UPLOAD_FILE_SUCCESS();
      }
    } catch (error) {
      //console.log(error.response);
      action.POST_LEAVE_NOTE_ERROR({ message: "Unexpected server" });
      action.UPLOAD_FILE_FAIL({ message: "Uxpected error" });
    }
  }),
  REVOKE_LEAVE_NOTE_REQUEST: action((state, payload) => {
    //console.log("request")
  }),
  REVOKE_LEAVE_NOTE_SUCCESS: action((state, payload) => {

    //console.log("successsss")
  }),
  REVOKE_LEAVE_NOTE_FAIL: action((state, payload) => {
    //console.log("error")
  }),
  REVOKE_LEAVE_NOTE_START: thunk(async (action, payload) => {
    action.REVOKE_LEAVE_NOTE_REQUEST();
    try {

      //console.log(payload)

      let leaveNoteas = await axios.post("/leaves/leaverevoke", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });

      //console.log(leaveNoteas);
      if (leaveNoteas) action.FETCH_LEAVE_NOTES_START(leaveNoteas);
    } catch (error) {
      //console.log(error);
      action.POST_LEAVE_NOTE_ERROR({ message: "Unexpected server error" });
    }
  }),


  UPDATE_REVOKE_NOTES_REQUEST: action((state, payload) => {
    state["isLeavesEditing"] = true;
    state["isLeavessFetching"] = true;
  }),
  UPDATE_REVOKE_NOTES_SUCCESS: action((state, payload) => {
    state["isLeavesEditing"] = false;

  }),
  UPDATE_REVOKE_NOTES_FAIL: action((state, payload) => {
    state["isLeavesEditing"] = false;
  }),
  UPDATE_REVOKE_NOTES_START: thunk(async (action, payload) => {
    action.UPDATE_REVOKE_NOTES_REQUEST();
    try {

      let RevokeNotes = await axios.post("/leaves/adminrevokeupdate", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(RevokeNotes);
      // if (RevokeNotes) action.UPDATE_REVOKE_NOTES_START(RevokeNotes)
      // if (RevokeNotes) action.UPDATE_REVOKE_NOTES_START(RevokeNotes)
    } catch (error) {
      //console.log(error);
      action.UPDATE_REVOKE_NOTES_FAIL({ message: "Unexpected server error" });
    }
  }),

};
