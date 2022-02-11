import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, Button, Dialog, DialogContent } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import logo from "./../../../Icons/Vector.svg";
import { Link } from "react-router-dom";
import './Events.css'
import moment from 'moment';
const useStyles = makeStyles((theme) => ({
    rootuser: {
        backgroundColor: '#0F1012',
        // width: 'calc(100% - 259px)',
        minHeight: '100vh',
        marginLeft: '0'
    },
    contentsuser: {
        flexGrow: 1,
        padding: theme.spacing(3),
        color: 'white',
        marginTop: '10px'
    },
    eventcard: {
        background: "#272a2c",
        margin: "0px 10px 10px 20px",
        borderRadius: "20px",
        width: "300px",
        height: "400px"

    },




}));

const defaultMaterialTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            // Purple and green play nicely together.

            backgroundColor: "#202328",
            light: "#ffffff",
            main: "#808080"
        }
    }
});


function EventUser() {
    const classes = useStyles();
    let initialState = [];
    const [event, setevent] = useState(initialState)

    // const eventfetch = (id) => {


    //     localStorage.removeItem("userapply")
    //     localStorage.setItem("userapply", id)


    //     console.log(id)
    // }

    const unique = localStorage.getItem("userapply");
    console.log("dhdhhd", unique);

    useEffect(() => {

        getEvents()
    }, [])
    function getEvents() {
        const requestoption = {
            Credentials: 'include',
            method: 'GET',

        }
        fetch('/event/eventfetchuser?status=P',
            requestoption)
            .then((response) => {
                console.log(response)
                response.json().then((result) => {
                    console.log(result);
                    console.log(result)
                    setevent(result);
                })
            })




    }

    return (
        <div className={[classes.rootuser, 'profileMedia'].join(' ')}>
            <div className={classes.contentsuser}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <Grid item xs={12}>
                        <div className="Eventsuser" > Events </div>
                    </Grid>
                    <Grid container spacing={5} >
                        <Grid container xs={12} md={12} >
                            {
                                event.map((e, index) => {
                                    return (
                                        <div>
                                            <Grid item xs={10} md={4}  >
                                                <div className={classes.eventcard} >
                                                    <Grid item xs={12} style={{ paddingTop: "1px" }}>
                                                        <div className="EventuserImage" style={{ backgroundImage: e.eventimage == true ? `url(https://athrvedlms.s3.ap-south-1.amazonaws.com/event/${e._id})` : `url(${logo})` }} ></div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div className="eventNameuser">{e.eventname || 'Untitled form'}</div>
                                                    </Grid>

                                                    <Grid item xs={12}>
                                                        <div className="userStartTime" >Event is conducted on :<br />{moment(e.eventdate).format("DD/MM/YYYY hh:mm A")}</div>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <div className="userEndTime">Last date to fill the form :<br /> {moment(e.lastdate).format("DD/MM/YYYY hh:mm A")}</div>
                                                    </Grid>
                                                    <Link to={`/event/singleeventfetch/:${e._id}`}>
                                                        <Grid item xs={12}>

                                                            <Button variant="contained" color="primary"
                                                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", marginTop: "35px", marginBottom: "2px", cursor: "pointer", float: "right", marginRight: "30px" }}
                                                            // onClick={()=>{eventfetch(e._id)}}
                                                            >
                                                                Apply

                                                            </Button>




                                                        </Grid>
                                                    </Link>


                                                </div>
                                            </Grid>
                                        </div>
                                    )
                                })
                            }


                        </Grid>
                    </Grid>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default EventUser
