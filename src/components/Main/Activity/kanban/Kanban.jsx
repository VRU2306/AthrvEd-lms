import { Button, Grid, Dialog, DialogContent, makeStyles, MenuItem, Select } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Add from "@material-ui/icons/AddSharp";
import './kanban.css'
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
    TextValidator,
    ValidatorForm,
    SelectValidator
} from "react-material-ui-form-validator";
import { createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useStoreState, useStoreActions } from "easy-peasy";
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import { ToastContainer, toast } from 'material-react-toastify';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    resize: {
        fontSize: "16px",
        fontWeight: "bold",
        color: 'white',
    },
    dialogPaper: {
        minHeight: '90vh',
    },
}))
toast.configure();

const defaultMaterialTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            // Purple and green play nicely together.

            backgroundColor: "#202328 !important",
            light: "#ffffff",
            main: "#67737A"
        }
    }
});

function Kanban() {
    const classes = useStyles();

    let activityid = localStorage.getItem("activityid")
    const [columns, setColumns] = useState({})
    function fetchAllTask() {
        fetch(`/taskroute/fetch?activityid=${activityid}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((response) => {

            response.json().then((result) => {
                // console.log("fetchAllTask", result)

                for (let i = 0; i < result.length; i++) {
                    columns[i] = result[i];

                }
                setColumns({ ...columns })

            })
        })
    }
    const [statusavailable, setstatusavailable] = useState([])
    const [useravailable, setuseravailable] = useState([])
    const [isSupervisor, setIsSupervisor] = useState(false)

    let users = useStoreState(state => state.authMod.users);
    let { user_id } = useStoreState(state => state.profileMod.profile);
    let { type } = useStoreState(state => state.profileMod.profile);
    // console.log(users)
    function fetchactivityavailable() {
        fetch(`/activity/fetch?activityid=${activityid}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((response) => {

            response.json().then((result) => {
                console.log("result", result)
                setstatusavailable(result.status_available)
                setuseravailable(result.user_id)
                if (result.suid.indexOf(user_id) != -1) {
                    setIsSupervisor(true)
                }

            })
        })


    }
    // console.log("columns", columns, statusavailable, useravailable)
    console.log("columns", columns, isSupervisor)

    const [transferrequest, settransferrequest] = useState([])
    const [deadlinerequest, setdeadlinerequest] = useState([])
    const [pendingtransfer, setpendingrequest] = useState([])
    function fetchrequesttask() {
        fetch(`/taskroute/requestfetchtask?activityid=${activityid}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((response) => {

            response.json().then((result) => {
                console.log("three", result)
                for (let i = 0; i < result.length; i++) {
                    if (result[i].status == 'transferrequest') {
                        settransferrequest(result[i])
                    }
                    else if (result[i].status == 'deadlinerequest') {
                        setdeadlinerequest(result[i])
                    }
                    else if (result[i].status == 'pendingtransfer') {
                        setpendingrequest(result[i])
                    }
                }



            })
        })
    }
    const [unblocked, setunblocked] = useState([])
    function fetchallunblockedusers() {
        fetch(`/admin/allunblockedmembers`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then((response) => {

            response.json().then((result) => {
                console.log("resultfetchallunblockedusers", result)
                setunblocked(result)

            })
        })
    }


    useEffect(() => {
        fetchAllTask()
        fetchactivityavailable()
        fetchrequesttask()
        fetchallunblockedusers()
    }, [])

    async function updatestatus(taskid, status) {
        // console.log("UO", taskid, status)
        const requestOptions = {
            Credential: 'include',
            method: 'POST',
            headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })

        }
        const response = await fetch(`/taskroute/statusupdate?taskid=${taskid}`, requestOptions);
        console.log(response)
    }
    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.task];
            const destItems = [...destColumn.task];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    task: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    task: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.task];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    task: copiedItems
                }
            });
        }
        // console.log("result",result.draggableId)
        // console.log("source",source,destination)
        // console.log("colums",columns[destination.droppableId].status)

        updatestatus(result.draggableId, columns[destination.droppableId].status);

    };

    const [openaddgroup, setopenaddgroup] = useState(false)
    const handleclosedialogaddgroup = () => {
        setopenaddgroup(false)
    }
    const [newstatusname, setnewstatusname] = useState()

    async function handlenewstatus() {

        statusavailable.push(newstatusname)
        setstatusavailable([...statusavailable])
        console.log("res.status_available", statusavailable)
        const requestOptions1 = {
            credentials: 'include',
            method: 'POST',
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status_available: statusavailable })
        }
        const response1 = await fetch(`/activity/statusupdate?activityid=${activityid}`, requestOptions1)
        console.log(response1)
        if (response1.status == 200) {
            // handleclosedialogaddgroup()
            // console.log(Object.keys(columns).length)
            if (Object.keys(columns).length !== 0) {
                setColumns({
                    ...columns,
                    [(parseInt(Object.keys(columns)[Object.keys(columns).length - 1]) + 1).toString()]: {
                        status: newstatusname,
                        task: []
                    }
                })
            }
            else {
                setColumns({
                    ...columns,
                    0: {
                        status: newstatusname,
                        task: []
                    }
                })
            }

            handleclosedialogaddgroup()
            // fetchAllTask()
        }
        else if (response1.status == 403) {
            statusavailable.pop()
            setstatusavailable([...statusavailable])
            toast.error('Status Already Exist', { position: "bottom-center", className: 'toast-error-container' })

        }
        // const res1=await response1.json()
        // console.log(res1)



    }

    const [opendeletecolumn, setopendeletecolumn] = useState(false)
    const handleclosedialogdelete = () => {
        setopendeletecolumn(false)
    }
    // console.log(opendeletecolumn)

    async function deletecolumn() {
        // console.log(opendeletecolumn,opendeletecolumn[0],opendeletecolumn[1])

        const requestOptions = {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            }
        }
        const response = await fetch(`/activity/statusdelete?activityid=${activityid}&status=${opendeletecolumn[0]}`, requestOptions);
        console.log(response)
        if (response.status == 200) {
            // setopendeletecolumn(false)
            // columns.splice(columns[opendeletecolumn[1]],1)
            // console.log(columns)
            delete columns[opendeletecolumn[1]]
            // console.log(opendeletecolumn[0],statusavailable.indexOf(opendeletecolumn[0]))
            statusavailable.splice(statusavailable.indexOf(opendeletecolumn[0]), 1)
            setstatusavailable([...statusavailable])
            handleclosedialogdelete()
            // setColumns({...columns})
            // fetchAllTask()
        }
    }

    const [opendeletecard, setopendeletecard] = useState(false)
    const handleclosedialogcarddelete = () => {
        setopendeletecard(false)
    }

    async function deletecard() {
        // console.log(opendeletecard,opendeletecard[0],opendeletecard[1],opendeletecard[2])

        const requestOptions = {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                "x-auth-token": localStorage.getItem("token"),
            }
        }
        const response = await fetch(`/taskroute/delete?taskid=${opendeletecard[1]}`, requestOptions);
        console.log(response)
        if (response.status == 200) {
            // console.log(columns[opendeletecard[0]].task[opendeletecard[2]])
            delete columns[opendeletecard[0]].task[opendeletecard[2]]

            handleclosedialogcarddelete()
        }
    }


    const [opennewcard, setopennewcard] = useState(false)
    const [tasktitle, settasktitle] = useState('')
    const [taskdesc, settaskdesc] = useState('')
    const [StartDate, setStartDate] = useState(new Date());
    const [EndDate, setEndDate] = useState(new Date());
    const [team, setTeam] = useState([])

    const handleclosedialognewcard = () => {
        setopennewcard(false)
        settaskdesc('')
        settasktitle('')
        setTeam([])

    }

    const handleStartDateChange = (StartDate) => {
        setStartDate(StartDate)
    }
    const handleEndDateChange = (EndDate) => {
        setEndDate(EndDate);
    };
    async function columncard() {
        // console.log("SDs",opennewcard)
        // console.log("sdsd", tasktitle)
        // console.log("sdsd", taskdesc)
        // console.log("sdsd", team.map((m) => m.user_id))
        // console.log("sdsd", moment(StartDate).format("YYYY-MM-DD HH:mm "))
        // console.log("sdsd", moment(EndDate).format("YYYY-MM-DD HH:mm "))
        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                task_title: tasktitle, task_description: taskdesc,
                activityid: activityid, user_id: team.map(m => m.user_id),
                status: opennewcard[0], start_date: moment(StartDate).format("YYYY-MM-DD"),
                end_date: moment(EndDate).format("YYYY-MM-DD")
            })
        }
        const response = await fetch(`/taskroute/create`, requestOptions)
        console.log(response)
        const res = await response.json()
        console.log(res)
        if (response.status == 201) {
            // console.log(columns[opennewcard[1]])
            columns[opennewcard[1]].task.push(res)
            setColumns({ ...columns })
            handleclosedialognewcard()
        }

    }
    console.log("teams", team, columns)

    const [opennewstatuscard, setopennewstatuscard] = useState(false)
    const [newstatusnamecolumn, setnewstatusnamecolumn] = useState('')
    const handleclosedialogcardnewstatus = () => {
        setopennewstatuscard(false)
        setnewstatusnamecolumn('')
    }

    async function newstatuscard() {
        console.log("Sdsd")

        console.log(newstatusnamecolumn, opennewstatuscard)
        const requestOptions = {
            credentials: 'include',
            method: 'POST',
            headers: {
                "x-auth-token": localStorage.getItem("token"),
                'Content-Type': 'application/json',
            },
        }
        const response = await fetch(`/activity/statusedit?activityid=${activityid}&status_new=${newstatusnamecolumn}&status_old=${opennewstatuscard[0]}`, requestOptions)
        console.log(response)

        if (response.status == 200) {
            columns[opennewstatuscard[1]].status = newstatusnamecolumn
            setColumns({ ...columns })
            // console.log(columns[opennewstatuscard[1]])
            handleclosedialogcardnewstatus()

        }
        else if (response.status == 403) {
            toast.error('Status Already Exist', { position: "bottom-center", className: 'toast-error-container' })

        }
    }


    function getImage(image) {
        // console.log(image)
        const userinfo = unblocked.filter(users => users.user_id == image)
        // console.log(userinfo, unblocked)
        const images = userinfo.map(x => x.image)
        return images;
    }
    function getname(id) {
        // console.log(id)
        if (id != undefined) {
            // console.log(unblocked)
            const filteredUser = unblocked.filter(users => users.user_id == id)
            // console.log(filteredUser)
            const name = filteredUser.length ?
                `${filteredUser[0].fname} ${filteredUser[0].lname}` : ""
            return name;
        }

    }
    return (<>
        <div style={{ display: "flex", height: "100%", overflowX: "scroll" }}>
            {(type == 'A' || isSupervisor) && <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <div className="heading">
                                <div style={{ width: "140px", overflowWrap: "break-word" }}>
                                    <h2 className="Status">{column.status}</h2>
                                </div>
                                <div>
                                    <DeleteIcon className="deleteiconkanban" onClick={() => { setopendeletecolumn([column.status, columnId]) }} />
                                    <Add className="addiconkanban" onClick={() => { setopennewcard([column.status, columnId]) }} />
                                    <EditIcon className="editiconkanban" onClick={() => { setopennewstatuscard([column.status, columnId]) }} />
                                </div>
                            </div>
                            <div style={{ margin: 8 }}>
                                <Droppable droppableId={columnId.toString()} key={columnId}>
                                    {(provided, snapshot) => {
                                        return (<>
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    // background: snapshot.isDraggingOver
                                                    //     ? "lightblue"
                                                    //     : "rgb(66, 65, 65)",
                                                    padding: 4,
                                                    width: 250,
                                                    minHeight: 500
                                                }}
                                            >
                                                {column.task.map((item, index) => {
                                                    return (<div style={{ display: "flex" }} >
                                                        <Link to={`/main/activity/${activityid}/single`} style={{ textDecoration: "none" }} onClick={() => { localStorage.setItem("taskID", item.taskid); }}>
                                                            {/* <Button style={{ textDecoration: "none", textTransform: "none" }} onClick={() => { localStorage.setItem("taskID", item.taskid); window.location.href = `/main/activity/${activityid}/single` }} > */}

                                                            <Draggable
                                                                key={item.taskid}
                                                                draggableId={item.taskid.toString()}
                                                                index={index}
                                                            >
                                                                {(provided, snapshot) => {
                                                                    return (<div >
                                                                        <div
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect: "none",
                                                                                padding: 8,
                                                                                marginBottom: 10,
                                                                                margin: "0 0 8px 0",
                                                                                minHeight: "50px",
                                                                                border: "0.5px solid",
                                                                                color: "white",
                                                                                width: '220px',
                                                                                borderRadius: "9px",
                                                                                ...provided.draggableProps.style
                                                                            }}
                                                                        >
                                                                            <div style={{ backgroundColor: "rgb(50 49 49)", padding: 8, borderRadius: "9px", display: "flex" }}>
                                                                                <div style={{    width: "300px"}}>
                                                                                    <div style={{ fontWeight: "bold", fontSize: "16px" }}>  {item?.task_title}</div>
                                                                                    <div>{item?.user_id?.map((u, i) => {
                                                                                        return (<>
                                                                                            <span>
                                                                                                <div>
                                                                                                    <span className="para2">
                                                                                                        {getImage(u) ? (
                                                                                                            < img height="20" width="20" style={{ borderRadius: 50, marginBottom: -5, marginRight: 2, marginLeft: 2, marginTop: 10 }} src={getImage(u)} alt="aa" />) :
                                                                                                            <Avatar style={{ width: 20, height: 20, marginBottom: -20, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
                                                                                                    </span>
                                                                                                    <span >{getname(u) || 'AthrV-Ed'}</span>
                                                                                                </div>
                                                                                            </span>
                                                                                        </>)
                                                                                    })}</div>
                                                                                </div>
                                                                                <div>
                                                                                <DeleteIcon className="deleteiconkanban" onClick={(e) => { e.stopPropagation(); e.preventDefault(); setopendeletecard([columnId, item.taskid, index]); }} />
                                                                            </div>
                                                                            </div>


                                                                        </div>


                                                                    </div>);
                                                                }}
                                                            </Draggable>
                                                            {/* </Button> */}
                                                        </Link>


                                                    </div>);
                                                })}
                                                {provided.placeholder}
                                                <div style={{ backgroundColor: "rgb(50 49 49)", width: "220px", borderRadius: "9px" }}>
                                                    <Button style={{ width: "100%", textTransform: "none" }} onClick={() => { setopennewcard([column.status, columnId]) }}><Add className="addiconkanban" /><p style={{ width: "max-content", color: "white" }}>New</p></Button>
                                                </div>
                                            </div>
                                        </>);
                                    }}
                                </Droppable>
                            </div>

                        </div>
                    );
                })}
            </DragDropContext>
            }


            {(type == 'U' || !isSupervisor) && (type !== 'A') && <div style={{ display: "flex" }}>
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}
                            key={columnId}
                        >
                            <div className="heading">
                                <h2 className="Status">{column.status}</h2>
                            </div>
                            <div style={{ margin: 8 }}>
                                <div key={columnId}>


                                    <div


                                        style={{
                                            // background
                                            //     : "rgb(66, 65, 65)",
                                            padding: 4,
                                            width: 250,
                                            minHeight: 500
                                        }}
                                    >
                                        {column.task.map((item, index) => {
                                            return (<div style={{ display: "flex" }}>
                                                <Link to={`/main/activity/${activityid}/single`} style={{ textDecoration: "none" }} onClick={() => { localStorage.setItem("taskID", item.taskid); }}>

                                                    <div
                                                        key={item.taskid}
                                                        index={index}
                                                    >


                                                        <div

                                                            style={{
                                                                userSelect: "none",
                                                                padding: 8,
                                                                marginBottom: 10,
                                                                margin: "0 0 8px 0",
                                                                minHeight: "50px",
                                                                border: "0.5px solid",
                                                                color: "white",
                                                                width: '240px',
                                                                borderRadius: "9px",
                                                            }}
                                                        >
                                                            <div style={{ backgroundColor: "rgb(50 49 49)", padding: 16, borderRadius: "9px", }}>
                                                                <div style={{ fontWeight: "bold", fontSize: "16px" }}>  {item?.task_title}</div>
                                                                <div>{item?.user_id?.map((u, i) => {
                                                                    return (<>
                                                                        <span>
                                                                            <div>
                                                                                <span className="para2">
                                                                                    {getImage(u) ? (
                                                                                        < img height="20" width="20" style={{ borderRadius: 50, marginBottom: -5, marginRight: 2, marginLeft: 10, marginTop: 10 }} src={getImage(u)} alt="aa" />) :
                                                                                        <Avatar style={{ width: 20, height: 20, marginBottom: -20, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
                                                                                </span>
                                                                                <span >{getname(u) || 'AthrV-Ed'}</span>
                                                                            </div>
                                                                        </span>
                                                                    </>)
                                                                })}</div>
                                                            </div>
                                                        </div>



                                                    </div>
                                                </Link>

                                            </div>);
                                        })}

                                    </div>


                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>
            }



            <div style={{ margin: 8 }}>
                <div className="heading">
                    <h2 className="Status">Transferred Task</h2>
                </div>
                <div
                    style={{
                        // background: "rgb(66, 65, 65)",
                        padding: 4,
                        width: 250,
                        minHeight: 500
                    }}
                >
                    {transferrequest?.task?.map((t, i) => {
                        return (
                            <>
                                <Link to={`/main/activity/${activityid}/single`} style={{ textDecoration: "none" }} onClick={() => { localStorage.setItem("taskID", t.taskid); }}>

                                    <div

                                        style={{
                                            userSelect: "none",
                                            padding: 8,
                                            marginBottom: 10,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            border: "0.5px solid",
                                            color: "white",
                                            width: '240px',
                                            borderRadius: "9px",
                                        }}
                                    >
                                        <div style={{ backgroundColor: "rgb(50 49 49)", padding: 16, borderRadius: "9px", }}>
                                            <div style={{ fontWeight: "bold", fontSize: "16px" }}> {t.task_title}</div>
                                            <div>{t?.user_id?.map((u, i) => {
                                                return (<>
                                                    <span>
                                                        <div>
                                                            <span className="para2">
                                                                {getImage(u) ? (
                                                                    < img height="20" width="20" style={{ borderRadius: 50, marginBottom: -5, marginRight: 2, marginLeft: 10, marginTop: 10 }} src={getImage(u)} alt="aa" />) :
                                                                    <Avatar style={{ width: 20, height: 20, marginBottom: -20, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
                                                            </span>
                                                            <span >{getname(u) || 'AthrV-Ed'}</span>
                                                        </div>
                                                    </span>
                                                </>)
                                            })}</div>
                                        </div>

                                    </div>
                                </Link>
                            </>
                        )
                    })}

                </div>

            </div>
            <div style={{ margin: 8 }}>
                <div className="heading">
                    <h2 className="Status">Extend Deadline</h2>
                </div>
                <div

                    style={{
                        // background: "rgb(66, 65, 65)",
                        padding: 4,
                        width: 250,
                        minHeight: 500
                    }}
                >
                    {deadlinerequest?.task?.map((t, i) => {
                        return (
                            <>
                                <Link to={`/main/activity/${activityid}/single`} style={{ textDecoration: "none" }} onClick={() => { localStorage.setItem("taskID", t.taskid); }}>

                                    <div

                                        style={{
                                            userSelect: "none",
                                            padding: 8,
                                            marginBottom: 10,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            border: "0.5px solid",
                                            color: "white",
                                            width: '240px',
                                            borderRadius: "9px",
                                        }}
                                    >
                                        <div style={{ backgroundColor: "rgb(50 49 49)", padding: 16, borderRadius: "9px", }}>
                                            <div style={{ fontWeight: "bold", fontSize: "16px" }}> {t.task_title}</div>
                                            <div>{t?.user_id?.map((u, i) => {
                                                return (<>
                                                    <span>
                                                        <div>
                                                            <span className="para2">
                                                                {getImage(u) ? (
                                                                    < img height="20" width="20" style={{ borderRadius: 50, marginBottom: -5, marginRight: 2, marginLeft: 10, marginTop: 10 }} src={getImage(u)} alt="aa" />) :
                                                                    <Avatar style={{ width: 20, height: 20, marginBottom: -20, marginLeft: -40, borderRadius: 50 }} className={classes.orange} />}
                                                            </span>
                                                            <span >{getname(u) || 'AthrV-Ed'}</span>
                                                        </div>
                                                    </span>
                                                </>)
                                            })}</div>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        )
                    })}
                </div>
            </div>
            <div style={{ margin: 8 }}>
                <div className="heading">
                    <h2 className="Status">Pending Transfer</h2>
                </div>
                <div

                    style={{
                        // background: "rgb(66, 65, 65)",
                        padding: 4,
                        width: 250,
                        minHeight: 500
                    }}
                >

                    {pendingtransfer?.task?.map((t, i) => {
                        return (
                            <>
                                <Link to={`/main/activity/${activityid}/single`} style={{ textDecoration: "none" }} onClick={() => { localStorage.setItem("taskID", t.taskid); }}>

                                    <div

                                        style={{
                                            userSelect: "none",
                                            padding: 8,
                                            marginBottom: 10,
                                            margin: "0 0 8px 0",
                                            minHeight: "50px",
                                            border: "0.5px solid",
                                            color: "white",
                                            width: '240px',
                                            borderRadius: "9px",
                                        }}
                                    >
                                        <div style={{ backgroundColor: "rgb(50 49 49)", padding: 16, borderRadius: "9px", }}>
                                            <div style={{ fontWeight: "bold", fontSize: "16px" }}> {t.task_title}</div>
                                        </div>

                                    </div>
                                </Link>
                            </>
                        )
                    })}
                </div>
            </div>
            {(type === 'A' || isSupervisor) && <div>
                <Button style={{ width: "100%", textTransform: "none", fontWeight: "bold" }} onClick={() => { setopenaddgroup(true) }}><Add className="addiconkanban" /><p style={{ width: "max-content", color: "white" }} >Add group</p></Button>
            </div>
            }
        </div>
        <Dialog
            open={openaddgroup}
            keepMounted
            aria-labelledby="simple-dialog-title"
            onClose={handleclosedialogaddgroup}

        >
            <DialogContent className="pop-content-new">
                <br />
                <ValidatorForm onSubmit={handlenewstatus}>

                    <div style={{ height: "200px" }}>
                        <p className="addnewgroup">Enter New Status Details</p>
                        <Grid container xs={12}>
                            <Grid item xs={6} style={{ color: "white", marginTop: "10px", fontSize: "20px" }}>Enter Status:</Grid>
                            <Grid item xs={6}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <TextValidator
                                        autoFocus
                                        size="small"
                                        variant="standard"
                                        margin="dense"
                                        value={newstatusname}
                                        onChange={e => setnewstatusname(e.target.value)}
                                        placeholder="Status"
                                        fullWidth
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        InputProps={{
                                            classes: {
                                                input: classes.resize
                                            }
                                        }}
                                    />
                                </ThemeProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={handleclosedialogaddgroup}
                                    style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                    type="submit"
                                >
                                    Create
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </ValidatorForm >

            </DialogContent>

        </Dialog>
        <Dialog
            open={opendeletecolumn}
            keepMounted
            aria-labelledby="simple-dialog-title"
            onClose={handleclosedialogdelete}

        >
            <DialogContent className="pop-content-new">
                <br />

                <div style={{ height: "200px" }}>
                    <p className="addnewgroup">Are you sure you want<br /> to delete this Status?</p>
                    <Button onClick={handleclosedialogdelete}
                        style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={() => { deletecolumn() }}
                        style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                    >
                        Delete
                    </Button>

                </div>

            </DialogContent>

        </Dialog>
        <Dialog
            open={opendeletecard}
            keepMounted
            aria-labelledby="simple-dialog-title"
            onClose={handleclosedialogcarddelete}

        >
            <DialogContent className="pop-content-new">
                <br />

                <div style={{ height: "200px" }}>
                    <p className="addnewgroup">Are you sure you want<br /> to delete this Task?</p>
                    <Button onClick={handleclosedialogcarddelete}
                        style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                    >
                        Cancel
                    </Button>
                    <Button onClick={() => { deletecard() }}
                        style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                    >
                        Delete
                    </Button>

                </div>

            </DialogContent>

        </Dialog>

        <Dialog
            open={opennewcard}
            // keepMounted
            // aria-labelledby="simple-dialog-title"
            onClose={() => { setopennewcard(false); setTeam([]) }}
            classes={{ paper: classes.dialogPaper }}

        >
            <DialogContent className="pop-content-new">
                <br />
                <ValidatorForm onSubmit={() => { columncard() }}>
                    <div style={{ height: "200px" }}>
                        <p className="addnewgroup">Enter New Task Details</p>
                        <Grid container xs={12}>
                            <Grid item xs={6} style={{ color: "white", marginTop: "30px", fontSize: "20px" }}>Enter Task Title:</Grid>
                            <Grid item xs={6} style={{ marginTop: "20px" }}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <TextValidator
                                        autoFocus
                                        size="small"
                                        variant="standard"
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        margin="dense"
                                        value={tasktitle}
                                        onChange={e => settasktitle(e.target.value)}
                                        placeholder="Task Title"
                                        fullWidth
                                        InputProps={{
                                            classes: {
                                                input: classes.resize
                                            }
                                        }}
                                    />
                                </ThemeProvider>
                            </Grid>
                            <Grid item xs={6} style={{ color: "white", marginTop: "30px", fontSize: "20px" }}>Enter Task Description:</Grid>
                            <Grid item xs={6} style={{ marginTop: "20px" }}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <TextValidator
                                        autoFocus
                                        size="small"
                                        variant="standard"
                                        margin="dense"
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        value={taskdesc}
                                        onChange={e => settaskdesc(e.target.value)}
                                        placeholder="Task description"
                                        fullWidth
                                        InputProps={{
                                            classes: {
                                                input: classes.resize
                                            }
                                        }}
                                    />
                                </ThemeProvider>
                            </Grid>

                            <Grid item xs={6} style={{ color: "white", marginTop: "30px", fontSize: "20px" }}>Add Users:</Grid>
                            <Grid item xs={6} style={{ marginTop: "20px" }}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <Autocomplete
                                        id="tags-standard"
                                        validators={["required"]}

                                        multiple
                                        options={users?.filter(
                                            member =>
                                                useravailable?.some(
                                                    selectedMember => selectedMember === member.user_id
                                                )
                                        )}
                                        getOptionLabel={option => option.fname + " " + option.lname}
                                        onChange={(e, value) => {
                                            setTeam(value);
                                            // console.log(useravailable)
                                            // console.log("valuse", value, e.target.value);
                                        }}
                                        renderInput={params => (
                                            <TextValidator
                                                type=""
                                                validators={["required"]}
                                                variant="outlined"

                                                value={team[0]}
                                                errorMessages={["This field is required"]}
                                                {...params}
                                                size="medium"

                                                label="Name"
                                                placeholder="Select Name"
                                                style={{
                                                    background: "#373B3D",
                                                }}
                                                // onChange={e => {
                                                //     console.log(name,e.target.value,useravailable[0])
                                                //     setName(e.target.value)
                                                // }
                                                // }

                                                fullWidth
                                            />
                                        )}
                                    />
                                </ThemeProvider>
                            </Grid>
                            <Grid item xs={6} style={{ color: "white", marginTop: "60px", fontSize: "20px" }}>Enter Start Date:</Grid>
                            <Grid item xs={6} style={{ marginTop: "20px" }}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} >

                                        <br></br>
                                        <KeyboardDatePicker
                                            validators={["required"]}
                                            errorMessages={["This field is required"]}
                                            margin="normal"
                                            size="small"
                                            id="date-picker-dialog"
                                            label="Start date"
                                            inputVariant="filled"
                                            format="dd/MM/yyyy"
                                            value={StartDate}
                                            onChange={handleStartDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                        />

                                    </MuiPickersUtilsProvider>
                                </ThemeProvider>
                            </Grid>
                            <Grid item xs={6} style={{ color: "white", marginTop: "60px", fontSize: "20px" }}>Enter End Date:</Grid>
                            <Grid item xs={6} style={{ marginTop: "20px" }}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} >

                                        <br></br>
                                        <KeyboardDatePicker
                                            validators={["required"]}
                                            errorMessages={["This field is required"]}
                                            margin="normal"
                                            size="small"
                                            id="date-picker-dialog"
                                            label="End date"
                                            inputVariant="filled"
                                            format="dd/MM/yyyy"
                                            minDate={StartDate}

                                            value={EndDate}
                                            onChange={handleEndDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "change date"
                                            }}
                                        />

                                    </MuiPickersUtilsProvider>
                                </ThemeProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <Button onClick={handleclosedialognewcard}
                                    style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "30px", background: "#202328", border: "1px solid #d4dce1" }}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button type="submit"
                                    style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "30px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>

                    </div>
                </ValidatorForm>
            </DialogContent>

        </Dialog>
        <Dialog
            open={opennewstatuscard}
            keepMounted
            aria-labelledby="simple-dialog-title"
            onClose={() => { setopennewstatuscard(false) }}

        >
            <DialogContent className="pop-content-new">
                <br />
                <ValidatorForm onSubmit={() => { newstatuscard() }}>
                    <div style={{ height: "200px" }}>

                        <Grid container xs={12}>
                            <Grid item xs={6} style={{ color: "white", marginTop: "10px", fontSize: "20px" }}>Enter New Status: </Grid>
                            <Grid item xs={6}>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <TextValidator
                                        autoFocus
                                        size="small"
                                        variant="standard"
                                        margin="dense"
                                        value={newstatusnamecolumn}
                                        onChange={e => setnewstatusnamecolumn(e.target.value)}
                                        placeholder="Status"
                                        fullWidth
                                        InputProps={{
                                            classes: {
                                                input: classes.resize
                                            }
                                        }}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                    />
                                </ThemeProvider>
                            </Grid>
                        </Grid>
                        <Button onClick={handleclosedialogcardnewstatus}
                            style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", background: "#202328", border: "1px solid #d4dce1" }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit"
                            style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "50px", marginLeft: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                        >
                            edit
                        </Button>

                    </div>
                </ValidatorForm>
            </DialogContent>
        </Dialog>

    </>)
}

export default Kanban
