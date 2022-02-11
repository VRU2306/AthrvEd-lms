import React, { useState, useEffect, useRef } from 'react'
import Add from "@material-ui/icons/AddSharp";
import axios from 'axios';
import { Grid, makeStyles, Button, Dialog, DialogContent, Tooltip } from "@material-ui/core";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import './Events.css'
import logo from "./../../../Icons/Vector.svg";
import moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import fileDownload from 'js-file-download'


import ShareIcon from '@material-ui/icons/Share';

import { saveAs } from 'file-saver'
import { toast } from 'material-react-toastify';

toast.configure();
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#0F1012',
        // width: 'calc(100% - 259px)',
        minHeight: '100vh',
        marginLeft: '40'
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        color: 'white',
        marginTop: '30px'
    },
    draftedCard: {
        background: "#272a2c",
        margin: "0px 10px 10px 20px",
        borderRadius: "20px",
        width: "300px",

    },
    CompletedCard: {
        background: "#272a2c",
        margin: "0px 10px 10px 20px",
        borderRadius: "20px",
        width: "300px",

    },
    publishedCard: {
        background: "#272a2c",
        margin: "0px 10px 10px 20px",
        borderRadius: "20px",
        width: "300px",

    },
    newevent: {
        display: "grid",
        border: "3px dashed #67737A",
        boxSizing: "border-box",
        borderRadius: "8px",
        marginBottom: "20px"
    },

}));

const calender = createMuiTheme({
    palette: {
        type: "dark",
        // color: '#F9FAFA'
    },
    overrides: {
        MuiPickersBasePicker: {
            pickerView: {
                backgroundColor: '#303133'
            }
        }
    }
});

