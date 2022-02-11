import { thunk, action } from "easy-peasy";
import axios from "./axios.proxy";
// eslint-disable-next-line
export default {
  activities: [],
  isTaskLoading: true,
  domains: [
    "android development",
    "IOT",
    "Web development",
    "Windows Application",
    "Artificial Intelligence",
    "Python web application",
    "Simulation and Analysis",
    "Python",
    "Nain Project",
    "Drones",
    "Cyber Security",
    "Virtual and Augmented Reality",
    "Management",
    "Creative Content and Graphics",
    "Business Development",
    "Personal Development"
  ],
  userTasks: [],
  setUserTasks: action((state, payload) => {
    state["userTasks"] = payload;
  }),
  isUserTasksLoading: true,
  setUserTasksLoading: action((state, payload) => {
    state["isUserTasksLoading"] = payload;
  }),
  setDomains: action((state, payload) => {
    state["domains"] = payload.map(domain => domain.title);
  }),
  setTaskLoading: action((state, payload) => {
    state["isTaskLoading"] = payload;
  }),
  setActivityTask: action((state, payload) => {
    state["activities"] = state["activities"].map(activity => {
      ////console.log(payload.activityid, activity.activityid);
      if (activity.activityid === payload.activityid) {
        activity.tasks = payload.tasks;
        //console.log(activity.tasks);
      }
      return activity;
    });
    state["isTaskLoading"] = false;
  }),
  isLoading: true,
  setLoading: action((state, payload) => {
    state["isLoading"] = payload;
  }),
  setActivities: action((state, payload) => {
    state["activities"] = [...payload];
  }),
  isAdmin: false,
  fetchAllUserTasks: thunk(async (action, payload) => {
    //console.log("Here bro");
    try {
      action.setUserTasksLoading(true);
      let { activityId, userId } = payload;
      let activities = await axios.get(
        `/reports/activity/${activityId}/user/${userId}`,
        {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        }
      );

      action.setUserTasks(activities.data);
      action.setUserTasksLoading(false);
    } catch (err) {
      //console.log(err);
      action.setLoading(false);
    }
  }),
  submitActivityTeam: thunk(async (action, payload) => {
    try {
      axios
        .post("/admin/activity", payload, {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        })
        .then(data => {
          action.fetchActivities("A");
        });
    } catch (err) { }
  }),
  fetchActivities: thunk(async (action, payload) => {
    try {
      action.setLoading(true);
      if (payload === "A") {
        let activities = await axios.get("/admin/activity/incomplete", {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        });

        action.setLoading(false);
        action.setActivities(activities.data.incompleteActivity);
      } else {
        let activities = await axios.get("/reports/activity/", {
          headers: {
            "x-auth-token": localStorage.getItem("token")
          }
        });

        action.setLoading(false);
        action.setActivities(activities.data);
      }
    } catch (err) {
      action.setLoading(false);
    }
  }),
  fetchDomains: action(async (action, payload) => {
    try {
      let domains = await axios.get("/select/?type=domains");
      action.setDomains(domains.data);
    } catch (err) {
      //console.log(err);
    }
  }),
  setTasks: thunk(async (action, payload) => {
    try {
      await axios.post("/reports", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
    } catch (err) {
      //console.log(err.response.data);
    }
  }),
  fetchActivityTask: thunk(async (action, payload) => {
    try {
      action.setTaskLoading(true);
      let tasks = await axios.get(`/reports/${payload}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      //console.log(tasks);
      action.setActivityTask({
        tasks: tasks.data,
        activityid: payload
      });
    } catch (err) {
      action.setTaskLoading(false);
    }
  }),
  updateTask: thunk(async (action, payload) => {
    try {
      await axios.post(`/reports/task`, payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
    } catch (err) { }
  }),
  deleteTask: thunk(async (action, payload) => {
    try {
      await axios.delete(`/reports/task/${payload.reportid}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
    } catch (err) { }
  }),
  updateComment: thunk(async (action, payload) => {
    try {
      await axios.post(`/reports/${payload.reportid}/comment`, payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
    } catch (err) { }
  })
};
