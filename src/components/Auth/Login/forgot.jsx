import React, { useState } from "react";
import Close from "@material-ui/icons/Close";
import { makeStyles, } from "@material-ui/core";
import EditingLoadingScreen from "../../UI/EditingLoadingScreen";
import { TextValidator } from 'react-material-ui-form-validator';
import {
  Dialog,
} from "@material-ui/core";
import { useStoreActions, useStoreState } from "easy-peasy";
import './Forgot.css';
import { Redirect } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  email: {
    margin: 10
  },
  failure: {
    color: "red",
  },
  successfulsubmit: {
    color: "green",
  },
  dsx: {
    width: "557px",
    height: "520px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    background: "#202328"
  }


}));

const Forgot = ({ open, handleClose }) => {
  let forgot = useStoreActions(action => action.authMod.FETCH_FORGOTPASSWORD_START);
  let successfulsubmit = useStoreState((state) => state.authMod.successfulsubmit);
  let failure = useStoreState((state) => state.authMod.failure);
  let isInserting = useStoreState((state) => state.dailyformMod.isInserting);
  const [value] = useState("submit");
  let success = value;
  let [email, setEmail] = useState("");

  const classes = useStyles();
  let Succesful = () => (successfulsubmit ? "Succesfull, recovery mail sent" : "");
  let Failure = () => (failure ? "Failed to send, check email address" : "");


  return (


    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      style={{ backdropFilter: "blur(20px)" }}
    >
      <div className={classes.dsx}>

        <div className="crossmark">
          <a onClick={handleClose} >
            <Close />
          </a>
        </div>

        <img src="vector.png" id="athlogfg"></img>
        <div id="emaifg">Forgot Password?</div>
        <div className="emailtext">No worries, we got your back </div>

        {/* <Divider light /> */}

        <br></br><br></br>
        <div className="emailid">EMAIL ID</div>

        <div className="boxem">
          <TextValidator
            size="small"
            fullWidth
            type="email"
            name="email"
            variant='outlined'
            placeholder="Enter your email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            validators={['required', 'isEmail']}
            errorMessages={['This field is required', 'Email is not valid']}
          />
        </div>

        <div>
          {/* alert(successfulsubmit) */}

          <p className={classes.successfulsubmit}>{Succesful()}</p>

        </div>


        <br />

        <div className="emailinfo">
          Enter the email address assoiciated with your account and we'll send you a token to reset your password.
        </div>
        <br /><br></br>

        <div id="subb">
          <button className="fbt fbt-info"
            type="submit"
            style={{ fontSize: 20 }}
            value="Continue"
            onClick={e => {

              e.preventDefault();
              forgot({ email });
            }}
            id="continue-btn"

          >
            Continue{isInserting && <EditingLoadingScreen />}
          </button>

        </div>
        {successfulsubmit && success === "submit" ? (
          <Redirect to="/reset">

          </Redirect>
        ) : <p className={classes.failure}>{Failure()}</p>}
      </div>
    </Dialog>

  );
};
export default Forgot;
