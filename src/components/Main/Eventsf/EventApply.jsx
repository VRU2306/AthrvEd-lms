import React, { useState } from 'react'
import { Grid, makeStyles, Tooltip, Button, Dialog, DialogContent, InputLabel } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';
import logo from "./../../../Icons/Vector.svg";
import Checkbox from '@material-ui/core/Checkbox';
import { ToastContainer, toast } from 'material-react-toastify';
import FormGroup from "@material-ui/core/FormGroup";


import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ArrowDropDownCircleIcon from '@material-ui/icons/ArrowDropDownCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ShortTextIcon from '@material-ui/icons/ShortText';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import ClearIcon from '@material-ui/icons/Clear';
import FormControl from "@material-ui/core/FormControl";
import { MenuItem } from "@material-ui/core";
import Select from '@material-ui/core/Select';

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useParams } from "react-router";

import {
    TextValidator,
    ValidatorForm,
    SelectValidator
} from "react-material-ui-form-validator";
import './Events.css';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';
import { useEffect } from 'react';


const useStyles = makeStyles((theme) => ({
    rooteventapply: {

        // width: 'calc(125% - 350px)',
        minHeight: '100vh',
        marginLeft: '0',
    },
    root: {
        display: "flex",
    },
    palette: {
        type: "white",
    },
    contenteventapply: {
        flexGrow: 1,
        padding: theme.spacing(3),
        color: 'white',
        marginTop: '30px',

        [theme.breakpoints.up("sm")]: {
            marginLeft: "200px",
        }
    },
    appBarSpacerEventapply: theme.mixins.toolbar,
    resizeeventapply: {
        fontSize: "36px",
        fontWeight: "bold"
    },
    resizesectioneventapply: {
        fontSize: "26px",
        fontWeight: "bold"
    },
    resizeQuestioneventapply: {
        fontSize: "18px"
    },
    eventapplyHeader: {
        backgroundColor: "#202328",
        borderRadius: "20px",
        margin: "10px"
    },

    sectionHeadereventapply: {
        backgroundColor: "#202328",
        borderRadius: "20px",
        margin: "10px",
        marginTop: "50px"
    },
    questionHeaderEventapply: {
        backgroundColor: "#202328",
        borderRadius: "20px",
        margin: "10px",
        marginTop: "20px",


    },
    radio: {
        color: "#d4dce1",
        '&$checked': {
            color: '#f50057',
        }
    },
    checked: {}
}));
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
function EventApply() {
    console.log("jsjsjjs");
    const classes = useStyles();
    const [email, setemail] = useState("")
    const [done, setdone] = useState(false);
    const [shortans, setshortans] = useState("");
    const [events, setevents] = useState({})
    const [age, setAge] = React.useState('');

    const [opt, setopt] = useState([]);
    const [answers, setanswers] = useState([]);
    const [value, setvalue] = useState("")

    const [longans, setlongans] = useState("")
    const [ans, setans] = useState({});
    const [eventnotfound, seteventnotfound] = useState(false)

    // console.log(localStorage.getItem("userapply"))
    const v = localStorage.getItem("userapply");
    console.log("v", v);
    //     const Uniqueid = localStorage.getItem("userapply");
    console.log("shshhs", window.location.pathname);
    var url = window.location.href.split(':')[window.location.href.split(':').length - 1]
    console.log("shshshcjsgdhs", url);
    // const { eventid } = useParams();
    // let [choice, setchoice] = useState("");
    useEffect(() => {

        // console.log("hshshshshhs", Uniqueid);
        fetch(`/event/singleeventfetch/${url}`, {
            credentials: 'include',
            method: 'GET',
        }).then(
            (resp) => {

                console.log("resp", resp)
                if (resp.status != 200) {
                    seteventnotfound(true);
                }
                resp.json().then((result) => {
                    console.log("result", result)

                    setevents(result);



                    result?.sectioncollection?.map((sec, i) => {
                        // setans({});
                        sec?.section?.map((s, j) => {
                            let ans = {};
                            ans.questionid = s._id;
                            ans.question = s.question;
                            ans.answer = [];
                            ans.unique = s.unique;
                            answers?.push(ans);
                        })
                    })

                })
            })









    }, [])



    // console.log("shgshhs", Uniqueid);

    // events?.sectioncollection?.map((sec,index) => {
    //     console.log(sec);
    //     sec?.section?.map((q, i) => {
    //         if (q.type == "Dropdown") {
    //             console.log("nsjadhjas", q.options);
    //             q?.options?.map((a, b) => {
    //                 console.log("jasdhsa",a);
    //             })
    //         }
    //     })

    // })

    console.log("opt", opt);
    const submithandlechange = () => {
        if (sessionStorage.getItem("logged"))
            window.location.href = "/main/Eventsf"
        else
            window.location.href = "/"
    }

    console.log("abs", answers);


    console.log("dndjshdnjdsh", answers);
    // const changevalue = (event) => {
    //     console.log(event.target.value);

    //     setoption(event.target.value);


    // }

    const toggleSwitch = (event) => {
        console.log(event.target.value);

        console.log(event.target.checked);

    }


    async function updateans() {
        try {
            console.log(answers);
            const requestOptions = {
                Credential: 'include',
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: answers })

            }
            console.log("requestoption", requestOptions)
            console.log(url);
            const respo = await fetch(`/event/eventuseranswer?eventid=${url}`, requestOptions);
            console.log("hdhdhhd", respo);


            console.log("shshshhs", respo);

            if (respo.status === 200) {
                setdone(true)
                setopt([])
            }
            if (respo.status === 403) {
                toast.error('Answer Already Exist', { position: "bottom-center", className: 'toast-error-container' })

            }




        } catch (e) {
            console.log("snhshhs", e);

        }
    }

    // const changeoption = (event) => {
    //     console.log(event.target.value)
    //     setchoice(event.target.value)
    //     console.log(choice)
    // }

    const shortanshandle = (event) => {
        console.log(event.target.value);
        setshortans(event.target.value);
    }
    const longanshandle = (event) => {
        console.log(event.target.value)
        setlongans(event.target.value);
    }

    const dropdownvalue = (e) => {
        console.log(e.target.value);
        setvalue(e.target.value);
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setAge(event.target.value);
    };

    // const changedropdownvalue = (event) => {
    //     console.log(event);
    //     setoption(event.target.value);
    // }






    console.log("sgsgsg", answers);

    // console.log("events11", events);
    //  events?.sectioncollection?.map((sec, i) => {
    //         // setans({});
    //         sec?.section?.map((s, j) => {
    //              let ans = {};
    //             ans.questionid = s._id;
    //             ans.questionid = s.question;
    //             ans.answer = [];
    //         answers?.push(ans);
    //         })

    //     })


    //         setanswers(answers);
    //         console.log("1111", answers);   


    console.log("2323", answers);


    // useEffect(() => {

    //     console.log("answer111",answers)


    // }, [answers])


    console.log(events);





    console.log("2222")
    if (eventnotfound === false)
        return (


            <div className={[classes.rooteventapply, 'EventApplyMain'].join(' ')}>
                <div className={classes.appBarSpacerEventapply} />
                <div className={classes.contenteventapply}>

                    {/* event headers */}

                    <ValidatorForm
                        onSubmit={(e) => {
                            e.preventDefault();
                            updateans();
                        }}>

                        <Grid container spacing={2}>
                            <Grid item xs={12} className={classes.eventapplyHeader}>
                                <div style={{ padding: "20px" }}>
                                    <div style={{ width: "100%", marginBottom: "20px" }}>
                                        <img src={logo} />
                                    </div>

                                    <div className="coverImageeventapply" style={{ backgroundImage: events.eventimage ? `url(https://athrvedlms.s3.ap-south-1.amazonaws.com/event/${url})` : `url(${logo})` }}></div>


                                    {/* <div style={{ marginLeft: "48%" }}>
                                    <label for="upload-photo">
                                        <AddAPhotoIcon style={{ cursor: "pointer" }} />
                                    </label>
                                    <input type='file' id="upload-photo" name="Choose-File"
                                        onChange={ImageAsUrl}
                                        style={{ display: "none" }}
                                    />

                                </div> */}
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                        {/* <TextValidator
                                        autoFocus
                                        size="small"
                                        disabled
                                        variant="standard"
                                        style={{
                                            fontSize: "50px",
                                            fontWeight: "bold",
                                           

                                        }}
                                        margin="dense"
                                        value={events.eventname}
                                       
                                        placeholder="Untitled form"
                                        fullWidth
                                        InputProps={{
                                            classes: {
                                                input: classes.resizeeventapply
                                            }
                                        }}
                                    /> */}
                                        <Grid item xs={12}>
                                            <div>
                                                <p style={{
                                                    fontSize: "50px",
                                                    fontWeight: "bold",
                                                    textTransform: "capitalize"



                                                }}>{events.eventname}</p>
                                            </div>
                                            {/* <TextValidator
                                        autoFocus
                                        multiline
                                        disabled
                                        rows={5}
                                        size="small"
                                        variant="filled"
                                        style={{
                                            fontSize: "50px",
                                            marginTop: "10px",
                                            
                                        }}
                                        margin="dense"
                                        value={events.description}
                                        
                                        placeholder="Description"
                                        fullWidth
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                    /> */}
                                            <div>
                                                <p style={{
                                                    fontSize: "20px",
                                                    marginTop: "10px",


                                                }}>{events.description}</p>
                                            </div>
                                        </Grid>

                                    </ThemeProvider>

                                </div>
                                {/* <div style={{ float: "right", marginRight: "20px", cursor: "pointer" }}>
                                <Tooltip title={"Add Section"} placement="top"><AddCircleOutlineIcon onClick={() => { addsection() }} /></Tooltip>
                            </div> */}
                            </Grid>

                            {/* section  */}

                            {events?.sectioncollection?.map((section, index) => {
                                return (<>
                                    <Grid item xs={12} className={classes.sectionHeadereventapply}>
                                        <div style={{ padding: "20px" }}>
                                            {/* <ThemeProvider theme={defaultMaterialTheme}>
                                            <TextValidator
                                                autoFocus
                                                size="small"
                                                variant="standard"
                                                disabled
                                                style={{
                                                    fontSize: "50px",
                                                    fontWeight: "bold",
                                                    
                                                }}
                                                margin="dense"
                                                value={section.sectionname}
                                                // onChange={e => {
                                                //     event[index].sectionname = e.target.value
                                                //     setevent([...event])
                                                // }}
                                                // placeholder={`Section Name ${index + 1}`}
                                                fullWidth
                                                InputProps={{
                                                    classes: {
                                                        input: classes.resizesectioneventapply
                                                    }
                                                }}
                                            /> */}

                                            <p style={{
                                                fontSize: "30px",
                                                fontWeight: "bold",

                                            }}>{section.sectionname == "" ? `Section ${index + 1}` : section.sectionname}</p>
                                            {/* <TextValidator
                                                autoFocus
                                                multiline
                                                rows={3}
                                                size="small"
                                                variant="filled"
                                                style={{
                                                    fontSize: "50px",
                                                    marginTop: "10px",
                                                    pointerEvents: 'none'
                                                }}
                                                margin="dense"
                                                value={section.sectiondescription}
                                                // onChange={e => {
                                                //     event[index].sectiondescription = e.target.value
                                                //     setevent([...event])
                                                // }}
                                                placeholder="Description"
                                                fullWidth
                                                InputProps={{
                                                    disableUnderline: true
                                                }}
                                            /> */}

                                            <p style={{
                                                fontSize: "20px",
                                                marginTop: "10px"
                                            }}>{section.sectiondescription == "" ? `` : section.sectiondescription}</p>
                                            {/* </ThemeProvider> */}

                                        </div>

                                    </Grid>


                                    {/* questions */}

                                    {
                                        section?.section.map((que, i) => {

                                            return (<>

                                                {que?.required === true ? (

                                                    <Grid item container spacing={2} xs={12} className={classes.questionHeaderEventapply}>

                                                        <Grid item xs={12} md={7}>



                                                            <div style={{ display: "flex" }}>
                                                                <p style={{ color: "white", fontSize: "18px" }}>{que.question}</p>
                                                                <p style={{ color: "red", fontSize: "15px", marginLeft: "15px" }}>*</p>
                                                            </div>


                                                        </Grid>


                                                        <Grid item xs={12} md={5}>



                                                        </Grid>
                                                        {/* { que?.required =="true"?  */}

                                                        {/* options */}
                                                        <Grid item xs={12}>
                                                            {/* multiple choice */}
                                                            {que?.type === "RadioButton" ?
                                                                <Grid item conatiner spacing={2} xs={12}>
                                                                    <FormControl component="fieldset">
                                                                        <RadioGroup

                                                                            onChange={(e) => {

                                                                                console.log(answers);
                                                                                answers?.map((sec, k) => {
                                                                                    console.log("dnsajdnas", sec?.questionid);
                                                                                    console.log("dnjdfs", que?._id)
                                                                                    if (sec?.questionid === que?._id) {
                                                                                        console.log("22")
                                                                                        sec?.answer?.push(e.target.value)
                                                                                        setanswers([...answers])
                                                                                    }

                                                                                })
                                                                                setanswers(answers)
                                                                            }}
                                                                            style={{ color: "#D4DCE1" }}>
                                                                            {que?.options?.map((arr, j) => {
                                                                                return (
                                                                                    <Grid item xs={12}>
                                                                                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                                                                            <FormControlLabel value={arr}
                                                                                                control={<Radio required={true} color="#f50057" classes={{ root: classes.radio, checked: classes.checked, color: "#D4DCE1" }} />}
                                                                                                label={arr} />
                                                                                        </div>
                                                                                    </Grid>
                                                                                )
                                                                            })}
                                                                        </RadioGroup>
                                                                    </FormControl>

                                                                </Grid>
                                                                : null}


                                                            {/* check box */}
                                                            {que?.type === "CheckBox" ? (




                                                                <div>


                                                                    {que?.options?.map((arr, j) => {
                                                                        return (
                                                                            <div style={{ display: "flex" }}>
                                                                                <div style={{ display: "flex", flexDirection: "row", color: "#D4DCE1" }}>
                                                                                    {/* <FormControlLabel required={true}
      control={<Checkbox   value={arr}  />}
      label={arr}              
    /> */}                                                                  {opt.length == 0 ? (
                                                                                        <>
                                                                                            <Checkbox

                                                                                                value={arr}
                                                                                                inputProps={{ 'aria-label': 'Checkbox A' }}
                                                                                                onChange={(e) => {

                                                                                                    console.log(answers);
                                                                                                    answers?.map((sec, k) => {
                                                                                                        console.log("dnsajdnas", sec?.questionid);
                                                                                                        console.log("dnjdfs", que?._id)
                                                                                                        if (sec?.questionid === que?._id) {
                                                                                                            console.log("true123", e.target.checked)
                                                                                                            if (e.target.checked) {
                                                                                                                console.log("22")
                                                                                                                sec?.answer?.push(e.target.value)
                                                                                                                opt?.push(e.target.value);
                                                                                                                setopt(e.target.value);
                                                                                                            }
                                                                                                            else {
                                                                                                                sec?.answer?.splice(sec?.answer?.indexOf(e.target.value), 1);
                                                                                                                opt.splice(opt.indexOf(e.target.value), 1)

                                                                                                            }

                                                                                                            setopt([...opt])
                                                                                                            setanswers([...answers])
                                                                                                        }

                                                                                                    })
                                                                                                    setanswers(answers)
                                                                                                }}
                                                                                                required={true}
                                                                                                className={classes.radio}
                                                                                            /><p style={{
                                                                                                marginLeft: "5px",
                                                                                                marginTop: "10px"
                                                                                            }}>{arr}</p>
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <Checkbox

                                                                                                value={arr}
                                                                                                inputProps={{ 'aria-label': 'Checkbox A' }}
                                                                                                onChange={(e) => {

                                                                                                    console.log(answers);
                                                                                                    answers?.map((sec, k) => {
                                                                                                        console.log("dnsajdnas", sec?.questionid);
                                                                                                        console.log("dnjdfs", que?._id)
                                                                                                        if (sec?.questionid === que?._id) {
                                                                                                            console.log("true123", e.target.checked)
                                                                                                            if (e.target.checked) {
                                                                                                                console.log("22")
                                                                                                                sec?.answer?.push(e.target.value)
                                                                                                                opt.push(e.target.value);

                                                                                                            }
                                                                                                            else {
                                                                                                                sec?.answer?.splice(sec?.answer?.indexOf(e.target.value), 1);
                                                                                                                opt.splice(opt.indexOf(e.target.value), 1)

                                                                                                            }

                                                                                                            setopt([...opt])
                                                                                                            setanswers([...answers])
                                                                                                        }

                                                                                                    })
                                                                                                    setanswers(answers)
                                                                                                }}
                                                                                                className={classes.radio}

                                                                                            /><p style={{
                                                                                                marginLeft: "5px",
                                                                                                marginTop: "10px"
                                                                                            }}>{arr}</p>
                                                                                        </>
                                                                                    )
                                                                                    }

                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                    {/* </FormGroup>
                                                             </FormControl> */}
                                                                </div>

                                                            )
                                                                : null
                                                            }
                                                            {/* Drop Down*/}
                                                            {que?.type === "Dropdown" ?
                                                                <div >
                                                                    <ThemeProvider theme={defaultMaterialTheme}>
                                                                        <FormControl style={{ minWidth: 200 }} >
                                                                            <InputLabel id="demo-customized-select-label"></InputLabel>
                                                                            <Select
                                                                                labelId="demo-customized-select-label"
                                                                                id="demo-customized-select"
                                                                                value={age}
                                                                                style={{ backgroundColor: "#202328" }}
                                                                                size="medium"
                                                                                variant="outlined"
                                                                                fullWidth
                                                                                required

                                                                                onChange={(e) => {
                                                                                    setAge(e.target.value)
                                                                                    console.log(answers);
                                                                                    answers?.map((sec, k) => {
                                                                                        console.log("dnsajdnas", sec?.questionid);
                                                                                        console.log("dnjdfs", que?._id)
                                                                                        if (sec?.questionid === que?._id) {

                                                                                            console.log("22")
                                                                                            sec?.answer?.push(e.target.value)



                                                                                            setanswers([...answers])
                                                                                        }

                                                                                    })
                                                                                    setanswers(answers)

                                                                                }}>
                                                                                {que?.options?.map((arr, j) => {
                                                                                    return (

                                                                                        <MenuItem value={arr} style={{ backgroundColor: "#202328" }} fullWidth>{arr}</MenuItem>

                                                                                    )
                                                                                })}
                                                                            </Select>
                                                                        </FormControl>
                                                                    </ThemeProvider>
                                                                    {/* <FormControl>
                                                                    <ThemeProvider theme={defaultMaterialTheme}>
                                                                    <Select onChange={dropdownvalue
                                                                }>
                                                                    <MenuItem value={10}>Ten</MenuItem>
                                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                                    <MenuItem value={40}>Fourty</MenuItem>
                                                                    </Select>
                                                                        </ThemeProvider>
                                                                </FormControl>
                                                                    
                                                                <p style={{color:"white"}}>Selected Value is :{value}</p> */}
                                                                    {/* <FormControl  >
                                                                    
                                                                        
                                                            
                                                                        <SelectValidator
                                                                            placeholder="Question Type"
                                                                            size="small"
                                                                            variant="outlined"
                                                                
                                                                
                                                                       
                                                                            inputProps={{ "aria-label": "answer" }}
                                                                            style={{ backgroundColor: "#202328" }}
                                                                            value={option}
                                                                            onChange={(e) => {
                                                                                console.log(e.target.value);
                                                                                setoption(e.target.value);
                                                                            }
                                                                            }
                                                                
                                                                            id="ter"
                                                               
                                                                        >
   
                                                                            {que?.options?.map((arr, j) => {
                                                                                return (
                                                                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                                                                       

                                                                        
                                                                                        <MenuItem value={"hello"} style={{ backgroundColor: "#202328" }} fullWidth >123</MenuItem>

                                                                                    </div>
                                                                   
                                                                                )
                                                                            })}
                                                                    
                                                                        </SelectValidator>
                                                                    </ThemeProvider>
                                                                </FormControl> */}
                                                                </div>
                                                                : null}

                                                            {/* Short Answer */}
                                                            {que?.type === "Short" ?
                                                                <div>




                                                                    <ThemeProvider theme={defaultMaterialTheme}>
                                                                        <TextValidator
                                                                            autoFocus
                                                                            multiline
                                                                            validators={["required"]}
                                                                            errorMessages={["This field is required"]}
                                                                            rows={3}
                                                                            size="small"
                                                                            variant="filled"
                                                                            style={{
                                                                                fontSize: "50px",
                                                                                marginTop: "10px",
                                                                            }}
                                                                            margin="dense"
                                                                            placeholder="Short Answer"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                disableUnderline: true
                                                                            }}
                                                                            type=""
                                                                            value={shortans}
                                                                            onChange={(e) => {
                                                                                setshortans(e.target.value);
                                                                                console.log(answers);
                                                                                answers?.map((sec, k) => {
                                                                                    console.log("dnsajdnas", sec?.questionid);
                                                                                    console.log("dnjdfs", que?._id)
                                                                                    if (sec?.questionid === que?._id) {


                                                                                        answers[k].answer[0] = e.target.value


                                                                                    }
                                                                                    setanswers([...answers])


                                                                                })

                                                                            }}


                                                                        />

                                                                    </ThemeProvider>


                                                                </div>
                                                                : null}


                                                            {que?.type === "Email" ?
                                                                <div>




                                                                    <ThemeProvider theme={defaultMaterialTheme}>
                                                                        <TextValidator
                                                                            autoFocus
                                                                            multiline
                                                                            validators={["required", "isEmail"]}
                                                                            errorMessages={["This field is required", "email is not valid"]}
                                                                            rows={1}
                                                                            size="small"
                                                                            variant="filled"
                                                                            style={{
                                                                                fontSize: "30px",
                                                                                marginTop: "10px",
                                                                            }}
                                                                            margin="dense"
                                                                            placeholder="Email"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                disableUnderline: true
                                                                            }}
                                                                            type=""
                                                                            value={email}
                                                                            onChange={(e) => {
                                                                                setemail(e.target.value);
                                                                                console.log(answers);
                                                                                answers?.map((sec, k) => {
                                                                                    console.log("dnsajdnas", sec?.questionid);
                                                                                    console.log("dnjdfs", que?._id)
                                                                                    if (sec?.questionid === que?._id) {


                                                                                        answers[k].answer[0] = e.target.value


                                                                                    }
                                                                                    setanswers([...answers])


                                                                                })

                                                                            }}


                                                                        />

                                                                    </ThemeProvider>


                                                                </div>
                                                                : null}

                                                            {/* Long Answer*/}
                                                            {que?.type === "Long" ?
                                                                <div>

                                                                    <ThemeProvider theme={defaultMaterialTheme}>
                                                                        <TextValidator
                                                                            autoFocus
                                                                            multiline
                                                                            validators={["required"]}
                                                                            errorMessages={["This field is required"]}
                                                                            rows={5}
                                                                            size="small"
                                                                            variant="filled"
                                                                            style={{
                                                                                fontSize: "50px",
                                                                                marginTop: "10px",
                                                                            }}
                                                                            margin="dense"
                                                                            placeholder="Long Answer"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                disableUnderline: true
                                                                            }}

                                                                            value={longans}
                                                                            onChange={(e) => {
                                                                                setlongans(e.target.value)
                                                                                console.log(answers);
                                                                                answers?.map((sec, k) => {
                                                                                    console.log("dnsajdnas", sec?.questionid);
                                                                                    console.log("dnjdfs", que?._id)
                                                                                    if (sec?.questionid === que?._id) {


                                                                                        answers[k].answer[0] = e.target.value




                                                                                    }
                                                                                    setanswers([...answers])

                                                                                })

                                                                            }}
                                                                        />


                                                                    </ThemeProvider>


                                                                </div>
                                                                : null}
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <div style={{ float: "right", marginRight: "20px", cursor: "pointer", display: "flex" }}>
                                                                {/* <p>Required</p> */}
                                                                {/* {sectionques[index][i].required ?
                                                            <ToggleOnIcon
                                                                // onClick={() => {
                                                                //     sectionques[index][i].required = false
                                                                //     setsectionques([...sectionques])
                                                                // }}
                                                                style={{ color: "#1279da" }} /> :
                                                            <ToggleOffIcon
                                                                onClick={() => {
                                                                    sectionques[index][i].required = true
                                                                    setsectionques([...sectionques])
                                                                }}
                                                            />} */}

                                                                {/* <p style={{ marginLeft: "30px" }}>Unique</p> */}
                                                                {/* {sectionques[index][i].unique ?
                                                            <ToggleOnIcon
                                                                onClick={() => {
                                                                    sectionques[index][i].unique = false
                                                                    setsectionques([...sectionques])
                                                                }}
                                                                style={{ color: "#1279da" }} />
                                                            :
                                                            <ToggleOffIcon
                                                                onClick={() => {
                                                                    sectionques[index][i].unique = true
                                                                    setsectionques([...sectionques])
                                                                }}
                                                            />} */}
                                                                {/* <Tooltip title={"Delete Question"} placement="top" style={{ marginLeft: "30px" }}><DeleteIcon onClick={() => { deletequestion(index, i) }} /></Tooltip> */}
                                                            </div>
                                                        </Grid>

                                                    </Grid>
                                                ) : (
                                                    <Grid item container spacing={2} xs={12} className={classes.questionHeaderEventapply}>

                                                        <Grid item xs={12} md={7}>
                                                            <div style={{ display: "flex" }}>
                                                                <p style={{ color: "white", fontSize: "18px" }}>{que.question}</p>

                                                            </div>
                                                            {/* <ThemeProvider theme={defaultMaterialTheme}> */}
                                                            {/* <TextValidator
                                                                multiline
                                                                autoFocus
                                                                disabled
                                                                size="small"
                                                                variant="standard"
                                                                style={{
                                                                    width: "100%",
                                                               
                                                                }}
                                                                // className="question"
                                                                margin="dense"
                                                                value={que.question}
                                                                // onChange={e => {
                                                                //     sectionques[index][i].question = e.target.value
                                                                //     setsectionques([...sectionques])
                                                                // }

                                                                // }
                                                                // placeholder={`Question ${i + 1}`}
                                                            
                                                                fullWidth
                                                                InputProps={{
                                                                    classes: {
                                                                        input: classes.resizeQuestioneventapply
                                                                    }
                                                                }}
                                                            /> */}

                                                            {/* </ThemeProvider> */}
                                                        </Grid>

                                                        <Grid item xs={12} md={5}>

                                                            {/* <FormControl fullWidth={true}>
                                                        <ThemeProvider theme={defaultMaterialTheme}>
                                                            <SelectValidator
                                                                placeholder="Question Type"
                                                                size="small"
                                                                variant="outlined"
                                                                validators={["required"]}
                                                                errorMessages={["This field is required"]}
                                                                id="demo-simple-select"
                                                                style={{ backgroundColor: "#202328" }}
                                                                value='Short'
                                                                // onChange={e => {
                                                                //     sectionques[index][i].type = e.target.value
                                                                //     setsectionques([...sectionques])
                                                                // }
                                                                // }
                                                                id="ter"
                                                                fullWidth
                                                            >
                                                                <MenuItem value={"RadioButton"} style={{ backgroundColor: "#202328" }} ><RadioButtonUncheckedIcon />Multiple Choice</MenuItem>
                                                                <MenuItem value={"Short"} style={{ backgroundColor: "#202328" }} ><ShortTextIcon />Short Answer</MenuItem>
                                                                <MenuItem value={"Long"} style={{ backgroundColor: "#202328" }} ><TextFieldsIcon />Long Answer</MenuItem>
                                                                <MenuItem value={"CheckBox"} style={{ backgroundColor: "#202328" }}><CheckBoxOutlineBlankIcon />Check Box</MenuItem>
                                                                <MenuItem value={"Dropdown"} style={{ backgroundColor: "#202328" }}><ArrowDropDownCircleIcon />Drop Down</MenuItem>

                                                            </SelectValidator>
                                                        </ThemeProvider>
                                                    </FormControl> */}

                                                        </Grid>
                                                        {/* { que?.required =="true"?  */}

                                                        {/* options */}
                                                        <Grid item xs={12}>
                                                            {/* multiple choice */}
                                                            {que?.type === "RadioButton" ?
                                                                <Grid item conatiner spacing={2} xs={12}>
                                                                    <FormControl component="fieldset">
                                                                        <RadioGroup

                                                                            onChange={(e) => {

                                                                                console.log(answers);
                                                                                answers?.map((sec, k) => {
                                                                                    console.log("dnsajdnas", sec?.questionid);
                                                                                    console.log("dnjdfs", que?._id)
                                                                                    if (sec?.questionid === que?._id) {
                                                                                        console.log("22")
                                                                                        sec?.answer?.push(e.target.value)
                                                                                        setanswers([...answers])
                                                                                    }

                                                                                })
                                                                                setanswers(answers)
                                                                            }}
                                                                            style={{ color: "#D4DCE1" }}>
                                                                            {que?.options?.map((arr, j) => {
                                                                                return (
                                                                                    <Grid item xs={12}>
                                                                                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                                                                            <FormControlLabel value={arr}
                                                                                                control={<Radio color="#f50057" classes={{ root: classes.radio, checked: classes.checked, color: "#D4DCE1" }} />}
                                                                                                label={arr} />
                                                                                        </div>
                                                                                    </Grid>
                                                                                )
                                                                            })}
                                                                        </RadioGroup>
                                                                    </FormControl>

                                                                </Grid>
                                                                : null}
                                                            {/* check box */}
                                                            {que?.type === "CheckBox" ?
                                                                <div>
                                                                    <FormControl required component="fieldset" >
                                                                        <FormGroup  >
                                                                            {que?.options?.map((arr, j) => {
                                                                                return (
                                                                                    <div style={{ display: "flex" }}>
                                                                                        <div style={{ display: "flex", flexDirection: "row", color: "#D4DCE1" }}>
                                                                                            <FormControlLabel
                                                                                                control={<Checkbox value={arr} onChange={(e) => {

                                                                                                    console.log(answers);
                                                                                                    answers?.map((sec, k) => {
                                                                                                        console.log("dnsajdnas", sec?.questionid);
                                                                                                        console.log("dnjdfs", que?._id)
                                                                                                        if (sec?.questionid === que?._id) {
                                                                                                            console.log("true123", e.target.checked)
                                                                                                            if (e.target.checked) {
                                                                                                                console.log("22")
                                                                                                                sec?.answer?.push(e.target.value)
                                                                                                            }
                                                                                                            else {
                                                                                                                sec?.answer?.splice(sec?.answer?.indexOf(e.target.value), 1);
                                                                                                            }


                                                                                                            setanswers([...answers])
                                                                                                        }

                                                                                                    })
                                                                                                    setanswers(answers)
                                                                                                }} />}
                                                                                                label={arr}
                                                                                            />
                                                                                            {/* <Checkbox
                                                                           
                                                                                value={arr}
                                                                                inputProps={{ 'aria-label': 'Checkbox A' }}
                                                                                 onChange={(e) => {  
                                                                                
                                                                                console.log(answers);
                                                                                answers?.map((sec, k) => {
                                                                                    console.log("dnsajdnas",sec?.questionid);
                                                                                    console.log("dnjdfs",que?._id)
                                                                                    if (sec?.questionid === que?._id) {
                                                                                        console.log("true123",e.target.checked)
                                                                                        if (e.target.checked) {
                                                                                            console.log("22")
                                                                                    sec?.answer?.push(e.target.value)
                                                                                        }
                                                                                        else {
                                                                                            sec?.answer?.splice(sec?.answer?.indexOf(e.target.value), 1);
                                                                                        }
                                                                                    
                                                                                    
                                                                                    setanswers([...answers])
                                                                                }
                        
                                                                            })
                                                                            setanswers(answers)
                                                                                }}
                                                                                required={true} 
                                                                            /><p style={{    marginLeft: "5px",
    marginTop: "10px"}}>{arr}</p> */}

                                                                                        </div>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </FormGroup>
                                                                    </FormControl>
                                                                </div>



                                                                : null
                                                            }
                                                            {/* Drop Down*/}
                                                            {que?.type === "Dropdown" ?
                                                                <div>
                                                                    <ThemeProvider theme={defaultMaterialTheme}>
                                                                        <FormControl style={{ minWidth: 300 }}>
                                                                            <InputLabel id="demo-customized-select-label"></InputLabel>
                                                                            <Select
                                                                                labelId="demo-customized-select-label"
                                                                                id="demo-customized-select"
                                                                                value={age}
                                                                                style={{ backgroundColor: "#202328" }}
                                                                                size="medium"
                                                                                variant="outlined"
                                                                                fullWidth

                                                                                onChange={(e) => {
                                                                                    setAge(e.target.value)
                                                                                    console.log(answers);
                                                                                    answers?.map((sec, k) => {
                                                                                        console.log("dnsajdnas", sec?.questionid);
                                                                                        console.log("dnjdfs", que?._id)
                                                                                        if (sec?.questionid === que?._id) {

                                                                                            console.log("22")
                                                                                            sec?.answer?.push(e.target.value)



                                                                                            setanswers([...answers])
                                                                                        }

                                                                                    })
                                                                                    setanswers(answers)

                                                                                }}>
                                                                                {que?.options?.map((arr, j) => {
                                                                                    return (

                                                                                        <MenuItem value={arr} style={{ backgroundColor: "#202328" }} fullWidth>{arr}</MenuItem>

                                                                                    )
                                                                                })}
                                                                            </Select>
                                                                        </FormControl>
                                                                    </ThemeProvider>
                                                                    {/* <FormControl>
                                                            <Select>
                                                                    <MenuItem value={10}>Ten</MenuItem>
                                                                    <MenuItem value={10}>Twenty</MenuItem>
                                                                    <MenuItem value={10}>Thirty</MenuItem>
                                                                    <MenuItem value={10}>Fourty</MenuItem>
                                                                    </Select>
                                                                        </FormControl> */}
                                                                    {/* <FormControl  >
                                                                    
                                                                       
                                                            
                                                                        <SelectValidator
                                                                            placeholder="Question Type"
                                                                           
                                                                
                                                                
                                                                       
                                                                            inputProps={{ "aria-label": "answer" }}
                                                                            
                                                                            value={option}
                                                                            onChange={changedropdownvalue
                                                                            }
                                                                
                                                                            id="ter"
                                                               
                                                                        >
   
                                                                            {que?.options?.map((arr, j) => {
                                                                                return (
                                                                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                                                                       

                                                                        
                                                                                        <MenuItem value={"hello"} style={{ backgroundColor: "#202328" }} fullWidth >123</MenuItem>

                                                                                    </div>
                                                                   
                                                                                )
                                                                            })}
                                                                    
                                                                        </SelectValidator>
                                                                    </ThemeProvider>
                                                                </FormControl> */}
                                                                </div>
                                                                : null}

                                                            {/* Short Answer */}
                                                            {que?.type === "Short" ?
                                                                <div>




                                                                    <ThemeProvider theme={defaultMaterialTheme}>
                                                                        <TextValidator
                                                                            autoFocus
                                                                            multiline

                                                                            rows={3}
                                                                            size="small"
                                                                            variant="filled"
                                                                            style={{
                                                                                fontSize: "50px",
                                                                                marginTop: "10px",
                                                                            }}
                                                                            margin="dense"
                                                                            placeholder="Short Answer"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                disableUnderline: true
                                                                            }}
                                                                            type=""
                                                                            value={shortans}
                                                                            onChange={(e) => {

                                                                                console.log(answers);
                                                                                setshortans(e.target.value);
                                                                                answers?.map((sec, k) => {
                                                                                    console.log("dnsajdnas", sec?.questionid);
                                                                                    console.log("dnjdfs", que?._id)
                                                                                    if (sec?.questionid === que?._id) {


                                                                                        answers[k].answer[0] = e.target.value


                                                                                    }
                                                                                    setanswers([...answers])


                                                                                })

                                                                            }}


                                                                        />

                                                                    </ThemeProvider>


                                                                </div>
                                                                : null}
                                                            {que?.type === "Email" ?
                                                                <div>




                                                                    <ThemeProvider theme={defaultMaterialTheme}>
                                                                        <TextValidator
                                                                            autoFocus
                                                                            multiline
                                                                            validators={["isEmail"]}
                                                                            errorMessages={["email is not valid"]}
                                                                            rows={1}
                                                                            size="small"
                                                                            variant="filled"
                                                                            style={{
                                                                                fontSize: "30px",
                                                                                marginTop: "10px",
                                                                            }}
                                                                            margin="dense"
                                                                            placeholder="Email"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                disableUnderline: true
                                                                            }}
                                                                            type=""
                                                                            value={email}
                                                                            onChange={(e) => {
                                                                                setemail(e.target.value);
                                                                                console.log(answers);
                                                                                answers?.map((sec, k) => {
                                                                                    console.log("dnsajdnas", sec?.questionid);
                                                                                    console.log("dnjdfs", que?._id)
                                                                                    if (sec?.questionid === que?._id) {


                                                                                        answers[k].answer[0] = e.target.value


                                                                                    }
                                                                                    setanswers([...answers])


                                                                                })

                                                                            }}


                                                                        />

                                                                    </ThemeProvider>


                                                                </div>
                                                                : null}

                                                            {/* Long Answer*/}
                                                            {que?.type === "Long" ?
                                                                <div>

                                                                    <ThemeProvider theme={defaultMaterialTheme}>
                                                                        <TextValidator
                                                                            autoFocus
                                                                            multiline

                                                                            rows={5}
                                                                            size="small"
                                                                            variant="filled"
                                                                            style={{
                                                                                fontSize: "50px",
                                                                                marginTop: "10px",
                                                                            }}
                                                                            margin="dense"
                                                                            placeholder="Long Answer"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                disableUnderline: true
                                                                            }}

                                                                            value={longans}
                                                                            onChange={(e) => {
                                                                                setlongans(e.target.value);
                                                                                console.log(answers);
                                                                                answers?.map((sec, k) => {
                                                                                    console.log("dnsajdnas", sec?.questionid);
                                                                                    console.log("dnjdfs", que?._id)
                                                                                    if (sec?.questionid === que?._id) {


                                                                                        answers[k].answer[0] = e.target.value




                                                                                    }
                                                                                    setanswers([...answers])

                                                                                })

                                                                            }}
                                                                        />


                                                                    </ThemeProvider>


                                                                </div>
                                                                : null}
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <div style={{ float: "right", marginRight: "20px", cursor: "pointer", display: "flex" }}>
                                                                {/* <p>Required</p> */}
                                                                {/* {sectionques[index][i].required ?
                                                            <ToggleOnIcon
                                                                // onClick={() => {
                                                                //     sectionques[index][i].required = false
                                                                //     setsectionques([...sectionques])
                                                                // }}
                                                                style={{ color: "#1279da" }} /> :
                                                            <ToggleOffIcon
                                                                onClick={() => {
                                                                    sectionques[index][i].required = true
                                                                    setsectionques([...sectionques])
                                                                }}
                                                            />} */}

                                                                {/* <p style={{ marginLeft: "30px" }}>Unique</p> */}
                                                                {/* {sectionques[index][i].unique ?
                                                            <ToggleOnIcon
                                                                onClick={() => {
                                                                    sectionques[index][i].unique = false
                                                                    setsectionques([...sectionques])
                                                                }}
                                                                style={{ color: "#1279da" }} />
                                                            :
                                                            <ToggleOffIcon
                                                                onClick={() => {
                                                                    sectionques[index][i].unique = true
                                                                    setsectionques([...sectionques])
                                                                }}
                                                            />} */}
                                                                {/* <Tooltip title={"Delete Question"} placement="top" style={{ marginLeft: "30px" }}><DeleteIcon onClick={() => { deletequestion(index, i) }} /></Tooltip> */}
                                                            </div>
                                                        </Grid>

                                                    </Grid>


                                                )
                                                }
                                            </>)


                                        })

                                    }


                                </>)
                            })}

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    value="Submit"
                                    variant="contained"
                                    style={{ background: "linear-gradient(90deg, #2b7caa 0%, #2b4daa 100%)", color: "white", fontSize: "16px", textTransform: "capitalize", float: "right", fontWeight: "bold", marginRight: 18 }}

                                >Submit </Button>

                            </Grid>
                        </Grid>

                    </ValidatorForm>



                    <Dialog
                        open={done}
                        keepMounted
                        aria-labelledby="simple-dialog-title"

                    >
                        <DialogContent className="pop-content-delete">
                            <br />

                            <div style={{ height: "100px" }}>
                                <p style={{ color: "white" }}> Form Submitted Successfully</p>
                                <Button onClick={submithandlechange}
                                    style={{ color: "white", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", cursor: "pointer", marginTop: "20px", background: "#202328", border: "1px solid #d4dce1" }}
                                >
                                    Ok
                                </Button>

                            </div>
                        </DialogContent>
                    </Dialog>


                </div>
            </div >
        )
    else
        return (<div className={[classes.rooteventapply, 'EventApplyMain'].join(' ')}>
            <div className={classes.appBarSpacerEventapply} />
            <div className={classes.contenteventapply}>
                <Grid>
                    <p style={{
                        color: "White",
                        fontSize: "50px",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        marginLeft: "200px"
                    }}>Page Not Found</p>
                </Grid>
            </div>
        </div>

        )
}

export default EventApply






