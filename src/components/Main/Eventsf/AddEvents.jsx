import React, { useState } from 'react'
import { Grid, makeStyles, Tooltip, Button } from '@material-ui/core';
import { createMuiTheme, ThemeProvider, } from '@material-ui/core/styles';
import logo from "./../../../Icons/Vector.svg";
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
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {
    TextValidator,
    ValidatorForm,
    SelectValidator
} from "react-material-ui-form-validator";
import './Events.css';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';
import { useEffect } from 'react';

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
    resize: {
        fontSize: "36px",
        fontWeight: "bold"
    },
    resizeSection: {
        fontSize: "26px",
        fontWeight: "bold"
    },
    resizeQuestion: {
        fontSize: "18px"
    },
    eventHeader: {
        backgroundColor: "#202328",
        borderRadius: "20px",
        margin: "10px"
    },
    sectionHeader: {
        backgroundColor: "#202328",
        borderRadius: "20px",
        margin: "10px",
        marginTop: "50px"
    },
    questionHeader: {
        backgroundColor: "#202328",
        borderRadius: "20px",
        margin: "10px",
        marginTop: "20px",
    },

}));

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



const AddEvents = () => {
    const classes = useStyles();
    const [eventName, setEventName] = useState("Untitled form")
    const [eventDescription, setEventDescription] = useState("")
    const [image, setImage] = useState(logo)
    const [ifimage, setifImage] = useState(false)
    const [required, setrequired] = useState(false)
    const [unique, setUnique] = useState(false)
    const [value, setValue] = useState("")
    const [event, setevent] = useState([])
    const [changeimage, setimagechange] = useState(false)
    const [sectionques, setsectionques] = useState([])

    let uniqueId = localStorage.getItem("CreateEvent");
    console.log("uniqueId", uniqueId)

    useEffect(() => {

        fetch(`/event/fetch?id=${uniqueId}`, {
            credentials: 'include',
            method: 'GET',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            }
        }).then(
            (resp) => {

                console.log("resp", resp)
                resp.json().then((result) => {
                    console.log(result[0])
                    setifImage(result[0].eventimage)
                    if (result[0].eventname != '')
                        setEventName(result[0]?.eventname)
                    else
                        setEventName("Untitled form")

                    console.log(result[0].eventname)

                    setEventDescription(result[0]?.description)
                    let len = result[0]?.sectioncollection.length
                    for (var i = 0; i < len; i++) {
                        sectionques.push(result[0]?.sectioncollection[i]?.section)
                    }
                    setsectionques([...sectionques])
                    setevent(result[0]?.sectioncollection)
                    // console.log("event",event)



                })
            });

    }, [])
    console.log("event", sectionques)
    // console.log("event",event,eventName,eventDiscription)


    async function handleallchanges() {
        console.log("event", sectionques, event)
        console.log({ eventName, eventDescription, event })
        if (eventName == '')
            setEventName("Untitled form")
        console.log(eventName)

        const requestOptions = {
            Credential: 'include',
            method: 'POST',
            headers: { "x-auth-token": localStorage.getItem("token"), 'Content-Type': 'application/json' },
            body: JSON.stringify({ eventname: eventName, description: eventDescription, sectioncollection: event })

        }
        const response = await fetch(`/event/update?id=${uniqueId}`, requestOptions);
        const res = await response.json()
        console.log(response)

        if (changeimage) {
            let formdata = new FormData();
            formdata.append("image", dataURLtoFile(image, 'profilePicture.jpeg'))
            const requestOptions1 = {
                Credential: 'include',
                method: 'POST',
                headers: { "x-auth-token": localStorage.getItem("token") },
                body: formdata

            }
            const response1 = await fetch(`/event/editimage?id=${uniqueId}`, requestOptions1);
            console.log(response1)
            if ((response.status == 200) && (response1.status == 200))
                window.location.reload();
        }
        else {
            if ((response.status == 200))
                window.location.reload();
        }




    }
    const deletesection = (i) => {
        event.splice(i, 1)
        sectionques.splice(i, 1)
        setevent(prev => { return [...prev] })
        setsectionques(prev => { return [...prev] })

    }

    const addsection = () => {

        sectionques.push([])
        setsectionques([...sectionques])
        setevent(prev => { return [...prev, { sectionname: '', sectiondescription: '', section: [] }] })

    }

    const deletequestion = (index, i) => {
        sectionques[index].splice(i, 1)
        setsectionques(prev => { return [...prev] })
    }




    function ImageAsUrl(e) {
        var file = e.target.files[0];
        if (typeof file !== 'undefined') {
            var reader2 = new FileReader();
            reader2.onloadend = function () {
                setImage(reader2.result);
            }
            reader2.readAsDataURL(file)
            setifImage(false)
            setimagechange(true)

        }


    }

    function dataURLtoFile(dataurl, filename) {
        if (dataurl.length) {
            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
        }
        return new File([u8arr], filename, { type: mime });
    }

    return (
        <div className={[classes.root, 'addEventmain'].join(' ')}>
            <div className={classes.appBarSpacer} />
            <div className={classes.content}>

                {/* event headers */}

                <ValidatorForm onSubmit={handleallchanges}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className={classes.eventHeader}>
                            <div style={{ padding: "20px" }}>
                                <div style={{ width: "100%", marginBottom: "20px" }}>
                                    <img src={logo} />
                                </div>

                                <div className="coverImage" style={{ backgroundImage: ifimage ? `url(https://athrvedlms.s3.ap-south-1.amazonaws.com/event/${uniqueId})` : `url(${image})` }}></div>


                                <div style={{ marginLeft: "48%" }}>
                                    <label for="upload-photo">
                                        <AddAPhotoIcon style={{ cursor: "pointer" }} />
                                    </label>
                                    <input type='file' id="upload-photo" name="Choose-File"
                                        onChange={ImageAsUrl}
                                        style={{ display: "none" }}
                                    />

                                </div>
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
                                        value={eventName}
                                        onChange={e => setEventName(e.target.value)}
                                        placeholder="Untitled form"
                                        fullWidth
                                        InputProps={{
                                            classes: {
                                                input: classes.resize
                                            }
                                        }}
                                    />
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
                                        value={eventDescription}
                                        onChange={e => setEventDescription(e.target.value)}
                                        placeholder="Description"
                                        fullWidth
                                        InputProps={{
                                            disableUnderline: true
                                        }}
                                    />
                                </ThemeProvider>

                            </div>
                            <div style={{ float: "right", marginRight: "20px", cursor: "pointer" }}>
                                <Tooltip title={"Add Section"} placement="top"><AddCircleOutlineIcon onClick={() => { addsection() }} /></Tooltip>
                            </div>
                        </Grid>

                        {/* section  */}

                        {event.map((section, index) => {
                            return (<>
                                <Grid item xs={12} className={classes.sectionHeader}>
                                    <div style={{ padding: "20px" }}>
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
                                                value={event[index].sectionname}
                                                onChange={e => {
                                                    event[index].sectionname = e.target.value
                                                    setevent([...event])
                                                }}
                                                placeholder={`Section Name ${index + 1}`}
                                                fullWidth
                                                InputProps={{
                                                    classes: {
                                                        input: classes.resizeSection
                                                    }
                                                }}
                                                validators={["required"]}
                                                errorMessages={["This field is required"]}
                                            />
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
                                                value={event[index].sectiondescription}
                                                onChange={e => {
                                                    event[index].sectiondescription = e.target.value
                                                    setevent([...event])
                                                }}
                                                placeholder="Description"
                                                fullWidth
                                                InputProps={{
                                                    disableUnderline: true
                                                }}
                                            />
                                        </ThemeProvider>

                                    </div>
                                    <div style={{ float: "right", marginRight: "20px", cursor: "pointer" }}>
                                        <Tooltip title={"Delete Section"} placement="top"><DeleteIcon onClick={() => deletesection(index)} /></Tooltip>
                                        <Tooltip title={"Add Question"} placement="top"><AddCircleOutlineIcon
                                            onClick={() => {
                                                sectionques[index].push({ question: '', type: 'Short', required: false, unique: false, options: [''] })
                                                setsectionques([...sectionques])
                                                event[index].section = sectionques[index]
                                                setevent([...event])
                                            }} />
                                        </Tooltip>
                                        <Tooltip title={"Duplicate"} placement="top">
                                            <FileCopyIcon
                                                onClick={() => {
                                                    // sectionques.push(sectionques[index])
                                                    // // sectionques.splice(index, 1, sectionques[index])
                                                    // setsectionques([...sectionques])
                                                    // setevent(prev => { return [...prev, { sectionname: event[index].sectionname, sectiondescription: event[index].sectiondescription, section: sectionques[index] }] })

                                                    sectionques.splice(index, 0, sectionques[index])
                                                    setsectionques([...sectionques])
                                                    event.splice(index, 0, { sectionname: event[index].sectionname, sectiondescription: event[index].sectiondescription, section: sectionques[index] })
                                                    setevent([...event])
                                                }}
                                            />
                                        </Tooltip>
                                    </div>
                                </Grid>


                                {/* questions */}

                                {
                                    sectionques[index].map((q, i) => {
                                        return (<>
                                            <Grid item container spacing={2} xs={12} className={classes.questionHeader}>

                                                <Grid item xs={12} md={7}>
                                                    <ThemeProvider theme={defaultMaterialTheme}>
                                                        <TextValidator
                                                            multiline
                                                            autoFocus
                                                            size="small"
                                                            variant="standard"
                                                            // style={{
                                                            //     width: "100%",
                                                            // }}
                                                            validators={["required"]}
                                                            errorMessages={["This field is required"]}
                                                            className="question"
                                                            margin="dense"
                                                            value={sectionques[index][i].question}
                                                            onChange={e => {
                                                                sectionques[index][i].question = e.target.value
                                                                setsectionques([...sectionques])
                                                            }

                                                            }
                                                            placeholder={`Question ${i + 1}`}

                                                            fullWidth
                                                            InputProps={{
                                                                classes: {
                                                                    input: classes.resizeQuestion
                                                                }
                                                            }}
                                                        />

                                                    </ThemeProvider>
                                                </Grid>

                                                <Grid item xs={12} md={5}>
                                                    <FormControl fullWidth={true}>
                                                        <ThemeProvider theme={defaultMaterialTheme}>
                                                            <SelectValidator
                                                                placeholder="Question Type"
                                                                size="small"
                                                                variant="outlined"
                                                                validators={["required"]}
                                                                errorMessages={["This field is required"]}
                                                                id="demo-simple-select"
                                                                style={{ backgroundColor: "#202328" }}
                                                                value={sectionques[index][i].type}
                                                                onChange={e => {
                                                                    sectionques[index][i].type = e.target.value
                                                                    setsectionques([...sectionques])
                                                                }
                                                                }
                                                                id="ter"
                                                                fullWidth
                                                            >
                                                                <MenuItem value={"Email"} style={{ backgroundColor: "#202328" }} ><MailOutlineIcon />Email</MenuItem>
                                                                <MenuItem value={"RadioButton"} style={{ backgroundColor: "#202328" }} ><RadioButtonUncheckedIcon />Multiple Choice</MenuItem>
                                                                <MenuItem value={"Short"} style={{ backgroundColor: "#202328" }} ><ShortTextIcon />Short Answer</MenuItem>
                                                                <MenuItem value={"Long"} style={{ backgroundColor: "#202328" }} ><TextFieldsIcon />Long Answer</MenuItem>
                                                                <MenuItem value={"CheckBox"} style={{ backgroundColor: "#202328" }}><CheckBoxOutlineBlankIcon />Check Box</MenuItem>
                                                                <MenuItem value={"Dropdown"} style={{ backgroundColor: "#202328" }}><ArrowDropDownCircleIcon />Drop Down</MenuItem>

                                                            </SelectValidator>
                                                        </ThemeProvider>
                                                    </FormControl>
                                                </Grid>

                                                {/* options */}
                                                <Grid item xs={12}>
                                                    {/* Email */}
                                                    {sectionques[index][i].type === "Email" ?
                                                        <div>
                                                            <ThemeProvider theme={defaultMaterialTheme}>
                                                                <TextValidator
                                                                    autoFocus
                                                                    multiline
                                                                    disabled
                                                                    rows={1}
                                                                    size="small"
                                                                    variant="filled"
                                                                    style={{
                                                                        fontSize: "50px",
                                                                        marginTop: "10px",
                                                                    }}
                                                                    margin="dense"
                                                                    placeholder="Enter email"
                                                                    fullWidth
                                                                    InputProps={{
                                                                        disableUnderline: true
                                                                    }}
                                                                />

                                                            </ThemeProvider>


                                                        </div>
                                                        : null}
                                                    {/* multiple choice */}
                                                    {sectionques[index][i].type === "RadioButton" ?
                                                        <Grid item conatiner spacing={2} xs={12}>
                                                            {sectionques[index][i].options.map((arr, j) => {
                                                                return (
                                                                    <Grid item xs={12}>
                                                                        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                                                                            <RadioButtonUncheckedIcon style={{ marginTop: "5px", marginRight: "5px" }} />
                                                                            <ThemeProvider theme={defaultMaterialTheme}>
                                                                                <TextValidator
                                                                                    multiline
                                                                                    autoFocus
                                                                                    // size="small"
                                                                                    variant="standard"
                                                                                    style={{ width: "100%" }}
                                                                                    margin="dense"
                                                                                    value={sectionques[index][i].options[j]}
                                                                                    onKeyPress={
                                                                                        e => {
                                                                                            if (e.key === 'Enter') {
                                                                                                sectionques[index][i].options.push("")
                                                                                                setsectionques([...sectionques])
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                    onChange={e => {
                                                                                        if (e.target.value != '\n') {
                                                                                            sectionques[index][i].options[j] = e.target.value
                                                                                            setsectionques([...sectionques])
                                                                                        }
                                                                                    }}
                                                                                    placeholder={`Option ${j + 1}`}

                                                                                    fullWidth
                                                                                    InputProps={{
                                                                                        classes: {
                                                                                            input: classes.resizeQuestion
                                                                                        }
                                                                                    }}
                                                                                />

                                                                            </ThemeProvider>
                                                                            <ClearIcon style={{ cursor: "pointer", marginTop: "10px" }} onClick={e => {
                                                                                sectionques[index][i].options.splice(j, 1)
                                                                                setsectionques([...sectionques])
                                                                            }} />
                                                                            {/* <input 
                                                    placeholder={`Option ${i + 1}`} 
                                                    value={options[i]} 
                                                    onChange
                                                    /> */}
                                                                        </div>
                                                                    </Grid>)
                                                            })}

                                                        </Grid>
                                                        : null}
                                                    {/* check box */}
                                                    {sectionques[index][i].type === "CheckBox" ?
                                                        <div>
                                                            {sectionques[index][i].options.map((arr, j) => {
                                                                return (
                                                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                                                        <CheckBoxOutlineBlankIcon style={{ marginTop: "5px", marginRight: "5px" }} />
                                                                        <ThemeProvider theme={defaultMaterialTheme}>
                                                                            <TextValidator
                                                                                multiline
                                                                                autoFocus
                                                                                size="small"
                                                                                variant="standard"
                                                                                style={{
                                                                                    width: "100%",
                                                                                }}
                                                                                margin="dense"
                                                                                value={sectionques[index][i].options[j]}
                                                                                onKeyPress={
                                                                                    e => {
                                                                                        if (e.key === 'Enter') {
                                                                                            sectionques[index][i].options.push("")
                                                                                            setsectionques([...sectionques])
                                                                                        }
                                                                                    }
                                                                                }
                                                                                onChange={e => {
                                                                                    if (e.target.value != '\n') {
                                                                                        sectionques[index][i].options[j] = e.target.value
                                                                                        setsectionques([...sectionques])
                                                                                    }
                                                                                }}
                                                                                placeholder={`Option ${j + 1}`}

                                                                                // fullWidth
                                                                                InputProps={{
                                                                                    classes: {
                                                                                        input: classes.resizeQuestion
                                                                                    }
                                                                                }}
                                                                            />

                                                                        </ThemeProvider>
                                                                        <ClearIcon style={{ cursor: "pointer", marginTop: "10px" }} onClick={e => {
                                                                            sectionques[index][i].options.splice(j, 1)
                                                                            setsectionques([...sectionques])
                                                                        }} />
                                                                        {/* <input 
                                                    placeholder={`Option ${i + 1}`} 
                                                    value={options[i]} 
                                                    onChange
                                                    /> */}
                                                                    </div>)
                                                            })}

                                                        </div>
                                                        : null}
                                                    {/* Drop Down*/}
                                                    {sectionques[index][i].type === "Dropdown" ?
                                                        <div>
                                                            {sectionques[index][i].options.map((arr, j) => {
                                                                return (
                                                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                                                        <p style={{ marginTop: "10px", marginRight: "5px" }}>{j + 1}</p>
                                                                        <ThemeProvider theme={defaultMaterialTheme}>
                                                                            <TextValidator
                                                                                multiline
                                                                                autoFocus
                                                                                size="small"
                                                                                variant="standard"
                                                                                style={{
                                                                                    width: "100%",
                                                                                }}
                                                                                margin="dense"
                                                                                value={sectionques[index][i].options[j]}
                                                                                onKeyPress={
                                                                                    e => {
                                                                                        if (e.key === 'Enter') {
                                                                                            sectionques[index][i].options.push("")
                                                                                            setsectionques([...sectionques])
                                                                                        }
                                                                                    }
                                                                                }
                                                                                onChange={e => {
                                                                                    if (e.target.value != '\n') {
                                                                                        sectionques[index][i].options[j] = e.target.value
                                                                                        setsectionques([...sectionques])
                                                                                    }
                                                                                }}
                                                                                placeholder={`Option ${j + 1}`}

                                                                                // fullWidth
                                                                                InputProps={{
                                                                                    classes: {
                                                                                        input: classes.resizeQuestion
                                                                                    }
                                                                                }}
                                                                            />

                                                                        </ThemeProvider>
                                                                        <ClearIcon style={{ cursor: "pointer", marginTop: "10px" }} onClick={e => {
                                                                            sectionques[index][i].options.splice(j, 1)
                                                                            setsectionques([...sectionques])
                                                                        }} />
                                                                        {/* <input 
                                                    placeholder={`Option ${i + 1}`} 
                                                    value={options[i]} 
                                                    onChange
                                                    /> */}
                                                                    </div>)
                                                            })}

                                                        </div>
                                                        : null}

                                                    {/* Short Answer */}
                                                    {sectionques[index][i].type === "Short" ?
                                                        <div>




                                                            <ThemeProvider theme={defaultMaterialTheme}>
                                                                <TextValidator
                                                                    autoFocus
                                                                    multiline
                                                                    disabled
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
                                                                />

                                                            </ThemeProvider>


                                                        </div>
                                                        : null}

                                                    {/* Long Answer*/}
                                                    {sectionques[index][i].type === "Long" ?
                                                        <div>

                                                            <ThemeProvider theme={defaultMaterialTheme}>
                                                                <TextValidator
                                                                    autoFocus
                                                                    disabled
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
                                                                />


                                                            </ThemeProvider>


                                                        </div>
                                                        : null}
                                                </Grid>

                                                <Grid item xs={12}>
                                                    <div style={{ float: "right", marginRight: "20px", cursor: "pointer", display: "flex" }}>
                                                        <p>Required</p>
                                                        {sectionques[index][i].required ?
                                                            <ToggleOnIcon
                                                                onClick={() => {
                                                                    sectionques[index][i].required = false
                                                                    setsectionques([...sectionques])
                                                                }}
                                                                style={{ color: "#1279da" }} /> :
                                                            <ToggleOffIcon
                                                                onClick={() => {
                                                                    sectionques[index][i].required = true
                                                                    setsectionques([...sectionques])
                                                                }}
                                                            />}

                                                        <p style={{ marginLeft: "30px" }}>Unique</p>
                                                        {sectionques[index][i].unique ?
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
                                                            />}
                                                        <Tooltip title={"Delete Question"} placement="top" style={{ marginLeft: "30px" }}><DeleteIcon onClick={() => { deletequestion(index, i) }} /></Tooltip>
                                                    </div>
                                                </Grid>

                                            </Grid>
                                        </>)
                                    })
                                }



                            </>)
                        })}
                    </Grid>
                    <Button
                        style={{ color: "#5499FF", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", marginRight: 18 }}
                        type="submit"
                    >Save</Button>
                </ValidatorForm>


            </div>
        </div >
    )
}

export default AddEvents
