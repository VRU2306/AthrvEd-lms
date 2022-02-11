import React, { useState, useEffect } from 'react'
import { Grid, makeStyles, useTheme, Button, withStyles, Dialog, DialogContent } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import {
    TextValidator,
    ValidatorForm,
    SelectValidator
} from "react-material-ui-form-validator";
import { useStoreActions, useStoreState } from "easy-peasy";
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import EventNoteIcon from '@material-ui/icons/EventNote';
import PeopleIcon from '@material-ui/icons/People';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import FormControl from "@material-ui/core/FormControl";
import { Avatar } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import moment from 'moment';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Slider from '@material-ui/core/Slider';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { ToastContainer, toast } from 'material-react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#0F1012',
        width: 'calc(100% - 350px)',
        minHeight: '100vh',
        marginLeft: '40',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        color: 'white',
        marginTop: '30px'
    },
    appBarSpacer: theme.mixins.toolbar,
    kanbanbox: {
        backgroundColor: "rgb(31, 30, 30)",
        borderRadius: "20px",
        padding: "40px",
        marginTop: "20px",
    },
    kanbanboxleft: {
        marginBottom: "15px",
        marginTop: "10px",
        color: "grey",
        fontWeight: "bold",
    },
    kanbanboxright: {
        marginBottom: "15px",
        padding: "5px",
        borderRadius: "5px",
        "&:hover": {
            backgroundColor: "#373B3D"
        }
    },
    resize: {
        fontSize: "36px",
        fontWeight: "bold"
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    }

}));
const defaultMaterialTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            backgroundColor: "#202328 !important",
            light: "#ffffff",
            main: "#67737A"
        }
    }
});
toast.configure();

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
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

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

