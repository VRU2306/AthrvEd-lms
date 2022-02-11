import React, { useState } from "react";
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useStoreActions, useStoreState } from "easy-peasy";
import { Link } from "react-router-dom";
import './Login.css'
import { Button, Grid } from "@material-ui/core";
import Forgot from "./forgot";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { LinkedCameraSharp } from "@material-ui/icons";
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

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  // let verified=useStoreActions(action=>action.authMod.FETCH_MAILVERIFIED_START);
  let loginUser = useStoreActions(action => action.authMod.FETCH_LOGIN_START);
  console.log("gcgcfc", loginUser)
  let errors = useStoreState(state => state.authMod.errors);
  let setErrors = useStoreActions(action => action.authMod.CLEAR_ERRORS);
  let pwdError = errors.find(err => err.type === "password");
  let emailError = errors.find(err => err.type === "email");
  let Blocked = errors.find(err => err.type === "Email");
  let iwdCred = errors.find(err => err.type === "Invalid Credentials");
  const [openforgotModal, setforgotModalOpen] = useState(false);
  const [isPasswordShown, setisPasswordShown] = useState(false)
  const togglePasswordVisibility = () => {
    setisPasswordShown(true)
  }
  const handleforgotModalOpen = () => {
    setforgotModalOpen(true);
  };
  const handleforgotModalClose = () => {
    setforgotModalOpen(false);
  };

  return (
    <Grid className="setup">
      <div >
        <img src="vector.png" id="athgo" alt="authlogo"></img>
        <div className="loginhead1">AthrV Operational Portal</div>
        <div className="welcome">Welcome Back!</div>
        <div id="email___user_id" >
          EMAIL
        </div>

        <ValidatorForm
          id="auth-register"
          action=""

          noValidate={true}
          onSubmit={e => {
            e.preventDefault();
            loginUser({ email, password });

          }}
        >
          <ThemeProvider theme={defaultMaterialTheme}>
            <div className="box ">
              <TextValidator
                size="small"
                type="email"
                name="email"
                display="filled"
                className="Passwordfield"
                fullWidth
                id="email"
                value={email}
                variant="outlined"
                validators={['required', 'isEmail']}
                errorMessages={['This field is required', 'Enter valid email']}
                onChange={e => {
                  setEmail(e.target.value);
                  if (errors.length) setErrors([]);
                }}
                placeholder="Enter your email"
              />
            </div>
            {emailError ? <p className="form-hint">{emailError.message}</p> : null}

            <div id="password1" >
              PASSWORD
            </div>
            <div className="box1">
              <TextValidator
                type={(isPasswordShown) ? 'text' : 'Password'}
                name="password"
                // id="password"
                className="Passwordfield"
                fullWidth
                size="small"
                variant="outlined"
                value={password}
                validators={['required']}
                errorMessages={["This field is required"]}
                onChange={e => {
                  setPassword(e.target.value);
                  if (errors.length) setErrors([]);
                }}
                placeholder="Enter your password"
              />
            </div>
            <div className="eyebox">
              {isPasswordShown ?
                <FaEyeSlash className='eye' size='20px' onClick={() => setisPasswordShown(false)} /> :

                <FaEye className='eye' size='20px' onClick={togglePasswordVisibility} />
              }
            </div>

            {/* Password Error message */}
            {pwdError ? <p className="pwerror">{pwdError.message}</p> : null}
            <div className="fp">
              <Button
                style={{ color: "#5499FF", fontSize: "16px", textTransform: "capitalize", fontWeight: "bold", marginRight: 18 }}
                onClick={handleforgotModalOpen}
              >
                Forgot Password?

              </Button>
              <Forgot
                id="kkkk"
                open={openforgotModal}
                handleClose={handleforgotModalClose}
              />
            </div>


            <div id="_new_user___create_account" >
              New User? ,<Link to="/register" id="reglink" style={{ color: "#5499FF", fontSize: "18px" }} >
                Create Account
              </Link></div>

            {Blocked ? <p className="form-hint">{Blocked.message}</p> : null}
            {iwdCred ? <p className="form-hint">{iwdCred.message}</p> : null}
            <Grid >
              <Link to="/eventuser" style={{ textDecoration: "none" }}>
                <Button id="eventbut">

                  Event

                </Button>
              </Link>
              <input
                id="loginbut"
                type="submit"
                value="Login"
                style={{ fontSize: 20 }}
              />
              <br></br>
            </Grid>

          </ThemeProvider>
        </ValidatorForm>

      </div >

    </Grid>

  );
}
export default Login;
