import { action, thunk } from "easy-peasy";
import axios from "axios";

export default {
  isFetching: true,
  isInserting: false,
  isNewsInserting: false,
  // isSkillsInserting: false,
  // isNonSkillsInserting: false,
  // isQualificationInserting: false,
  // profile: {},
  news: [],


  CLEAR_NEWS: action((state, payload) => {
    state["news"] = [];
    state["isFetching"] = true;
  }),

  FETCH_NEWS_REQUEST: action((state, payload) => {
    state["isFetching"] = true;
  }),
  FETCH_NEWS_SUCCESS: action((state, payload) => {
    state["news"] = payload;
    state["isFetching"] = false;
    // console.log("ended")
  }),
  FETCH_NEWS_FAIL: action((state, payload) => {
    state["isFetching"] = false;
    state["errors"] = payload;
    state["isInserting"] = false
  }),
  FETCH_NEWS_START: thunk(async (action, payload) => {
    // console.log("ia nanana") 
    action.FETCH_NEWS_REQUEST(true);
    try {
      // console.log("ia lord")
      let news = await axios.get("/news1/All", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }

      });
      if (news) {
        action.FETCH_NEWS_SUCCESS(news.data);
        // console.log("News")
      }
    } catch (error) {
      console.log(error.response);
      localStorage.clear();
      action.FETCH_NEWS_FAIL({ message: "Uxpected error" });
    }
  }),
  POST_NEWS_REQUEST: action((state, payload) => {
    state["success"] = false;
  }),
  POST_NEWS_SUCCESS: action((state, payload) => {
    state["isFetching"] = true;
    state["success"] = true;
    state["fail"] = false;

  }),
  POST_NEWS_FAIL: action((state, payload) => {
    state["errors"] = payload;
    state["success"] = false;
    state["fail"] = true;
  }),
  POST_NEWS_START: thunk(async (action, payload) => {
    action.POST_NEWS_REQUEST();
    try {
      let news = await axios.post("/news", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (news) {
        action.POST_NEWS_SUCCESS(news);
      }
    } catch (error) {
      console.log(error.response.data);
      action.POST_NEWS_FAIL({ message: "Uxpected error" });
    }
  }),


  DELETE_NEWS_REQUEST: action((state, payload) => {
    console.log("request")
    state["isFetching"] = true;
  }),
  DELETE_NEWS_SUCCESS: action((state, payload) => {
    console.log("success")
    state["isFetching"] = false;
  }),
  DELETE_NEWS_FAIL: action((state, payload) => {
    console.log("Error/FAILED")
    state["isFetching"] = false;
  }),
  DELETE_NEWS_START: thunk(async (action, payload) => {
    action.DELETE_NEWS_REQUEST();
    let { id } = payload;
    try {
      let delas = await axios.delete(`/news/delete/${id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        data: id
      });
      if (delas) {
        action.DELETE_NEWS_SUCCESS(delas.data);
        action.FETCH_NEWS_START()
        console.log(payload)
        console.log(delas)
        // console.log(data)


      }
    } catch (error) {
      console.log(error.data);
      console.log(error);
      console.log(error.response);
      action.DELETE_NEWS_FAIL({ message: "Uxpected error" });
    }
  }),
  // 


  // 
  NEWS_UPDATE_REQUEST: action((state, payload) => {
    console.log("request")
    state["isFetching"] = true;
  }),
  NEWS_UPDATE_SUCCESS: action((state, payload) => {
    console.log("Success")
    state["isFetching"] = false;

  }),
  NEWS_UPDATE_FAIL: action((state, payload) => {
    console.log("Error/FAILED")
    state["isFetching"] = false;

  }),
  NEWS_UPDATE_START: thunk(async (action, payload) => {
    action.NEWS_UPDATE_REQUEST();
    let { id, title, description, image } = payload;

    try {
      let dells = await axios.post(`/news/update/${id}`, payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")

        },
        data: { id, title, description, image }

      });
      if (dells) {
        action.NEWS_UPDATE_SUCCESS(dells.data);
        console.log(payload)
        console.log(dells)


      }
    } catch (err) {
      console.log(err.response.data);
      action.NEWS_UPDATE_FAIL({ message: "Uxpected error" });
      console.log(err)
    }
  }),



};
