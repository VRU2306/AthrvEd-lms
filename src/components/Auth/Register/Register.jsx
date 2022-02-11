import React, { useState } from "react";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import ToggleBox from "./togglebox";
import Registerbtn from "./registerbtn";

import { useStoreActions, useStoreState } from "easy-peasy";
// import { Divider } from "@material-ui/core";
import './Register.css'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from "react-router-dom";
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
function Register({
}) {
  let [cpassword, setCPassword] = useState("");
  let [uuid, setUuid] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let mailverify = useStoreActions(action => action.authMod.POST_MAILVERIFY_START);
  const [isPasswordShown, setisPasswordShown] = useState(false)
  const [iscPasswordShown, setiscPasswordShown] = useState(false)
  let registerUser = useStoreActions(
    action => action.authMod.FETCH_REGISTER_START
  );
  let errors = useStoreState(state => state.authMod.errors);
  let setErrors = useStoreActions(action => action.authMod.CLEAR_ERRORS);
  let pwdError = errors.find(err => err.type === "password");
  let cpwdError = errors.find(err => err.type === "cpassword");
  let emailError = errors.find(err => err.type === "email");
  const togglePasswordVisibility = () => {
    setisPasswordShown(true)
  }

  const toggle = () => {
    setiscPasswordShown(true)
  }
  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== password) {
      return false;
    }
    return true;
  });

  return (
    <div className="regsetup">
      <img src="vector.png" id="athgoreg" alt="authlogo"></img>
      <div className="reghead">Hey there! Nice to see you</div>
      <div className="reghead2">Let's start working right away!</div>
      <div className="emailreg" >
        EMAIL
			 </div>

      <ValidatorForm
        id="auth-register"
        action=""
        noValidate={true}
        onSubmit={e => {
          e.preventDefault();
          registerUser({ email, uuid, password, cpassword });
          mailverify({ email })
        }}
      >
        <ThemeProvider theme={defaultMaterialTheme}>
          <div className="emailbox">
            <TextValidator
              type="email"
              name="email"
              id="email"
              size="small"
              autoComplete="new-email"
              display="filled"
              fullWidth
              variant='outlined'
              placeholder="Enter your email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (errors.length) setErrors([]);
              }}
              validators={['required', 'isEmail']}
              errorMessages={['This field is required', 'Email is not valid']}
            /></div>
          {emailError ? <p className="form-hint">{emailError.message}</p> : null}

          <div className="user__reg">
            USER ID
            </div>

          <div className="userbox">
            <TextValidator

              type="uuid"
              name="User-ID"
              autoComplete="new-uuid"
              id="user_id"
              size="small"

              display="filled"
              fullWidth
              variant='outlined'
              placeholder="Enter your User id"
              value={uuid}
              onChange={e => {
                setUuid(e.target.value);
                if (errors.length) setErrors([]);
              }}
              validators={['required', 'matchRegexp:^[0-9]*[1-9][0-9]*$']}
              errorMessages={['This field is required', 'Enter Valid User ID']}
            /></div>

          <div className="pw__reg">
            PASSWORD
            </div>
          <div className="passbox">
            <TextValidator

              type={(isPasswordShown) ? 'text' : 'password'}
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
                if (errors.length) setErrors([]);
              }}
              validators={['required', 'minStringLength:6', 'matchRegexp:[A-Z ]', 'matchRegexp:[0-9]', 'matchRegexp:[!@#$%^&*(),.?":{}|<>~`/|+_-]']}
              errorMessages={['This field is required', 'Password Must be atleast 6 characters long', 'Must include Capital letter', 'Must Include a number', 'Must include a Special Character']}

            /></div>

          <div className="eyeboxreg1">
            {isPasswordShown ?
              <FaEyeSlash className='eye' size='20px' onClick={() => setisPasswordShown(false)} /> :

              <FaEye className='eye' size='20px' onClick={togglePasswordVisibility} />
            }
          </div>




          {pwdError ? <p className="form-hint">{pwdError.message}</p> : null}

          <div className="cpw__reg">
            RE-TYPE PASSWORD
            </div>
          <div className="cpwbox">
            <TextValidator

              type={(iscPasswordShown) ? 'text' : 'password'}
              name="cpassword"
              id="cpassword"
              size="small"
              display="filled"
              autoComplete="new-password"
              fullWidth
              variant='outlined'
              placeholder="Please confirm your password"
              value={cpassword}
              validators={['required', 'isPasswordMatch']}
              errorMessages={'This filed is required', 'Password wont match'}
              onChange={e => {
                setCPassword(e.target.value);
                if (errors.length) setErrors([]);
              }}

            /></div>
          <div className="eyeboxreg2">
            {iscPasswordShown ?
              <FaEyeSlash className='eye' size='20px' onClick={() => setiscPasswordShown(false)} /> :

              <FaEye className='eye' size='20px' onClick={toggle} />
            }
          </div><br></br>

          <div id="_new_user___login" >
            Already have an account?, <Link to="/" id="loginlink" style={{ color: "#5499FF", fontSize: "18px" }} >
              Login
          </Link></div>

          {/* {cpwdError ? <p className="form-hint">{cpwdError.message}</p> : null} */}
          <ToggleBox title="Show Vehicles">
            <Registerbtn />
          </ToggleBox>
        </ThemeProvider>
      </ValidatorForm>
    </div>

  );
}

export default Register;