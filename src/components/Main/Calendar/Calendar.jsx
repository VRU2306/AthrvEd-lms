
import React, { useState, useEffect, createContext, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, MenuItem } from '@material-ui/core'
import { ViewState } from '@devexpress/dx-react-scheduler';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';
import "./calender.css"
import Select from '@material-ui/core/Select';
import { useStoreActions, useStoreState } from "easy-peasy";
import FormControl from "@material-ui/core/FormControl";
import {
  Scheduler,
  WeekView,
  Appointments,
  DateNavigator,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  TodayButton,
  AppointmentForm,
  Resources,
  AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';


const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: '#2D9CDB'
  },
  caldrop: {
    [theme.breakpoints.up('xs')]: {
      marginLeft: '170px',
      width: '70px'
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '260px',
      width:'100px'
      
  
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '450px',
      width: '200px',
      // flexShrink: 0,
    },
    [theme.breakpoints.up('lg')]: {
      marginLeft: '800px',
      width: '200px',
      // flexShrink: 0,
    },
    [theme.breakpoints.up('xl')]: {
      marginLeft: '1000px',
      width: '200px',
      // flexShrink: 0,
    },
  }


}));



const calender = createMuiTheme({
  palette: {
    type: "dark",

  },

});

const Calendar = () => {
  const type = useStoreState(state => state.profileMod.profile.type);
  let { user_id } = useStoreState(state => state.profileMod.profile);
  const [date, setdate] = useState(new Date())
  const [value, setvalue] = useState([])
  const [age, setage] = React.useState(user_id)
  const [users, setusers] = useState([])
  console.log("val", value);
  const resources = [{
    fieldName: 'title',
    title: 'Type',
    instances: [
      { id: 'Leave', text: 'Leave', color: 'rgb(255, 14,100)' },
      
    ],
  }]



  console.log("user_idddd", user_id);
  console.log("type", type);
  useEffect(() => {
    console.log(111, user_id);
    setage(user_id);
    fetch(`/calender/info?user_id=${user_id}`, {
      credentials: 'include',
      method: 'GET',
      headers: { "x-auth-token": localStorage.getItem("token") }
    }).then(
      (resp) => {

        console.log("resp", resp)
        if (resp.status == 200) {
          resp.json().then((result) => {
            console.log("result", result)
            setvalue(result.dates)
          })
        }
      })



    if (type === 'A') {
      fetch("/admin/allunblockedmembers", {
        credentials: 'include',
        method: 'GET',
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      }).then(
        (resp) => {

          console.log("resp", resp)
          if (resp.status == 200) {
            resp.json().then((result) => {
              console.log("Users", result)
              setusers(result)
            })
          }
        })
    }

    if (type === 'S') {
      fetch(`/team/fetchmember?super_id=${user_id}`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      }).then(
        (resp) => {

          console.log("resp", resp)
          if (resp.status == 200) {
            resp.json().then((result) => {
              console.log("Users", result)
              setusers(result)
            })
          }
        })

    }



  }, [])


  const fetchcal = (e) => {
    console.log("fetchcal", e.target.value);
    setage(e.target.value)

    fetch(`/calender/info?user_id=${e.target.value}`, {
      credentials: 'include',
      method: 'GET',
      headers: { "x-auth-token": localStorage.getItem("token") }
    }).then(
      (resp) => {

        console.log("resp", resp)
        if (resp.status == 200) {
          resp.json().then((result) => {
            console.log("result", result)
            setvalue(result.dates)
          })
        }
      })
  }





  console.log('1234', value);
  const classes = useStyles();

  console.log("2222");
  return (
    <ThemeProvider theme={calender} >

      <Paper >


        <div className='calenderview'>
          {type != 'U' ?
            <FormControl style={{ marginLeft: '60px', marginTop: '40px' }} >
              
              {/* <div className='caldrop' > */}
              <Select
                className={classes.caldrop}
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                value={age}
                style={{ backgroundColor: "#202328", color: "white", float: 'right', height: '30px', position: 'absolute',  top: '30px',zIndex:"5" }}
                size="small"
                variant="outlined"
                fullWidth
                onChange={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  fetchcal(e)
                }
                }
              >
                {users?.map((a, j) => {
                  return (
                    <MenuItem value={a.user_id} style={{ backgroundColor: "#202328" }} key={j} fullWidth >{a.fname}</MenuItem>
                  )
                })
                }


              </Select>
              {/* </div> */}
            </FormControl>
            : null}
          <div style={{ marginTop: '20px' }}>
            <Scheduler
              data={value}
              height={660}
            >
              <ViewState
                defaultcurrentDate={date}

              // style={{color:"red0"}}


              />



              {/* <DayView />
          <WeekView
            startDayHour={0}
            endDayHour={23}
          />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={0}
            endDayHour={23}
            
          /> */}
              <MonthView
              />


              <Toolbar />
              <DateNavigator />
              <TodayButton />



              <Appointments />

              <AppointmentTooltip

              />
              <Resources
                data={resources}
              />
              <AppointmentForm className={classes.card} />
            </Scheduler>
          </div>
        </div>
      </Paper>
    </ThemeProvider>

  )


}

export default Calendar