const Singlekanban = () => {
    const classes = useStyles();
    const theme = useTheme();
    let activityid = localStorage.getItem("activityid")
    let taskid = localStorage.getItem("taskID");
    console.log("taskid", taskid)
    const [carddetails, setcarddetails] = useState({})
    const [userids, setuserIds] = useState([])
    const [alluserids, setAllUserIds] = useState([])
    const [startdate, setStartDate] = useState(new Date())
    const [enddate, setEndDate] = useState(new Date())
    const [pro, setpro] = useState(0)
    const [supervisorid, setSupervisorId] = useState([])
    console.log("hellohoiii", pro)
    let { type } = useStoreState(state => state.profileMod.profile);
    let { user_id } = useStoreState(state => state.profileMod.profile);
    console.log(type)
    console.log(user_id)


    const [isSupervisor, setIsSupervisor] = useState(false)
    const [isUser, setIsUser] = useState(false)


    const [opentransfer, setopentransfer] = useState(false)
    const [transferreason, settransferreason] = useState("")
    const handleclosedialogtransfer = () => {
        setopentransfer(false)
    }
    async function requesttransfer() {
        const requestOptions = {
            Credential: 'include',
            method: 'POST',
            headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
            body: JSON.stringify({
                reason_for_transfer: transferreason
            })

        }
        const response = await fetch(`/taskroute/transferrequest?taskid=${taskid}`, requestOptions);
        console.log(response)
        if (response.status == 200) {
            handleclosedialogtransfer();
            fetchsingleTask();
        }
    }

    const [openextend, setopenextend] = useState(false)
    const [extendreason, setextendreason] = useState("")
    const handleclosedialogextend = () => {
        setopenextend(false)
    }
    async function requestextend() {
        const requestOptions = {
            Credential: 'include',
            method: 'POST',
            headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
            body: JSON.stringify({
                reason_for_extension: extendreason
            })

        }
        const response = await fetch(`/taskroute/deadlinerequest?taskid=${taskid}`, requestOptions);
        console.log(response)
        if (response.status == 200) {
            handleclosedialogextend();
            fetchsingleTask();
        }
    }

    const [openadmintransfer, setopenadmintransfer] = useState(false)
    const handleclosedialogadmintransfer = () => {
        setopenadmintransfer(false);
        fetchsingleTask();
    }

    async function admintransfer() {
        console.log(carddetails.status)
        console.log(startdate)
        console.log(enddate)
        console.log(user_id)
        if (openadmintransfer == 'assignnow') {
            const requestOptions = {
                Credential: 'include',
                method: 'POST',
                headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: carddetails.status,
                    start_date: moment(startdate).format("YYYY-MM-DD"),
                    end_date: moment(enddate).format("YYYY-MM-DD"),
                    user_id: userids
                })

            }
            const response = await fetch(`/taskroute/transfertask?taskid=${taskid}&value=${openadmintransfer}`, requestOptions);
            console.log(response)
            if (response.status == 200) {
                handleclosedialogadmintransfer();
            }
        }
        else {
            const requestOptions = {
                Credential: 'include',
                method: 'POST',
                headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
                body: JSON.stringify({})

            }
            const response = await fetch(`/taskroute/transfertask?taskid=${taskid}&value=${openadmintransfer}`, requestOptions);
            console.log(response)
            if (response.status == 200) {
                handleclosedialogadmintransfer();
            }
        }

    }

    const [openadminextend, setopenadminextend] = useState(false)
    const [extenddate, setextenddate] = useState(new Date())
    const handleclosedialogadminextend = () => {
        setopenadminextend(false);
        fetchsingleTask();
    }

    async function adminextend() {
        console.log(carddetails.status)
        console.log(startdate)
        console.log(enddate)
        console.log(user_id)
        const requestOptions = {
            Credential: 'include',
            method: 'POST',
            headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
            body: JSON.stringify({
                extended_date: moment(extenddate).format("YYYY-MM-DD")
            })

        }
        const response = await fetch(`/taskroute/deadlineextend?taskid=${taskid}`, requestOptions);
        console.log(response)
        if (response.status == 200) {
            handleclosedialogadminextend();
        }

    }




    function fetchsingleTask() {
        fetch(`/taskroute/fetch?taskid=${taskid}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((response) => {

            response.json().then((result) => {
                console.log("fetchAllTask", result)
                setcarddetails(result)
                setuserIds(result.user_id);
                setStartDate(result.start_date);
                setEndDate(result.end_date);
                if (result.user_id?.indexOf(user_id) != -1) {
                    setIsUser(true)
                }
                if (result.progress != null) {
                    setpro(result.progress)
                }
            })
        })
    }


    const [statusavailable, setStatusavailable] = useState([])
    function fetchactivitydetails() {
        fetch(`/activity/fetch?tactivityid=${activityid}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response)
            response.json().then((result) => {
                console.log("fetchactivity", result)
                for (let i = 0; i < result.length; i++) {
                    if (result[i].activityid == activityid) {
                        setStatusavailable(result[i].status_available)
                        setAllUserIds(result[i].user_id)
                        setSupervisorId(result[i].suid)
                        if (result[i].suid.indexOf(user_id) != -1) {
                            setIsSupervisor(true)
                        }
                    }
                }
            })
        })
    }
    let getunBlockedusers = useStoreActions((action) => action.authMod.FETCH_ALL_UNBLOCKEDSERS)
    let userss = useStoreState(state => state.authMod.users);

    useEffect(() => {
        fetchsingleTask()
        fetchactivitydetails()
        getunBlockedusers(userss)
    }, [])



    async function taskedit() {

        if (type == 'A' || isSupervisor) {
            const requestOptions = {
                Credential: 'include',
                method: 'POST',
                headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    task_title: carddetails.task_title,
                    task_description: carddetails.task_description,
                    user_id: userids,
                    status: carddetails.status,
                    start_date: moment(startdate).format("YYYY-MM-DD"),
                    end_date: moment(enddate).format("YYYY-MM-DD")
                })

            }
            const response = await fetch(`/taskroute/edittask?taskid=${taskid}`, requestOptions);
            console.log(response)
            if (response.status == 200) {
                fetchsingleTask()
            toast.success('Save Changes', { position: toast.POSITION.BOTTOM_CENTER })

            }
        }
        if (isUser) {
            const requestOptions = {
                Credential: 'include',
                method: 'POST',
                headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: carddetails.status,
                    progress: pro,
                    knowledge_gained: carddetails.knowledge_gained ? carddetails.knowledge_gained : "Empty"
                })

            }
            const response = await fetch(`/taskroute/statusupdate?taskid=${taskid}`, requestOptions);
            console.log(response)
            if (response.status == 200) {
                fetchsingleTask()
            }
        }
    }
    console.log(carddetails.task_title)

    var unblocked = useStoreState(state => state.authMod.unblocked);
    function getname(id) {
        console.log(id)
        if (id != undefined) {
            console.log(unblocked)
            const filteredUser = unblocked.filter(users => users.user_id == id)
            console.log(filteredUser)
            const name = filteredUser.length ?
                `${filteredUser[0].fname} ${filteredUser[0].lname}` : ""
            return name;
        }

    }

    function getImage(image) {
        console.log(image)
        const userinfo = unblocked.filter(users => users.user_id == image)
        console.log(userinfo)
        const images = userinfo.map(x => x.image)
        return images;
    }

    function getStyles(id, ids, theme) {
        return {
            fontWeight:
                ids.indexOf(id) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    console.log(isSupervisor)
    console.log(isUser)
    return (
        <div className={[classes.root, 'addKanbanmain'].join(' ')}>
            <div className={classes.appBarSpacer} />
            <div className={classes.content}>

                {/* event headers */}
                <Link to={`/main/activity/${activityid}`} style={{ color: "white" }}>
                    <ArrowBackIcon onClick={() => { localStorage.removeItem("taskID") }} />
                </Link>
                <ValidatorForm onSubmit={taskedit}>
                    <Grid container xs={12} md={7} className={classes.kanbanbox}>

                        <Grid item xs={12} className={classes.kanbanboxleft}>
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <TextValidator
                                    autoFocus
                                    size="small"
                                    variant="standard"
                                    style={{
                                        fontSize: "50px",
                                        fontWeight: "bold"

                                    }}
                                    margin="dense"
                                    value={carddetails.task_title}
                                    onChange={e => {
                                        carddetails["task_title"] = e.target.value;
                                        setcarddetails({ ...carddetails });
                                    }}
                                    placeholder="Type card name...."
                                    fullWidth
                                    InputProps={{
                                        classes: {
                                            input: classes.resize
                                        },
                                        disableUnderline: true
                                    }}
                                    inputProps={{
                                        maxLength: 19
                                      }}

                                    disabled={(type == 'A' || isSupervisor) ? false : true}
                                />
                            </ThemeProvider>

                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <ArrowDropDownCircleIcon style={{ fontSize: "20px", marginRight: "10px" }} />Status
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            <FormControl fullWidth={true}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <SelectValidator
                                        label={carddetails.status}
                                        size="small"
                                        variant="standard"
                                        id="demo-simple-select"
                                        value={carddetails.status}
                                        onChange={e => {
                                            carddetails["status"] = e.target.value;
                                            setcarddetails({ ...carddetails });
                                        }
                                        }

                                        fullWidth
                                        disabled={(type == 'A' || isSupervisor || isUser) ? false : true}

                                    >
                                        {statusavailable.map((stat) => {
                                            return (
                                                <MenuItem value={stat}>{stat}</MenuItem>
                                            )
                                        })}


                                    </SelectValidator>
                                </ThemeProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <PeopleIcon style={{ fontSize: "20px", marginRight: "10px" }} />Assign
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            <FormControl className={classes.formControl} fullWidth={true}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <Select
                                        labelId="demo-mutiple-chip-label"
                                        id="demo-mutiple-chip"
                                        multiple
                                        value={userids}
                                        onChange={(e) => {
                                            setuserIds(e.target.value);
                                        }}
                                        input={<Input id="select-multiple-chip" />}
                                        renderValue={(selected) => (
                                            <div className={classes.chips}>
                                                {selected?.map((value) => (
                                                    <span>
                                                        <div>
                                                            <span className="para2">
                                                                {getImage(value) ? (
                                                                    < img height="20" width="20" style={{ borderRadius: 50, marginBottom: -5, marginRight: 2, marginLeft: 10, marginTop: 10 }} src={getImage(value)} alt="aa" />) :
                                                                    <Avatar style={{ width: 20, height: 20, marginBottom: -20, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
                                                            </span>
                                                            <span >{getname(value) || 'AthrV-Ed'}</span>
                                                        </div>
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        MenuProps={MenuProps}
                                        disabled={(type == 'A' || isSupervisor) ? false : true}

                                    >
                                        {alluserids?.map((id) => (
                                            <MenuItem key={id} value={id} style={getStyles(id, alluserids, theme)}>
                                                <div>
                                                    <span className="para2">
                                                        {getImage(id) ? (
                                                            < img height="20" width="20" style={{ borderRadius: 50, marginBottom: -5, marginRight: 10, marginTop: 10 }} src={getImage(id)} alt="aa" />) :
                                                            <Avatar style={{ width: 20, height: 20, marginBottom: -20, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
                                                    </span>
                                                    <span >{getname(id) || 'AthrV-Ed'}</span>
                                                </div>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </ThemeProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <EventNoteIcon style={{ fontSize: "20px", marginRight: "10px" }} />Start Date
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            <p >
                                <ThemeProvider theme={calender}>
                                    <CssBaseline />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                        <DatePicker
                                            value={startdate}
                                            onChange={
                                                setStartDate
                                            }
                                            InputProps={{
                                                disableUnderline: true
                                            }}
                                            fullWidth
                                            disabled={(type == 'A' || isSupervisor) ? false : true}
                                        />
                                    </MuiPickersUtilsProvider>
                                </ThemeProvider>

                            </p>
                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <EventNoteIcon style={{ fontSize: "20px", marginRight: "10px" }} />End Date
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            <p >
                                <ThemeProvider theme={calender}>
                                    <CssBaseline />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            minDate={startdate}
                                            value={enddate}
                                            onChange={
                                                setEndDate
                                            }
                                            InputProps={{
                                                disableUnderline: true
                                            }}
                                            fullWidth
                                            disabled={(type == 'A' || isSupervisor) ? false : true}
                                        />
                                    </MuiPickersUtilsProvider>
                                </ThemeProvider>

                            </p>
                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <EventNoteIcon style={{ fontSize: "20px", marginRight: "10px" }} />Extended Deadline
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            {carddetails.extended_date ? moment(carddetails.extended_date).format("MMMM Do, YYYY") : 'Empty'}
                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <DescriptionOutlinedIcon style={{ fontSize: "20px", marginRight: "10px" }} />Knowledge gained
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <TextValidator
                                    autoFocus
                                    size="small"
                                    variant="standard"
                                    margin="dense"
                                    value={carddetails.knowledge_gained}
                                    onChange={e => {
                                        carddetails["knowledge_gained"] = e.target.value;
                                        setcarddetails({ ...carddetails });
                                    }}
                                    placeholder="Empty"
                                    fullWidth
                                    multiline
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                    disabled={(isUser) ? false : true}

                                />
                            </ThemeProvider>
                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <DonutLargeIcon style={{ fontSize: "20px", marginRight: "10px" }} />Progress
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            <PrettoSlider
                                valueLabelDisplay="auto"
                                aria-label="pretto slider"
                                value={pro}
                                onChange={(e, v) => {
                                    setpro(v)
                                }}

                            />
                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <DescriptionOutlinedIcon style={{ fontSize: "20px", marginRight: "10px" }} />Reason for extension
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            {carddetails.reason_for_extension || 'Empty'}
                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <DescriptionOutlinedIcon style={{ fontSize: "20px", marginRight: "10px" }} />reason for transfer
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            {carddetails.reason_for_transfer || 'Empty'}
                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <RadioButtonUncheckedIcon style={{ fontSize: "20px", marginRight: "10px" }} />Transfer Task
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            {carddetails.status == 'transferrequest' || carddetails.status == 'pendingtransfer' || carddetails.status == 'deadlinerequest' ?
                                'Empty' :
                                <Button
                                    style={{
                                        color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                                        fontSize: 16, lineHeight: "25px",
                                        background: "linear-gradient(0deg, #2D66BD, #2D66BD), linear-gradient(90deg, #2B7CAA 0%, #2B4BAA 100%)"
                                    }}
                                    disabled={(isUser) ? false : true}
                                    onClick={() => setopentransfer(true)}
                                >Apply
                                </Button>}

                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <RadioButtonUncheckedIcon style={{ fontSize: "20px", marginRight: "10px" }} />Extend Deadline
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            {carddetails.status == 'transferrequest' || carddetails.status == 'pendingtransfer' || carddetails.status == 'deadlinerequest' ?
                                'Empty' :
                                <Button
                                    style={{
                                        color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                                        fontSize: 16, lineHeight: "25px",
                                        background: "linear-gradient(0deg, #2D66BD, #2D66BD), linear-gradient(90deg, #2B7CAA 0%, #2B4BAA 100%)"
                                    }}
                                    disabled={(isUser) ? false : true}
                                    onClick={() => setopenextend(true)}
                                >Apply
                                </Button>}
                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <DescriptionOutlinedIcon style={{ fontSize: "20px", marginRight: "10px" }} />Description
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <TextValidator
                                    autoFocus
                                    size="small"
                                    variant="standard"
                                    margin="dense"
                                    multiline
                                    value={carddetails.task_description}
                                    onChange={e => {
                                        carddetails["task_description"] = e.target.value;
                                        setcarddetails({ ...carddetails });
                                    }}
                                    placeholder="Description...."
                                    fullWidth
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                    disabled={(type == 'A' || isSupervisor) ? false : true}
                                />
                            </ThemeProvider>
                        </Grid>
                        <Grid item xs={4} className={classes.kanbanboxleft}>
                            <PeopleIcon style={{ fontSize: "20px", marginRight: "10px" }} />Assigned by
                        </Grid>
                        <Grid item xs={8} className={classes.kanbanboxright}>
                            <div>
                                <span className="para2">
                                    {getImage(carddetails.assignedby) ? (
                                        < img height="20" width="20" style={{ borderRadius: 50, marginBottom: -5, marginRight: 10 }} src={getImage(carddetails.assignedby)} alt="aa" />) :
                                        <Avatar style={{ width: 20, height: 20, marginBottom: -20, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
                                </span>
                                <span >{getname(carddetails.assignedby) || 'AthrV-Ed'}</span>
                            </div>
                        </Grid>
                        {carddetails.status == 'transferrequest' && (type == 'A' || isSupervisor) ? <><Grid item xs={4} className={classes.kanbanboxleft}>
                            <RadioButtonUncheckedIcon style={{ fontSize: "20px", marginRight: "10px" }} />Transfer Task Request
                        </Grid>
                            <Grid item xs={8} className={classes.kanbanboxright}>
                                <Button
                                    style={{
                                        color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                                        fontSize: 16, lineHeight: "25px", marginLeft: "20px", marginTop: "10px",
                                        background: "linear-gradient(0deg, #2D66BD, #2D66BD), linear-gradient(90deg, #2B7CAA 0%, #2B4BAA 100%)"
                                    }}
                                    disabled={(type == 'A' || isSupervisor) ? false : true}
                                    onClick={() => setopenadmintransfer("assignnow")}
                                >Assign Now
                                </Button>
                                <Button
                                    style={{
                                        color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                                        fontSize: 16, lineHeight: "25px", marginLeft: "20px", marginTop: "10px",
                                        background: "linear-gradient(0deg, #2D66BD, #2D66BD), linear-gradient(90deg, #2B7CAA 0%, #2B4BAA 100%)"
                                    }}
                                    disabled={(type == 'A' || isSupervisor) ? false : true}
                                    onClick={() => setopenadmintransfer("assignlater")}
                                >Assign Later
                                </Button>
                                <Button
                                    style={{
                                        color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                                        fontSize: 16, lineHeight: "25px", marginLeft: "20px", marginTop: "10px",
                                        background: "linear-gradient(0deg, #2D66BD, #2D66BD), linear-gradient(90deg, #2B7CAA 0%, #2B4BAA 100%)"
                                    }}
                                    disabled={(type == 'A' || isSupervisor) ? false : true}
                                    onClick={() => setopenadmintransfer("cancel")}
                                >Reject
                                </Button>
                            </Grid></> : null}

                        {carddetails.status == 'pendingtransfer' && (type == 'A' || isSupervisor) ? <><Grid item xs={4} className={classes.kanbanboxleft}>
                            <RadioButtonUncheckedIcon style={{ fontSize: "20px", marginRight: "10px" }} />Pending Transfer Task
                        </Grid>
                            <Grid item xs={8} className={classes.kanbanboxright}>
                                <Button
                                    style={{
                                        color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                                        fontSize: 16, lineHeight: "25px",
                                        background: "linear-gradient(0deg, #2D66BD, #2D66BD), linear-gradient(90deg, #2B7CAA 0%, #2B4BAA 100%)"
                                    }}
                                    disabled={(type == 'A' || isSupervisor) ? false : true}
                                    onClick={() => setopenadmintransfer("assignnow")}
                                >Assign Now
                                </Button>
                            </Grid></> : null}

                        {carddetails.status == 'deadlinerequest' && (type == 'A' || isSupervisor) ? <><Grid item xs={4} className={classes.kanbanboxleft}>
                            <RadioButtonUncheckedIcon style={{ fontSize: "20px", marginRight: "10px" }} />Extend Deadline
                        </Grid>
                            <Grid item xs={8} className={classes.kanbanboxright}>
                                <Button
                                    style={{
                                        color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                                        fontSize: 16, lineHeight: "25px",
                                        background: "linear-gradient(0deg, #2D66BD, #2D66BD), linear-gradient(90deg, #2B7CAA 0%, #2B4BAA 100%)"
                                    }}
                                    disabled={(type == 'A' || isSupervisor) ? false : true}
                                    onClick={() => setopenadminextend(true)}
                                >Extend
                                </Button>
                            </Grid></> : null}

                        <Grid item xs={12}>
                            {(type == 'A' || isSupervisor || isUser) && carddetails.status != 'transferrequest' && carddetails.status != 'pendingtransfer' && carddetails.status != 'deadlinerequest' ?
                                <Button
                                    style={{
                                        color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal",
                                        fontSize: 16, lineHeight: "25px", float: "right",
                                        background: "linear-gradient(0deg, #2D66BD, #2D66BD), linear-gradient(90deg, #2B7CAA 0%, #2B4BAA 100%)"
                                    }}
                                    type="submit"
                                >Edit
                                </Button> : null}

                        </Grid>


                    </Grid>
                </ValidatorForm>
                <Dialog
                    open={opentransfer}
                    keepMounted
                    aria-labelledby="simple-dialog-title"
                    onClose={handleclosedialogtransfer}

                >
                    <DialogContent className="pop-content-new">
                        <br />
                        <ValidatorForm onSubmit={requesttransfer}>

                            <div>
                                <p className="addnewgroup">Task Transfer</p>
                                <Grid container xs={12}>
                                    <Grid item xs={6} style={{ color: "white", marginTop: "10px", fontSize: "20px" }}>Enter the reason : </Grid>
                                    <Grid item xs={6}>
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                            <TextValidator
                                                autoFocus
                                                size="small"
                                                variant="filled"
                                                margin="dense"
                                                value={transferreason}
                                                onChange={e => settransferreason(e.target.value)}
                                                placeholder="Reason"
                                                fullWidth
                                                validators={["required"]}
                                                errorMessages={["This field is required"]}
                                                multiline
                                                InputProps={{
                                                    disableUnderline: true
                                                }}
                                            />
                                        </ThemeProvider>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={handleclosedialogtransfer}
                                            style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                            type="submit"
                                        >
                                            Apply
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </ValidatorForm >

                    </DialogContent>

                </Dialog>
                <Dialog
                    open={openextend}
                    keepMounted
                    aria-labelledby="simple-dialog-title"
                    onClose={handleclosedialogextend}

                >
                    <DialogContent className="pop-content-new">
                        <br />
                        <ValidatorForm onSubmit={requestextend}>

                            <div>
                                <p className="addnewgroup">Extend Deadline</p>
                                <Grid container xs={12}>
                                    <Grid item xs={6} style={{ color: "white", marginTop: "10px", fontSize: "20px" }}>Enter the reason : </Grid>
                                    <Grid item xs={6}>
                                        <ThemeProvider theme={defaultMaterialTheme}>
                                            <TextValidator
                                                autoFocus
                                                size="small"
                                                variant="filled"
                                                margin="dense"
                                                value={extendreason}
                                                onChange={e => setextendreason(e.target.value)}
                                                placeholder="Reason"
                                                fullWidth
                                                validators={["required"]}
                                                errorMessages={["This field is required"]}
                                                multiline
                                                InputProps={{
                                                    disableUnderline: true
                                                }}
                                            />
                                        </ThemeProvider>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={handleclosedialogextend}
                                            style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                            type="submit"
                                        >
                                            Apply
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </ValidatorForm >

                    </DialogContent>

                </Dialog>

                {/* transfer task */}
                <Dialog
                    open={openadmintransfer}
                    keepMounted
                    aria-labelledby="simple-dialog-title"
                    onClose={handleclosedialogadmintransfer}

                >
                    <DialogContent className="pop-content-new">
                        <br />
                        <ValidatorForm onSubmit={admintransfer}>

                            <div>
                                <p className="addnewgroup">Task Transfer</p>
                                {openadmintransfer == 'assignnow' ?
                                    <Grid container xs={12}>
                                        <Grid item xs={4} className={classes.kanbanboxleft}>
                                            <ArrowDropDownCircleIcon style={{ fontSize: "20px", marginRight: "10px" }} />Status
                                        </Grid>
                                        <Grid item xs={8} className={classes.kanbanboxright}>
                                            <FormControl fullWidth={true}>
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <SelectValidator
                                                        label={carddetails.status}
                                                        size="small"
                                                        variant="standard"
                                                        id="demo-simple-select"
                                                        value={carddetails.status}
                                                        onChange={e => {
                                                            carddetails["status"] = e.target.value;
                                                            setcarddetails({ ...carddetails });
                                                        }
                                                        }

                                                        fullWidth
                                                        disabled={(type == 'A' || isSupervisor || isUser) ? false : true}

                                                    >
                                                        {statusavailable.map((stat) => {
                                                            return (
                                                                <MenuItem value={stat}>{stat}</MenuItem>
                                                            )
                                                        })}


                                                    </SelectValidator>
                                                </ThemeProvider>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4} className={classes.kanbanboxleft}>
                                            <PeopleIcon style={{ fontSize: "20px", marginRight: "10px" }} />Assign
                                        </Grid>
                                        <Grid item xs={8} className={classes.kanbanboxright}>
                                            <FormControl className={classes.formControl} fullWidth={true}>
                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <Select
                                                        labelId="demo-mutiple-chip-label"
                                                        id="demo-mutiple-chip"
                                                        multiple
                                                        value={userids}
                                                        onChange={(e) => {
                                                            setuserIds(e.target.value);
                                                        }}
                                                        input={<Input id="select-multiple-chip" />}
                                                        renderValue={(selected) => (
                                                            <div className={classes.chips}>
                                                                {selected?.map((value) => (
                                                                    <span>
                                                                        <div>
                                                                            <span className="para2">
                                                                                {getImage(value) ? (
                                                                                    < img height="20" width="20" style={{ borderRadius: 50, marginBottom: -5, marginRight: 2, marginLeft: 10, marginTop: 10 }} src={getImage(value)} alt="aa" />) :
                                                                                    <Avatar style={{ width: 20, height: 20, marginBottom: -20, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
                                                                            </span>
                                                                            <span >{getname(value) || 'AthrV-Ed'}</span>
                                                                        </div>
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                        MenuProps={MenuProps}
                                                        disabled={(type == 'A' || isSupervisor) ? false : true}

                                                    >
                                                        {alluserids?.map((id) => (
                                                            <MenuItem key={id} value={id} style={getStyles(id, alluserids, theme)}>
                                                                <div>
                                                                    <span className="para2">
                                                                        {getImage(id) ? (
                                                                            < img height="20" width="20" style={{ borderRadius: 50, marginBottom: -5, marginRight: 10, marginTop: 10 }} src={getImage(id)} alt="aa" />) :
                                                                            <Avatar style={{ width: 20, height: 20, marginBottom: -20, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
                                                                    </span>
                                                                    <span >{getname(id) || 'AthrV-Ed'}</span>
                                                                </div>
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </ThemeProvider>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={4} className={classes.kanbanboxleft}>
                                            <EventNoteIcon style={{ fontSize: "20px", marginRight: "10px" }} />Start Date
                                        </Grid>
                                        <Grid item xs={8} className={classes.kanbanboxright}>
                                            <p >
                                                <ThemeProvider theme={calender}>
                                                    <CssBaseline />
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                                        <DatePicker
                                                            value={startdate}
                                                            onChange={
                                                                setStartDate
                                                            }
                                                            InputProps={{
                                                                disableUnderline: true
                                                            }}
                                                            fullWidth
                                                            disabled={(type == 'A' || isSupervisor) ? false : true}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </ThemeProvider>

                                            </p>
                                        </Grid>
                                        <Grid item xs={4} className={classes.kanbanboxleft}>
                                            <EventNoteIcon style={{ fontSize: "20px", marginRight: "10px" }} />End Date
                                        </Grid>
                                        <Grid item xs={8} className={classes.kanbanboxright}>
                                            <p >
                                                <ThemeProvider theme={calender}>
                                                    <CssBaseline />
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <DatePicker
                                                            minDate={startdate}
                                                            value={enddate}
                                                            onChange={
                                                                setEndDate
                                                            }
                                                            InputProps={{
                                                                disableUnderline: true
                                                            }}
                                                            fullWidth
                                                            disabled={(type == 'A' || isSupervisor) ? false : true}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                </ThemeProvider>

                                            </p>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button onClick={handleclosedialogadmintransfer}
                                                style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                                type="submit"
                                            >
                                                Assign
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    : null}
                                {openadmintransfer == 'assignlater' ?
                                    <Grid container xs={12}>
                                        <Grid item xs={12} style={{ color: "white", marginTop: "10px", fontSize: "20px" }}>Are you sure? Want to assign later!!</Grid>

                                        <Grid item xs={6}>
                                            <Button onClick={handleclosedialogadmintransfer}
                                                style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                                type="submit"
                                            >
                                                Assign Later
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    : null}
                                {openadmintransfer == 'cancel' ?
                                    <Grid container xs={12}>
                                        <Grid item xs={12} style={{ color: "white", marginTop: "10px", fontSize: "20px" }}>Are you sure? Want to reject the request!!</Grid>
                                        <Grid item xs={6}>
                                            <Button onClick={handleclosedialogadmintransfer}
                                                style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                                            >
                                                Cancel
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Button
                                                style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                                type="submit"
                                            >
                                                Reject
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    : null}

                            </div>
                        </ValidatorForm >

                    </DialogContent>

                </Dialog>

                {/* extend deadline */}
                <Dialog
                    open={openadminextend}
                    keepMounted
                    aria-labelledby="simple-dialog-title"
                    onClose={handleclosedialogadminextend}

                >
                    <DialogContent className="pop-content-new">
                        <br />
                        <ValidatorForm onSubmit={adminextend}>

                            <div>
                                <p className="addnewgroup">Extend Deadline</p>
                                <Grid container xs={12}>
                                    <Grid item xs={6} style={{ color: "white", marginTop: "10px", fontSize: "20px" }}>New Deadline :  </Grid>
                                    <Grid item xs={6} className={classes.kanbanboxright}>
                                        <p >
                                            <ThemeProvider theme={calender}>
                                                <CssBaseline />
                                                <MuiPickersUtilsProvider utils={DateFnsUtils} >
                                                    <DatePicker
                                                        minDate={carddetails.end_date}
                                                        value={extenddate}
                                                        onChange={
                                                            setextenddate
                                                        }
                                                        InputProps={{
                                                            disableUnderline: true
                                                        }}
                                                        fullWidth
                                                        disabled={(type == 'A' || isSupervisor) ? false : true}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </ThemeProvider>

                                        </p>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button onClick={handleclosedialogadminextend}
                                            style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            style={{ color: "white", marginBottom: "20px", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                            type="submit"
                                        >
                                            Apply
                                        </Button>
                                    </Grid>
                                </Grid>

                            </div>
                        </ValidatorForm >

                    </DialogContent>

                </Dialog>
            </div>
        </div >
    )
}

export default Singlekanban
