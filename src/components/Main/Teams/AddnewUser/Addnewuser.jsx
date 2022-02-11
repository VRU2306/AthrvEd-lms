import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

import "./addnewuser.css"
import {
    Dialog,
    DialogContent,

} from "@material-ui/core";
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useStoreActions, useStoreState } from "easy-peasy";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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
const useStyles = makeStyles({
    Failure: {
        color: "red",
    },
    Successfullsubmit: {
        color: "green"
    },
    dssx: {

        width: "500px",
        backgroundColor: "#202328 !important"
    }

});
const AddnewUser = ({ open, handleClose, }) => {
    let [email, setEmail] = useState("");
    let [name1, setName1] = useState("");
    // let [residence, setResidence] = useState("");
    const classes = useStyles();
    const addnewuser = useStoreActions(
        action => action.authMod.ADD_USER_START);
    let successfullss = useStoreState((state) => state.authMod.Successfullss);
    // let isMailSending = useStoreState((state) => state.authMod.isMailsending);
    toast.configure()
    const Successfilss = () => {
        toast.success('Succesfully Details sent', { position: toast.POSITION.BOTTOM_CENTER })

    }
    const Failuress = () => {

        toast.error('Failed to send', { position: toast.POSITION.BOTTOM_CENTER })
    }
    function Toast(successfullss) {
        if (successfullss === true || successfullss === undefined) {
            Successfilss()

        }
        else if (successfullss === false) {
            Failuress()
        }
    }
    return (
        <Dialog
            open={open}
            onClose={()=>{handleClose();setEmail('');setName1('');}}
            style={{

                backdropFilter: "blur(8px)"
            }}
            aria-labelledby="form-dialog-title">
            <div className={classes.dssx}>
                <ValidatorForm
                    id="this-form"
                    onSubmit={e => {
                        // console.log("Hello");
                        addnewuser({
                            name1,
                            email,

                        });

                    }}
                >
                    <p className="addnewusertitle">  Register New Member   </p>

                    <DialogContent>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <TextValidator

                                type="text"
                                name="name"
                                id="name"
                                size="small"
                                fullWidth
                                display="filled"
                                variant='outlined'
                                placeholder="Enter Name"
                                value={name1}
                                onChange={e => {
                                    setName1(e.target.value);
                                }}

                                validators={['required']}
                                errorMessages={['This field is required',]} />
                            <br></br>
                            <TextValidator
                                type="Email"
                                name="Email"
                                id="Email"
                                size="small"
                                fullWidth
                                variant='outlined'
                                placeholder="Enter Email"
                                value={email}
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                                validators={['required']}
                                errorMessages={['This field is required', 'Email is not valid']}
                            />
                        </ThemeProvider>
                        <br></br>



                        <br></br>
                        <div className="addusery">
                            <Button type="submit" onClick={() => { Toast(successfullss) }
                            } className="adduseryes" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px" }} >
                                Submit
                        </Button>
                        </div>

                        <div className="addusercancelss">
                            <Button onClick={()=>{handleClose();setEmail('');setName1('');}} className="addusercancels" style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}>
                                Close</Button>
                        </div>

                        <br></br>


                    </DialogContent>
                </ValidatorForm>
            </div>
        </Dialog >

    );
};

export default AddnewUser;
