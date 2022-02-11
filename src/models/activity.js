import { thunk, action } from "easy-peasy";
import axios from "axios";
// eslint-disable-next-line
export default {

  isInserting: false,
  isFetching: true,
  isNameInserting: false,
  isNameFetching: true,
  isEditing: false,
  tasks: [],
  errors: [],
  title: [],


  CLEAR_TASKS: action((state, payload) => {
    state["tasks"] = [];
    state["isFetching"] = true;
  }),
  POST_TASK_REQUEST: action((state, payload) => {
    state["isInserting"] = payload;
    state["isFetching"] = true;
  }),
  POST_UPDATETASK_REQUEST: thunk(async (state, payload) => {
    state["isInserting"] = payload;
    state["isFetching"] = true;

  }),
  EDIT_TASK_REQUEST: action((state, payload) => {
    state["isEditing"] = payload;
  }),
  FETCH_TASKS_REQUEST: action((state, payload) => {
    state["isFetching"] = payload;
    state["isFetching"] = true;

  }),
  FETCH_USER_TASKS_REQUEST: action((state, payload) => {
    state["isFetching"] = payload;
    state["isFetching"] = true;

  }),

  POST_TASK_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["isInserting"] = false;
  }),
  EDIT_TASK_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["isEditing"] = false;
  }),
  FETCH_TASKS_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["isFetching"] = false;
  }),
  INSERT_TASKS: action((state, payload) => {
    state["tasks"] = payload;
    state["isInserting"] = false;
    state["isFetching"] = false;
  }),

  POST_TASK_START: thunk(async (action, payload) => {
    try {
      // eslint-disable-next-line
      let { report, progressInfo, user_id } = payload;
      let { activityid } = report;
      action.POST_TASK_REQUEST(true);

      ////console.log("This is inside the model")
      ////console.log(report)
      let task = await axios.post("/reports", report, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (task) {
        progressInfo.reportId = task.data.reportid;
        let progress = await axios.post(`/reports/task`, progressInfo, {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        });
        if (progress) {
          action.FETCH_TASKS_START({ activityId: activityid });
          action.FETCH_USER_NAME_START({ activityId: activityid });
        }
      }
    } catch (error) {
      //console.log(error.response.data);
      action.POST_TASK_ERROR({
        message: "Unexpected failure,check your network or contact the server"
      });
    }
  }),

  POST_UPDATETASK_SUCCESS: thunk(async (state, payload) => {

  }),

  POST_UPDATETASK_START: thunk(async (action, payload) => {
    action.POST_UPDATETASK_REQUEST(true);

    let { activityid } = payload
    //console.log(payload);
    try {
      let task = await axios.post(`/reports/updatetask`, payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      if (task) {
        action.FETCH_USER_TASK_START({ activityId: activityid });
        //console.log(task)
        //console.log(payload)

      }
    } catch (error) {
      //console.log(error)

      action.FETCH_TASKS_ERROR({ message: "Uxpected error" })
    }
  }),

  FETCH_TASKS_START: thunk(async (action, payload) => {
    action.FETCH_TASKS_REQUEST(true);
    try {
      let { activityId } = payload;
      let tasks = await axios.get(`/reports/${activityId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(activityId);
      //console.log(tasks);
      action.INSERT_TASKS(tasks.data);
    } catch (error) {
      //console.log(error.response.data);

      action.FETCH_TASKS_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),

  FETCH_USER_TASK_START: thunk(async (action, payload) => {
    action.FETCH_USER_TASKS_REQUEST(true);
    try {
      let { activityId } = payload;
      let tasks = await axios.get(`/task/usertaskview/${activityId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(activityId);
      //console.log(tasks);
      action.INSERT_TASKS(tasks.data);
    } catch (error) {
      //console.log(error.response);

      action.FETCH_TASKS_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),


  EDIT_TASK_START: thunk(async (action, payload) => {
    action.EDIT_TASK_REQUEST(true);
    try {
      let { activity_id } = payload;

      let tasks = await axios.put("/api/task", payload, {
        headers: { "x-auth-token": localStorage.getItem("token") }
      });
      if (tasks) {
        action.FETCH_TASKS_START({ activity_id });
      }
    } catch (error) {
      //console.log(error.response);

      action.EDIT_TASK_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),

  DELETE_TASK_START: thunk(async (action, payload) => {
    action.EDIT_TASK_REQUEST(true);
    try {
      let { report_id, activity_id, task_description, user_id } = payload;

      let tasks = await axios.delete(
        `/reports/task/${report_id}/date/${task_description}/user/${user_id}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        }
      );
      if (tasks) {
        action.FETCH_TASKS_START({ activityId: activity_id });
        //console.log(tasks)
        //console.log(payload)
        //console.log(action.FETCH_TASKS_START({ activityId: activity_id }))
      }
    } catch (error) {

      //console.log(
      //   error ? (error.response ? error.response.data : error) : error
      // );
      //console.log(error)
      action.EDIT_TASK_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),

  isAddFetching: true,
  isAddmemberinserting: false,

  POST_ADD_MEMBER_REQUEST: action((state, payload) => {
    state["isAddFetching"] = true;
    state["isAddmemberinserting"] = true;
    state["successful"] = false;
  }),
  POST_ADD_MEMBER_SUCCESS: action((state, payload) => {
    state["isAddFetching"] = false;
    state["isAddmemberinserting"] = false;
    state["successful"] = true;
    state["failure"] = false;
  }),
  POST_ADD_MEMBER_FAIL: action((state, payload) => {
    state["isAddFetching"] = false;
    state["isAddmemberinserting"] = false;
    state["successful"] = false;
    state["failure"] = true;
  }),

  POST_ADD_MEMBER_START: thunk(async (action, payload) => {
    action.POST_ADD_MEMBER_REQUEST();
    let { activityid } = payload;
    //console.log(payload);
    try {
      let addmember = await axios.post(`/admin/addactivity/${activityid}`, payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      })
      if (addmember) {
        //console.log(addmember);
        action.FETCH_USER_NAME_START({ activityId: activityid });
        action.POST_ADD_MEMBER_SUCCESS();
        // action.SET_RELOAD(true);
        window.location.reload();
        // window.location.href=`/main/activity/${activityid}`

      }
    } catch (error) {
      //console.log(error);
      action.POST_ADD_MEMBER_FAIL({ message: "Uxpected error" });
    }
  }),

  isRemoveFetching: true,
  isRemovememberinserting: false,

  REMOVE_MEMBER_REQUEST: action((state, payload) => {

    state["isRemoveFetching"] = true;
  }),
  REMOVE_MEMBER_SUCCESS: action((state, payload) => {
    state["isRemoveFetching"] = false;
  }),
  REMOVE_MEMBER_FAIL: action((state, payload) => {
    state["isRemoveFetching"] = false;
  }),
  REMOVE_MEMBER_START: thunk(async (action, payload) => {
    action.REMOVE_MEMBER_REQUEST();
    let { activityid, user_id } = payload;
    try {
      let remove = await axios.delete(`/admin/deletemember/${activityid}/${user_id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      if (remove) {

        action.FETCH_USER_NAME_START({ activityId: activityid });

        action.REMOVE_MEMBER_SUCCESS(remove.data);
        // action.SET_RELOAD(true);
        window.location.reload();
        // window.location.href=`/main/activity/${activityid}`
        //console.log(payload)
        //console.log(remove)

      }
    } catch (error) {
      //console.log(error);
      action.REMOVE_MEMBER_FAIL({ message: "Uxpected error" });
    }
  }),
  names: [],
  isnamesFetching: false,
  FETCH_USER_NAME_REQUEST: action((state, payload) => {
    state["isnamesFetching"] = true;
    state["isNameFetching"] = payload;
  }),

  INSERT_USER_NAME_TASKS: action((state, payload) => {
    state["names"] = payload;
    state["isNameInserting"] = false;
    state["isNameFetching"] = false;
  }),

  FETCH_USER_NAME_SUCCESS: action((state, payload) => {
    state["isRemoveFetching"] = false;
    state["isnamesFetching"] = false;
    state["isNameFetching"] = true;
  }),
  FETCH_USER_NAME_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["isnamesFetching"] = false;
    state["isNameFetching"] = false;
  }),

  FETCH_USER_NAME_START: thunk(async (action, payload) => {
    action.FETCH_USER_NAME_REQUEST(true);
    try {
      let { activityid } = payload;
      let names = await axios.get(`/admin/activitymembers/${activityid}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(activityId);
      // console.log(names);
      action.INSERT_USER_NAME_TASKS(names.data);
      action.FETCH_USER_NAME_SUCCESS();

    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_USER_NAME_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),
  //fetch people on task
  ispepontaskFetching: false,

  FETCH_PEOPLEONTASK_REQUEST: action((state, payload) => {
    state["ispepontaskFetching"] = true;
    state["isFetching"] = payload;
  }),

  INSERT_PEOPLEONTASK: action((state, payload) => {
    state["pepontask"] = payload;
    state["isNameInserting"] = false;
    state["isFetching"] = false;
  }),

  FETCH_PEOPLEONTASK_SUCCESS: action((state, payload) => {

    state["ispepontaskFetching"] = false;

  }),
  FETCH_PEOPLEONTASK_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["ispepontaskFetching"] = false;
    state["isFetching"] = false;
  }),

  FETCH_PEOPLEONTASK_START: thunk(async (action, payload) => {
    action.FETCH_PEOPLEONTASK_REQUEST(true);
    try {
      let { activityid } = payload;
      let pepontask = await axios.get(`/counttaskpeople/${activityid}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(activityid);
      //console.log(pepontask);
      action.INSERT_PEOPLEONTASK(pepontask.data.count);
      action.FETCH_PEOPLEONTASK_SUCCESS();

    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_PEOPLEONTASK_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),
  // tomorrowleave
  istommleavetaskFetching: false,

  FETCH_TASKTOMORROWLEAVE_REQUEST: action((state, payload) => {
    state["istommleavetaskFetching"] = true;
    state["isFetching"] = payload;
  }),

  INSERT_TOMORROWLEAVE: action((state, payload) => {
    state["tomorrowleavetask"] = payload;
    state["isNameInserting"] = false;
    state["isFetching"] = false;
  }),

  FETCH_TASKTOMORROWLEAVE_SUCCESS: action((state, payload) => {

    state["istommleavetaskFetching"] = false;

  }),
  FETCH_TASKTOMORROWLEAVE_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["istommleavetaskFetching"] = false;
    state["isFetching"] = false;
  }),

  FETCH_TASKTOMORROWLEAVE_START: thunk(async (action, payload) => {
    action.FETCH_TASKTOMORROWLEAVE_REQUEST(true);
    try {
      let { activityid } = payload;
      let tomorrowleavetask = await axios.get(`/counttomleaveinac/${activityid}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(activityid);
      // console.log(tomorrowleavetask);
      action.INSERT_TOMORROWLEAVE(tomorrowleavetask.data.count);
      action.FETCH_TASKTOMORROWLEAVE_SUCCESS();

    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_TASKTOMORROWLEAVE_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),
  // todayleave
  istodleavetaskFetching: false,
  FETCH_TASKTODAYLEAVE_REQUEST: action((state, payload) => {
    state["istodleavetaskFetching"] = true;
    state["isFetching"] = payload;
  }),

  INSERT_TASKTODAYLEAVE: action((state, payload) => {
    state["todayleavetask"] = payload;
    state["isNameInserting"] = false;
    state["isFetching"] = false;
  }),

  FETCH_TASKTODAYLEAVE_SUCCESS: action((state, payload) => {

    state["istodleavetaskFetching"] = false;

  }),
  FETCH_TASKTODAYLEAVE_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["istodleavetaskFetching"] = false;
    state["isFetching"] = false;
  }),

  FETCH_TASKTODAYLEAVE_START: thunk(async (action, payload) => {
    action.FETCH_TASKTODAYLEAVE_REQUEST(true);
    try {
      let { activityid } = payload;
      let todayleavetask = await axios.get(`/counttodayleaveinac/${activityid}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(activityid);
      //console.log(todayleavetask);
      action.INSERT_TASKTODAYLEAVE(todayleavetask.data.count);
      action.FETCH_TASKTODAYLEAVE_SUCCESS();

    } catch (error) {
      //console.log(error.data);
      action.FETCH_TASKTODAYLEAVE_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),
  //tasknames
  tasknames: [],
  istasknamesFetching: false,
  FETCH_TASKNAMES_REQUEST: action((state, payload) => {
    state["istasknamesFetching"] = true;
    state["isFetching"] = payload;
  }),

  INSERT_TASKNAMES: action((state, payload) => {
    state["tasknames"] = payload;
    state["isNameInserting"] = false;
    state["isFetching"] = false;
  }),

  FETCH_TASKNAMES_SUCCESS: action((state, payload) => {

    state["istasknamesFetching"] = false;

  }),
  FETCH_TASKNAMES_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["istasknamesFetching"] = false;
    state["isFetching"] = false;
  }),

  FETCH_TASKNAMES_START: thunk(async (action, payload) => {
    action.FETCH_TASKNAMES_REQUEST(true);
    try {
      let { activityid } = payload;
      let tasknames = await axios.get(`/countontask/${activityid}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(activityid);
      // console.log(tasknames);
      action.INSERT_TASKNAMES(tasknames.data);
      action.FETCH_TASKNAMES_SUCCESS();

    } catch (error) {
      //console.log(error.response.data);
      action.FETCH_TASKNAMES_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),
  // no of ongoing
  isongoingFetching: false,
  FETCH_ONGOINGTASK_REQUEST: action((state, payload) => {
    state["isongoingFetching"] = true;
    state["isFetching"] = payload;
  }),

  INSERT_ONGOINGTASK: action((state, payload) => {
    state["ongoing"] = payload;
    state["isNameInserting"] = false;
    state["isFetching"] = false;
  }),

  FETCH_ONGOINGTASK_SUCCESS: action((state, payload) => {

    state["isongoingFetching"] = false;

  }),
  FETCH_ONGOINGTASK_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["isongoingFetching"] = false;
    state["isFetching"] = false;
  }),

  FETCH_ONGOINGTASK_START: thunk(async (action, payload) => {
    action.FETCH_ONGOINGTASK_REQUEST(true);
    try {
      let { activityid } = payload;
      let ongoing = await axios.get(`/ongoingtaskinactivity/${activityid}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(activityid);
      //console.log(ongoing);
      action.INSERT_ONGOINGTASK(ongoing.data.count);
      action.FETCH_ONGOINGTASK_SUCCESS();

    } catch (error) {
      //console.log(error.data);
      action.FETCH_ONGOINGTASK_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),
  // completd task
  iscompletedFetching: false,
  FETCH_COMPLETEDTASK_REQUEST: action((state, payload) => {
    state["iscompletedFetching"] = true;
    state["isFetching"] = payload;
  }),

  INSERT_COMPLETEDTASK: action((state, payload) => {
    state["Completed"] = payload;
    state["isNameInserting"] = false;
    state["isFetching"] = false;
  }),

  FETCH_COMPLETEDTASK_SUCCESS: action((state, payload) => {

    state["iscompletedFetching"] = false;

  }),
  FETCH_COMPLETEDTASK_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["iscompletedFetching"] = false;
    state["isFetching"] = false;
  }),

  FETCH_COMPLETEDTASK_START: thunk(async (action, payload) => {
    action.FETCH_COMPLETEDTASK_REQUEST(true);
    try {
      let { activityid } = payload;
      let Completed = await axios.get(`/completedtaskinactivity/${activityid}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(activityid);
      //console.log(Completed);
      action.INSERT_COMPLETEDTASK(Completed.data.count);
      action.FETCH_COMPLETEDTASK_SUCCESS();

    } catch (error) {
      //console.log(error.data);
      action.FETCH_COMPLETEDTASK_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),
  // paused task
  ispausedFetching: false,
  FETCH_PAUSEDTASK_REQUEST: action((state, payload) => {
    state["ispausedFetching"] = true;
    state["isFetching"] = payload;
  }),

  INSERT_PAUSEDTASK: action((state, payload) => {
    state["paused"] = payload;
    state["isNameInserting"] = false;
    state["isFetching"] = false;
  }),

  FETCH_PAUSEDTASK_SUCCESS: action((state, payload) => {

    state["ispausedFetching"] = false;

  }),
  FETCH_PAUSEDTASK_ERROR: action((state, payload) => {
    state["errors"] = [payload];
    state["ispausedFetching"] = false;
    state["isFetching"] = false;
  }),

  FETCH_PAUSEDTASK_START: thunk(async (action, payload) => {
    action.FETCH_PAUSEDTASK_REQUEST(true);
    try {
      let { activityid } = payload;
      let paused = await axios.get(`/pausedtaskinactivity/${activityid}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(activityid);
      //console.log(paused);
      action.INSERT_PAUSEDTASK(paused.data.count);
      action.FETCH_PAUSEDTASK_SUCCESS();

    } catch (error) {
      //console.log(error.data);
      action.FETCH_PAUSEDTASK_ERROR({
        message: "Unexpected failure, check your network or contact the server"
      });
    }
  }),
};