function Events() {
    const classes = useStyles();

    async function linktoaddevent() {
        const requestOptions = {
            Credential: 'include',
            method: 'POST',
            headers: { "x-auth-token": localStorage.getItem("token") }
        }
        const response = await fetch(`/event/create`, requestOptions);
        const res = await response.json()
        // console.log(response)

        if (response.status == 201) {
            localStorage.removeItem("CreateEvent")
            // sessionStorage.clear();
            console.log(res._id)
            localStorage.setItem("CreateEvent", res._id)
            window.location.href = '/main/Eventsf/AddEvents'

        }
        // 
    };

    const draftedevent = (id) => {
        localStorage.removeItem("CreateEvent")
        localStorage.setItem("CreateEvent", id)
        window.location.href = '/main/Eventsf/AddEvents'
    }
    const [draftevent, setdraftevent] = useState([])



    const [publishedEvents, setPublishedEvents] = useState([])


    const [completedEvents, setCompletedEvents] = useState([])
    useEffect(() => {

        getCompletedEvents()
        getPublishedEvents()
        getDraftedEvents()
    }, [])
    function getCompletedEvents() {
        fetch(`/event/fetch?status=PC`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("published", response)
            response.json().then((result) => {
                setCompletedEvents(result)
                console.log(result)
            })
        })
    }
    function getPublishedEvents() {
        fetch(`/event/fetch?status=P`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("published", response)
            response.json().then((result) => {
                setPublishedEvents(result)
                console.log(result)
            })
        })
    }
    function getDraftedEvents() {
        fetch(`/event/fetch?status=C`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response)
            response.json().then((result) => {
                console.log(result)
                console.log(result[0].eventname)
                console.log(response)
                setdraftevent(result)
            })

        })
    }
    const [names, setnames] = useState("");
    const [uniqueid, setuniqueid] = useState('')
    const [openpublishevent, setopenpublishevent] = useState(false)
    const [selectedDateEvent, handleDateChangeEvent] = useState(new Date());
    const [selectedDateform, handleDateChangeform] = useState(new Date());

    const opendialog = (id) => {
        setopenpublishevent(true)
        setuniqueid(id)
    }
    const handleclosedialog = () => {
        setopenpublishevent(false)
        setuniqueid('')
        handleDateChangeEvent(new Date())
        handleDateChangeform(new Date())
    }
    // console.log("uniqueid",uniqueid)


    async function PublishEvent() {
        console.log(selectedDateEvent, selectedDateform)
        let timeevent = moment(selectedDateEvent).format("YYYY-MM-DD HH:mm ")
        let timeform = moment(selectedDateform).format("YYYY-MM-DD HH:mm ")
        console.log(timeevent)
        console.log(timeform)

        const requestOptions = {
            Credential: 'include',
            method: 'POST',
            headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventdate: timeevent, lastdate: timeform })

        }
        const response = await fetch(`/event/statuschange?id=${uniqueid}&status=P`, requestOptions);
        // const res = await response.json()
        console.log(response)
        if (response.status == 200) {
            handleclosedialog()
            getPublishedEvents()
            getDraftedEvents()
            getCompletedEvents()
        }
    }

    const [opendeleteevent, setopendeleteevent] = useState(false)
    const opendialogevent = (id) => {
        setopendeleteevent(id)
    }
    const handleclosedialogdelete = () => {
        setopendeleteevent(false)
    }
    console.log(opendeleteevent)
    async function deleteEvent(id) {
        console.log("deleting")
        const requestOptions = {
            Credential: 'include',
            method: 'DELETE',
            headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
        }
        const response = await fetch(`/event/delete?id=${opendeleteevent}`, requestOptions);
        console.log(response)
        if (response.status == 200) {
            handleclosedialogdelete()
            getDraftedEvents()
            getCompletedEvents()

        }
    }

    const [openduplicateevent, setopenduplicateevent] = useState(false)
    const opendialogduplicate = (id) => {
        setopenduplicateevent(id)
    }
    const handleclosedialogduplicate = () => {
        setopenduplicateevent(false)
    }
    console.log(openduplicateevent)
    async function duplicateEvent(id) {
        const requestOptions = {
            Credential: 'include',
            method: 'POST',
            headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
        }
        const response = await fetch(`/event/eventduplicate?id=${openduplicateevent}`, requestOptions);
        console.log(response)
        if (response.status == 201) {
            handleclosedialogduplicate()
            getDraftedEvents()
            getCompletedEvents()
        }
    }

    const [openendEvent, setOpenEndEvent] = useState(false)
    const opendialogend = (id) => {
        setOpenEndEvent(id)
    }
    const handleclosedialogend = () => {
        setOpenEndEvent(false)
    }
    async function endEvent() {
        const requestOptions = {
            Credential: 'include',
            method: 'POST',
            headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
        }
        const response = await fetch(`/event/statuschange?id=${openendEvent}&status=PC`, requestOptions);
        console.log(response)
        if (response.status == 200) {
            handleclosedialogend()
            getPublishedEvents()
            getCompletedEvents()
        }

    }

    const [openDownload, setDownload] = useState(false)
    const [openalert, setAlert] = useState(false)
    const opendialogdownload = (id) => {
        setDownload(id)
    }
    const handleclosedialogdownload = () => {
        setDownload(false)
    }
    const opendialogalert = () => {
        setAlert(true)
    }
    const handleclosedialogalert = () => {
        setAlert(false)
    }
    async function downloadResult() {



        const requestOptions = {
            Credential: 'include',
            method: 'POST',
            headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
        }

        const response = await fetch(`/event/eventresponsedownload?eventid=${openDownload}`, requestOptions);
        console.log(response)
        if (response.status == 200) {

            console.log("hdhshshhshshs");


            axios.get('/fetchdoc', {
                responseType: 'blob',
            })
                .then((res) => {
                    fileDownload(res.data, `EventReport.xlsx`)
                    handleclosedialogdownload()
                })


        }
        if (response.status == 404) {
            toast.error('No response yet!!!', { position: "bottom-center", className: 'toast-error-container' })
            handleclosedialogdownload()
        }
    }

    // share link
    const [openShare, setOpenShare] = useState(false)
    const textAreaRef = useRef(null);
    const OpenDialogShare = (id) => {
        setOpenShare(id)
    }
    const handleClosedDialogShare = () => {
        setOpenShare(false)
    }
    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();

    }
    console.log(window.location.origin)


    return (
        <div className={[classes.root, 'profileMedia'].join(' ')}>
            <div className={classes.content}>
                <Grid item xs={12}>
                    <div className="PEvent">Published Events </div>
                </Grid>
                <Grid container spacing={5} >
                    <Grid container xs={12} md={12} >
                        {publishedEvents.map((event, index) => {
                            return (
                                <div>
                                    <Grid item xs={10} md={4} >
                                        <div className={classes.publishedCard}>
                                            <Grid item xs={12} style={{ paddingTop: "1px" }}>
                                                <Link to={`/event/singleeventfetch/:${event._id}`}>
                                                    <div className="pubImg" style={{ backgroundImage: event.eventimage == true ? `url(https://athrvedlms.s3.ap-south-1.amazonaws.com/event/${event._id})` : `url(${logo})` }} ></div>
                                                </Link>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div className="eventName">{event.eventname || 'Untitled form'}</div>
                                            </Grid>
                                            {/* <Grid item xs={12}>
                                        <div className="eventDes">Event Decription:  <br />The definition of a description is a statement that gives details about someone or something. An example of description is a story about the places visited on a family trip. ... Published a description of the journey; gave a vivid description of the game.</div>
                                    </Grid> */}
                                            <Grid item xs={12}>
                                                <div className="StartTime">Event is conducted on :<br /> {moment(event.eventdate).format("DD/MM/YYYY hh:mm A")}</div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <div className="EndTime">Last date to fill the form :<br /> {moment(event.lastdate).format("DD/MM/YYYY hh:mm A")}</div>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", marginLeft: "5px", marginTop: "10px", marginBottom: "20px", cursor: "pointer", background: "#202328", border: "1px solid #d4dce1" }}
                                                    onClick={() => opendialogend(event._id)}
                                                >
                                                    End Event

                                                </Button>
                                                <Button
                                                    style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", marginLeft: "5px", marginTop: "10px", marginBottom: "20px", cursor: "pointer", background: "#202328", border: "1px solid #d4dce1" }}
                                                    onClick={() => { opendialogdownload(event._id) }}
                                                >
                                                    Download Result
                                                </Button>

                                                <ShareIcon style={{ cursor: "pointer" }} onClick={() => OpenDialogShare(event._id)} />

                                            </Grid>

                                        </div>
                                    </Grid>
                                </div>
                            )
                        })}

                    </Grid>
                </Grid>
                <Grid container spacing={5} >
                    <Grid container xs={12} md={12} >
                        <Grid item xs={12}>
                            <div className="DEvent">Completed Events </div>
                        </Grid>
                        {completedEvents.map((cm, k) => {
                            return (
                                <div>
                                    <Grid item xs={10} md={4} >
                                        <div className={classes.CompletedCard}>
                                            <Grid item xs={12} style={{ paddingTop: "1px" }}>

                                                <div className="pubImg" style={{ cursor: "pointer", backgroundImage: cm.eventimage == true ? `url(https://athrvedlms.s3.ap-south-1.amazonaws.com/event/${cm._id})` : `url(${logo})` }} onClick={() => { draftedevent(cm._id) }} ></div>

                                            </Grid>
                                            <Grid item xs={12}>
                                                <div className="eventName">{cm.eventname || 'Untitled form'}</div>
                                            </Grid>
                                            {/* <Grid item xs={12}>
                                                    <div className="eventDes">Event Decription:  <br />{m.description}</div>
                                                </Grid> */}
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "space-around", marginTop: "40px" }}>
                                                <Button
                                                    style={{
                                                        color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "10px", marginBottom: "20px", background: "#202328", border: "1px solid #d4dce1"
                                                    }}
                                                    onClick={() => { opendialogdownload(cm._id) }}
                                                >
                                                    Download Result
                                                </Button>
                                                {/* </Grid>
                                            <Grid item xs={12} style={{ display: "flex", justifyContent: "space-around" }}>
                                                <Button
                                                    style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", marginLeft: "-10px", marginBottom: "20px", cursor: "pointer", marginTop: "10px", background: "#202328", border: "1px solid #d4dce1" }}
                                                    onClick={() => { opendialogevent(cm._id) }}
                                                >
                                                    Delete Event
                                                </Button> */}

                                                <Button
                                                    style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", marginBottom: "20px", cursor: "pointer", marginTop: "10px", background: "#202328", border: "1px solid #d4dce1" }}
                                                    onClick={() => { opendialogduplicate(cm._id) }}
                                                >
                                                    Duplicate
                                                </Button>
                                                <Tooltip title={"Delete Event"} placement="top" style={{ marginTop: "20px" }}><DeleteIcon onClick={() => { opendialogevent(cm._id) }} /></Tooltip>

                                            </Grid>


                                        </div>
                                    </Grid>
                                </div>


                            )
                        })}

                    </Grid>

                </Grid>
                <Grid container spacing={5} >
                    <Grid container xs={12} md={12} >
                        <Grid item xs={12}>
                            <div className="DEvent">Drafted Events </div>
                        </Grid>
                        {
                            draftevent.map((m, i) => {
                                return (



                                    <div>
                                        <Grid item xs={10} md={4} >
                                            <div className={classes.draftedCard}>
                                                <Grid item xs={12} style={{ paddingTop: "1px" }}>
                                                    <div className="pubImg" style={{ backgroundImage: m.eventimage == true ? `url(https://athrvedlms.s3.ap-south-1.amazonaws.com/event/${m._id})` : `url(${logo})`, cursor: "pointer" }} onClick={() => { draftedevent(m._id) }}></div>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <div className="eventName">{m.eventname || 'Untitled Form'}</div>
                                                </Grid>
                                                {/* <Grid item xs={12}>
                                                    <div className="eventDes">Event Decription:  <br />{m.description}</div>
                                                </Grid> */}
                                                <Grid item xs={12} style={{ display: "flex", justifyContent: "space-around", marginTop: "40px" }}>
                                                    <Button
                                                        style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "10px", marginBottom: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                                        onClick={() => { opendialog(m._id) }}
                                                    >
                                                        Publish Event
                                                    </Button>
                                                    {/* </Grid>
                                                <Grid item xs={12} style={{ display: "flex", justifyContent: "space-around" }}>
                                                    <Button
                                                        style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", marginLeft: "-10px", marginBottom: "20px", cursor: "pointer", marginTop: "10px", background: "#202328", border: "1px solid #d4dce1" }}
                                                        onClick={() => { opendialogevent(m._id) }}
                                                    >
                                                        Delete Event
                                                    </Button> */}
                                                    <Button
                                                        style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", marginBottom: "20px", cursor: "pointer", marginTop: "10px", background: "#202328", border: "1px solid #d4dce1" }}
                                                        onClick={() => { opendialogduplicate(m._id) }}
                                                    >
                                                        Duplicate
                                                    </Button>
                                                    <Tooltip title={"Delete Event"} placement="top" style={{ marginTop: "20px" }}><DeleteIcon onClick={() => { opendialogevent(m._id) }} /></Tooltip>
                                                </Grid>



                                            </div>
                                        </Grid>
                                    </div>

                                )
                            })
                        }
                    </Grid>

                </Grid>

                <div className="NEvent">Add New Event</div>
                <Grid container xs={12} md={11} className={classes.newevent}>
                    {/* <Link to={`/main/Eventsf/AddEvents`} > */}
                    <Add style={{ fontSize: "100px" }} className="addicon" onClick={() => { linktoaddevent(); }} />
                    {/* </Link> */}
                </Grid>
                <Dialog
                    open={openpublishevent}
                    keepMounted
                    aria-labelledby="simple-dialog-title"
                    onClose={handleclosedialog}
                >
                    <DialogContent className="pop-content-delete">
                        <br />
                        <div style={{ display: "flex", marginBottom: "60px" }}>
                            <Grid item xs={12}><div style={{ marginTop: "4px", color: "white", fontSize: "19px" }}>The event will be conducted on:</div></Grid>
                            <Grid item xs={12}>
                                <p >
                                    <ThemeProvider theme={calender}>
                                        <CssBaseline />
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DateTimePicker
                                                minDate={new Date()}
                                                value={selectedDateEvent}
                                                onChange={handleDateChangeEvent}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </ThemeProvider>

                                </p>
                            </Grid>
                        </div>
                        <div style={{ display: "flex", marginBottom: "60px" }}>
                            <Grid item xs={12}><div style={{ marginTop: "4px", color: "white", fontSize: "19px" }}>Last Date To fill<br /> this event form:</div></Grid>
                            <Grid item xs={12}>
                                <p >
                                    <ThemeProvider theme={calender}>
                                        <CssBaseline />
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                            <DateTimePicker
                                                minDate={new Date()}
                                                maxDate={selectedDateEvent}
                                                value={selectedDateform}
                                                onChange={handleDateChangeform}
                                            />
                                        </MuiPickersUtilsProvider>
                                    </ThemeProvider>

                                </p>
                            </Grid>
                        </div>

                        <div>
                            <Button onClick={handleclosedialog}
                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "10px", background: "#202328", border: "1px solid #d4dce1" }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => { PublishEvent() }}
                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "10px", background: "#202328", border: "1px solid #d4dce1" }}
                            >
                                Publish
                            </Button>

                        </div>

                    </DialogContent>

                </Dialog>
                <Dialog
                    open={opendeleteevent}
                    keepMounted
                    aria-labelledby="simple-dialog-title"
                    onClose={handleclosedialogdelete}

                >
                    <DialogContent className="pop-content-delete">
                        <br />

                        <div style={{ height: "200px" }}>
                            <p className="deleteEvent">Are you sure you want<br /> to delete this event?</p>
                            <Button onClick={handleclosedialogdelete}
                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => { deleteEvent() }}
                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                            >
                                Delete
                            </Button>

                        </div>

                    </DialogContent>

                </Dialog>
                <Dialog
                    open={openduplicateevent}
                    keepMounted
                    aria-labelledby="simple-dialog-title"
                    onClose={handleclosedialogduplicate}

                >
                    <DialogContent className="pop-content-delete">
                        <br />

                        <div style={{ height: "200px" }}>
                            <p className="deleteEvent">Are you sure you want<br /> to duplicate this event?</p>
                            <Button onClick={handleclosedialogduplicate}
                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => { duplicateEvent() }}
                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                            >
                                Duplicate
                            </Button>

                        </div>

                    </DialogContent>

                </Dialog>
                <Dialog
                    open={openendEvent}
                    keepMounted
                    aria-labelledby="simple-dialog-title"
                    onClose={handleclosedialogend}
                >
                    <DialogContent className="pop-content-delete">
                        <br />

                        <div style={{ height: "200px" }}>
                            <p className="deleteEvent">Are you sure you want<br /> to end this event?</p>
                            <Button onClick={handleclosedialogend}
                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => { endEvent() }}
                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                            >
                                End
                            </Button>

                        </div>

                    </DialogContent>

                </Dialog>
                <Dialog
                    open={openDownload}
                    keepMounted
                    aria-labelledby="simple-dialog-title"
                    onClose={handleclosedialogdownload}
                >
                    <DialogContent className="pop-content-delete">
                        <br />

                        <div style={{ height: "200px" }}>
                            <p className="deleteEvent">Are you sure you want<br /> to Download the responses?</p>
                            <Button onClick={handleclosedialogdownload}
                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                            >
                                Cancel
                            </Button>
                            <Button onClick={() => { downloadResult() }}
                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                            >
                                Download
                            </Button>

                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openalert}
                    keepMounted
                    aria-labelledby="simple-dialog-title"
                    onClose={handleclosedialogalert}
                >
                    <DialogContent className="pop-content-delete">
                        <br />

                        <div style={{ height: "200px" }}>
                            <p className="deleteEvent">No responses present yet!!!</p>
                            <Button onClick={handleclosedialogalert}
                                style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                            >
                                Cancel
                            </Button>

                        </div>
                    </DialogContent>
                </Dialog>
                <Dialog
                    open={openShare}
                    onClose={handleClosedDialogShare}
                    keepMounted
                    aria-labelledby="simple-dialog-title"
                >
                    <DialogContent className="pop-content-delete" style={{ padding: "10px" }}>

                        <textarea
                            ref={textAreaRef}
                            value={`${window.location.origin}/event/singleeventfetch/:${openShare}`}
                            className="sharelinkstyle"

                        />

                        <div>
                            <Button style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                onClick={handleClosedDialogShare}>
                                Cancel
                            </Button>
                            <Button style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "20px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                onClick={copyToClipboard}>
                                Copy link
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div >
    )
}

export default Events
