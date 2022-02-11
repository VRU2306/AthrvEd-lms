import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./Profile.css"
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import "react-image-crop/dist/ReactCrop.css";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid"
import FormControl from "@material-ui/core/FormControl"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import MenuItem from "@material-ui/core/MenuItem";
import { useStoreActions, useStoreState } from 'easy-peasy';
import Copyright from "../../../UI/Copyrights";
import CancelSharpIcon from '@material-ui/icons/CloseRounded';
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import Verifyemail from "../Verifyemail/verifymail";
import { Box, Button, Avatar, DialogContent, DialogTitle } from "@material-ui/core";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./Image";
// quali
import AddQualification from "../Education/AddQualification";
import Editquali from "../Education/Editqualification";
// skills
import Technical from "../Technicalskills/AddTechskills";
import Nontechnical from "../Nontechnicalskills/AddNontechskills";
import Autocomplete from "@material-ui/lab/Autocomplete";
const defaultMaterialTheme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            // Purple and green play nicely together.

            backgroundColor: "#202328",
            light: "#ffffff",
            main: "#67737A"
        }
    }
});
const themeprofile = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            // Purple and green play nicely together.

            backgroundColor: "#202328",
            light: "#ffffff",
            main: "#67737A"
        }
    }

})

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    profilepaperstyling: {
        backgroundColor: "#202328",
        width: 350,
        height: 200,
        overflow: "auto",

    },
    content: {
        flexGrow: 0.95,
        height: "100vh",
        overflow: "auto",
        backgroundColor: "#0F1012"

    },
    msx: {
        backgroundColor: "#202328",
        width: 550,
        height: 400,

        overflow: "auto"
    },
    appBarSpacer: theme.mixins.toolbar,
    drawerProfile: {

        "@media (min-width:599px) ": {
            marginLeft: "300px",
        },
        "@media (max-width:599px) ": {
            marginLeft: "100px",
        },

    },
    drawerProfileImage: {
        // "@media (min-width:599px) ": {
        display: "flex",
        justifyContent: "center",

        //   },
    }

}));
const Profile = () => {
    let prevEmail = useStoreState(state => state.profileMod.profile.email);
    let prevFname = useStoreState(state => state.profileMod.profile.fname);
    let prevLname = useStoreState(state => state.profileMod.profile.lname);
    let prevSex = useStoreState(state => state.profileMod.profile.sex);
    let prevSem = useStoreState(state => state.profileMod.profile.sem);
    let prevDob = useStoreState(state => state.profileMod.profile.dob);
    let prevPhone = useStoreState(state => state.profileMod.profile.phone);
    let prevAddress1 = useStoreState(
        (state) => state.profileMod.profile.address_line1
    );
    let prevAddress2 = useStoreState(
        (state) => state.profileMod.profile.address_line2
    );
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    // QUALI
    let {
        skills,
        ntskill,
        qualification,
    } = useStoreState(state => state.profileMod.profile);
    const [dob, setSelectedDate] = useState(new Date(prevDob) || new Date("2000-01-01"));
    let prevCity = useStoreState((state) => state.profileMod.profile.city);
    let prevDist = useStoreState((state) => state.profileMod.profile.dist);
    let prevState = useStoreState((state) => state.profileMod.profile.state);
    let prevPin = useStoreState((state) => state.profileMod.profile.pin);
    let prevaboutme = useStoreState((state) => state.profileMod.profile.aboutme);
    let prevbranch = useStoreState((state) => state.profileMod.profile.branch);
    let prevImage = useStoreState((state) => state.profileMod.profile.image);
    let updateProfile = useStoreActions(
        (action) => action.profileMod.POST_PROFILE_START
    );

    let [sex, setSex] = useState(
        (prevSex && prevSex === "M" ? "Male" : "Female") || "");
    let [sem, setSem] = useState("" + prevSem || "First1");
    let [branch, setbranch] = useState(prevbranch || "Computer Science");
    console.log(prevFname)
    let [fname, setFname] = useState(prevFname);
    console.log(fname)
    console.log(prevFname)
    let [lname, setLname] = useState(prevLname || "");
    let [images, setImages] = useState(prevImage || "");
    // console.log(images)
    let [email, setEmail] = useState(prevEmail || "");
    let [phone, setPhone] = useState(prevPhone || "");
    let [address_line1, setaddress_line1] = useState(prevAddress1 || "");
    let [address_line2, setaddress_line2] = useState(prevAddress2 || "");
    let [city, setCity] = useState(prevCity || "");
    let [dist, setDist] = useState(prevDist || "");
    let [state, setState] = useState(prevState || "");
    let [pin, setPin] = useState(prevPin || "");
    let [aboutme, setaboutme] = useState(prevaboutme || "");
    let { type } = useStoreState((state) => state.profileMod.profile);
    const classes = useStyles();
    // email verify
    let verify = useStoreState(state => state.profileMod.profile.verify);
    const [open, setOpen] = React.useState(false);
    let [openVerifyModal, setOpenVerifyModal] = useState(false);


    let [editqualifications, setEditQualifications] = useState("");
    const [collegee, setCollegee] = React.useState("");
    const [gradee, setGradee] = React.useState(0);
    const [boardd, setBoardd] = React.useState("");
    const postQualification = useStoreActions(
        action => action.profileMod.POST_EDITQUALIFICATION_START
    );


    function handleVerifyOpen() {
        setOpenVerifyModal(true)
    }

    function handleVerifyClose() {
        setOpenVerifyModal(false)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // education qualification
    let [openQualificationModal, setOpenQualificationModal] = useState(false);
    let [openQualificationEditModal, setOpenQualificationEditModal] = useState(false);
    const deletequalification = useStoreActions(
        action => action.profileMod.QUALIFICATION_DELETE_START
    );
    function handleQualificationOpen() {
        setOpenQualificationModal(true);
    }

    function handleQualificationClose() {
        setOpenQualificationModal(false);
    }
    // function handleQualificationEditOpen() {
    //     setOpenQualificationEditModal(true);
    // }
    const handleQualificationEditOpen = (qualification, college, grade, board
    ) => {
        setOpenQualificationEditModal(true);
        setEditQualifications(qualification);
        setCollegee(college);
        setGradee(grade);
        setBoardd(board);

    };

    function handleQualificationEditClose() {
        setOpenQualificationEditModal(false);
    }
    // image
    // show thumb for image File.
    const Thumnail = ({ file, faker, className }) => {
        // const [images] = React.useState(prevImage);// main photo
        const [thumb, setThumb] = React.useState(null);

        // generate url for thumb
        React.useEffect(() => {
            if (file && file.type) {
                let reader = new FileReader();
                reader.onloadend = () => setThumb(reader.result);
                reader.readAsDataURL(file);
            }
        }, [file]);

        // get the thumb
        return (
            <div>

                <Avatar
                    src={thumb !== null ? thumb : faker}
                    className={className}
                    style={{
                        width: 250, height: 250, background: "#0F1012",
                        color: "#67737A", border: "1px solid #67737A"
                    }}
                />

            </div>
        );
    };
    const CropImage = ({ image, setImage, setCropped, setVurl, ...props }) => {
        const { workphoto, setWorkphoto } = props;
        const [crop, setCrop] = React.useState({
            x: 0,
            y: 0,
            width: 250,
            height: 250
        });
        const [zoom, setZoom] = React.useState(1.5);
        const aspect = 1;
        const [url, setUrl] = React.useState(undefined);
        const [cap, setCap] = React.useState();
        const [modalopen, setModalOpen] = React.useState(true);

        // make image to url for browser
        React.useEffect(() => {
            if (workphoto && workphoto.type) {
                let reader = new FileReader();
                reader.onloadend = () => setUrl(reader.result);
                reader.readAsDataURL(workphoto);
            }
        }, [workphoto]);
        //chek for he image object
        if (!workphoto || !workphoto.type) return <></>;

        // if not got url
        if (url === "undefined" || url === null) return <>Loading..</>;

        const onCropComplete = (croppedArea, croppedAreaPixels) => {
            setCap(croppedAreaPixels);
        };
        const handleModalClose = () => {
            setModalOpen(false);
            setWorkphoto("");
            setCropped(1);
        };

        const onSubmit = () => {
            const croppedImage = getCroppedImg(url, cap);
            if (croppedImage) {
                setCropped(0);
                croppedImage.then((r) => {
                    const photo = new File([r[0]], "Your Image.png", { type: "image/png" });
                    setImage(r[1]);
                    setPhoto(photo);
                    setWorkphoto(photo);
                    handleModalClose();
                });
            }
        };



        return (
            <>
                <Dialog
                    open={modalopen}
                    onClose={handleModalClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <div className={classes.msx}>
                        <DialogTitle id="alert-dialog-title">
                            <p className="nontechskillhead">Crop Image to fit</p>
                        </DialogTitle>
                        <DialogContent>
                            <div
                                style={{
                                    position: "relative",
                                    zIndex: 1000,
                                    marginLeft: 50,
                                    height: 250,
                                    width: 250,
                                    background: "#eee"
                                }}
                            >
                                <Cropper
                                    image={url}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={aspect}
                                    onCropChange={(c) => setCrop(c)}
                                    onCropComplete={onCropComplete}
                                    onZoomChange={(z) => setZoom(z)}
                                />
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <div className="submitnontechskillino">
                                <Button onClick={handleModalClose} className="addusercancels"
                                    style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #67737A" }}>
                                    Delete
                                </Button>
                            </div>
                            <div className="submitnontechskillyes">
                                <Button onClick={onSubmit} className="adduseryes" autoFocus
                                    style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}>
                                    Save
                                </Button>
                            </div>
                        </DialogActions>
                    </div>
                </Dialog>
            </>
        );
    };
    // image
    const [photo, setPhoto] = React.useState();
    console.log(photo)
    const [image, setImage] = React.useState(null); // main photo
    console.log(image)
    const [cropped, setCropped] = React.useState(null);
    console.log(cropped)
    const [workphoto, setWorkphoto] = React.useState();

    // skills
    let [openTechnititleModal, setOpenTechntitleModal] = useState(false)
    let [openNontechnititleModal, setOpenNonTechntitleModal] = useState(false)
    const deleteTechSkills = useStoreActions(
        action => action.profileMod.DELETE_SKILL_START
    );
    const deletenonTechSkills = useStoreActions(
        action => action.profileMod.DELETE_NONSKILL_START
    );
    // tech
    function handleTitleOpen() {
        setOpenTechntitleModal(true);
    }
    function handleTitleClose() {
        setOpenTechntitleModal(false);
    }
    // nontech
    function handleNonTitleOpen() {
        setOpenNonTechntitleModal(true);
    }
    function handleNonTitleClose() {
        setOpenNonTechntitleModal(false);
    }
    function dataURLtoFile(dataurl, filename) {
        // console.log(dataurl)
        if (dataurl) {
            var arr = dataurl?.split(','),
                mime = arr[0]?.match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr?.length,
                u8arr = new Uint8Array(n);
        }


        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    async function submitData(e) {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("sex", sex)
        formdata.append("branch", branch)
        formdata.append("fname", fname)
        formdata.append("lname", lname)
        formdata.append("sem", sem)
        // formdata.append("dob", dob)
        formdata.append("phone", phone)
        formdata.append("address_line1", address_line1)
        formdata.append("address_line2", address_line2)
        formdata.append("city", city)
        formdata.append("dist", dist)
        // console.log(dist)
        formdata.append("state", state)
        formdata.append("pin", pin)
        formdata.append("aboutme", aboutme)
        formdata.append("image", dataURLtoFile(image, 'image.jpg'))
        // console.log(formdata)

        const request = {
            Credentials: 'include',
            method: 'POST',
            headers: {
                "x-auth-token": localStorage.getItem("token")
            },
            body: formdata
        }

        const result = await fetch('/profile', request)
        console.log(result)
        if (result) {
            // window.location.reload();
            // localStorage.setItem("reload", true)
            window.location.reload()

        }
        // console.log(result)
    }
    // reloadin and seting data
    let isProfileLoading = useStoreState(state => state.profileMod.isFetching);

    let getProfile = useStoreActions(
        action => action.profileMod.FETCH_PROFILE_START
    );
    let fetchAttendanceReset = useStoreActions(
        action => action.attendence.FETCH_ATTENDENCE_REQUEST
    );
    let isProfileFetching = useStoreState(state => state.profileMod.isFetching);
    useEffect(() => {
        if (isProfileLoading) getProfile();
        return () => fetchAttendanceReset();
    }, []);

    useEffect(() => {
        if (isProfileFetching) getProfile();
        setFname(prevFname);
        setLname(prevLname);
        setEmail(prevEmail);
        setSex(prevSex);
        setSem(prevSem);
        setbranch(prevbranch);
        setPhone(prevPhone);
        setaddress_line1(prevAddress1);
        setaddress_line2(prevAddress2);
        setCity(prevCity);
        setDist(prevDist);
        setState(prevState);
        setPin(prevPin);
        setaboutme(prevaboutme);
        console.log(prevImage)
        setImages(prevImage);
    }, [isProfileFetching]);
    const [profilehtml, detailshtml] = [<Grid item xs={12} md={1} className={classes.drawerProfileImage} >
        <div className="imageledt">



            {cropped === 1 ? (
                <Thumnail faker={image} />
            ) : (
                <>
                    <Avatar
                        src={images}

                        style={{
                            width: 250, height: 250, background: "#0F1012",
                            color: "#67737A", border: "1px solid #67737A"
                        }}
                    />
                </>
            )}
            <input
                webkitdirectory
                accept="image/png, image/jpeg, image/jpg"
                multiple={false}
                type="file"

                id="file"
                onChange={(event) => {
                    setWorkphoto(event.target.files[0]);
                    setCropped(null);
                }}

            />
            <div>

            </div>
            {cropped !== 1 && (
                <CropImage
                    photo={photo}
                    setPhoto={setPhoto}
                    setCropped={setCropped}
                    setImage={setImage}
                    workphoto={workphoto}
                    setWorkphoto={setWorkphoto}
                />
            )}
            <label for="file" className="imageedit" />

        </div>
    </Grid>,
    <Grid item xs={12} md={6}
        //    style={{marginLeft: "300px"}} 
        className={classes.drawerProfile}
    >
        <p
            // className="Name"
            className="profileName"
        >Name</p>
        <ThemeProvider theme={themeprofile}>
            <div
                // className="phonespace"
                className="spaceName"
            >
                <Grid item >
                    <br></br>
                    <FormControl>
                        <TextValidator
                            // className="Namefield"
                            style={{
                                width: "206px",
                                marginRight: "30px"
                            }}
                            className="Namefieldprofile"
                            variant='outlined'
                            id="profile-name"
                            type="fname"
                            validators={["required"]}
                            errorMessages={["First name is required"]}
                            value={fname}
                            onChange={(e) => {
                                setFname(e.target.value);
                            }}
                            placeholder="Name"
                        />
                    </FormControl>
                </Grid>
                {/* </div>
            <div 
            // className="phonespacename"
            > */}
                <Grid item >
                    <br></br>
                    <FormControl>
                        <TextValidator
                            className="Namefieldprofile"
                            style={{
                                width: "206px",
                                // marginLeft:"30px"
                            }}
                            variant='outlined'
                            id="profile-name"
                            type="fname"
                            validators={["required"]}
                            errorMessages={["First name is required"]}
                            value={lname}
                            onChange={(e) => {
                                setLname(e.target.value);
                            }}
                            placeholder="Name"
                        />
                    </FormControl>
                </Grid>
            </div>
            <p
                // className="Bio" 
                className="profileName"
            >Bio</p>
            <br></br>
            <div
            // className="phonespace"
            >
                <Grid item
                // md={6} lg={3}
                >
                    <FormControl >
                        <TextValidator
                            className="Biofieldprofile"
                            // style={{ width: "496px"}}
                            variant="outlined"
                            placeholder="Bio"
                            id="profile-about"
                            type="address"
                            validators={["required"]}
                            errorMessages={["This field is required"]}
                            value={aboutme}
                            onChange={(e) => {
                                setaboutme(e.target.value);
                            }}
                        />

                    </FormControl>
                </Grid >
            </div>
            <p
                // className="Email"
                className="profileName"
            >Email Address</p>
            <br></br>
            <div
            // className="phonespace"
            >
                <Grid item md={6} lg={3}>

                    <FormControl>
                        <TextValidator
                            className="Biofieldprofile"
                            // className="emailfield"
                            disabled
                            placeholder="Email"
                            variant="outlined"
                            id="profile-email"
                            value={email}
                            type="email"
                            validators={["required", "isEmail"]}
                            errorMessages={["Email is required", "Email is not valid"]}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </FormControl>
                </Grid>
                <br></br>
                <Verifyemail
                    open={openVerifyModal}
                    handleClose={handleVerifyClose} />
                {verify === "N" ? (
                    <p className="verifyemail" style={{ cursor: "pointer" }} onClick={event => {
                        handleVerifyOpen();

                    }}>Verify your Email address</p>)
                    : <p className="verifiedprofile">Email address Verified</p>}
            </div>
            <div className="spaceName">

                <div
                //  className="phonespace"
                >
                    <p className="genderm1">Mobile Number</p>
                    <br></br>

                    <Grid item
                    // md={6} lg={3}
                    >

                        <FormControl>
                            <TextValidator
                                style={{
                                    width: "206px",
                                    marginRight: "30px"
                                }}
                                className="Namefieldprofile"
                                // className="phonefield"
                                placeholder="Phone Number"
                                id="profile-phone"
                                type="phone"
                                validators={["required", "matchRegexp:[0-9]{10}"]}
                                errorMessages={[
                                    "This field is required",
                                    "Enter a valid phone number",
                                ]}
                                value={phone}
                                variant="outlined"
                                inputProps={{ maxLength: 10 }}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                        </FormControl>
                    </Grid>
                </div>
                {/* gendetr in same line */}


                <div
                //  className="phonespacegen"
                >
                    <p className="genderm1" >Gender</p>
                    <br></br>
                    <Grid item
                    //  md={6} lg={3}
                    >

                        <FormControl >
                            <Autocomplete
                                // className="genderfield"
                                style={{ width: "206px" }}
                                className="Namefieldprofile"
                                id="profile-sex"
                                defaultValue={sex}
                                onChange={(event, value) => {
                                    if (value) setSex(value[0]);
                                }}
                                options={["Male", "Female", "Other"]}
                                filterSelectedOptions
                                renderInput={(params) => (
                                    <TextValidator
                                        className="genderfield"
                                        value={sex}
                                        validators={["required"]}
                                        errorMessages={["This field is required"]}
                                        {...params}
                                        variant="outlined"

                                        type="gender"
                                        placeholder="Enter the gender"
                                        fullWidth
                                    />
                                )}
                            />
                        </FormControl>

                    </Grid>
                </div>
            </div>
            <div
                className="spaceName">

                <div
                // className="phonespace"

                >
                    <p
                        className="genderm1"
                    // className="dept"
                    >Department</p>
                    <Grid item
                    // md={6} lg={3}
                    >
                        <br></br>

                        <FormControl>
                            <SelectValidator

                                id="profile-branch"
                                style={{
                                    width: "206px",
                                    marginRight: "30px"
                                }}
                                // className="deptfield"
                                className="Namefieldprofile"
                                placeholder="Enter the branch"
                                variant="outlined"
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                value={branch}
                                onChange={(e) => {
                                    setbranch(e.target.value);
                                }}

                            >
                                <MenuItem value={"Computer science"}>Computer science</MenuItem>
                                <MenuItem value={"Information science"}>Information science</MenuItem>
                                <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                                <MenuItem value={"Civil"}>Civil</MenuItem>
                                <MenuItem value={"Electrical and Electronics"}>Electrical and Electronics</MenuItem>
                                <MenuItem value={"Electronics and Communication"}>Electronics and Communication</MenuItem>
                                <MenuItem value={"Biotechnology"}>Biotechnology</MenuItem>
                                {type === "A" ? (
                                    <MenuItem value={"Mentor"}>Other</MenuItem>) : null}
                            </SelectValidator>
                        </FormControl>
                    </Grid>
                </div>

                <div
                // className="phonespacesem"
                >
                    <p
                        // className="semseter"
                        className="genderm1"
                    >Semester</p>
                    <Grid item
                    // md={6} lg={3}
                    >
                        <br></br>
                        <FormControl>
                            <SelectValidator
                                // className="semfield"
                                style={{ width: "206px" }}
                                className="Namefieldprofile"
                                placeholder="Enter your Semester"
                                validators={["required"]}
                                variant="outlined"
                                errorMessages={["This field is required"]}

                                id="profile-sem"
                                value={sem}
                                onChange={(e) => {
                                    setSem(e.target.value);
                                }}
                                id="semester"
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                {type === "A" ? (
                                    <MenuItem value={0}>Other</MenuItem>) : null}
                            </SelectValidator>
                        </FormControl>
                    </Grid>
                </div>
            </div>
            {/* Qualification */}
            <AddQualification
                handleClose={handleQualificationClose}
                open={openQualificationModal}
            />
            {/* <Editquali
                handleClose={handleQualificationEditClose}
                open={openQualificationEditModal}
                editqualifications={editqualifications}
                collegee={collegee}
                boardd={boardd}
                grade={gradee}
            /> */}
            <p className="education1">Education Qualification{""}
                <AddCircleOutlineOutlinedIcon
                    // src={Addicon}
                    style={{ paddingTop: 5, marginTop: 10, cursor: "pointer", color: "#D4DCE1" }}
                    onClick={event => {
                        handleQualificationOpen();
                    }}
                /></p>

            {qualification && qualification.length ? (
                qualification.map(
                    ({ qualification, college, grade, board }) => (

                        <Grid container
                            xs={8}
                            md={10}
                            //  className="educate" 
                            className="educate1"
                        //  style={{width:"65%"}}
                        >
                            <Grid item xs={8} md={8}>
                                <div key={qualification}>
                                    <br />
                                    <p className="educationqualihead1">{qualification}</p>
                                    <p className="educationqualicollege1">{college}</p>
                                    <p className="educationqualicollege1">{grade}</p>
                                    <p className="educationqualicollege1">{board}</p>

                                </div>
                            </Grid>
                            <Grid item xs={12} md={1} style={{ marginTop: "40px" }}>
                                <div
                                // className="edueidts"
                                >
                                    <Button
                                        style={{
                                            color: "#FFFFFF", background: "#373B3D", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20,
                                            lineHeight: "25px", marginBottom: "20px", width: "120px"
                                        }}
                                        // className="eduedit"
                                        onClick={event => {
                                            handleQualificationEditOpen(qualification, college, grade, board);
                                        }}>Edit</Button>
                                </div>
                                <Dialog
                                    open={openQualificationEditModal}
                                    onClose={handleQualificationEditClose}
                                    aria-labelledby="form-dialog-title"
                                    style={{
                                        backdropFilter: "blur(8px)"
                                    }}
                                >
                                    <div className={classes.msx}>
                                        <ValidatorForm
                                            id="this-form"
                                            onSubmit={event => {
                                                // console.log("Hello");
                                                postQualification({
                                                    boardd,
                                                    collegee,
                                                    editqualifications,
                                                    gradee
                                                });
                                                handleQualificationEditClose();
                                            }}
                                        >
                                            <p className="qulaiheading" style={{ marginLeft: "175px" }}> Edit Qualification</p>

                                            <DialogContent>

                                                <ThemeProvider theme={defaultMaterialTheme}>
                                                    <TextValidator
                                                        disabled
                                                        autoFocus
                                                        margin="dense"
                                                        validators={["required"]}
                                                        variant="outlined"
                                                        errorMessages={["Please enter this field"]}
                                                        value={editqualifications}
                                                        // onChange={e => setQualification(e.target.value)}
                                                        id="qualification"
                                                        placeholder="Qualification"
                                                        type=""
                                                        fullWidth
                                                    />
                                                    <TextValidator
                                                        autoFocus
                                                        margin="dense"
                                                        type="number"
                                                        variant="outlined"
                                                        value={gradee}
                                                        validators={["required", "isNumber", "matchRegexp:^[1-9]$|^10$"]}
                                                        errorMessages={[
                                                            "Please enter this field",
                                                            "This field shuld be a number",
                                                            "Invalid value"
                                                        ]}
                                                        onChange={e => {
                                                            setGradee(e.target.value);
                                                        }}
                                                        id="qualification_grade"
                                                        placeholder="Grade"

                                                        fullWidth
                                                    />
                                                    <TextValidator
                                                        autoFocus
                                                        margin="dense"
                                                        variant="outlined"
                                                        validators={["required"]}
                                                        errorMessages={["Please enter this field"]}
                                                        value={collegee}
                                                        onChange={e => setCollegee(e.target.value)}
                                                        id="qualification_college"
                                                        placeholder="College"
                                                        type=""
                                                        fullWidth
                                                    />
                                                    <TextValidator
                                                        autoFocus
                                                        margin="dense"
                                                        variant="outlined"
                                                        validators={["required"]}
                                                        errorMessages={["Please enter this field"]}
                                                        value={boardd}
                                                        onChange={e => setBoardd(e.target.value)}
                                                        id="qualification_board"
                                                        placeholder="Board"
                                                        type=""
                                                        fullWidth
                                                    />
                                                </ThemeProvider>

                                            </DialogContent>

                                            <DialogActions>
                                                <div className="submitqualino">
                                                    <Button onClick={handleQualificationEditClose} className="addusercancels" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #67737A" }}>
                                                        Cancel
                                                    </Button>
                                                </div>
                                                <div className="submitqualiyes">
                                                    <Button type="submit" className="adduseryes" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}>
                                                        Submit
                                                    </Button>
                                                </div>
                                            </DialogActions>
                                        </ValidatorForm>
                                    </div>
                                </Dialog>
                                <div
                                // className="edudeletes"
                                >
                                    <Button
                                        style={{
                                            color: "#FFFFFF", border: "1px Solid #535A5E", textTransform: "capitalize", fontFamily: "Mulish",
                                            fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", width: "120px"
                                        }}
                                        onClick={() => {
                                            deletequalification({
                                                qualification,

                                            });
                                            // console.log(qualification)
                                        }}
                                    //  className="edudelete"
                                    >Delete</Button></div>

                            </Grid>
                        </Grid>

                    )
                )
            ) : (
                <p className="noeducation1">Add your educational qualifications, <br></br>click on the plus button to add one!</p>
            )}

            {/* skills both tech and non tech */}
            <Technical
                handleClose={handleTitleClose}
                open={openTechnititleModal}
            />
            <p className="techskills1">Technical Skills
                <AddCircleOutlineOutlinedIcon
                    // src={Addicon}
                    style={{ paddingTop: 5, marginTop: 10, cursor: "pointer", color: "#D4DCE1" }}
                    onClick={event => {
                        handleTitleOpen();
                    }}
                /></p>
            {skills && skills.length ? (
                <Grid container
                    direction="row"
                    className="techskillS"
                >
                    {skills.map(({ skills }) => (
                        <Grid container
                            xs={4}
                            direction="row"
                            // xs={2} 
                            // xs={4} sm={1} md={2} lg={1} xl={1} 
                            // className="techskillsss"
                            className="techskillsss1"
                        >
                            < Grid item xs={12} className="techskis1" >{skills} <CancelSharpIcon
                                style={{ fontSize: '20', paddingTop: 4, color: "#FF4747", cursor: "pointer" }}
                                onClick={event => {
                                    deleteTechSkills({
                                        skills,
                                    })
                                }}
                            />
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <p className="noeducation1">Add your technical skills, <br></br>click on the plus button to add one!</p>
            )}
            <Nontechnical
                handleClose={handleNonTitleClose}
                open={openNontechnititleModal} />
            <p className="nontechskills1">Non-Technical Skills
                <AddCircleOutlineOutlinedIcon
                    // src={Addicon}
                    style={{ paddingTop: 5, marginTop: 10, cursor: "pointer", color: "#D4DCE1", }}
                    onClick={event => {
                        handleNonTitleOpen();
                    }}
                /></p>
            {ntskill && ntskill.length ? (
                <Grid container
                    direction="row" className="techskillS">
                    {ntskill.map(({ skills }) => (
                        <Grid container
                            direction="row" xs={4}
                            // sm={1} md={2} lg={1} xl={1} 
                            className="techskillsss1">

                            < Grid item xs={12} className="techskis1" >{skills}

                                < CancelSharpIcon
                                    style={{ fontSize: '20', paddingTop: 4, color: "#FF4747", cursor: "pointer" }}
                                    onClick={event => {
                                        deletenonTechSkills({
                                            skills,
                                        });
                                    }}
                                />
                            </ Grid>
                        </Grid>


                    ))}
                </Grid>
            ) : (
                <p className="noeducation1">Add your non-technical skills, <br></br>click on the plus button to add one!</p>
            )}
            {/* Address */}
            <div> <p
                // className="Addressline1"
                className="profileName"

            >Address Line 1</p><br />
                <div
                // className="phonespace"
                >
                    <Grid
                    // item md={6} lg={3}
                    >
                        <FormControl fullWidth={true}>
                            <TextValidator
                                placeholder="Address line 1"
                                // className="addressfield1"
                                className="Biofieldprofile"
                                variant="outlined"
                                type="address1"
                                name="address_line1"
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                value={address_line1}
                                onChange={(e) => {
                                    setaddress_line1(e.target.value);
                                }}
                            />
                        </FormControl>
                    </Grid>
                </div>
            </div>
            <div> <p
                // className="Addressline2"
                className="profileName"
            >Address Line 2</p><br />
                <div
                // className="phonespace"
                >
                    <Grid item
                    // md={6} lg={3}
                    >
                        <FormControl fullWidth={true}>
                            <TextValidator
                                placeholder="Address line 2"
                                // className="addressfield2"
                                className="Biofieldprofile"
                                variant="outlined"
                                type="address1"
                                name="address_line1"
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                value={address_line2}
                                onChange={(e) => {
                                    setaddress_line2(e.target.value);
                                }}
                            />
                        </FormControl>
                    </Grid>
                </div>
            </div>
            <div className="spaceName" >
                {/* city */}

                <div
                // className="phonespace"
                >
                    <p
                        // className="city"
                        className="profileName"
                    >City</p>

                    <br></br>
                    <Grid
                        item
                    //  md={6} lg={3}
                    >
                        <FormControl>
                            <TextValidator
                                placeholder="Enter your city"
                                id="profile-city"
                                type="city"
                                // className="cityfield"
                                style={{
                                    width: "206px",
                                    marginRight: "30px"
                                }}
                                className="Namefieldprofile"
                                variant="outlined"
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                value={city}
                                onChange={(e) => {
                                    setCity(e.target.value);
                                }}
                            />
                        </FormControl>
                    </Grid>
                </div>
                {/* district */}

                <div
                // className="phonespacegen"
                >
                    <p
                        // className="district"
                        className="profileName"
                    >District</p>
                    <br></br>
                    <Grid
                    // item md={6} lg={3}
                    >
                        <FormControl>
                            <TextValidator
                                placeholder="Enter your district"
                                id="profile-dist"
                                type="district"
                                // className="distfield"
                                style={{ width: "206px" }}
                                className="Namefieldprofile"
                                variant="outlined"
                                value={dist}
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                onChange={(e) => {
                                    setDist(e.target.value);
                                }}
                            />
                        </FormControl>
                    </Grid></div>
            </div>
            <div className="spaceName">

                <div
                // className="phonespace"
                >
                    <p
                        // className="state"
                        className="profileName"
                    >State</p>
                    <br></br>
                    <Grid item
                    // md={6} lg={3}
                    >
                        <FormControl>
                            <TextValidator
                                placeholder="Enter your state"
                                id="profile-state"
                                type="state"
                                variant="outlined"
                                // className="statefield"
                                style={{
                                    width: "206px",
                                    marginRight: "30px"
                                }}
                                className="Namefieldprofile"
                                value={state}
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                onChange={(e) => {
                                    setState(e.target.value);
                                }}
                            />
                        </FormControl>
                    </Grid>

                </div>

                <div
                // className="phonespacegen"

                >
                    <p
                        // className="pincode"
                        className="profileName"
                    >Pin Code</p>
                    <br></br>
                    <Grid item
                    // md={6} lg={3}
                    >
                        <FormControl>
                            <TextValidator
                                placeholder="Enter your pin"
                                id="profile-pin"
                                type="pin"
                                style={{ width: "206px", }}
                                className="Namefieldprofile"
                                // className="pinfield"
                                variant="outlined"
                                validators={["required"]}
                                errorMessages={["This field is required"]}
                                value={pin}
                                inputProps={{ maxLength: 6 }}
                                onChange={(e) => {
                                    setPin(e.target.value);
                                }}
                            />
                        </FormControl>
                    </Grid>
                </div>
            </div>
        </ThemeProvider>
        <div style={{ marginTop: "20px" }}>
            {/* <div className="submits"> */}
            <Button className="submitss"
                style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }} style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }}
                onClick={handleClickOpen}>Submit</Button></div>

        {/* </div> */}

        <Dialog

            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            style={{
                backdropFilter: "blur(8px)"
            }}
        >
            <div className={classes.profilepaperstyling}>
                <p className="upadtehead">Update Profile</p>
                <br></br>
                <div className="upadtedialog">Do you want to update profile?</div>
                <br></br>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}
                        style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #67737A" }}
                        className="cancelprofile">
                        Cancel
                    </Button>
                    <Button type="submit" onClick={handleClose} onClick={submitData}
                        className="submitsss"
                        style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", }}
                        autoFocus>
                        Update
                    </Button>
                </DialogActions>

            </div>
        </Dialog>


        <Grid item xs={7} md={10} lg={12} style={{ marginLeft: "10%" }}>
            <Box pt={4}>
                <br></br>
                <br></br>
                <Copyright />
                <br />
            </Box>
        </Grid>
    </Grid>

    ]
    return (
        <main className={classes.content}>
            <div>

                <div className={classes.appBarSpacer} />

                <p className="userprofilesetting">User Profile</p>
                <ValidatorForm
                    onSubmit={(event) => {
                    }}
                >
                    <Grid container className='screenMb' spacing={3}>

                        {profilehtml}
                        {detailshtml}
                    </Grid>
                    <Grid container className='screenDT' spacing={3}>
                        {detailshtml}
                        {profilehtml}
                    </Grid>
                </ValidatorForm>
            </div>
        </main >
    )
}

export default Profile;