import React, { useState } from "react";

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useStoreActions, useStoreState } from "easy-peasy";
import { makeStyles, Button } from "@material-ui/core";

import { Link, } from "react-router-dom";

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SweetAlert from 'react-bootstrap-sweetalert';


import './reset.css';

const useStyles = makeStyles((theme) => ({
  fails: {
    color: "red",
  },
}));

function Reset() {
  let [password, setPassword] = useState("");
  let update = useStoreActions(action => action.authMod.FETCH_RESETPASSWORD_START);
  let [email, setEmail] = useState("");

  const [setLeaveModalOpen] = useState(false);
  let passwordsubmit = useStoreState(state => state.authMod.passwordsubmit);
  let fails = useStoreState(state => state.authMod.fails);
  const [isPasswordShown, setisPasswordShown] = useState(false)
  const togglePasswordVisibility = () => {
    setisPasswordShown(true)
  }
  let [open, setOpen] = React.useState(false);
  const [value, setValue] = useState("Reset Password");
  let success = value;
  let Fail = () => (fails ? "Failed To update check your Email-Id" : "");
  function refreshPage() {
    window.location.reload();
  }

  const classes = useStyles();
  return (

    <div className="mainbox">

      <img src="vector.png" id="athlogoreset" alt="authlogo"></img>
      <div id="resetpage">Forgot Password?</div>
      <div className="resettext">No worries, we got your back </div>

      {/* <Divider light /> */}

      <br></br>
      <div className="resetid">EMAIL</div>

      <ValidatorForm
        id="auth-register"
        action=""
        noValidate={true}
        onSubmit={e => {
          e.preventDefault();
          update({ email, password });

        }}
      ><br></br>
        <div className="boxres">
          <TextValidator
            type="email"
            name="email"
            id="email"
            size="small"
            display="filled"
            fullWidth
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
        <br></br>
        <div className="resetnew">NEW PASSWORD</div>
        <br></br>
        <div className="boxre">
          <TextValidator

            type={(isPasswordShown) ? 'text' : 'password'} s
            name="password"
            id="password"
            size="small"
            display="filled"
            fullWidth
            variant='outlined'
            placeholder="Enter your password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
            validators={['required', 'minStringLength:6', 'matchRegexp:[A-Z ]', 'matchRegexp:[0-9]', 'matchRegexp:[!@#$%^&*(),.?":{}|<>~`/|+_-]']}
            errorMessages={['This field is required', 'Password Must be atleast 6 characters long', 'Must include Capital letter', 'Must Include a number', 'Must include a Special Character']}

          />

          <div className="eyeboxs">
            {isPasswordShown ?
              <FaEyeSlash className='eye' size='20px' onClick={() => setisPasswordShown(false)} /> :

              <FaEye className='eye' size='20px' onClick={togglePasswordVisibility} />
            }
          </div>
        </div>
        <p className={classes.fails}>{Fail()}</p>
        <br />
        <input
          className="restbtn restbtn-info"
          type="Submit"
          value="Reset Password"
          style={{ fontSize: 18, cursor: "pointer" }}
        />
        {/* <p className={classes.fails}>{Fail()}</p> */}
        {/* <p className={classes.successfulsubmit}>{Succesful()}</p> */}

        {passwordsubmit && success === "Reset Password" ? (
          <div class="last">
            <SweetAlert

              style={{ background: "#202328", color: "#67737A" }}
              title="Successfull !"

              customButtons={
                <React.Fragment>
                  <Link to="/" onClick={refreshPage} style={{ textDecoration: 'none' }}>
                    <Button color="primary" variant="contained">
                      Go to Login Page!!
                    </Button>
                  </Link>
                </React.Fragment>
              }
            >
              You have reset the password successfully !!
            </SweetAlert>
          </div>
        ) : null}
      </ValidatorForm>

    </div>


  );
}

export default Reset;
