import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import "./verify.css"
import {
  Dialog,
  DialogContent,

} from "@material-ui/core";

import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useStoreActions, useStoreState } from "easy-peasy";

import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

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
    backgroundColor: "#202328 !important",
    overflow: "auto"
  }

});
const Verify = ({ open, handleClose }) => {

  let { email } = useStoreState(state => state.profileMod.profile);
  const [token, setToken] = React.useState("");
  let verify = useStoreActions(action => action.authMod.FETCH_MAILVERIFIED_START);
  let resend = useStoreActions(action => action.authMod.RESEND_MAIL_START);
  const classes = useStyles();


  // let Fun=()=> {document.getElementById("token").value = ''}

  let successful = useStoreState(state => state.authMod.Successful);

  let successfull = useStoreState((state) => state.authMod.successfull);

  toast.configure()
  const Successfils = () => {
    toast.success('Mail Sent Succesfully', { position: toast.POSITION.BOTTOM_CENTER })

  }
  const Failures = () => {

    toast.error('Failed to Send', { position: toast.POSITION.BOTTOM_CENTER })
  }
  const Successfilss = () => {
    toast.success('Succesfull Email verified', { position: toast.POSITION.BOTTOM_CENTER })

  }
  const Failuress = () => {

    toast.error('Failed to verify, token expired or invalid', { position: toast.POSITION.BOTTOM_CENTER })
  }
  function Toast(successful) {
    if (successful === true || successful === undefined) {
      Successfils()

    }
    else if (successful === false) {
      Failures()
    }
  }
  function ToastMail(successfull) {
    if (successfull === true || successfull === undefined) {
      Successfilss()
    }
    else if (successfull === false) {
      Failuress()
    }

  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      style={{

        backdropFilter: "blur(8px)"
      }}
      aria-labelledby="form-dialog-title">
      <div className={classes.dssx}>
        <ValidatorForm
          id="this-form"
          onSubmit={() => {
            // console.log("Hello");
            verify({
              token,
            });

          }}
        >
          <p className="verifyemails">  Verify Email  <Close onClick={handleClose} style={{ marginLeft: '300px' }} /></p>



          <DialogContent>
            <div id="center">
              <div>Please paste the token sent to your mail<br></br>{email || "******@gmail.com"} during Registrtaion</div>
              <br></br>
              <ThemeProvider theme={defaultMaterialTheme}>
                <TextValidator
                  type="text"
                  name="token"
                  id="token"
                  size="small"
                  style={{ width: 250 }}
                  variant='outlined'
                  placeholder="Paste your token"
                  value={token}
                  onChange={e => {
                    setToken(e.target.value);
                  }}

                  validators={['required']}
                  errorMessages={['This field is required', 'Email is not valid']} />
              </ThemeProvider>
              <br></br>

              <h5 style={{ marginLeft: 10 }} >Note: If You didn't recive the token in mail<br></br> press the Resend Mail button</h5>
              <br></br>
              <br></br>
              <div className="submittokeny">
                <Button type="submit" className="submittoken" style={{ textTransform: "capitalize", fontSize: 20, fontWeight: "bold", fontFamily: "Mulish" }}
                  onClick={e =>
                  // { successful && successf !== "Token" ? Successfilss() : Failuress() }
                  { ToastMail(successfull) }
                  }
                >
                  Submit
              </Button>
              </div>
              <div className="resendy">
                <Button
                  style={{ color: "#FFFFFF", textTransform: "capitalize", fontFamily: "Mulish", fontStyle: "normal", fontWeight: "bold", fontSize: 20, lineHeight: "25px", border: "1px solid #D4DCE1" }}
                  onClick={() => {
                    // console.log("sendd it");
                    resend({ email });
                    { Toast(successfull) }
                    // console.log(successfull)
                  }}
                  className="resends"
                >

                  Resend Mail</Button>
              </div>
            </div>
          </DialogContent>
        </ValidatorForm>
      </div >
    </Dialog >

  );
};

export default Verify;
