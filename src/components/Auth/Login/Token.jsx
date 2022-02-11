import React, { useState, } from "react";

import { ValidatorForm, TextValidator, } from 'react-material-ui-form-validator';
import { useStoreActions, useStoreState } from "easy-peasy";
import { makeStyles, } from "@material-ui/core";

import { Redirect } from "react-router-dom";


import './token.css';
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
const useStyles = makeStyles((theme) => ({
  failsure: {
    color: "red",
  },
}));

function Token() {
  let reset = useStoreActions(action => action.authMod.FETCH_RESETTOKEN_START);

  const [resetpasswordtoken, setresetpasswordToken] = useState("")

  let successfullsubmit = useStoreState((state) => state.authMod.successfullsubmit);
  let failsure = useStoreState((state) => state.authMod.failsure);

  const [value] = useState("Submit");
  let success = value;
  let Fail = () => (failsure ? "Token is Invalid or Expired" : "");
  const classes = useStyles();
  return (
    <div className="allset">

      <img src="vector.png" id="athlogo" alt="authlogo"></img>
      <div id="tokenpage">Forgot Password?</div>
      <div className="tokentext">No worries, we got your back </div>

      {/* <Divider light /> */}

      <br></br><br></br>
      <div className="tokenid">TOKEN ID</div>

      <ValidatorForm
        id="auth-register"
        action=""
        noValidate={true}
        onSubmit={e => {
          e.preventDefault();
          reset({ resetpasswordtoken });

        }}
      ><br></br>
        <div className="box2">
          <ThemeProvider theme={defaultMaterialTheme}>
            <TextValidator
              size="small"
              display="filled"
              fullWidth
              type="text"
              name="token"
              id="token"
              variant='outlined'
              placeholder="Paste your token"
              value={resetpasswordtoken}
              onChange={e => {
                setresetpasswordToken(e.target.value);
              }}

              validators={['required']}
              errorMessages={['This field is required', 'Token is not valid']} />
          </ThemeProvider>
        </div>

        <div>
          {/* <p className={classes.successfulsubmit}>{Succesful()}</p> */}
          <p className={classes.failsure}>{Fail()}</p></div>
        <br />

        {/* {pwdError ? <p className="form-hint">{pwdError.message}</p> : null} */}
        <div className="tokeninfo">
          Paste the token id, that we sent to your registered email
        </div>


        <input
          className="resbtn resbtn-info"
          type="Submit"
          style={{ fontSize: 20, cursor: "pointer" }}
          value="Submit"
        />

        {/* <div>
              {/* <p className={classes.successfulsubmit}>{Succesful()}</p> }
              <p className={classes.failsure}>{Fail()}</p></div>
            <br /> */}
        {successfullsubmit && success === "Submit" ? (
          <Redirect to="/updatepassword">

          </Redirect>
        ) : null}
      </ValidatorForm>

    </div>
  );
}

export default Token;