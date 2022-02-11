import { action, thunk } from "easy-peasy";
import axios from "axios";
// eslint-disable-next-line
export default {
  isFetching: true,
  isInserting: false,
  isSkillsInserting: false,
  isNonSkillsInserting: false,
  isQualificationInserting: false,
  profile: {},


  CLEAR_PROFILE: action((state, payload) => {
    state["profile"] = {};
    state["isFetching"] = true;
  }),
  errors: [],
  FETCH_PROFILE_REQUEST: action((state, payload) => {
    state["isFetching"] = true;
  }),
  FETCH_PROFILE_SUCCESS: action((state, payload) => {
    state["profile"] = payload;
    state["isFetching"] = false;
    //console.log("ended")
  }),
  FETCH_PROFILE_FAIL: action((state, payload) => {
    state["isFetching"] = false;
    state["errors"] = payload;
  }),
  FETCH_PROFILE_START: thunk(async (action, payload) => {
    console.log("profilemod get")
    action.FETCH_PROFILE_REQUEST(true);
    try {
      let profile = await axios.get("/profile", {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }

      });
      console.log(profile)
      if (profile) {
        action.FETCH_PROFILE_SUCCESS(profile.data);
        console.log(profile)
      }
    } catch (error) {
      console.log(error.response);
      localStorage.clear();
      action.FETCH_PROFILE_FAIL({ message: "Uxpected error" });
    }
  }),
  // this is the extra or standby code for upadating,.....
  //  profile if the code written in the file dosent work this can be used
  POST_PROFILE_REQUEST: action((state, payload) => {
    state["success"] = false;
  }),
  POST_PROFILE_SUCCESS: action((state, payload) => {
    state["isFetching"] = true;
    state["success"] = true;
    state["fail"] = false;

  }),
  POST_PROFILE_FAIL: action((state, payload) => {
    state["errors"] = payload;
    state["success"] = false;
    state["fail"] = true;
  }),
  POST_PROFILE_START: thunk(async (action, payload) => {
    action.POST_PROFILE_REQUEST();
    try {
      let formdata = new FormData();
      formdata.append(payload, 'image.jpg')
      let profile = await axios.post("/profile", formdata, payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (profile) {
        action.POST_PROFILE_SUCCESS(profile);
      }
    } catch (error) {
      //console.log(error.response.data);
      action.POST_PROFILE_FAIL({ message: "Uxpected error" });
    }
  }),
  POST_SKILLS_REQUEST: action((state, payload) => {

    state["isSkillsInserting"] = true;
  }),
  POST_SKILLS_SUCCESS: action((state, payload) => {
    state["isSkillsInserting"] = false;
    state["profile"].skills = payload;
  }),
  POST_SKILLS_FAIL: action((state, payload) => {
    state["errors"] = payload;
    state["isSkillsInserting"] = false;
  }),

  POST_SKILLS_START: thunk(async (action, payload) => {
    action.POST_SKILLS_REQUEST();
    try {
      let skills = await axios.post("/profile/technicalskills", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (skills) {
        //console.log(skills)
        action.FETCH_PROFILE_START();
      }
    } catch (err) {
      //console.log(err.response.data);
      action.POST_SKILLS_FAIL({ message: "Uxpected error" });
    }
  }),
  // 
  POST_NONSKILLS_REQUEST: action((state, payload) => {
    state["isNonSkillsInserting"] = true;
  }),
  POST_NONSKILLS_SUCCESS: action((state, payload) => {
    state["isNonSkillsInserting"] = false;
    state["profile"].ntskill = payload;
  }),
  POST_NONSKILLS_FAIL: action((state, payload) => {
    state["errors"] = payload;
    state["isNonSkillsInserting"] = false;
  }),

  POST_NONSKILLS_START: thunk(async (action, payload) => {
    action.POST_NONSKILLS_REQUEST();
    try {
      let ntskill = await axios.post("/profile/nontechnicalskills", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (ntskill) {
        //console.log(ntskill)
        //console.log(payload)
        action.FETCH_PROFILE_START();
      }
    } catch (err) {
      //console.log(err.response);
      action.POST_NONSKILLS_FAIL({ message: "Uxpected error" });
    }
  }),
  // 
  POST_QUALIFICATION_REQUEST: action((state, payload) => {
    state["isQualificationInserting"] = true;
  }),
  POST_QUALIFICATION_SUCCESS: action((state, payload) => {
    state["isQualificationInserting"] = false;
    state["profile"].qualification = payload;
  }),
  POST_QUALIFICATION_FAIL: action((state, payload) => {
    state["errors"] = payload;
    state["isQualificationInserting"] = false;
  }),
  POST_QUALIFICATION_START: thunk(async (action, payload) => {
    action.POST_QUALIFICATION_REQUEST();
    try {
      let qualification = await axios.post("/profile/qualification", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (qualification) {
        action.FETCH_PROFILE_START();
        // action.POST_QUALIFICATION_SUCCESS(qualification.data);
      }
    } catch (err) {
      //console.log(err.response.data);
      action.POST_QUALIFICATION_FAIL({ message: "Uxpected error" });
    }

  }),
  POST_EDITQUALIFICATION_START: thunk(async (action, payload) => {
    console.log(payload);
    console.log(payload.boardd)
    const dict1 = { board: payload.boardd, grade: payload.gradee, qualification: payload.editqualifications, college: payload.collegee };
    action.POST_QUALIFICATION_REQUEST();
    try {
      let qualification = await axios.post("/profile/qualification", dict1, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });
      if (qualification) {
        action.FETCH_PROFILE_START();
        // action.POST_QUALIFICATION_SUCCESS(qualification.data);
      }
    } catch (err) {
      //console.log(err.response.data);
      action.POST_QUALIFICATION_FAIL({ message: "Uxpected error" });
    }

  }),
  // technical delete
  DELETE_SKILL_REQUEST: action((state, payload) => {
    //console.log("request")
    state["isFetching"] = true;
  }),
  DELETE_SKILL_SUCCESS: action((state, payload) => {
    //console.log("success")
    state["isFetching"] = false;
  }),
  DELETE_SKILL_FAIL: action((state, payload) => {
    //console.log("Error/FAILED")
    state["isFetching"] = false;
  }),
  DELETE_SKILL_START: thunk(async (action, payload) => {
    action.DELETE_SKILL_REQUEST();
    let { skills } = payload;
    try {
      let delas = await axios.delete(`/profile/deletetechskill/${skills}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        data: skills
      });
      if (delas) {
        action.DELETE_SKILL_SUCCESS(delas.data);
        //console.log(payload)
        //console.log(delas)
        //console.log(localStorage.getItem("token"))

      }
    } catch (error) {
      //console.log(error.data);
      //console.log(error);
      //console.log(error.response);
      action.DELETE_SKILL_FAIL({ message: "Uxpected error" });
    }
  }),
  // non tech

  DELETE_NONSKILL_REQUEST: action((state, payload) => {
    //console.log("request")
    state["isFetching"] = true;
  }),
  DELETE_NONSKILL_SUCCESS: action((state, payload) => {
    //console.log("success")
    state["isFetching"] = false;
  }),
  DELETE_NONSKILL_FAIL: action((state, payload) => {
    //console.log("Error/FAILED")
    state["isFetching"] = false;
  }),
  DELETE_NONSKILL_START: thunk(async (action, payload) => {
    action.DELETE_NONSKILL_REQUEST();
    let { skills } = payload;
    try {
      let delass = await axios.delete(`/profile/delNonTechSkills/${skills}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
        data: skills
      });
      if (delass) {
        action.DELETE_SKILL_SUCCESS(delass.data);
        //console.log(payload)
        //console.log(delass)
        //console.log(localStorage.getItem("token"))

      }
    } catch (error) {
      //console.log(error.data);
      //console.log(error);
      //console.log(error.response);
      action.DELETE_NONSKILL_FAIL({ message: "Uxpected error" });
    }
  }),
  // 
  SKILL_UPDATE_REQUEST: action((state, payload) => {
    //console.log("request")
    state["isFetching"] = true;
  }),
  SKILL_UPDATE_SUCCESS: action((state, payload) => {
    //console.log("Success")
    state["isFetching"] = false;

  }),
  SKILL_UPDATE_FAIL: action((state, payload) => {
    //console.log("Error/FAILED")
    state["isFetching"] = false;

  }),
  SKILL_UPDATE_START: thunk(async (action, payload) => {
    action.SKILL_UPDATE_REQUEST();

    try {
      let dells = await axios.post("/profile/updateskillset", payload, {
        headers: {
          "x-auth-token": localStorage.getItem("token")

        }

      });
      if (dells) {
        action.SKILL_UPDATE_SUCCESS(dells.data);
        //console.log(payload)
        //console.log(dells)


      }
    } catch (err) {
      //console.log(err.response.data);
      action.SKILL_UPDATE_FAIL({ message: "Uxpected error" });
      //console.log(err)
    }
  }),


  QUALIFICATION_DELETE_REQUEST: action((state, payload) => {
    //console.log("request")
    state["isFetching"] = true;
  }),

  QUALIFICATION_DELETE_SUCCESS: action((state, payload) => {
    //console.log("Success")
    state["isFetching"] = false;

  }),

  QUALIFICATION_DELETE_FAIL: action((state, payload) => {
    //console.log("Error/FAILED")
    state["isFetching"] = false;

  }),

  QUALIFICATION_DELETE_START: thunk(async (action, payload) => {
    action.QUALIFICATION_DELETE_REQUEST();
    let { qualification } = payload
    try {
      let dele = await axios.delete(`/profile/deletesinglequalification/${qualification}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),

        },
        data: qualification

      });
      if (dele) {
        action.QUALIFICATION_DELETE_SUCCESS(dele.data);
        //console.log(payload)
        //console.log(dele)
        //console.log(localStorage.getItem("token"))


      }
    } catch (error) {


      //console.log(error.response);
      action.QUALIFICATION_DELETE_FAIL({ message: "Uxpected error" });
    }
  }),
  // all profiles 
  allprofile: [],
  isAllprofileFetching: true,



  CLEAR_ALLPROFILE: action((state, payload) => {
    state["allprofile"] = [];
    state["isAllprofileFetching"] = true;

  }),

  FETCH_ALLPROFILE_REQUEST: action((state, payload) => {
    state["isAllprofileFetching"] = true;

  }),
  FETCH_ALLPROFILE_SUCCESS: action((state, payload) => {
    state["allprofile"] = payload;
    state["isAllprofileFetching"] = false;

    //console.log("ended")
  }),
  FETCH_ALLPROFILE_FAIL: action((state, payload) => {
    state["isAllprofileFetching"] = false;

    state["error"] = payload;
  }),
  FETCH_ALLPROFILE_START: thunk(async (action, payload) => {
    action.FETCH_ALLPROFILE_REQUEST(true);
    try {
      let { user_id } = payload;
      console.log("user_id",user_id);
      let allprofile = await axios.get(`/admin/membercard/${user_id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }

      });
      console.log(allprofile)
      if (allprofile) {
        console.log("fdhvhdfvf", allprofile.data)
        action.FETCH_ALLPROFILE_SUCCESS(allprofile.data);
        // console.log("allprofie")
      }
    } catch (error) {
      //console.log(error.response);
      localStorage.clear();
      action.FETCH_ALLPROFILE_FAIL({ message: "Uxpected error" });
    }
  }),
};